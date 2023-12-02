"use client";
import {
  Breadcrumb,
  Button,
  Col,
  Flex,
  Row,
  Steps,
  message,
  theme,
} from "antd";
import AppCart from "./components/cart";
import { useEffect, useState } from "react";
import AppCheckout from "./components/checkout";
import { CartProvider, useCart } from "@/app/context/cartContext";
import { Product } from "@/interface/productInterface";
const AppPayment: React.FC = () => {
  // const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [cartProductTick, setCartProductTick] = useState<Product[]>([]);
  const onCartProductTick = (product: Product[]) => {
    setCartProductTick(product);
  };
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "Giỏ hàng",
      content: (
        <CartProvider>
          <AppCart
            stepCurrent={current}
            setCurrent={setCurrent}
            onSelectProduct={onCartProductTick}
          />
        </CartProvider>
      ),
    },
    {
      title: "Thanh toán",
      content: <AppCheckout listCartProductTick={cartProductTick}/>,
    },
    {
      title: "Hoàn tất",
      content: "Hoàn tất",
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  return (
    <>
      <div
        style={{
          height: "50px",
          paddingBottom: "30px",
          backgroundImage:
            "linear-gradient(rgb(255, 240, 218), rgb(255, 255, 255))",
        }}
      >
        <Steps current={current} items={items} />
      </div>

      <Breadcrumb
        style={{
          paddingLeft: "130px",
          fontSize: "16px",
          paddingBottom: "10px",
        }}
        items={[
          {
            title: <a href="/">Trang chủ</a>,
          },
          {
            title: "Giỏ hàng",
          },
        ]}
      />
      <div>{steps[current].content}</div>

      {/* <AppCart /> */}
      {/* <Row justify={"space-between"}>
        <Col span={14}>
          <Flex vertical>
            <AppCart />
          </Flex>
        </Col>
        <Col span={5} style={{ padding: 0, background: "" }}></Col>
      </Row> */}
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
export default AppPayment;
