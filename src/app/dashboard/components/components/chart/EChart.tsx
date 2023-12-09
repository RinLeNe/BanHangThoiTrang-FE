/*!
      =========================================================
      * Muse Ant Design Dashboard - v1.0.0
      =========================================================
      * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
      * Copyright 2021 Creative Tim (https://www.creative-tim.com)
      * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
      * Coded by Creative Tim
      =========================================================
      * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    */

import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import { useEffect, useState } from "react";
import { DoanhThuByCategory } from "@/app/services/OrderDetailService";
const formatCurrency = (value: number | undefined) => {
  if (typeof value !== "number") {
    return "N/A";
  }
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
function EChart() {
  const { Title, Paragraph } = Typography;
  const [doanhThuData, setDoanhThuData] = useState<any[]>([]); // Use any[] temporarily
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPromises = Array.from({ length: 10 }, (_, index) =>
          DoanhThuByCategory(index + 1)
        );

        const responses = await Promise.all(dataPromises);

        setDoanhThuData(responses);
      } catch (error) {
        console.error("Error fetching DoanhThuByCategory data:", error);
      }
    };

    fetchData();
  }, []);
  const categoryNames: Record<number, string> = {
    1: "Áo Thun",
    2: "Áo PoLo",
    3: "Áo Sơ Mi",
    4: "Áo Khoác",
    5: "Áo Kiểu",
    6: "Quần Short",
    7: "Quần Jean",
    8: "Quần Kaki",
    9: "Quần Tây",
    10: "Váy Đầm",
  };
  const eChart = {
    series: [
      {
        name: "Doanh thu",
        data: doanhThuData,
        color: "#fff",
      },
    ],
    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        strokeDashArray: 2,
      },

      xaxis: {
        categories: doanhThuData.map(
          (item, index) => categoryNames[index + 1] || `Category ${index + 1}`
        ),
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: Array.from({ length: doanhThuData.length }, () => "#fff"),
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: Array.from({ length: doanhThuData.length }, () => "#fff"),
          },
          formatter: function (val: any) {
            return formatCurrency(val);
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return formatCurrency(val);
          },
        },
      },
    },
  };

  // const items = [
  //   {//@ts-ignore
  //     Title: allProduct.content?.length || 0, // Display the length of allProduct, default to 0 if allProduct is undefined
  //     cate: "Sản phẩm",
  //   },
  //   {
  //     Title: "2m",
  //     cate: "Clicks",
  //   },
  //   {
  //     Title: "$772",
  //     cate: "Sales",
  //   },
  //   {
  //     Title: "82",
  //     cate: "Items",
  //   },
  // ];

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          //@ts-ignore
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Doanh thu sản phẩm</Title>
        <Paragraph className="bnb2">
          theo danh mục 
        </Paragraph>
        <Paragraph className="lastweek">
          Biểu đồ biểu đạt tổng doanh thu của sản phẩm theo từng danh mục
        </Paragraph>
        {/* <Row gutter={0}>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.cate}</span>
              </div>
            </Col>
          ))}
        </Row> */}
      </div>
    </>
  );
}

export default EChart;
