"use client";
import Header from "@/app/(trangchu)/components/header";
import { useAuth } from "@/app/context/use-auth";
import { profile } from "@/interface/AuthInterface";
import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  Menu,
  Radio,
  Row,
  Space,
  TimePicker,
} from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { Gender } from "@/interface/GenderEnum";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CartProvider } from "@/app/context/cartContext";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { isBrowser } from "@/utils/is-browser";
import OrderManager from "./components/OrderManager";
const initialValues: profile = {
  fullname: "",
  email: "",
  phoneNumber: 0,
  address: "",
  gender: Gender.MALE, // Provide default gender or fetch it from data
  birthDate: new Date(),
};
dayjs.extend(customParseFormat);
const dateFormatList = ["DD/MM/YYYY"];
const Profile: React.FC = () => {
  const [tabType, setTabType] = useState("1");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { data } = useAuth();
  //@ts-ignore
  const fullname = data?.fullname;
  useEffect(() => {
    if (data) {
      //@ts-ignore
      form.setFieldsValue(data);
    }
  }, [form, data]);
  const handleTabChange = (key: string) => {
    setTabType(key);
  };
  return (
    <>
      <Layout>
        <CartProvider>
          <Header />
        </CartProvider>
        <Row justify={"space-between"} style={{ paddingTop: "50px"}}>
          <Col span={6} style={{ paddingLeft: "200px", textAlign:"center", paddingBottom:"30%" }}>
            {fullname}
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              onClick={(e) => handleTabChange(e.key)}

              // onClick={(e) => {
              //   setTabType(e.key);
              //   // navigate(`/${e.key}`);
              //   navigate(e.key);
              // }}
              items={[
                {
                  key: "1",
                  // icon: <TableOutlined />,
                  label: "Thông tin cá nhân",
                },
                {
                  key: "2",
                  // icon: <BorderlessTableOutlined />,
                  label: "Quản lý đơn hàng",
                }
              ]}
            />
          </Col>
          <Col span={15} style={{ marginRight: " 150px" }}>
          {+tabType === 1 && <Card title="Thông Tin Tài Khoản">
              <Form form={form} layout="vertical" initialValues={initialValues}>
                <Form.Item
                  name="fullname"
                  label="Nhập họ và tên"
                  //   initialValue={fullname}
                  rules={[
                    {
                      required: true,
                      message: "Họ và tên không được để trống!",
                    },
                  ]}
                >
                  <Input
                    name="fullname"
                    type="text"
                    size="large"
                    placeholder="Nhập họ và tên"
                  />
                </Form.Item>
                <Row>
                  <Col span={12} style={{ marginRight: "auto" }}>
                    <Form.Item name="phoneNumber" label="Số điện thoại">
                      <Input size="large" name="phoneNumber" disabled />
                    </Form.Item>
                    <Form.Item
                      label="Giới tính"
                      name="gender"
                      rules={[
                        { required: true, message: "Vui lòng chọn giới tính!" },
                      ]}
                    >
                      <Radio.Group size="large">
                        <Radio value={Gender.MALE}>Nam</Radio>
                        <Radio value={Gender.FEMALE}>Nữ</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item name="email" label="Email">
                      <Input size="large" name="email" disabled />
                    </Form.Item>
                    {/* <Form.Item
                      label="Ngày sinh"
                      name="birthDate"
                      rules={[
                        { required: true, message: "Vui lòng nhập ngày sinh!" },
                      ]}
                    >
                      <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} size="large" disabled/>
                    </Form.Item> */}
                  </Col>
                </Row>
              </Form>
            </Card>}
          {+tabType === 2 && <OrderManager />}
            
          </Col>
        </Row>
      </Layout>
    </>
  );
};
export default function RootLayout() {
  const [initialRenderComplete, setInitialRenderComplete] =
    React.useState(false);
  React.useEffect(() => {
    setInitialRenderComplete(true);
  }, []);
  if (!initialRenderComplete) {
    return null;
  } else {
    if (isBrowser) {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Suspense>
      );
    }

    return null;
  }
}
