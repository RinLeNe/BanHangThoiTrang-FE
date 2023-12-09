"use client";
import { useCart } from "@/app/context/cartContext";
import { useAuth } from "@/app/context/use-auth";
import { findAllCategory } from "@/app/services/CategoryService";
import { findProductByCategory } from "@/app/services/ProductService";
import { Category } from "@/interface/categoryInterface";
import { Product, ProductDetail } from "@/interface/productInterface";
import styles from "@/lib/productCSS.module.css";

import {
  Badge,
  Button,
  Card,
  Divider,
  Image,
  List,
  Pagination,
  Select,
  Space,
  Typography,
  theme,
} from "antd";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { useEffect, useState } from "react";
interface IProps {
  params: { id: number };
  categoryId: any;
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

const AppShowItem = (props: IProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [productData, setProductData] = useState<Product[] | undefined>();
  const { onAddProductToCart } = useCart();
  const { data } = useAuth();
  //@ts-ignore
  const userId = data?.id;
  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    currentPage: 0,
    pageSize: 10, 
    totalElements: 0,
  });
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
  const { id } = props.params;
  useEffect(() => {
    fetchData();
  }, [id, props.categoryId]);
  const fetchData = async (page: number = 0) => {
    try {
      if (props.categoryId > 0) {
        const response = await findProductByCategory(
          props.categoryId,
          page,
          pageInfo.pageSize
        );
        // const response = await findProductByCategory(props.categoryId);
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
      } else {
        const response = await findProductByCategory(
          id,
          page,
          pageInfo.pageSize
        );
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
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  return (
    <>
      <Content style={{ padding: "0 50px" }}>
        <div
          style={{ padding: 24, minHeight: 380, background: colorBgContainer }}
        >
          {/* <Card> */}

          <Space style={{ width: "100%", justifyContent: "space-between" }}>
            <Title level={2} style={{ justifyContent: "start" }}>
              Danh mục:{" "}
              {
                //@ts-ignore
                productData?.content[0]?.category?.name
                  ? //@ts-ignore
                    productData?.content[0]?.category?.name
                  : "Chưa có dữ liệu"
              }
            </Title>
            {/* <Typography ></Typography>
            <Space>
              <Typography>Sắp xếp theo: </Typography>
              <Select
                defaultValue="default"
                style={{ width: 120 }}
                options={[
                  { value: "GiaCaoDenThap", label: "Giá cao đến thấp" },
                  { value: "GiaThapDenCao", label: "Giá thấp đến cao" },
                  { value: "default", label: "Mặc định" },
                ]}
              />
            </Space> */}
            <Pagination
              current={pageInfo.currentPage + 1}
              total={pageInfo.totalElements}
              pageSize={pageInfo.pageSize}
              onChange={(page) => fetchData(page - 1)}
            />
          </Space>

          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 5 }} // Adjust the grid settings
            // grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }} // Adjust the grid settings
            // style={{ padding: "30px", paddingLeft: "200px", paddingRight: "200px" }}
            //@ts-ignore
            dataSource={productData?.content}
            renderItem={(item: Product) => {
              return (
                <List.Item>
                  <Card
                    className={styles.productCard}
                    style={{ width: 300 }}
                    // style={{ width: 250 }}
                    actions={
                      [
                        // <SettingOutlined key="setting" />,
                        // <EditOutlined key="edit" />,
                        // <EllipsisOutlined key="ellipsis" />,
                      ]
                    }
                    cover={
                      <Link href={`/product/${item.id}`}>
                        <Image
                          className={styles.productImage}
                          src={item.image_id[0].path}
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
                          {/* <Text>Áo Polo Basic Nữ Phối Màu</Text> */}
                        </Typography.Paragraph>
                      }
                    ></Card.Meta>
                  </Card>
                </List.Item>
              );
            }}
          />
        </div>
        {/* </Card> */}
      </Content>
    </>
  );
};
export default AppShowItem;
