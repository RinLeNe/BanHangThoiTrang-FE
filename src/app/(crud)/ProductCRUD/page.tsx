"use client";
import { Product, ProductDetail } from "@/interface/productInterface";
import ListProduct from "./components/ListProduct";
import { useEffect, useState } from "react";
import {
  addProduct,
  deleteProduct,
  findAllProduct,
  updateProduct,
} from "@/app/services/ProductService";
import { Card, Col, Flex, Pagination, Row, message } from "antd";
import TableCRUD from "./components/TableCRUD";

const AppProductCTRL: React.FC = () => {
  const [editProduct, setEditProduct] = useState<Product>();
  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    currentPage: 0,
    pageSize: 5, // adjust based on your API response
    totalElements: 0,
  });
  const [data, setData] = useState<Product[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (page: number = 0) => {
    const response = await findAllProduct(page, pageInfo.pageSize);
    //@ts-ignore
    setData(response);
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
  };
  const onCurrentProduct = (product: Product) => {
    setEditProduct(product);
  };
  const onDelete = async (productId: number) => {
    const res = await deleteProduct(productId);
    if (res) {
      message.success("Xóa thành công!");
      fetchData();
    }
  };
  const onSubmmit = async (
    product: ProductDetail,
    resetFormData: () => void
  ) => {
    const res = await addProduct(product);
    if (res) {
      message.success("Thêm sản phẩm thành công!");
      resetFormData();
      fetchData();
    }
  };

  const onUpdate = async (productId: number, product: ProductDetail) => {
    const res = await updateProduct(productId, product);
    if (res) {
      message.success("Cập nhật sản phẩm thành công!");
      fetchData();
    }
  };
  return (
    <>
      <Row justify={"space-between"}>
        <Col span={10}>
          <Flex vertical>
            <TableCRUD
              product={editProduct}
              onSubmit={onSubmmit}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
            {/* <Flex vertical style={footer}>
            <Footer />
          </Flex> */}
          </Flex>
        </Col>
        <Col span={13} style={{ padding: 0, background: "" }}>
          <Card>
            <ListProduct
              onEdit={onCurrentProduct}
              data={data}
              onDelete={onDelete}
            />
            <Pagination
              style={{ textAlign:"center", paddingTop:"20px" }}
              current={pageInfo.currentPage + 1}
              total={pageInfo.totalElements}
              pageSize={pageInfo.pageSize}
              onChange={(page) => fetchData(page - 1)}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default AppProductCTRL;
