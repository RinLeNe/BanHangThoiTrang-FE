"use client";
import React from "react";
import {
  Badge,
  Card,
  Carousel,
  Image,
  Layout,
  List,
  Menu,
  Typography,
  theme,
} from "antd";
const { Text } = Typography;
import Search, { SearchProps } from "antd/es/input/Search";
import {
  CustomerServiceOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Header, Content, Footer } = Layout;
const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);
const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const categoryData = [
    {
      title: "Category",
    },
    {
      title: "Category",
    },
    {
      title: "Category",
    },
    {
      title: "Category",
    },
    {
      title: "Category",
    },
    {
      title: "Category",
    },
    {
        title: "Category",
      },
      {
        title: "Category",
      },
      {
        title: "Category",
      },
      {
        title: "Category",
      },
      {
        title: "Category",
      },
      {
        title: "Category",
      },
  ];
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          backgroundColor: "#fff",
          top: 0,
          zIndex: 1,
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0",
        }}
      >
        {" "}
        <div
          style={{
            // display: "flex",
            // justifyContent: "center",
            width: "100%",
          }}
        >
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{
              margin: "auto",
              justifyContent: "center",
              width: "100%",
              backgroundImage:
                "linear-gradient(rgb(255, 240, 218), rgb(255, 255, 255))",
            }}
            items={[
              {
                label: "Địa chỉ cửa hàng",
                key: "1",
                icon: <EnvironmentOutlined />,
              },
              {
                label: "Số điện thoại",
                key: "2",
                icon: <PhoneOutlined />,
              },
              {
                label: "Trung tâm trợ giúp",
                key: "3",
                icon: <CustomerServiceOutlined />,
              },
            ]}
          />
        </div>
        <div
          style={{
            display: "flex",
            backgroundColor: "#fff",
            width: "100%",
            paddingLeft: "50px",
            paddingRight: "50px",
          }}
        >
          <div className="demo-logo"></div>

          <Menu
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                label: "NAM",
              },
              {
                key: "2",
                label: "NỮ",
              },
              {
                key: "3",
                label: "SALE",
              },
              {
                key: "4",
                label: "BỘ SƯU TẬP",
              },
              {
                key: "5",
                label: "TIN TỨC",
              },
            ]}
          />

          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            style={{
              width: 304,
              margin: "auto",
              //   marginLeft: "0",
              //   marginRight: "0",
            }}
          />
          <div>
            <a style={{}} href="">
              <Badge dot>
                {" "}
                <ShoppingCartOutlined style={{ fontSize: 24 }} />
              </Badge>
              <Link href=""> ĐĂNG NHẬP</Link> / <Link href="">ĐĂNG KÝ</Link>
            </a>
          </div>
        </div>
      </Header>
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
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl:6, xxl:6 }} // Adjust the grid settings
        style={{ padding: "30px", paddingLeft:"200px", paddingRight:"200px" }}
        dataSource={categoryData}
        renderItem={(item) => {
          return (
            <List.Item>
              <Card
                size="small"
                hoverable
                cover
                style={{
                  // width: "100px",
                  textAlign: "center",
                  minHeight: "90px",
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
                  {item.title}
                </Text>
              </Card>
            </List.Item>
          );
        }}
      />
      <Content className="site-layout" style={{ padding: "0 50px" }}>
        <div
          style={{ padding: 24, minHeight: 380, background: colorBgContainer }}
        >
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
