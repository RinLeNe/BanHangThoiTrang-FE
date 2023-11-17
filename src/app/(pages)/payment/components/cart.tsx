import { Product } from "@/interface/productInterface";
import { DeleteOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Card, Col, Flex, Image, Row, Space, Steps } from "antd";
import Meta from "antd/es/card/Meta";
import Table, { ColumnsType } from "antd/es/table";

const AppCart = () => {
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

    {
      title: "Xóa",
      key: "action",
      //   render: () => (
      //     <Space size="middle">
      //       <a href="">
      //         <DeleteOutlined /> Delete
      //       </a>
      //     </Space>
      //   ),
    },
  ];
  return (
    <>
      <Row justify={"space-between"}>
        <Col span={14}>
          <Flex vertical>
            <div style={{ paddingLeft: "130px" }}>
              <Card>
                <Table
                  pagination={{ defaultPageSize: 5 }}
                  columns={columns}
                  // dataSource=()
                />
              </Card>
            </div>
          </Flex>
        </Col>
        <Col span={9} style={{ paddingRight: "130px", background: "" }}>
          <Card>
            <Space>Tổng tiền: </Space>
            <Space style={{ float: "right", color: "red" }}>0 VNĐ</Space>
            <hr />
            <Button danger block type="primary" style={{marginTop:"20px", height:"45px"}}>Thanh toán</Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default AppCart;
