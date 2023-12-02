import { useCart } from "@/app/context/cartContext";
import { CartDetail } from "@/interface/CartInterface";
import { Product } from "@/interface/productInterface";
import { DeleteOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  Flex,
  Image,
  InputNumber,
  Row,
  Select,
  Space,
  Steps,
  Typography,
  message,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
const formatCurrency = (value: number | undefined) => {
  if (typeof value !== "number") {
    return "N/A";
  }
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
interface IProps {
  stepCurrent: any;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  onSelectProduct: (product: Product[]) => void;
}
const AppCart: React.FC<IProps> = ({
  stepCurrent,
  setCurrent,
  onSelectProduct,
}) => {
  const { Text } = Typography;
  const {
    cartItems,
    onDelete,
    onUpdate,
    selectedProductss,
    setSelectedProductss,
  } = useCart();
  const [total, setTotal] = useState<number>(0);
  const [selectedProducts, setSelectedProducts] = useState<Number[]>([]);
  // console.log("Selected Products in AppCart:", selectedProductss);
  useEffect(() => {
    const sum =
      cartItems.reduce((acc, record) => {
        const { quantity, product } = record;
        //@ts-ignore
        const { price } = product || {};

        if (quantity && price && selectedProducts.includes(record.id)) {
          return acc + quantity * price;
        }
        return acc;
      }, 0) || 0;
    setTotal(sum);
  }, [cartItems, selectedProducts]);

  const handleCheckboxChange = (productId: any) => {
    const isSelected = selectedProducts.includes(productId);

    if (isSelected) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
      setSelectedProductss(
        selectedProductss.filter((product) => product.id !== productId)
      );
    } else {
      const selectedProduct = cartItems.find(
        (product) => product.id === productId
      );

      if (selectedProduct) {
        setSelectedProducts([...selectedProducts, productId]);
        //@ts-ignore
        setSelectedProductss([...selectedProductss, selectedProduct]);
        //@ts-ignore
        onSelectProduct([...selectedProductss, selectedProduct]);
      }
    }
  };

  const handleSelectAllChange = () => {
    const allProductIds = cartItems.map((product) => product.id);
    if (selectedProducts.length === allProductIds.length) {
      setSelectedProducts([]);
      setSelectedProductss([]);
      onSelectProduct([]);
    } else {
      setSelectedProducts(allProductIds);
      //@ts-ignore
      setSelectedProductss([...selectedProductss, ...cartItems]);
      //@ts-ignore
      onSelectProduct([...selectedProductss, ...cartItems]);
    }
  };
  const handleCheckout = () => {
    if (selectedProducts.length === 0) {
      message.warning("Chọn sản phẩm để thanh toán");
    } else {
      setCurrent(stepCurrent + 1);
    }
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
  };
  const columns: ColumnsType<Product & { selected: boolean }> = [
    {
      dataIndex: "selected",
      key: "selected",
      render: (_, record) => (
        <Checkbox
          checked={selectedProducts.includes(record.id)}
          onChange={() => handleCheckboxChange(record.id)}
        />
      ),
    },
    {
      title: "Sản phẩm",
      dataIndex: ["product", "title"],
      key: "product.title",
      render: (_, record) => {
        const quantity = record.quantity;
        const cartId = record.id;
        //@ts-ignore
        const product_image = record.product.image_id[0].path;
        //@ts-ignore
        const product_title = record.product.title;

        return (
          <Flex>
            <img alt="avatar" src={product_image} style={{ width: 80 }} />
            <Flex
              vertical
              flex={1}
              justify="space-between"
              style={{ padding: 10 }}
            >
              <Typography.Paragraph
                style={{ width: "280px" }}
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
                //@ts-ignore
                onChange={(newValue) => handleUpdateCartItem(cartId, newValue)}
              />
            </Flex>
          </Flex>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Đơn giá",
      dataIndex: ["product", "price"],
      key: "product.price",
      render: (_, record) => {
        //@ts-ignore
        return formatCurrency(record.product.price);
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      width: "10%",
      render: (_, record) => {
        const { quantity } = record;
        //@ts-ignore
        const { price } = record.product;
        const total = quantity * price || 0;

        return formatCurrency(total);
      },
    },

    {
      title: "Xóa",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            href="#"
            onClick={() => {
              onDelete(record.id);
            }}
          >
            <DeleteOutlined /> Delete
          </a>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Row justify={"space-between"}>
        <Col span={14}>
          <Flex vertical>
            <div style={{ paddingLeft: "130px" }}>
              <Card>
                <Checkbox
                  style={{ paddingBottom: "10px", fontSize: "16px" }}
                  checked={
                    selectedProducts.length === cartItems.length &&
                    cartItems.length > 0
                  }
                  onChange={handleSelectAllChange}
                >
                  Tất cả
                </Checkbox>
                <Table
                  pagination={{ defaultPageSize: 5 }}
                  //@ts-ignore
                  columns={columns}
                  dataSource={cartItems.map((product) => ({
                    ...product,
                    key: product.id,
                  }))}
                />
              </Card>
            </div>
          </Flex>
        </Col>
        <Col span={9} style={{ paddingRight: "130px", background: "" }}>
          <Card>
            <Space>Tổng tiền: </Space>
            <Space style={{ float: "right", color: "red" }}>
              {formatCurrency(total)}
            </Space>
            <hr />
            <Button
              danger
              block
              type="primary"
              style={{ marginTop: "20px", height: "45px" }}
              onClick={handleCheckout}
            >
              Thanh toán ({selectedProducts.length})
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default AppCart;
