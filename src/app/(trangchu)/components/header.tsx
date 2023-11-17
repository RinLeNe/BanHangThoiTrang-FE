'use client'
import {
  CustomerServiceOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Button, Drawer, Image, Layout, Menu } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import Link from "next/link";
import { useState } from "react";
const Header: React.FC = () => {
  const { Header } = Layout;
  const [open, setOpen] = useState(false);
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
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
          <a href="/" className="demo-logo"><Image src="https://firebasestorage.googleapis.com/v0/b/leafy-emblem-385311.appspot.com/o/image%2Fz4887310980151_126df4487d1c53f86443df41f614eac2.jpg?alt=media&token=074f570b-32f9-4722-8447-4867df76814f" preview={false} width={58}></Image></a>

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
            <Badge dot>
              {" "}
              <ShoppingCartOutlined
                style={{ fontSize: 24 }}
                onClick={showDrawer}
              />
            </Badge>
            <Drawer
              title="Giỏ hàng ( 0 Sản phẩm )"
              placement="right"
              onClose={onClose}
              open={open}
              footer={
                <Button
                  type="primary"
                  block
                  danger
                  style={{ height: 50 }}
                  href="/payment"
                >
                  Mua hàng
                </Button>
              }
            >
              {/* <List renderItem={(item) => {
                    return
                }}>
                    
                    </List>               */}
            </Drawer>
            <Link href=""> ĐĂNG NHẬP</Link> / <Link href="">ĐĂNG KÝ</Link>
          </div>
        </div>
      </Header>
    </>
  );
};
export default Header;
