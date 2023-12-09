import { useCart } from "@/app/context/cartContext";
import { useAuth } from "@/app/context/use-auth";
import { checkoutCart } from "@/app/services/CartService";
import { profile } from "@/interface/AuthInterface";
import { Product } from "@/interface/productInterface";
import {
  CreditCardOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  ExclamationCircleFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Table,
  Typography,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { useState } from "react";
interface IProps {
  listCartProductTick: Product[];
}
const formatCurrency = (value: number | undefined) => {
  if (typeof value !== "number") {
    return "N/A";
  }
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
//@ts-ignore
const initialValues: profile = {
  fullname: "",
  email: "",
  phoneNumber: 0,
  address: "",
};
const AppCheckout: React.FC<IProps> = ({ listCartProductTick }) => {
  const [totalProduct, setTotalProduct] = useState<number>(0);
  const { data } = useAuth();
  const [form] = Form.useForm();
  const { confirm } = Modal;
  const router = useRouter();
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [form, data]);
  useEffect(() => {
    const sum =
      listCartProductTick.reduce((acc, record) => {
        const { quantity } = record;
        //@ts-ignore
        const { price } = record.product;
        if (quantity !== undefined && price !== undefined) {
          return acc + quantity * price;
        }
        return acc;
      }, 0) || 0;
    setTotalProduct(sum);
  }, [listCartProductTick]);
  const showPromiseConfirm = () => {
    confirm({
      title: "Bạn có chắc chắn muốn thanh toán?",
      icon: <ExclamationCircleFilled />,
      // content: '...',
      onOk() {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            const cartIds = listCartProductTick.map((product) => product.id);
            //@ts-ignore
            checkoutCart(data?.id, cartIds);
            // console.log(cartIds)
            message.success("Thanh toán thành công!");
            router.push("/profile");
            router.refresh();
            resolve();
          }, 1000);
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {},
    });
  };
  const columns: ColumnsType<Product> = [
    {
      title: "Sản phẩm",
      dataIndex: ["product", "title"],
      key: "product.title",
      render: (_, record) => {
        //@ts-ignore
        const product_image = record.product.image_id[0].path;
        //@ts-ignore
        const product_title = record.product.title;
        //@ts-ignore
        const size = record.size;
        return (
          <Flex>
            <img alt="avatar" src={product_image} style={{ width: 80 }} />
            <Flex
              vertical
              flex={1}
              justify="space-between"
              style={{ padding: 10 }}
            >
              <Typography.Paragraph
                style={{ width: "280px" }}
                ellipsis={{
                  rows: 1,
                  expandable: true,
                  symbol: "more",
                }}
              >
                {product_title}
              </Typography.Paragraph>
              <Flex align="flex-end" justify="space-between">
                <Typography.Paragraph
                  // style={{ width: "280px" }}
                  ellipsis={{
                    rows: 1,
                    expandable: true,
                    symbol: "more",
                  }}
                >
                  Màu: N/A
                </Typography.Paragraph>
                <Typography.Paragraph
                  style={{ width: "280px" }}
                  ellipsis={{
                    rows: 1,
                    expandable: true,
                    symbol: "more",
                  }}
                >
                  Size: {size}
                </Typography.Paragraph>
              </Flex>
            </Flex>
          </Flex>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Đơn giá",
      dataIndex: ["product", "price"],
      key: "product.price",
      render: (_, record) => {
        //@ts-ignore
        return formatCurrency(record.product.price);
      },
    },
    {
      title: "Tổng tính",
      dataIndex: "total",
      key: "total",
      width: "10%",
      render: (_, record) => {
        const { quantity } = record;
        //@ts-ignore
        const { price } = record.product;
        const total = quantity * price || 0;

        return formatCurrency(total);
      },
    },
  ];
  return (
    <>
      <Row justify={"space-between"}>
        <Col span={14}>
          <Flex vertical>
            <div style={{ paddingLeft: "130px", paddingBottom: "20px" }}>
              <Card
                style={{
                  boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
                title={
                  <>
                    <EnvironmentOutlined style={{ fontSize: "28px" }} /> Thông
                    Tin Nhận Hàng
                  </>
                }
              >
                <Form
                  layout="vertical"
                  initialValues={initialValues}
                  form={form}
                >
                  <Row gutter={24}>
                    {/* First Row */}
                    <Col span={24}>
                      <Row gutter={24}>
                        <Col span={8}>
                          <Form.Item
                            name="fullname"
                            label="Họ và tên"
                            rules={[
                              {
                                required: true,
                                message: "Không được để trống!",
                              },
                            ]}
                          >
                            <Input placeholder="Nhập họ và tên" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            name="phoneNumber"
                            label="Số điện thoại"
                            rules={[
                              {
                                required: true,
                                message: "Không được để trống!",
                              },
                            ]}
                          >
                            <Input placeholder="Nhập số điện thoại" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                              {
                                required: true,
                                message: "Không được để trống!",
                              },
                            ]}
                          >
                            <Input placeholder="Nhập Email" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>

                    {/* Second Row */}
                    <Col span={24}>
                      <Row gutter={24}>
                        <Col span={8}>
                          <Form.Item
                            name="1"
                            label="Tỉnh / Thành phố"
                            rules={[
                              {
                                required: true,
                                message: "Select something!",
                              },
                            ]}
                            initialValue="1"
                          >
                            <Select>
                              <Option value="1">Đà nẵng</Option>
                              <Option value="2">Huế</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            name="2"
                            label="Quận / Huyện"
                            rules={[
                              {
                                required: true,
                                message: "Select something!",
                              },
                            ]}
                            initialValue="1"
                          >
                            <Select>
                              <Option value="1">Liên Chiểu</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            name="3"
                            label="Phường / Xã"
                            rules={[
                              {
                                required: true,
                                message: "Select something!",
                              },
                            ]}
                            initialValue="1"
                          >
                            <Select>
                              <Option value="1">Hòa Minh</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Form.Item name="address">
                    <TextArea
                      name="address"
                      showCount
                      maxLength={100}
                      //   onChange={onChange}
                      placeholder="Nhập địa chỉ cụ thể"
                      style={{ height: 120, resize: "none" }}
                    />
                  </Form.Item>
                </Form>
              </Card>
            </div>

            <div style={{ paddingLeft: "130px" }}>
              <Card
                style={{
                  boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
                title={
                  <>
                    <ShoppingCartOutlined style={{ fontSize: "32px" }} /> Thông
                    Tin Đơn Hàng
                  </>
                }
              >
                <Table
                  pagination={{ defaultPageSize: 5 }}
                  columns={columns}
                  dataSource={listCartProductTick.map((product) => ({
                    ...product,
                    key: product.id,
                  }))}
                />
              </Card>
            </div>
          </Flex>
        </Col>
        <Col span={9} style={{ paddingRight: "130px" }}>
          <div style={{ paddingBottom: "20px" }}>
            <Card
              style={{
                boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              title={
                <>
                  <CreditCardOutlined style={{ fontSize: "28px" }} /> Phương
                  Thức Thanh Toán
                </>
              }
            >
              <Radio.Group defaultValue={3}>
                <Space direction="vertical">
                  <Radio value={1}>ATM Card ( Thẻ nội địa )</Radio>
                  <Radio value={2}>Thanh toán qua MoMo</Radio>
                  <Radio value={3}>Thanh toán khi nhận hàng ( COD )</Radio>
                </Space>
              </Radio.Group>
            </Card>
          </div>

          <Card
            style={{
              boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            title={<>Chi Tiết Thanh Toán</>}
          >
            <Space>Tổng tiền hàng: </Space>
            <Space style={{ float: "right" }}>
              {formatCurrency(totalProduct)}
            </Space>
            <br />
            <Space>Phí vận chuyển: </Space>
            <Space style={{ float: "right" }}>0 VNĐ</Space>
            <hr />
            <Space>Tổng thanh toán: </Space>
            <Space style={{ float: "right", color: "red" }}>
              {formatCurrency(totalProduct)}
            </Space>
            <Button
              danger
              block
              type="primary"
              style={{ marginTop: "20px", height: "45px" }}
              onClick={showPromiseConfirm}
            >
              Thanh toán
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default AppCheckout;
