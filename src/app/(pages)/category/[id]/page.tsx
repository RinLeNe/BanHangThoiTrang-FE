"use client";
import { Col, Layout, Row, theme } from "antd";
// import AppCategory from "./components/categories";
import AppShowItem from "./components/showItem";
import Header from "@/app/(trangchu)/components/header";
import { CartProvider } from "@/app/context/cartContext";
import AppCategory from "./components/categories";
import { useState } from "react";

const CategoryController = ({
  params,
}: {
  params: { id: number };
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const handleSelectCategory = (categoryId: number) => {
    // setSelectedCategoryId(categoryId);
    setSelectedCategoryId(categoryId);
    // params = ({ id: categoryId });
  };  
  
  return (
    <>
      <CartProvider>
        <Layout >
          <Header />
          <AppCategory onSelectCategory={handleSelectCategory} />
          <AppShowItem params={params} categoryId={selectedCategoryId}/>
          {/* <Row justify={"space-between"} style={{ paddingTop: "50px" }}>
            <Col span={5} style={{ paddingLeft: "130px" }}>
              <AppCategory />
            </Col>
            <Col span={19} style={{ paddingRight: "130px" }}>
              <AppShowItem params={params} />
            </Col>
          </Row> */}
        </Layout>
      </CartProvider>
    </>
  );
};
export default CategoryController;
