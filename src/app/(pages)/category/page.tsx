import { Col, Layout, Row } from "antd";
import AppCategory from "./components/categories";
import AppShowItem from "./components/showItem";
import Header from "@/app/(trangchu)/components/header";

const CategoryController: React.FC = () => {
  return (
    <>
      <Layout style={{backgroundColor:"#fff"}}>
        <Header />
        <Row justify={"space-between"} style={{paddingTop:"50px"}}>
          <Col span={5} style={{ paddingLeft: "130px" }}>
            <AppCategory />
          </Col>
          <Col span={19} style={{ paddingRight: "130px" }}>
            <AppShowItem />
          </Col>
        </Row>
      </Layout>
    </>
  );
};
export default CategoryController;
