"use client";
import { findAllCategory } from "@/app/services/CategoryService";
import { Category } from "@/interface/categoryInterface";
import { Card, List, Typography } from "antd";
import { DataNode } from "antd/es/tree";
import Tree from "antd/es/tree/Tree";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
const { Text } = Typography;
interface AppCategoryProps {
  onSelectCategory: (categoryId: any) => void;
}
const AppCategory: React.FC<AppCategoryProps> = ({ onSelectCategory }) => {
  // const router = useRouter();

  const [categoryData, setCategoryData] = useState<Category[] | undefined>();

  const findCategory = async () => {
    try {
      const response = await findAllCategory();
      //@ts-ignore
      setCategoryData(response);
    } catch (error) {
      console.log("Can't get");
    }
  };
  useEffect(() => {
    findCategory();
  }, []);
  return (
    <>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 6, xxl: 6 }} // Adjust the grid settings
        style={{ padding: "30px", paddingLeft: "200px", paddingRight: "200px" }}
        dataSource={categoryData}
        renderItem={(item) => {
          return (
            <List.Item>
              {/* <Link href={`/category/${item.id}`}> */}
              <Card
                size="small"
                hoverable
                cover
                style={{
                  // width: "100px",
                  textAlign: "center",
                  minHeight: "90px",
                }}
                onClick={() => {onSelectCategory(item.id)}}
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
              {/* </Link> */}
            </List.Item>
          );
        }}
      />
    </>
  );
};
export default AppCategory;
