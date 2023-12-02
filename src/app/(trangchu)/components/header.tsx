"use client";
import { CartProvider, useCart } from "@/app/context/cartContext";
import { useAuth } from "@/app/context/use-auth";
import { CartDetail } from "@/interface/CartInterface";
import {
  CustomerServiceOutlined,
  DownOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  RestOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Card,
  Drawer,
  Dropdown,
  Flex,
  Image,
  InputNumber,
  Layout,
  Menu,
  MenuProps,
  Select,
  Space,
  Typography,
} from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";
const imgStyle: React.CSSProperties = {
  // display: "block",
  width: 100,
};
const cardStyle: React.CSSProperties = {
  // width: 620,
};
const formatCurrency = (value: number | undefined) => {
  if (typeof value !== "number") {
    return "N/A";
  }
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
const Header: React.FC = () => {
  const { Header } = Layout;
  const { Text } = Typography;
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState<number>(0);

  const logOut = () => {
    deleteCookie("access_token");
    window.location.reload();
  };
  const { data } = useAuth();
  const { cartItems, onDelete, onUpdate } = useCart();
  //@ts-ignore
  const username = data?.username;
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href="/profile">Thông tin tài khoản</Link>,
    },

    {
      type: "divider",
    },
    {
      key: "2",
      danger: true,
      label: <a onClick={() => logOut()}>Đăng xuất</a>,
    },
  ];

  const handleDeleteCartItem = async (cartId: any) => {
    onDelete(cartId);
  };
  const handleUpdateCartItem = async (cartId: any, cartDetail: CartDetail) => {
    const serializableQuantity = {
      user: {
        id: cartDetail?.user?.id,
      },
      product: {
        id: cartDetail?.product?.id,
      },
      quantity: cartDetail,
    };
    const jsonString = serializableQuantity;
    //@ts-ignore
    onUpdate(cartId, jsonString);
  }
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const sum =
      cartItems.reduce((acc, record) => {
        const { quantity, product } = record;
        //@ts-ignore
        const { price } = product || {};
        if (quantity && price) {
          return acc + quantity * price;
        }
        return acc;
      }, 0) || 0;
    setTotal(sum);
  }, [cartItems]);
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
          <a href="/" style={{ marginLeft: "100px" }} className="demo-logo">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/leafy-emblem-385311.appspot.com/o/image%2Fz4887310980151_126df4487d1c53f86443df41f614eac2.jpg?alt=media&token=074f570b-32f9-4722-8447-4867df76814f"
              preview={false}
              width={58}
            ></Image>
          </a>

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
          <div style={{ marginRight: "100px" }}>
            <Badge count={cartItems.length}>
              {" "}
              <ShoppingCartOutlined
                style={{ fontSize: 24 }}
                onClick={showDrawer}
              />
            </Badge>
            <Drawer
              width={450}
              title={`Giỏ hàng (${cartItems?.length} sản phẩm)`}
              placement="right"
              onClose={onClose}
              open={open}
              footer={
                <>
                  <Flex align="flex-end" justify="space-between" style={{paddingBottom:"10px"}}>
                    <Text style={{fontSize:"18px"}}>Tạm tính: </Text>
                    <Text style={{ color: "#ff2c00", fontSize:"18px" }}>
                      {formatCurrency(total)}
                    </Text>
                  </Flex>
                  <Button block type="primary" danger size="large" href="/payment">Mua hàng</Button>
                </>
              }
            >
              {cartItems?.map((item) => {
                const quantity = item.quantity;
                const cartId = item.id;
                //@ts-ignore
                const product_image_url = item.product.image_id[0].path;
                //@ts-ignore
                const product_title = item.product.title;
                //@ts-ignore
                const product_price = item.product.price;
                return (
                  <Card
                    // hoverable
                    style={cardStyle}
                    bodyStyle={{ padding: 0, overflow: "hidden" }}
                    key={cartId}
                  >
                    <Flex>
                      <img
                        alt="avatar"
                        src={product_image_url}
                        style={imgStyle}
                      />
                      <Flex
                        vertical
                        // align="flex  -end"
                        flex={1}
                        justify="space-between"
                        style={{ padding: 10 }}
                      >
                        <Typography.Paragraph
                        style={{width:"280px"}}
                          ellipsis={{
                            rows: 1,
                            expandable: true,
                            symbol: "more",
                          }}
                        >
                          {product_title}
                        </Typography.Paragraph>
                        <Select
                          defaultValue="S"
                          style={{ width: 50, marginRight: "10px" }}
                          size="small"
                          // onChange={handleChange}
                          options={[
                            { value: "S", label: "S" },
                            { value: "L", label: "L" },
                            { value: "M", label: "M" },
                          ]}
                        />
                        <InputNumber
                          size="small"
                          min={1}
                          max={10}
                          defaultValue={quantity}
                          value={quantity}
                          style={{ width: 50 }}
                          onChange={(newValue) => handleUpdateCartItem(cartId, newValue)}
                        />
                        <Flex align="flex-end" justify="space-between">
                          <Text style={{ color: "#ff2c00" }}>
                            {formatCurrency(product_price)}
                          </Text>
                          <RestOutlined
                            onClick={() => {
                              handleDeleteCartItem(cartId);
                            }}
                            style={{ fontSize: "24px", color: "#ff2c00" }}
                          />
                        </Flex>
                      </Flex>
                    </Flex>
                  </Card>
                );
              })}
            </Drawer>
            {username ? (
              <>
                <Dropdown menu={{ items }} trigger={["click"]}>
                  <a
                    style={{ marginLeft: "10px", paddingBottom: "25px" }}
                    onClick={(e) => e.preventDefault()}
                  >
                    <Space>
                      {username}
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </>
            ) : (
              <>
                <Link href="/signin"> ĐĂNG NHẬP</Link> /{" "}
                <Link href="/signup">ĐĂNG KÝ</Link>
              </>
            )}
          </div>
        </div>
      </Header>
    </>
  );
};
export default Header;
