"use client";
import Header from "@/app/(trangchu)/components/header";
import { CartProvider } from "@/app/context/cartContext";
import { signUp } from "@/app/services/AuthService";
import { Gender } from "@/interface/GenderEnum";
import {
  EnvironmentOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Image,
  Input,
  Layout,
  Radio,
  message,
} from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface SignupDetail {
  username: string;
  fullname: string;
  email: string;
  phonenumber: number;
  address: string;
  birthDate: Date;
  gender: Gender;
  password: string;
  confirmPassword: string;
}
dayjs.extend(customParseFormat);
const signup: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm<SignupDetail>();
  const handleSubmit = async (data: SignupDetail) => {
    try {
      const response = await signUp(data);
      if (response.status) {
        //@ts-ignore
        message.success(response.message);
        router.push("/signin");
      } else {
        //@ts-ignore
        message.error(response.message);
        message.error("Đăng kí thất bại!");
      }
    } catch (error) {
      //@ts-ignore
      message.error(error.response.data.message);
      message.error("Đăng kí thất bại!");
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
        <Card style={{ width: "450px", textAlign: "center" }} title="Đăng ký">
          <p style={{ marginTop: "-15px", marginBottom: "30px" }}>
            Bạn đã có tài khoản? <Link href="/signin">Đăng nhập</Link>
          </p>
          <div style={{ textAlign: "left" }}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
            >
              <Form.Item
                label="Họ và tên"
                name="fullname"
                rules={[
                  { required: true, message: "Vui lòng nhập họ và tên!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Họ và tên" />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                ]}
              >
                <Input
                  size="large"
                  prefix={<PhoneOutlined className="site-form-item-icon" />}
                  placeholder="PhoneNumber"
                />
              </Form.Item>
              <Form.Item
                label="Tên đăng nhập"
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                  { min: 6, max: 20, message: "Tên đăng nhập từ 6-20 kí tự!" },
                ]}
              >
                <Input placeholder="Tên đăng nhập" />
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" },
                  { min: 8, max: 20, message: "Mật khẩu từ 8-20 kí tự!" },
                ]}
              >
                <Input.Password placeholder="Mật khẩu" />
              </Form.Item>

              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập xác nhân mật khẩu!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Xác nhận mật khẩu không trùng với mật khẩu!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Xác nhận mật khẩu" />
              </Form.Item>
              <Form.Item
                label="E-mail"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập Email!" },
                  { type: "email", message: "Email không đúng định dạng!" },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="E-mail" />
              </Form.Item>
              <Form.Item
                label="Ngày sinh"
                name="birthDate"
                rules={[
                  { required: true, message: "Vui lòng nhập ngày sinh!" },
                ]}
              >
                <DatePicker format={"DD/MM/YYYY"} />
              </Form.Item>

              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[
                  { required: true, message: "Vui lòng chọn giới tính!" },
                ]}
              >
                <Radio.Group>
                  <Radio value={Gender.MALE}>Nam</Radio>
                  <Radio value={Gender.FEMALE}>Nữ</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
              >
                <Input
                  size="large"
                  prefix={
                    <EnvironmentOutlined className="site-form-item-icon" />
                  }
                  placeholder="Address"
                />
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
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
    </Layout>
  );
};
export default signup;
