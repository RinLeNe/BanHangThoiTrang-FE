"use client";
import React, { Suspense, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  TableOutlined,
  VideoCameraOutlined,
  BorderlessTableOutlined,
  ShopOutlined,
  WalletOutlined,
  UngroupOutlined,
  TeamOutlined,
  AccountBookOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate, BrowserRouter } from "react-router-dom";
import { isBrowser } from "@/utils/is-browser";
import Link from "next/link";
import AppProductCTRL from "../(crud)/ProductCRUD/page";
import AppOrderCTRL from "../(crud)/OrderCRUD/page";
import Dashboard from "@/app/dashboard/components/report";
import AppUserCTRL from "../(crud)/UserCRUD/page";
const { Header, Sider, Content } = Layout;
const App: React.FC = () => {
  // const [editing, setEdit] = useState(false);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, colorBgContainerDisabled },
  } = theme.useToken();
  const [tabType, setTabType] = useState("0");
  // const params = useParams();
  // const location = useLocation();
  const navigate = useNavigate();
  const handleTabChange = (key: string) => {
    setTabType(key);
  };
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          left: 0,
          top: 0,
          bottom: 0,
          background: colorBgContainer,
        }}
      >
        <div className="logo" style={{ padding: 10, textAlign: "center" }}>
          <h1>DASHBOARD</h1>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={(e) => handleTabChange(e.key)}
          items={[
            {
              key: "0",
              label: "Dashboard",
            },
            {
              key: "1",
              icon: <ShopOutlined />,
              label: "Quản lý sản phẩm",
            },

            {
              key: "2",
              icon: <UngroupOutlined />,
              label: "Quản lý danh mục",
            },
            {
              key: "3",
              icon: <AccountBookOutlined />,
              label: "Quản lý hóa đơn",
            },
            {
              key: "4",
              icon: <UserOutlined />,
              label: "Quản lý tài khoản",
            },
          ]}
        />
      </Sider>
      <Layout style={{ background: colorBgContainerDisabled }}>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            background: colorBgContainer,
            padding: 0,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Link href="/">Trang chủ</Link>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            // background: colorBgContainerDisabled,
          }}
        >
          {+tabType === 0 && <Dashboard />}
          {+tabType === 1 && <AppProductCTRL />}
          {+tabType === 3 && <AppOrderCTRL />}
          {+tabType === 4 && <AppUserCTRL />}

          {/* <Button>
            <span>Button</span>
          </Button> */}
        </Content>
      </Layout>
    </Layout>
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
            <App />
          </BrowserRouter>
        </Suspense>
      );
    }

    return null;
  }
}
