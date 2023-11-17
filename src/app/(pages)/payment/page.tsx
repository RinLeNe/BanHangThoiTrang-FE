"use client";
import { Breadcrumb, Button, Col, Flex, Row, Steps, message, theme } from "antd";
import AppCart from "./components/cart";
import { useState } from "react";
import AppCheckout from "./components/checkout";
const AppPayment: React.FC = () => {
  const steps = [
    {
      title: "Giỏ hàng",
      content: <AppCart />,
    },
    {
      title: "Thanh toán",
      content: <AppCheckout />,
    },
    {
      title: "Last",
      content: "Hoàn tất",
    },
  ];
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

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
        items={[
          {
            title: "Trang chủ",
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
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
export default AppPayment;
