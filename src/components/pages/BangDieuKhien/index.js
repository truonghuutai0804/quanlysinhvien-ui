import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Bar } from 'react-chartjs-2'
import { FaChalkboardTeacher, FaRegChartBar } from 'react-icons/fa'
import { MdEngineering, MdOutlineGroups } from 'react-icons/md'
import './BangDieuKhien.scss'
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  } from 'chart.js';

const BangDieuKhien = () => {
    Chart.register(
        ArcElement,
        LineElement,
        BarElement,
        PointElement,
        BarController,
        BubbleController,
        DoughnutController,
        LineController,
        PieController,
        PolarAreaController,
        RadarController,
        ScatterController,
        CategoryScale,
        LinearScale,
        LogarithmicScale,
        RadialLinearScale,
        TimeScale,
        TimeSeriesScale,
        Decimation,
        Filler,
        Legend,
        Title,
        Tooltip,
        SubTitle,
    )

    const data = {
        labels: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        datasets: [
            {
                label: 'Điểm trung bình của tất cả các sinh viên trong trường',
                data: [6.5, 5.9, 8.0, 8.1, 5.6, 5.5, 4.0, 5.9, 8.0, 8.1, 5.6, 5.5],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',

                ],
                borderWidth: 1,
            },
        ],
    }
    return (
        <>
            <Row>
                <Col className="bangdieukhien_sinhvien">
                    <MdOutlineGroups size={80} />
                    <aside className="bangdieukhien_text">
                        <strong>
                            <p>800</p>
                            SINH VIÊN
                        </strong>
                    </aside>
                </Col>
                <Col className="bangdieukhien_giaovien">
                    <FaChalkboardTeacher size={80} />
                    <aside className="bangdieukhien_text">
                        <strong>
                            <p>20</p>
                            GIÁO VIÊN
                        </strong>
                    </aside>
                </Col>
                <Col className="bangdieukhien_phongdaotao">
                    <MdEngineering size={80} />
                    <aside className="bangdieukhien_text">
                        <strong>
                            <p>10</p>
                            PHÒNG ĐÀO TẠO
                        </strong>
                    </aside>
                </Col>
                <Col className="bangdieukhien_diemtrungbinh">
                    <FaRegChartBar size={80} />
                    <aside className="bangdieukhien_text">
                        <strong>
                            <p>8.00</p>
                            ĐIỂM TRUNG BÌNH
                        </strong>
                    </aside>
                </Col>
            </Row>

            <Bar data={data} height={80} className="mt-5"/>
        </>
    )
}

export default BangDieuKhien
