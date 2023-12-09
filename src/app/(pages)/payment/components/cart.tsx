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
      quantity: cartDetail.quantity,
      size: cartDetail.size,
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
        //@ts-ignore
        const size = record.size;

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
              {/* <Typography>Size:</Typography> */}
              <Select
                defaultValue={"S"}
                value={size}
                style={{ width: 70, marginRight: "10px" }}
                size="middle"
                options={[
                  { value: "S", label: "S" },
                  { value: "L", label: "L" },
                  { value: "M", label: "M" },
                ]}
                onChange={(value) =>
                  //@ts-ignore
                  handleUpdateCartItem(cartId, { ...record, size: value })
                }
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
      render: (_, record) => (
        <InputNumber
          size="small"
          min={1}
          // max={10}
          value={record.quantity}
          style={{ width: 50 }}
          onChange={(value) =>
            //@ts-ignore
            handleUpdateCartItem(record.id, { ...record, quantity: value })
          }
        />
      ),
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
      title: "Tổng tính",
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
            <DeleteOutlined style={{ color: "red" }} />
          </a>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Row justify={"space-between"}>
        <Col span={15}>
          <Flex vertical>
            <div style={{ paddingLeft: "130px" }}>
              <Card
                style={{
                  boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.1)", // Adjust the values according to your design
                }}
              >
                <Flex flex={1} justify="space-between" style={{ padding: 10 }}>
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
                  <Typography style={{ color: "#707070" }}>
                    {cartItems.length} Sản phẩm
                  </Typography>
                </Flex>

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
        <Col span={8} style={{ paddingRight: "160px" }}>
          <Card
            style={{
              boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.1)", // Adjust the values according to your design
              
            }}
          >
            <Space style={{ color: "#333", fontSize: "16px" }}>
              Tạm tính:{" "}
            </Space>
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
