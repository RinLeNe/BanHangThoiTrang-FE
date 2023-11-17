"use client";
import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Carousel,
  Drawer,
  Flex,
  Image,
  Layout,
  List,
  Menu,
  Row,
  Typography,
  theme,
} from "antd";
const { Text } = Typography;
import Search, { SearchProps } from "antd/es/input/Search";
import {
  CustomerServiceOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { findAllCategory } from "../services/CategoryService";
import { Category } from "@/interface/categoryInterface";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import Header from "./components/header";

const { Content, Footer } = Layout;

// const cardStyle: React.CSSProperties = {
//   width: 620,
// };

const imgStyle: React.CSSProperties = {
  display: "block",
  width: 500,
};
const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [categoryData, setCategoryData] = useState<Category[] | undefined>();

  useEffect(() => {
    findCategory();
  }, []);
  const findCategory = async () => {
    const response = await findAllCategory();
    //@ts-ignore
    setCategoryData(response);
  };
  console.log(categoryData);
  return (
    <Layout>
      <Header />
      <Carousel style={{ padding: "0 0" }}>
        <div>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/leafy-emblem-385311.appspot.com/o/image%2Fbanner-1.jpg?alt=media&token=333c0340-3ebf-4679-8701-c0cdef389e53"
            alt="banner"
            preview={false}
          ></Image>
        </div>
      </Carousel>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 6, xxl: 6 }} // Adjust the grid settings
        style={{ padding: "30px", paddingLeft: "200px", paddingRight: "200px" }}
        dataSource={categoryData}
        renderItem={(item) => {
          return (
            <List.Item>
              <Link href="/category">
              <Card
                size="small"
                hoverable
                cover
                style={{
                  // width: "100px",
                  textAlign: "center",
                  minHeight: "90px",
                }}
              >
                <Text
                  style={{
                    display: "block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.name}
                </Text>
              </Card>
              </Link>
            </List.Item>
          );
        }}
      />
      <Content className="site-layout" style={{ padding: "0 50px" }}>
        <div
          style={{ padding: 24, minHeight: 380, background: colorBgContainer }}
        >
          {/* Content */}
          <Title level={2}>Thời Trang Nam Nữ</Title>
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 5 }} // Adjust the grid settings
            // style={{ padding: "30px", paddingLeft: "200px", paddingRight: "200px" }}
            dataSource={categoryData}
            renderItem={(item) => {
              return (
                <List.Item>
                  <Badge.Ribbon>
                    <Card
                      style={{ width: 300 }}
                      actions={
                        [
                          // <SettingOutlined key="setting" />,
                          // <EditOutlined key="edit" />,
                          // <EllipsisOutlined key="ellipsis" />,
                        ]
                      }
                      cover={
                        <Image
                          src="https://firebasestorage.googleapis.com/v0/b/leafy-emblem-385311.appspot.com/o/image%2Fdemoimage.jpeg?alt=media&token=278f06ce-e84d-4c0b-9f73-798829fc6118"
                          alt="product"
                          preview={false}
                        />
                      }
                    >
                      <Card.Meta
                        title={
                          <Typography.Paragraph>
                            <Typography.Text type="danger">
                              195.000 VNĐ
                            </Typography.Text>
                          </Typography.Paragraph>
                        }
                        description={
                          <Typography.Paragraph
                            ellipsis={{
                              rows: 2,
                              expandable: true,
                              symbol: "more",
                            }}
                          >
                            <Text>Áo Polo Basic Nữ Phối Màu</Text>
                          </Typography.Paragraph>
                        }
                      ></Card.Meta>
                    </Card>
                  </Badge.Ribbon>
                </List.Item>
              );
            }}
          />
          <Card
            hoverable
            // style={cardStyle}
            bodyStyle={{ padding: 0, overflow: "hidden" }}
          >
            <Flex justify="space-between">
              <img
                alt="avatar"
                src="https://firebasestorage.googleapis.com/v0/b/leafy-emblem-385311.appspot.com/o/image%2Fmovesimage.jpg?alt=media&token=c847be76-a11b-428b-8a8f-7ea65dbb7697"
                style={imgStyle}
              />
              <Flex
                vertical
                // align="flex-end"
                // justify="space-between"
                style={{ padding: 32 }}
              >
                <Title>Tiêu đề</Title>
                <Paragraph
                  ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                >
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facere, optio omnis doloremque soluta error assumenda nemo
                  delectus voluptates incidunt repellat veniam ullam commodi
                  repellendus temporibus aspernatur quas, voluptate ut nostrum?
                </Paragraph>

                <Link href="" style={{ marginBottom: "30px" }}>
                  Xem thêm chủ đề
                </Link>
                <Row>
                  <Badge.Ribbon>
                    <Card
                      style={{ width: 250, marginRight: "30px" }}
                      actions={
                        [
                          // <SettingOutlined key="setting" />,
                          // <EditOutlined key="edit" />,
                          // <EllipsisOutlined key="ellipsis" />,
                        ]
                      }
                      cover={
                        <Image
                          src="https://firebasestorage.googleapis.com/v0/b/leafy-emblem-385311.appspot.com/o/image%2Fdemoimage.jpeg?alt=media&token=278f06ce-e84d-4c0b-9f73-798829fc6118"
                          alt="product"
                          preview={false}
                        />
                      }
                    >
                      <Card.Meta
                        title={
                          <Typography.Paragraph>
                            <Typography.Text type="danger">
                              195.000 VNĐ
                            </Typography.Text>
                          </Typography.Paragraph>
                        }
                        description={
                          <Typography.Paragraph
                            ellipsis={{
                              rows: 2,
                              expandable: true,
                              symbol: "more",
                            }}
                          >
                            <Text>Áo Polo Basic Nữ Phối Màu</Text>
                          </Typography.Paragraph>
                        }
                      ></Card.Meta>
                    </Card>
                  </Badge.Ribbon>
                  <Badge.Ribbon>
                    <Card
                      style={{ width: 250, marginRight: "30px" }}
                      actions={
                        [
                          // <SettingOutlined key="setting" />,
                          // <EditOutlined key="edit" />,
                          // <EllipsisOutlined key="ellipsis" />,
                        ]
                      }
                      cover={
                        <Image
                          src="https://firebasestorage.googleapis.com/v0/b/leafy-emblem-385311.appspot.com/o/image%2Fdemoimage.jpeg?alt=media&token=278f06ce-e84d-4c0b-9f73-798829fc6118"
                          alt="product"
                          preview={false}
                        />
                      }
                    >
                      <Card.Meta
                        title={
                          <Typography.Paragraph>
                            <Typography.Text type="danger">
                              195.000 VNĐ
                            </Typography.Text>
                          </Typography.Paragraph>
                        }
                        description={
                          <Typography.Paragraph
                            ellipsis={{
                              rows: 2,
                              expandable: true,
                              symbol: "more",
                            }}
                          >
                            <Text>Áo Polo Basic Nữ Phối Màu</Text>
                          </Typography.Paragraph>
                        }
                      ></Card.Meta>
                    </Card>
                  </Badge.Ribbon>
                  <Badge.Ribbon>
                    <Card
                      style={{ width: 250 }}
                      actions={
                        [
                          // <SettingOutlined key="setting" />,
                          // <EditOutlined key="edit" />,
                          // <EllipsisOutlined key="ellipsis" />,
                        ]
                      }
                      cover={
                        <Image
                          src="https://firebasestorage.googleapis.com/v0/b/leafy-emblem-385311.appspot.com/o/image%2Fdemoimage.jpeg?alt=media&token=278f06ce-e84d-4c0b-9f73-798829fc6118"
                          alt="product"
                          preview={false}
                        />
                      }
                    >
                      <Card.Meta
                        title={
                          <Typography.Paragraph>
                            <Typography.Text type="danger">
                              195.000 VNĐ
                            </Typography.Text>
                          </Typography.Paragraph>
                        }
                        description={
                          <Typography.Paragraph
                            ellipsis={{
                              rows: 2,
                              expandable: true,
                              symbol: "more",
                            }}
                          >
                            <Text>Áo Polo Basic Nữ Phối Màu</Text>
                          </Typography.Paragraph>
                        }
                      ></Card.Meta>
                    </Card>
                  </Badge.Ribbon>
                </Row>
              </Flex>
            </Flex>
          </Card>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
