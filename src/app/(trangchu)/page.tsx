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
  Pagination,
  Row,
  Skeleton,
  Typography,
  theme,
} from "antd";
import styles from "@/lib/productCSS.module.css";

const { Text } = Typography;
import Link from "next/link";
import { findAllCategory } from "../services/CategoryService";
import { Category } from "@/interface/categoryInterface";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import Header from "./components/header";
import { Product } from "@/interface/productInterface";
import {
  findAllProduct,
  findProductByCategory,
} from "../services/ProductService";
import { CartProvider, useCart } from "../context/cartContext";
import { useAuth } from "../context/use-auth";

const { Content, Footer } = Layout;

const imgStyle: React.CSSProperties = {
  display: "block",
  width: 500,
};

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [categoryData, setCategoryData] = useState<Category[] | undefined>();
  const [productData, setProductData] = useState<Product[] | undefined>();
  const { onAddProductToCart } = useCart();
  const [loading, setLoading] = useState(true);

  const { data } = useAuth();
  //@ts-ignore
  const userId = data?.id;
  // const [productByCate, setProductByCate] = useState<Product[] | undefined>();
  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    currentPage: 0,
    pageSize: 10, // adjust based on your API response
    totalElements: 0,
  });

  const formatCurrency = (value: number | undefined) => {
    if (typeof value !== "number") {
      return "N/A";
    }
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([findCategory(), findProduct()])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
    // findCategory();
    // findProduct();
  }, []);
  const findCategory = async () => {
    try {
      const response = await findAllCategory();
      //@ts-ignore
      setCategoryData(response);
    } catch (error) {
      console.log("Can't get");
    }
  };
  const findProduct = async (page: number = 0) => {
    try {
      const response = await findAllProduct(page, pageInfo.pageSize);
      //@ts-ignore
      setProductData(response);
      setPageInfo({
        //@ts-ignore
        totalPages: response?.totalPages,
        //@ts-ignore
        currentPage: response?.number,
        //@ts-ignore
        pageSize: response?.size,
        //@ts-ignore
        totalElements: response?.totalElements,
      });
    } catch (error) {
      console.log("Can't get");
    }
  };
  const handleAddToCart = async (userId: any, item: any) => {
    try {
      //@ts-ignore
      const cartDetail: CartDetail = {
        user: { id: userId },
        product: { id: item.id },
        quantity: 1,
        size: item.sizes[0].name,
      };
      onAddProductToCart(cartDetail);
    } catch (error) {
      console.error("Error adding to RoomOrder:", error);
    }
  };
  return (
    <Layout>
      {/* <CartProvider> */}
      <Header />
      {/* </CartProvider> */}
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
              <Link href={`/category/${item.id}`}>
                <Card
                  size="small"
                  hoverable
                  cover
                  style={{
                    textAlign: "center",
                    minHeight: "90px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)'

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
          <Title level={2}>Thời Trang Nam</Title>
          {/* <Pagination
            current={pageInfo.currentPage + 1}
            total={pageInfo.totalElements}
            pageSize={pageInfo.pageSize}
            onChange={(page) => findProduct(page - 1)}
          /> */}
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 5 }} // Adjust the grid settings
            // style={{ padding: "30px", paddingLeft: "200px", paddingRight: "200px" }}
            //@ts-ignore
            dataSource={productData?.content}
            renderItem={(item: Product) => {
              return (
                <List.Item>
                  <Card
                    className={styles.productCard}
                    style={{ width: 300 }}
                    actions={
                      [
                        // <SettingOutlined key="setting" />,
                        // <EditOutlined key="edit" />,
                        // <EllipsisOutlined key="ellipsis" />,
                      ]
                    }
                    cover={
                      //@ts-ignore
                      <Link href={`/product/${item.id}`}>
                        <Image
                          className={styles.productImage}
                          src={item.image_id[0]?.path}
                          alt="product"
                          preview={false}
                        />
                      </Link>
                    }
                  >
                    <div className={styles.addToCartButton}>
                      <Button
                        type="default"
                        size="large"
                        onClick={() => {
                          handleAddToCart(userId, item);
                        }}
                      >
                        Thêm vào giỏ hàng
                      </Button>
                    </div>
                    <Card.Meta
                      title={
                        <Typography.Paragraph>
                          <Typography.Text type="danger">
                            {formatCurrency(item.price)}
                          </Typography.Text>
                        </Typography.Paragraph>
                      }
                      description={
                        <Typography.Paragraph
                          ellipsis={{
                            rows: 1,
                            expandable: true,
                            symbol: "more",
                          }}
                        >
                          {item.title}
                        </Typography.Paragraph>
                      }
                    ></Card.Meta>
                  </Card>
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
