'use client'
import React,{useState} from 'react';
import type { RadioChangeEvent,TabsProps } from 'antd';
import { Layout, Button, Card, Flex, Typography, Radio, Rate, InputNumber,Tabs } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const cardStyle: React.CSSProperties = {
    width: 620,
};

const imgStyle: React.CSSProperties = {
    display: 'block',
    width: 273,
};
const onChange4 = (key: string) => {
    console.log(key);
};
const items: TabsProps['items'] = [
    
    {
        key: '1',
        label: 'Chi tiết sản phẩm',
        children: 
        <div>
                <b>Mô tả sản phẩm</b>  <br />
                <b>* THÔNG TIN SẢN PHẨM </b><br />
                - Tên sản phẩm: Váy Chữ A Nữ Cổ Tàu Thắt Nơ <br />
                - Phù hợp: Mặc đi làm, đi chơi, đi tiệc. <br />
                - Chất liệu: Vải đũi xốp <br />
                - Màu sắc: Đỏ/ Đen/ Trắng/ Be <br />
                - Họa tiết: Trơn <br />
                - Cam kết 100% chất lượng từ chất vải đến đường chỉ, phát hiện lỗi được hoàn trả miễn phí. <br />
        </div>,
    },
    {
        key: '2',
        label: 'Đánh giá sản phẩm',
        children: 
        <div>
            <b>Chưa có đánh giá</b>
        </div>
        ,
    },
    {
        key: '3',
        label: 'Hướng dẫn mua hàng',
        children: 
        <div>
               <b> Chỉ cần ngồi ở nhà bạn cũng có thể dễ dàng mua hàng chỉ với vài thao tác đơn giản </b> <br />

              <b>Cách 1:</b>   Gọi điện thoại đến tổng đài của 3TN: 090 1800 888 (Phím 7) sẽ luôn có nhân viên tư vấn của FM hỗ trợ quý khách mua được những sản phẩm vừa ý. <br />

                <b>Cách 2:</b> Đặt mua online trên Website: 2TN .com.vn <br />
        </div>
        ,
    },
];


const App: React.FC = () => {
   
    const [value, setValue] = useState(1)// radio
    const onChange1 = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const [value2, setValue2] = useState(3)// radio màu
    const onChange2 = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue2(e.target.value);
    };
    const [value1, setValue1] = useState(2); //đánh giá
    return (
        <Layout >
            <Content className="site-layout" style={{ padding: '0 150px' }}>
                <Card hoverable bodyStyle={{ padding: 0, overflow: 'hidden', }}>
                    <Flex  >
                        <img
                            alt="avatar"
                            src="https://media-fmplus.cdn.vccloud.vn/uploads/products/2308VDUA8882101/3b451a39-e691-4762-b2f5-ece98ea2f9ac.jpg"
                            style={{width:"400px", height:"500px"}}
                        />
                        <Flex vertical style={{ padding: 32, fontSize:"20px" }}>
                            <Typography >
                                <h3>Áo sơ mi</h3>
                            </Typography>
                            <div> <b>Giá Bán:</b>  100.000VND</div>
                            <div>
                                Size:
                                <Radio.Group style={{ marginLeft: "10px" }} onChange={onChange1} value={value}>
                                    <Radio value={1}>S</Radio>
                                    <Radio value={2}>M</Radio>
                                    <Radio value={3}>L</Radio>
                                    <Radio value={4}>XL</Radio>
                                </Radio.Group>
                            </div>
                            <div>
                                Màu:
                                <Radio.Group style={{ marginLeft: "10px" }} onChange={onChange2} value={value2}>
                                    <Radio value={5}>Đỏ</Radio>
                                    <Radio value={6}>Vàng</Radio>
                                    <Radio value={7}>Xanh </Radio>
                                    <Radio value={8}>Trắng</Radio>
                                </Radio.Group>
                            </div>
                            <div>
                                <p>Đánh Giá:
                                    <Rate style={{ marginLeft: "10px" }} onChange={setValue1} value={value1} />
                                    {value ? <span className="ant-rate-text"></span> : ''}
                                </p>
                            </div>

                            <div> Số Lượng
                                <InputNumber style={{ marginLeft: "10px", marginBottom: "10px" }} min={1} max={10} />
                            </div>

                            <div>
                                <Button type="primary" danger href="https://ant.design" target="_blank" style={{ width: "150px"}}>
                                    <PlusCircleOutlined /> Thêm giỏ hàng
                            </Button>
                                <Button type="primary" danger href="https://ant.design" target="_blank" style={{ width: "150px", marginLeft: "10px" }}>
                                    Mua Hàng
                                </Button>
                            </div>
                        </Flex>
                    </Flex>
                </Card>
                <div>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange4} />

                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
    );
};

export default App;