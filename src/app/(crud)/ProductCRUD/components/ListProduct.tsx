"use client";
import React from "react";
import { Card, Image, Modal, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Product } from "@/interface/productInterface";
import Paragraph from "antd/es/typography/Paragraph";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface IProps {
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
  data: Product[];
}

const ListProduct: React.FC<IProps> = ({ onEdit, onDelete, data }) => {
  const handleEdit = (record: Product) => {
    onEdit(record);
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
  const formatCurrency = (value: number | undefined) => {
    if (typeof value !== "number") {
      return "N/A";
    }
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  const columns: ColumnsType<Product> = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    //   render: (text) => <a>{text}</a>,
    // },
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      //@ts-ignore
      render: (_, __, index) => <span>{data.pageable.offset + index + 1}</span>,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (_, record) =>
        record.image_id[0]?.path ? (
          <Image width={80} src={record.image_id[0].path} />
        ) : (
          "N/A"
        ),
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      render: (text, record) => <span>{formatCurrency(record.price)}</span>,
    },
    {
      title: "Tiền nhập vào",
      dataIndex: "importPrice",
      key: "importPrice",
      render: (text, record) => (
        <span>{formatCurrency(record.importPrice)}</span>
      ),
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category.name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>
            <EditOutlined /> Edit
          </a>
          <a onClick={() => handleDelete(record.id)}>
            <DeleteOutlined /> Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
      <Table
      style={{width:"auto"}}
        // pagination={{ defaultPageSize: 5 }}
        pagination={false}  
        columns={columns}
        //@ts-ignore
        // dataSource={data.content?.map((product) => ({
        //   ...product,
        //   key: product.id,
        // }))}
        dataSource={data.content?.map((product, index) => ({
          ...product,
          index: index + 1,
          key: product.id,
        }))}
        scroll={{ x: true }} // Cho phép cuộn ngang nếu cần

      />
  );
};

export default ListProduct;
