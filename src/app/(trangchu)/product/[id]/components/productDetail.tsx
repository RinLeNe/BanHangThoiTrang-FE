"use client";
import { findAllProduct, findProductById } from "@/app/services/ProductService";
import { DateTypeProductImage, Product } from "@/interface/productInterface";
import {
  Button,
  Card,
  Col,
  Flex,
  Image,
  InputNumber,
  Layout,
  List,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import styles from "@/lib/productCSS.module.css";
import { useEffect, useState } from "react";
import Header from "../../../components/header";
import { CartDetail } from "@/interface/CartInterface";
import { useCart } from "@/app/context/cartContext";
import { useAuth } from "@/app/context/use-auth";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
const { Text } = Typography;
interface IProps {
  // user: user | undefined;
  // onSubmit: (cartDetail: CartDetail) => void;
  params: { id: string };
}

const ProductDetailPage = (props: IProps) => {
  const [productData, setProductData] = useState<Product | undefined>();
  const [allProduct, setAllProduct] = useState<Product[]>([]);
  const [mainImage, setMainImage] = useState(productData?.image_id[0]);
  const [selectedSize, setSelectedSize] = useState<string>("S"); // State to hold the selected size
  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    currentPage: 0,
    pageSize: 10, // adjust based on your API response
    totalElements: 0,
  });
  const { onAddProductToCart } = useCart();

  const { data } = useAuth();
  //@ts-ignore
  const userId = data?.id;
  const formatCurrency = (value: number | undefined) => {
    if (typeof value !== "number") {
      return "N/A";
    }
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  const { id } = props.params;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findProductById(id);
        //@ts-ignore
        setProductData(response);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchData();
  }, [id]);
  useEffect(() => {
    findProduct();
  }, []);
  const findProduct = async (page: number = 0) => {
    try {
      const response = await findAllProduct(page, pageInfo.pageSize);
      //@ts-ignore
      setAllProduct(response);
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
      const quantity = document.querySelector('input[name="quantity"]').value as number;
      //@ts-ignore
      const cartDetail: CartDetail = {
        user: { id: userId },
        product: { id: item.id },
        // orderTime: getCurrentTime(),
        quantity: quantity,
        size: selectedSize,
      };

      onAddProductToCart(cartDetail);
    } catch (error) {
      console.error("Error adding to RoomOrder:", error);
    }
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <Layout style={{ backgroundColor: "#fff" }}>
        <Header />
        <Row justify={"space-between"} style={{ paddingTop: "50px" }}>
          <Col span={6} style={{ paddingLeft: "300px" }}>
            <Space direction="vertical">
              {productData?.image_id.map((image: DateTypeProductImage) => (
                <Image
                  key={image.id}
                  src={image.path}
                  width={100}
                  onClick={() => {
                    setMainImage(image);
                  }}
                  preview={false}
                  style={{ cursor: "pointer" }}
                  alt="product"
                />
              ))}
            </Space>
          </Col>
          <Col span={8} style={{ paddingLeft: "20px" }}>
            {" "}
            <Image
              width="90%"
              src={mainImage ? mainImage?.path : productData?.image_id[0].path}
            ></Image>
          </Col>
          <Col span={10}>
            {productData && (
              <Space direction="vertical">
                <h2>{productData.title}</h2>

                <Flex
                  align="center"
                  justify="space-between"
                  style={{ paddingBottom: "10px" }}
                >
                  <Text style={{ color: "#ff2c00", fontSize: "24px" }}>
                    {formatCurrency(productData.price)}
                  </Text>
                  <Text
                    style={{
                      color: "#707070",
                      fontWeight: "300",
                      fontSize: "16px",
                      alignItems: "center",
                    }}
                  >
                    Còn lại: {productData.quantity} | Đã bán:{" "}
                    {productData.quantitySold}
                  </Text>
                </Flex>
                <Row style={{ paddingBottom: "10px" }}>
                  <Flex align="center" style={{ paddingBottom: "10px" }}>
                    <Typography style={{ marginRight: "10px" }}>
                      Size
                    </Typography>
                    <Select
                      defaultValue="S"
                      style={{ width: 120, marginRight: "30px" }}
                      size="large"
                      onChange={(value) => setSelectedSize(value)}
                      options={[
                        { value: "S", label: "S" },
                        { value: "L", label: "L" },
                        { value: "M", label: "M" },
                      ]}
                    />
                  </Flex>
                  <Flex align="center" style={{ paddingBottom: "10px" }}>
                    <Typography style={{ marginRight: "10px" }}>
                      Số lượng
                    </Typography>

                    <InputNumber
                      name="quantity"
                      size="large"
                      min={1}
                      // max={5}
                      defaultValue={1}
                      // onChange={onChange}
                    />
                  </Flex>
                </Row>
                <Button
                  block
                  type="primary"
                  danger
                  size="large"
                  onClick={() => {
                    handleAddToCart(userId, productData);
                  }}
                >
                  Thêm vào giỏ hàng
                </Button>
                <Button block type="dashed" size="large">
                  Mua ngay
                </Button>
              </Space>
            )}
          </Col>
        </Row>
        <div
          style={{
            paddingLeft: "160px",
            paddingRight: "150px",
            paddingTop: "50px",
          }}
        >
          <Typography>
            {" "}
            <h3>Có thể bạn thích</h3>
          </Typography>
          <Carousel
            responsive={responsive}
            itemClass="carousel-item-padding-40-px"
          >
            {
              //@ts-ignore
              allProduct?.content?.length > 0 ? (
                //@ts-ignore
                allProduct.content.map((item: Product) => (
                  <div key={item.id} className="carousel-item">
                    <Card
                      className={styles.productCard}
                      style={{ width: 260 }}
                      actions={[]}
                      cover={
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
                  </div>
                ))
              ) : (
                <p>No products available</p>
              )
            }
          </Carousel>
        </div>
      </Layout>
    </>
  );
};
export default ProductDetailPage;
