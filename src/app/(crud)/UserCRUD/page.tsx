"use client";
import React, { useEffect, useState } from "react";
import { Col, Flex, Row, message } from "antd";
import UserController from "./components/ListUser";
import TableUser from "./components/TableCRUD";
import { user, profile, profileCRUD } from "@/interface/AuthInterface";
import {
  addUser,
  // addUser,
  deleteUser,
  findAllUser,
  updateUser,
} from "@/app/services/userService";

const AppUserCTRL: React.FC = () => {
  const [editUser, setEditUser] = useState<user>();
  const [data, setData] = useState<user[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await findAllUser();
      //@ts-ignore
      setData(response);
      setLoading(false);
    } catch (error) {}
  };
  const onCurrentUser = (user: user) => {
    setEditUser(user);
  };
  const onSubmmit = async (user: profileCRUD, resetFormData: () => void) => {
    try {
      const res = await addUser(user);
      if (res) {
        message.success("Thêm tài khoản thành công!");
        resetFormData();
        fetchData();
      } else {
        message.error(res);
      }
    } catch (error) {
      message.error("Thêm thất bại");
      console.log(error)
    }
  };

  const onUpdate = async (userId: number, user: profileCRUD) => {
    try {
      console.log(user)
      const res = await updateUser(userId, user);
      if (res) {
        message.success("Cập nhật tài khoản thành công!");
        fetchData();
      } else {
        message.error(res);
      }
    } catch (error) {}
  };

  const onDelete = async (userId: number) => {
    try {
      const res = await deleteUser(userId);
      if (res) {
        message.success("Xóa thành công!");
        fetchData();
      } else {
        message.error(res);
      }
    } catch (error) {}
  };
  return (
    <>
      <Row justify={"space-between"}>
        <Col span={10}>
          <Flex vertical>
            <TableUser
              user={editUser}
              onSubmit={onSubmmit}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
            {/* <Flex vertical style={footer}>
            <Footer />
          </Flex> */}
          </Flex>
        </Col>
        <Col span={13}>
          <UserController
            onEdit={onCurrentUser}
            data={data}
            onDelete={onDelete}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  );
};

export default AppUserCTRL;
