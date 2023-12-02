"use client";
import { findProductById } from "@/app/services/ProductService";
import {
  DataTypeCategory,
  DateTypeProductImage,
  Product,
  ProductDetail,
} from "@/interface/productInterface";
import {
  Button,
  Col,
  Image,
  InputNumber,
  Layout,
  Row,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import Header from "../../../components/header";
import { user } from "@/interface/AuthInterface";
import { CartDetail } from "@/interface/CartInterface";
import { CartProvider, useCart } from "@/app/context/cartContext";
import { useAuth } from "@/app/context/use-auth";
const { Text } = Typography;
interface IProps {
  // user: user | undefined;
  // onSubmit: (cartDetail: CartDetail) => void;
  params: { id: string };
}

const ProductDetailPage = (props: IProps) => {
  const [productData, setProductData] = useState<Product | undefined>();
  const [mainImage, setMainImage] = useState(productData?.image_id[0]);
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
      };
      // console.log(cartDetail.quantity)
      // if (cartDetail?.quantity > 10) {
      //   message.error("Vật phẩm đã được thêm quá số lượng cho phép!")
      // }
      onAddProductToCart(cartDetail);
    } catch (error) {
      console.error("Error adding to RoomOrder:", error);
    }
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
                <Text style={{ color: "#ff2c00", fontSize: "26px" }}>
                  {formatCurrency(productData.price)}
                </Text>
                <Row style={{ paddingBottom: "10px" }}>
                  <Select
                    defaultValue="S"
                    style={{ width: 120, marginRight: "10px" }}
                    size="large"
                    // onChange={handleChange}
                    options={[
                      { value: "S", label: "S" },
                      { value: "L", label: "L" },
                      { value: "M", label: "M" },
                    ]}
                  />
                  <InputNumber
                    name="quantity"
                    size="large"
                    min={1}
                    max={5}
                    defaultValue={1}
                    // onChange={onChange}
                  />
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
      </Layout>
    </>
  );
};
export default ProductDetailPage;
