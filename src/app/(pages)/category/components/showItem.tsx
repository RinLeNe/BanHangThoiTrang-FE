"use client";
import { findAllCategory } from "@/app/services/CategoryService";
import { Category } from "@/interface/categoryInterface";
import {
  Badge,
  Card,
  Divider,
  Image,
  List,
  Select,
  Space,
  Typography,
} from "antd";
import { useEffect, useState } from "react";

const AppShowItem: React.FC = () => {
  const [categoryData, setCategoryData] = useState<Category[] | undefined>();

  useEffect(() => {
    findCategory();
  }, []);
  const findCategory = async () => {
    const response = await findAllCategory();
    //@ts-ignore
    setCategoryData(response);
  };
  return (
    <>
      <Card>
      <Space
        wrap
        style={{
          justifyContent: "end", // Set the space between items
          alignItems: "center",
          paddingBottom: "30px",
          paddingRight:"30px",
          width: "100%", // Set the width to 100%
        }}
      >
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
      </Space>

        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }} // Adjust the grid settings
          // style={{ padding: "30px", paddingLeft: "200px", paddingRight: "200px" }}
          dataSource={categoryData}
          renderItem={(item) => {
            return (
              <List.Item>
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
                        Áo Polo Basic Nữ Phối Màu
                        {/* <Text>Áo Polo Basic Nữ Phối Màu</Text> */}
                      </Typography.Paragraph>
                    }
                  ></Card.Meta>
                </Card>
              </List.Item>
            );
          }}
        />
      </Card>
    </>
  );
};
export default AppShowItem;
