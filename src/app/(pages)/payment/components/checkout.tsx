import { Product } from "@/interface/productInterface";
import {
    CreditCardOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

const AppCheckout = () => {
  const columns: ColumnsType<Product> = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    // //   render: () => <a></a>,
    // },
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Ảnh",
    //   dataIndex: "image",
    //   key: "image",
    // //   render: () => <Image width={80} src={} />,
    // },
    // {
    //   title: "Image",
    //   dataIndex: "image",
    //   key: "image",
    //   render: (_, record) => (
    //     <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>
    //       {record.image}
    //     </Paragraph>
    //   ),
    // },
    {
      title: "Số lượng",
      dataIndex: ["unit", "name"],
      key: "unit.name",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Tổng tính",
      dataIndex: "price",
      key: "price",
    },
  ];
  return (
    <>
      <Row justify={"space-between"}>
        <Col span={14}>
          <Flex vertical>
            <div style={{ paddingLeft: "130px", paddingBottom: "20px" }}>
              <Card
                title={
                  <>
                    <EnvironmentOutlined style={{ fontSize: "28px" }} /> Thông
                    Tin Nhận Hàng
                  </>
                }
              >
                <Form layout="vertical">
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
                            name="phonenumber"
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
                  <TextArea
                    showCount
                    maxLength={100}
                    //   onChange={onChange}
                    placeholder="Nhập địa chỉ cụ thể"
                    style={{ height: 120, resize: "none" }}
                  />
                </Form>
              </Card>
            </div>

            <div style={{ paddingLeft: "130px" }}>
              <Card
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
                  // dataSource=()
                />
              </Card>
            </div>
          </Flex>
        </Col>
        <Col span={9} style={{ paddingRight: "130px" }}>
          <div style={{ paddingBottom: "20px" }}>
            <Card
              title={
                <>
                  <CreditCardOutlined style={{ fontSize: "28px" }} /> Phương Thức Thanh Toán
                </>
              }
            >
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value={1}>ATM Card ( Thẻ nội địa )</Radio>
                  <Radio value={2}>Thanh toán qua MoMo</Radio>
                  <Radio value={3}>Thanh toán khi nhận hàng ( COD )</Radio>
                </Space>
              </Radio.Group>
            </Card>
          </div>

          <Card title={<>Chi Tiết Thanh Toán</>}>
            
            <p>Tổng tiền hàng:</p>
            <p>Phí vận chuyển:</p>
            <hr />
            <Space>Tổng tiền hàng: </Space>
            <Space style={{ float: "right", color: "red" }}>0 VNĐ</Space>
            <Button
              danger
              block
              type="primary"
              style={{ marginTop: "20px", height: "45px" }}
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
