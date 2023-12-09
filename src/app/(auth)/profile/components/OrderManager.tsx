import { useAuth } from "@/app/context/use-auth";
import { findAllByOrder } from "@/app/services/OrderDetailService";
import {
  cancelOrder,
  findAllOrder,
  findAllOrderByUser,
  orderById,
  repurchaseOrder,
} from "@/app/services/OrderService";
import { Order, OrderDetail } from "@/interface/OrderInterface";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Flex,
  InputNumber,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useRouter } from "next/navigation";
dayjs.extend(customParseFormat);
dayjs.locale("vi");
const cardStyle: React.CSSProperties = {
  // width: 620,
};
const imgStyle: React.CSSProperties = {
  // display: "block",
  width: 100,
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
const OrderManager = () => {
  const [orderData, setOrderData] = useState<Order[] | undefined>();
  const [viewOrderDetail, setViewOrderDetail] = useState<Order[]>();
  const { data } = useAuth();
  const [total, setTotal] = useState<number>(0);
  const { Text } = Typography;
  const router = useRouter();
  // const handleOrderCardClick = (selectedOrderDetail: Order[]) => {
  //   setViewOrderDetail(selectedOrderDetail);
  // };
  console.log(orderData);
  console.log(viewOrderDetail);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const onRepurchaseOrder = async (orderId: number) => {
    await repurchaseOrder(orderId);
    router.push("/payment");
  };
  const back = () => {
    setViewOrderDetail(undefined);
  };
  const findOrder = async () => {
    //@ts-ignore
    const response = await findAllOrderByUser(data?.id);
    //@ts-ignore
    setOrderData(response);
  };
  useEffect(() => {
    findOrder();
  }, []);

  const findOrderById = async (orderId: number) => {
    const response = await orderById(orderId);
    //@ts-ignore
    setViewOrderDetail(response);
  };
  const cancelOrderById = async (orderId: number) => {
    await cancelOrder(orderId);
    findOrder();
  };
  useEffect(() => {
    if (viewOrderDetail) {
      //@ts-ignore
      const calculatedTotal = viewOrderDetail?.orderDetails?.reduce(
        //@ts-ignore
        (sum, orderDetail) => sum + (orderDetail.totalPrice || 0),
        0
      );

      setTotal(calculatedTotal || 0); // Update the total state
    }
  }, [viewOrderDetail]);
  // orderData?.map((order) => {
  //   const { orderDetails } = order;
  //   orderDetails?.map((orderDetail) => {
  //     // const { order } = orderDetail;
  //     console.log(orderDetail);
  //   });
  // });
  // useEffect(() => {
  //   const sum =
  //     orderData?.reduce((acc, order) => {
  //       const { orderDetails } = order;

  //       if (orderDetails && orderDetails.length > 0) {
  //         orderDetails.forEach((orderDetail) => {
  //           const { totalPrice } = orderDetail;
  //           acc += totalPrice || 0;
  //         });
  //       }

  //       return acc;
  //     }, 0) || 0;

  //   setTotal(sum);
  // }, [orderData]);
  // useEffect(() => {
  //   const orderQuantities = orderData?.map((order) => {
  //     const { orderDetails } = order;

  //     if (orderDetails && orderDetails.length > 0) {
  //       const orderQuantity = orderDetails.reduce((sum, orderDetail) => {
  //         return sum + (orderDetail.quantity || 0);
  //       }, 0);

  //       const orderDetailsArray = orderDetails.map((orderDetail) => ({
  //         product: orderDetail.product,
  //         quantity: orderDetail.quantity,
  //         totalPrice: orderDetail.totalPrice,
  //       }));

  //       const totalOrderDetails = orderDetailsArray.reduce(
  //         (total, orderDetail) => total + orderDetail.totalPrice,
  //         0
  //       );

  //       return {
  //         orderId: order.id,
  //         quantity: orderQuantity,
  //         totalPrice: orderDetails.reduce((total, orderDetail) => {
  //           return total + ((orderDetail.totalPrice || 0) * orderDetail.quantity);
  //         }, 0),
  //         orderDetails: orderDetailsArray,
  //         totalOrderDetails: totalOrderDetails,
  //       };
  //     }

  //     return null;
  //   }).filter(Boolean) || [];

  //   console.log('Order Quantities:', orderQuantities);

  //   // ... (rest of your existing code remains unchanged)
  // }, [orderData]);
  const columns: ColumnsType<OrderDetail> = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      render: (product) => (
        <Flex>
          <img
            alt="avatar"
            src={product.image_id[0].path}
            style={{ width: 80 }}
          />

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
              {product.title}
            </Typography.Paragraph>
            {/* <Flex align="flex-end" justify="space-between">
              <Typography.Paragraph
                // style={{ width: "280px" }}
                ellipsis={{
                  rows: 1,
                  expandable: true,
                  symbol: "more",
                }}
              >
                Màu: N/A
              </Typography.Paragraph>
              <Typography.Paragraph
                style={{ width: "280px" }}
                ellipsis={{
                  rows: 1,
                  expandable: true,
                  symbol: "more",
                }}
              >
                Size: {product.size}
              </Typography.Paragraph>
            </Flex> */}
          </Flex>
        </Flex>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "product",
      key: "price",
      render: (product) => formatCurrency(product?.price),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tổng tính",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => <p>{formatCurrency(totalPrice)}</p>,
    },
  ];
  return (
    <>
      {!viewOrderDetail ? (
        <Card title="Quản lý đơn hàng">
          {orderData?.map((item) => {
            const orderQuantities = item.orderDetails?.map((orderDetail) => {
              return {
                quantity: orderDetail.quantity || 0,
                totalPrice: orderDetail.totalPrice || 0,
              };
            });

            // const totalQuantity = orderQuantities.reduce((sum, order) => sum + order.quantity, 0);
            const totalOrderPrice = orderQuantities.reduce(
              (sum, order) => sum + order.totalPrice,
              0
            );
            return (
              <>
                <Card
                  style={cardStyle}
                  bodyStyle={{ paddingBottom: "15px", overflow: "hidden" }}
                  key={item.id}
                >
                  <Flex align="flex-end" justify="space-between">
                    <Typography style={{ fontSize: "16px" }}>
                      Mã số ID hóa đơn: {item.id}
                    </Typography>
                    <Text style={{ color: "#ff2c00", fontSize: "16px" }}>
                      {item && item.isCanceled ? (
                        "Đã hủy"
                      ) : (
                        <Text
                          style={{
                            color: "rgb(249, 186, 9)",
                            fontSize: "16px",
                          }}
                        >
                          Đang chờ
                        </Text>
                      )}
                    </Text>
                  </Flex>

                  <Flex style={{ paddingTop: "20px" }}>
                    {/* Add logic to handle cases where orderDetails might be undefined or empty */}
                    {item.orderDetails && item.orderDetails.length > 0 ? (
                      <>
                        <img
                          alt="avatar"
                          //@ts-ignore
                          src={item.orderDetails[0].product.image_id[0]?.path}
                          height={145}
                          style={imgStyle}
                        />
                        <Flex
                          vertical
                          flex={1}
                          justify="space-between"
                          style={{ padding: 10 }}
                        >
                          <div
                            onClick={() => {
                              // handleOrderCardClick(orderData);

                              findOrderById(item.id);
                            }}
                          >
                            <Typography.Paragraph
                              style={{ width: "280px" }}
                              ellipsis={{
                                rows: 1,
                                expandable: true,
                                symbol: "more",
                              }}
                            >
                              Số lượng: {item.orderDetails.length} sản Phẩm
                              {/* {item.orderDetails[0].product.title} */}
                            </Typography.Paragraph>
                            <Typography.Paragraph
                              style={{ width: "280px" }}
                              ellipsis={{
                                rows: 1,
                                expandable: true,
                                symbol: "more",
                              }}
                            >
                              Tổng tiền hàng: {formatCurrency(totalOrderPrice)}
                              {/* {item.orderDetails[0].product.title} */}
                            </Typography.Paragraph>
                            <Typography.Paragraph
                              style={{ width: "280px" }}
                              ellipsis={{
                                rows: 1,
                                expandable: true,
                                symbol: "more",
                              }}
                            >
                              Phí vận chuyển: 0 đ
                              {/* {item.orderDetails[0].product.title} */}
                            </Typography.Paragraph>
                            <hr style={{ width: "100%" }}></hr>
                            <Flex align="flex-end" justify="space-between">
                              <hr />
                              <Text
                                style={{ color: "#ff2c00", fontSize: "15px" }}
                              >
                                Tổng thanh toán:{" "}
                                {formatCurrency(totalOrderPrice)}
                              </Text>
                            </Flex>
                          </div>
                          <Flex
                            align="flex-end"
                            justify="space-between"
                            style={{ paddingTop: "20px" }}
                          >
                            <hr />

                            <Text style={{ color: "#ff2c00" }}>
                              {item && item.isCanceled ? (
                                <>
                                  <Button
                                    type="default"
                                    size="large"
                                    onClick={showModal}
                                  >
                                    Mua lại
                                  </Button>
                                  <Modal
                                    // title="Bạn có muốn mua lại hàng?"
                                    open={open}
                                    onOk={hideModal}
                                    onCancel={hideModal}
                                    footer={null}
                                    width={400}
                                    style={{ textAlign: "center" }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="60"
                                      height="53"
                                      viewBox="0 0 60 53"
                                      style={{ fontSize: "20px" }}
                                    >
                                      <g
                                        id="exclamation-triangle-fill"
                                        transform="translate(-0.001 -2.247)"
                                      >
                                        <path
                                          id="Path_15"
                                          d="M33.676,4.4a4.216,4.216,0,0,0-7.349,0L.618,48.558a4.419,4.419,0,0,0,3.674,6.689H55.707a4.418,4.418,0,0,0,3.674-6.689Zm-3.681,13a3.378,3.378,0,0,0-2.515,1.128,3.446,3.446,0,0,0-.86,2.639l1.311,13.276a2.068,2.068,0,0,0,4.124,0L33.367,21.16a3.446,3.446,0,0,0-.859-2.639A3.378,3.378,0,0,0,29.995,17.394ZM30,40.105a3.786,3.786,0,1,0,3.749,3.785A3.767,3.767,0,0,0,30,40.105Z"
                                          transform="translate(0)"
                                          fill="#ff2c00"
                                          fillRule="evenodd" // Corrected from fill-rule to fillRule
                                        />
                                      </g>
                                    </svg>
                                    <p>Bạn có muốn mua lại hàng?</p>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "20px",
                                      }}
                                    >
                                      <Button
                                        onClick={hideModal}
                                        style={{ marginRight: "10px" }}
                                      >
                                        Đóng
                                      </Button>
                                      <Button
                                        type="primary"
                                        danger
                                        onClick={() =>
                                          onRepurchaseOrder(item.id)
                                        }
                                      >
                                        Đồng ý
                                      </Button>
                                    </div>
                                  </Modal>
                                </>
                              ) : (
                                <Button
                                  type="default"
                                  onClick={() => {
                                    cancelOrderById(item.id);
                                  }}
                                  size="large"
                                >
                                  Hủy đặt hàng
                                </Button>
                              )}
                            </Text>
                          </Flex>
                        </Flex>
                      </>
                    ) : (
                      <p>No order details available.</p>
                    )}
                  </Flex>
                </Card>
              </>
            );
          })}
        </Card>
      ) : (
        <>
          <Text
            style={{ marginLeft: "20px" }}
            onClick={() => {
              back();
            }}
          >
            <ArrowLeftOutlined /> Quay lại quản lý đơn hàng
          </Text>

          <Card>
            <>
              <Flex align="flex-end" justify="space-between">
                <Text style={{ fontSize: "19px" }}>
                  Chi tiết đơn hàng #{" "}
                  {
                    //@ts-ignore
                    viewOrderDetail.id
                  }
                </Text>
                <Text style={{ color: "#ff2c00", fontSize: "20px" }}>
                  {
                    //@ts-ignore
                    viewOrderDetail && viewOrderDetail.isCanceled ? (
                      "Đã hủy"
                    ) : (
                      <Text
                        style={{ color: "rgb(249, 186, 9)", fontSize: "16px" }}
                      >
                        Đang chờ
                      </Text>
                    )
                  }
                </Text>
              </Flex>

              <Typography style={{ fontSize: "17px", paddingTop: "10px" }}>
                Ngày đặt hàng:{" "}
                {
                  //@ts-ignore
                  dayjs(viewOrderDetail.created_date).format(
                    "DD/MM/YYYY - HH:mm"
                  )
                }
              </Typography>
              <Row style={{ marginBottom: "20px", paddingTop: "20px" }}>
                <Col span={11} style={{ marginRight: "auto" }}>
                  <Card title="Địa chỉ người nhận" style={{ height: "200px" }}>
                    <p>
                      {
                        //@ts-ignore
                        viewOrderDetail.user.fullname
                      }
                    </p>
                    <p>
                      Địa chỉ:{" "}
                      {
                        //@ts-ignore
                        viewOrderDetail.user.address
                      }
                    </p>
                    <p>
                      Điện thoại:{" "}
                      {
                        //@ts-ignore
                        viewOrderDetail.user.phoneNumber
                      }
                    </p>
                  </Card>
                </Col>
                <Col span={11}>
                  <Card
                    title="Hình thức thanh toán"
                    style={{ height: "200px" }}
                  >
                    <Text>Thanh toán khi nhận hàng</Text>
                  </Card>
                </Col>
              </Row>
              <Card
                style={cardStyle}
                bodyStyle={{ padding: 0, overflow: "hidden" }}
                //@ts-ignore
                key={viewOrderDetail.id}
              >
                <Table
                  pagination={{ defaultPageSize: 5 }}
                  //@ts-ignore
                  columns={columns}
                  dataSource={
                    //@ts-ignore
                    viewOrderDetail?.orderDetails.map((orderDetail) => ({
                      key: orderDetail.id, // Assuming 'id' is a unique identifier
                      product: orderDetail.product,
                      quantity: orderDetail.quantity,
                      totalPrice:
                        (orderDetail.quantity || 0) *
                        //@ts-ignore
                        (orderDetail.product?.price || 0),
                    })) || []
                  }
                />
              </Card>
              <Row style={{ marginBottom: "20px", marginTop: "20px" }}>
                <Col span={11} style={{ marginRight: "auto" }}>
                  {//@ts-ignore
                  viewOrderDetail && viewOrderDetail.isCanceled ? (
                    <>
                      <Button
                        type="primary"
                        size="large"
                        danger
                        style={{ width: "120px" }}
                        onClick={showModal}
                      >
                        Mua lại
                      </Button>
                      <Modal
                        // title="Bạn có muốn mua lại hàng?"
                        open={open}
                        onOk={hideModal}
                        onCancel={hideModal}
                        footer={null}
                        width={400}
                        style={{ textAlign: "center" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="60"
                          height="53"
                          viewBox="0 0 60 53"
                          style={{ fontSize: "20px" }}
                        >
                          <g
                            id="exclamation-triangle-fill"
                            transform="translate(-0.001 -2.247)"
                          >
                            <path
                              id="Path_15"
                              d="M33.676,4.4a4.216,4.216,0,0,0-7.349,0L.618,48.558a4.419,4.419,0,0,0,3.674,6.689H55.707a4.418,4.418,0,0,0,3.674-6.689Zm-3.681,13a3.378,3.378,0,0,0-2.515,1.128,3.446,3.446,0,0,0-.86,2.639l1.311,13.276a2.068,2.068,0,0,0,4.124,0L33.367,21.16a3.446,3.446,0,0,0-.859-2.639A3.378,3.378,0,0,0,29.995,17.394ZM30,40.105a3.786,3.786,0,1,0,3.749,3.785A3.767,3.767,0,0,0,30,40.105Z"
                              transform="translate(0)"
                              fill="#ff2c00"
                              fillRule="evenodd" // Corrected from fill-rule to fillRule
                            />
                          </g>
                        </svg>
                        <p>Bạn có muốn mua lại hàng?</p>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "20px",
                          }}
                        >
                          <Button
                            onClick={hideModal}
                            style={{ marginRight: "10px" }}
                          >
                            Đóng
                          </Button>
                          <Button
                            type="primary"
                            danger
                            onClick={() =>
                              //@ts-ignore
                              onRepurchaseOrder(viewOrderDetail.id)
                            }
                          >
                            Đồng ý
                          </Button>
                        </div>
                      </Modal>
                    </>
                  ) : (
                    <Button
                      type="default"
                      onClick={() => {
                        //@ts-ignore
                        cancelOrderById(viewOrderDetail.id);
                      }}
                    >
                      Hủy đặt hàng
                    </Button>
                  )}
                </Col>
                <Col span={11} style={{ paddingLeft: "120px" }}>
                  <Flex align="flex-end" justify="space-between">
                    <Text>Tổng tiền hàng: </Text>
                    <Text>{formatCurrency(total)}</Text>
                  </Flex>
                  <Flex align="flex-end" justify="space-between">
                    <Text>Phí vận chuyển: </Text>
                    <Text>0 đ</Text>
                  </Flex>
                  <Flex align="flex-end" justify="space-between">
                    <Text>Miễn phí vận chuyển: </Text>
                    <Text>0 đ</Text>
                  </Flex>
                  <Flex align="flex-end" justify="space-between">
                    <Text>Giảm trừ: </Text>
                    <Text>0 đ</Text>
                  </Flex>
                  <hr></hr>
                  <Flex align="flex-end" justify="space-between">
                    {/* <p>Tổng tiền hàng</p>
                      <p>Phí vận chuyển</p>
                      <p>Miễn phí vận chuyển</p>
                      <p>Giảm trừ</p> */}
                    <Text style={{ color: "#ff2c00" }}>Tổng thanh toán: </Text>
                    <Text style={{ color: "#ff2c00" }}>
                      {formatCurrency(total)}
                    </Text>
                  </Flex>
                </Col>
              </Row>
            </>
          </Card>
        </>
      )}
    </>
  );
};
export default OrderManager;
