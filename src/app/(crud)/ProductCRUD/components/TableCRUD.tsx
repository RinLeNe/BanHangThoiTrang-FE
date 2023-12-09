"use client";
import { findAllCategory } from "@/app/services/CategoryService";
import {
  Button,
  Form,
  Input,
  Select,
  message,
  Row,
  Col,
  Space,
  Card,
  Popover,
  Upload,
  InputNumber,
  Progress,
  Modal,
  Spin,
  Flex,
} from "antd";
import React, { useEffect, useState } from "react";
// import {
//   IProduct,
//   DataTypeCategory,
//   DataTypeUnit,
//   ProductDetail,
// } from "@/lib/interfaceBase";
import { PlusOutlined } from "@ant-design/icons";
import { RcFile, UploadFile } from "antd/es/upload";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import {
  DataTypeCategory,
  Product,
  ProductDetail,
} from "@/interface/productInterface";
import TextArea from "antd/es/input/TextArea";
import { ProductType } from "@/interface/ProductTypeEnum";
import { ProductSize } from "@/interface/ProductSizeEnum";

interface IProps {
  product?: Product;
  onSubmit: (product: ProductDetail, resetFormData: () => void) => void;
  onDelete: (productId: number) => void;
  onUpdate: (productId: number, product: ProductDetail) => void;
}
const initialValues: ProductDetail = {
  title: "",
  price: 0,
  importPrice: 0,
  discount: 0,
  quantity: 0,
  productType: ProductType.typeMALE,
  productSize: ProductSize.S,
  description: "",
  productCategory: {
    id: "",
  },
  image_id: [],
};

const fullwidth: React.CSSProperties = {
  width: "100%",
};
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const TableCRUD: React.FC<IProps> = (props) => {
  const [editing, setEditing] = useState(false);
  const [dataCategory, setDataCategory] = useState<DataTypeCategory[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [downloadURL, setDownloadURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [form] = Form.useForm<ProductDetail>();
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile<any>) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };
  const handleSelectedFile = (files: RcFile | RcFile[]) => {
    const selectedFiles = Array.isArray(files) ? files : [files];
    setImageFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };
  const handleRemoveFile = (file: UploadFile<any>) => {
    setImageFiles((prevFiles) =>
      prevFiles.filter((prevFile) => prevFile.name !== file.uid)
    );
  };
  const fetchDataCategory = async () => {
    const response = await findAllCategory();
    //@ts-ignore
    setDataCategory(response);
  };

  useEffect(() => {
    fetchDataCategory();
  }, []);

  useEffect(() => {
    if (props.product) {
      setEditing(true);
      //@ts-ignore
      form.setFieldsValue(props.product);
    }
  }, [form, props.product]);

  // Handle submitting multiple images
  const handleSubmit = (data: ProductDetail) => {
    const uploadPromises = imageFiles.map((file) => {
      const name = file.name;
      const storageRef = ref(storage, `image/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise<string>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgressUpload(progress);
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              resolve(url);
            });
          }
        );
      });
    });

    Promise.all(uploadPromises)
      .then((urls) => {
        // Assuming image_id is initially an empty array in data
        data.image_id = urls.map((url) => ({ path: url }));
        props.onSubmit(data, () => {
          form.resetFields();
          setImageFiles([]);
          setProgressUpload(0);
          setIsUploading(false);
        });
      })
      .catch((error) => {
        message.error(error.message);
      });
  };
  const handleUpdate = async (productId: any) => {
    props.onUpdate(productId, form.getFieldsValue());
  };

  const handleDelete = async (productId: any) => {
    Modal.confirm({
      title: "Bạn có muốn xóa ?",
      okText: "Yes",
      okType: "danger",
      width: "600px",
      onOk: () => {
        props.onDelete(productId);
      },
    });
  };
  const RemovePOP = (
    <div>
      <p>Nhấp vào Edit để xóa Product với Id!</p>
    </div>
  );

  const handleClick = async (event: any) => {};
  return (
    <Spin spinning={isUploading}>
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onSubmitCapture={(e) => {
            e.preventDefault;
          }}
          initialValues={initialValues}
        >
          <Form.Item style={{ textAlign: "center" }}>
            {editing ? <h1>Cập nhật sản phẩm</h1> : <h1>Tạo thêm sản phẩm</h1>}
          </Form.Item>
          <Form.Item
            name="title"
            label="Tên sản phẩm"
            rules={[
              {
                required: true,
                message: "Tên sản phẩm không được để trống!",
              },
            ]}
          >
            <Input name="title" type="text" placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Form.Item label="Ảnh sản phẩm">
            <Upload
              name="image_id"
              accept="image/png, image/jpeg, image/jpg"
              action={"localhost:3000"}
              listType="picture-card"
              showUploadList={{ showRemoveIcon: true }}
              onPreview={handlePreview}
              multiple={true}
              beforeUpload={(file) => {
                handleSelectedFile(file);
                return false;
              }}
            >
              {uploadButton}
            </Upload>

            {imageFiles.length > 0 && <Progress percent={progressUpload} />}
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="viewPicture"
                style={{ width: "100%" }}
                src={previewImage}
              />
            </Modal>
          </Form.Item>
          <Flex >
            <Form.Item
              name="productType"
              label="Loại sản phẩm"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại sản phẩm!",
                },
              ]}
            >
              <Select>
                {Object.values(ProductType).map((type) => (
                  <Select.Option key={type} value={type}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
            name="productSize"
            label="Chọn Size"
            style={{width:"100px", marginLeft:"20px"}}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn Size sản phẩm!",
              },
            ]}
          >
            <Select>
              {Object.values(ProductSize).map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          </Flex>

          <Flex>
            <Flex
              vertical
              flex={1}
              justify="space-between"
              // style={{ padding: 10 }}
            >
              <Flex align="flex-end" justify="space-between">
                <Form.Item name="importPrice" label="Giá nhập vào">
                  <InputNumber addonAfter="VNĐ" name="price" min={0} />
                </Form.Item>
                <Form.Item name="price" label="Giá sản phẩm">
                  <InputNumber addonAfter="VNĐ" name="price" min={0} />
                </Form.Item>
                <Form.Item name="quantity" label="Số lượng">
                  <InputNumber name="quantity" min={0} />
                </Form.Item>
              </Flex>
            </Flex>
          </Flex>
          <Form.Item name="discount" label="Discount">
            <InputNumber name="discount" min={0} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả sản phẩm"
            rules={[
              {
                required: true,
                message: "Mô tả sản phẩm không được để trống!",
              },
            ]}
          >
            <TextArea
              name="description"
              showCount
              maxLength={100}
              //   onChange={onChange}
              placeholder="Mô tả sản phẩm"
              style={{ height: 120, resize: "none" }}
            />
          </Form.Item>
          <Form.Item
            name={["category", "id"]}
            label="Danh mục"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn danh mục sản phẩm",
              },
            ]}
          >
            <Select>
              {dataCategory.map((productCategory) => (
                <Select.Option
                  key={productCategory.id}
                  value={productCategory.id}
                >
                  {productCategory.name}
                </Select.Option>
              ))}
              ;
            </Select>
          </Form.Item>
          <Row gutter={32} justify={"center"}>
            <Col span={16}>
              <Space direction="vertical" style={fullwidth}>
                <Space direction="vertical" style={fullwidth}>
                  <Row gutter={16}>
                    <Col span={12}>
                      {editing ? (
                        <Button
                          htmlType="button"
                          onClick={(e) => {
                            setEditing(false);
                            handleClick(e.preventDefault());
                            form.resetFields();
                          }}
                          size="large"
                          block
                        >
                          Hủy
                        </Button>
                      ) : (
                        <Button
                          htmlType="submit"
                          type="primary"
                          size="large"
                          block
                          onClick={() => {
                            setIsUploading(true);
                          }}
                        >
                          Thêm
                        </Button>
                      )}
                    </Col>
                    <Col span={12}>
                      {editing ? (
                        <Button
                          type="primary"
                          size="large"
                          block
                          onClick={() => {
                            handleUpdate(props.product?.id);
                          }}
                        >
                          Sửa
                        </Button>
                      ) : (
                        <Button type="primary" size="large" block disabled>
                          Sửa
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Space>
              </Space>
            </Col>
            <Col className="gutter-row" span={6}>
              <Space direction="vertical" style={fullwidth}>
                {!editing ? (
                  <Popover content={RemovePOP} title="Lưu ý!">
                    <Button type="primary" size="large" danger block disabled>
                      Xóa
                    </Button>
                  </Popover>
                ) : (
                  <Button
                    type="primary"
                    size="large"
                    danger
                    block
                    onClick={() => {
                      handleDelete(props.product?.id);
                    }}
                  >
                    Xóa
                  </Button>
                )}
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
    </Spin>
  );
};
export default TableCRUD;
