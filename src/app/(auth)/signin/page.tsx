"use client";
import Header from "@/app/(trangchu)/components/header";
import { CartProvider } from "@/app/context/cartContext";
import { signIn } from "@/app/services/AuthService";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Image, Input, Layout, message } from "antd";
import Link from "next/link";
interface SigninDetail{
    username: string;
    password: string;
  }
const signin: React.FC = () => {
    const [form] = Form.useForm<SigninDetail>();

    const success = () => {
        message.success("Đăng nhập thành công!");
      };
    
      const handleSubmit = async (data: SigninDetail) => {
        try {
          const jwtTokenData = await signIn(data);
          console.log(JSON.parse(JSON.stringify(jwtTokenData)));
          const error = () => {
            //@ts-ignore
            message.error(jwtTokenData.message);
          };
          if (JSON.parse(JSON.stringify(jwtTokenData.status)) === true) {
            window.location.reload();
          }
          console.log(jwtTokenData.status);
          if (jwtTokenData.status) {
            success();
          } else {
            error();
          }
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <Layout>
    <CartProvider>
      <Header />
      </CartProvider>
      <Image
        //, maxHeight:"500px"
        style={{ position: "absolute" }}
        preview={false}
        width="100%"
        src="https://firebasestorage.googleapis.com/v0/b/leafy-emblem-385311.appspot.com/o/image%2FbannerLogin.png?alt=media&token=29a20c3b-ae10-409b-8bec-c7ded384094c"
      />
      <div style={{ paddingLeft: "150px", paddingTop: "30px" }}>
        <Card style={{ width: "450px", textAlign: "center" }} title="Đăng nhập">
          <p style={{ marginTop: "-15px", marginBottom: "30px" }}>
            Bạn chưa có tài khoản? <Link href="/signup">Đăng ký ngay!</Link>
          </p>
          <div style={{ textAlign: "left" }}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
              form={form}
              layout="vertical"
            >
              <Form.Item
                label="Tên đăng nhập"
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item style={{ textAlign: "end", marginTop: "-20px" }}>
                <a className="login-form-forgot" href="">
                  Quên mật khẩu
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  block
                  danger
                  size="large"
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
      </Layout>
  );
};
export default signin;
