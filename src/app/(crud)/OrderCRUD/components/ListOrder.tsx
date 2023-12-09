"use client";
import React, { useState } from "react";
import {
  Card,
  Space,
  Table,
  Modal,
  Button,
  Form,
  Row,
  Col,
  Input,
  Spin,
  Descriptions,
  Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { IOrder, IOrderDetail } from "../interfaceOrder";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import { findAllByOrder } from "@/app/services/OrderDetailService";

interface IProps {
  onDelete: (orderId: number) => void;
  data: IOrder[];
  loading: boolean;
}
const formatCurrency = (value: number | undefined) => {
  if (typeof value !== "number") {
    return "N/A";
  }
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
const OrderController: React.FC<IProps> = ({ onDelete, data, loading }) => {
  const [order, setOrder] = useState<IOrder>();
  const [orderDetails, setOrderDetails] = useState<IOrderDetail>();
  console.log(orderDetails);
  console.log(data);
  const handleEdit = async (record: IOrder) => {
    console.log(record);
    const response = await findAllByOrder(record.id);
    //@ts-ignore
    setOrderDetails(response);
    setOrder({ ...record });
    // onEdit(record);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Bạn có muốn xóa ?",
      okText: "Yes",
      okType: "danger",
      width: "600px",
      onOk: () => {
        onDelete(id);
      },
    });
  };
  const columns: ColumnsType<IOrder> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Người dùng",
      dataIndex: ["user", "fullname"],
      key: "user.fullname",
    },
    // {
    //   title: "Bắt đầu",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   render: (date: string) => (
    //     <>{dayjs(date).format("YYYY-MM-DD HH:mm:ss")}</>
    //   ),
    // },
    {
      title: "Kết thúc",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => (
        <>{dayjs(date).format("YYYY-MM-DD HH:mm:ss")}</>
      ),
    },
    // {
    //   title: "CreatedBy",
    //   dataIndex: "createdBy",
    //   key: "createdBy",
    // },
    // {
    //   title: "UpdatedBy",
    //   dataIndex: "updatedBy",
    //   key: "updatedBy",
    // },
    {
      title: "isCanceled",
      dataIndex: "isCanceled",
      key: "isCanceled",
      render: (isCanceled: boolean) => <>{isCanceled ? "True" : "False"}</>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>
            Xem chi tiết
          </a>
          <a onClick={() => handleDelete(record.id)}>
            Hủy đơn hàng
          </a>
        </Space>
      ),
    },
  ];

  const pageSizeOptions = ["5", "10", "20"];

  const footer = () => {
    //@ts-ignore
    const totalCost = orderDetails?.reduce((acc, detail) => {
      return acc + detail.quantity * detail.product.price;
    }, 0);

    return (
      <div>
        <strong>Thành tiền:</strong> {formatCurrency(totalCost)}
      </div>
    );
  };

  return (
    <Card>
      <h2>Danh sách hóa đơn</h2>
      <Spin spinning={loading} tip="Loading..." size="large">
        <Table
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: pageSizeOptions,
            defaultPageSize: Number(pageSizeOptions[0]),
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            showLessItems: true, // Ẩn bớt nút trang khi có nhiều trang
          }}
          columns={columns}
          scroll={{ x: 1000 }}
          //@ts-ignore
          dataSource={data?.map((order) => ({
            ...order,
            key: order.id,
          }))}
        />
      </Spin>
      <Modal
        title="Chi tiết hóa đơn"
        open={!!order}
        width={1000}
        onCancel={() => {
          setOrder(undefined);
        }}
        onOk={() => {
          setOrder(undefined);
        }}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={() => setOrder(undefined)}
          >
            OK
          </Button>,
        ]}
      >
        <Row>
          <Descriptions
            labelStyle={{ fontWeight: "bolder" }}
            contentStyle={{ fontWeight: "bolder" }}
          >
            <Descriptions.Item label="ID">{order?.id}</Descriptions.Item>
            {/* <Descriptions.Item label="Khu vực">
              {order?.room.area.name}
            </Descriptions.Item> */}
            <Descriptions.Item label="Họ và tên">
              
              {//@ts-ignore
              order?.user.fullname}
            </Descriptions.Item>
            <Descriptions.Item label="IsCanceled">
              {order?.isCanceled ? "True" : "False"}
            </Descriptions.Item>
            {/* <Descriptions.Item label="Bắt đầu">
              {dayjs(order?.created_date).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item> */}
            <Descriptions.Item label="Kết thúc">
              {dayjs(order?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            {/* <Descriptions.Item label="CreatedBy">{order?.createdBy}</Descriptions.Item>
            <Descriptions.Item label="UpdatedBy">{order?.updatedBy}</Descriptions.Item> */}
          </Descriptions>
        </Row>
        <Row justify={"space-between"}>
          <Table
            //@ts-ignore
            dataSource={orderDetails?.map((product) => ({
              ...product,
              key: product.id,
            }))}
            style={{ width: "100%" }}
            scroll={{ x: true }} // Cho phép cuộn ngang nếu cần
            footer={footer}
          >
            <Table.Column
              title="STT"
              dataIndex={"index"}
              key={"index"}
              render={(_, __, index) => {
                return index + 1
              }}
            />
            <Table.Column
              title="Sản phẩm"
              dataIndex={["product", "title"]}
              key={"product.title"}
            />
            <Table.Column
              title="Giá"
              dataIndex={["product", "price"]}
              key={"product.price"}
              render={(value) => {
                return `${formatCurrency(value)}`;
              }}
            />
            <Table.Column
              title="Số lượng mua"
              dataIndex={"quantity"}
              key={"quantity"}
            />
            <Table.Column
              title="Danh mục"
              dataIndex={["product", "category", "name"]}
              key={"product.category.name"}
            />
            <Table.Column
              title="Thanh toán vào lúc"
              dataIndex={"updatedAt"}
              key={"updatedAt"}
              render={(date: string) => (
                <>{dayjs(date).format("YYYY-MM-DD HH:mm:ss")}</>
              )}
            />
            <Table.Column
              title="Tổng tiền"
              dataIndex={"Total"}
              key={"total"}
              render={(text: any, record: IOrderDetail) => {
                const total = record.quantity * record.product.price;
                return `${formatCurrency(total)}`;
              }}
            />
          </Table>
        </Row>
      </Modal>
    </Card>
  );
};
export default OrderController;
