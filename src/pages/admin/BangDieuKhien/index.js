import React, { useCallback, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { FaChalkboardTeacher, FaRegChartBar } from 'react-icons/fa'
import { MdEngineering, MdOutlineGroups } from 'react-icons/md'
import './BangDieuKhien.scss'
import axios from 'axios'

const BangDieuKhien = () => {
    const [dashboard, setDashboard] = useState('')

    const getBangDieuKhien = useCallback(async () =>{
        try {
            const options = {
                method: "get",
                url: "http://localhost:8080/api/dashboard",
            }
            const response = await axios(options)
            const dashboards = response.data
            if(dashboards.status === 400){
                setDashboard(dashboards)
            }
        } catch (error) {
            console.log(error);
        }
    },[])

    useEffect(() => {
        getBangDieuKhien()
    }, [getBangDieuKhien])

    return (
        <>
            <Row>
                <Col className="bangdieukhien_sinhvien">
                    <MdOutlineGroups size={80} />
                    <aside className="bangdieukhien_text">
                        <strong>
                        {Array.isArray(dashboard.dataSV) &&
                            <p>{dashboard.dataSV[0].SO_LUONG_SV}</p>
                        }
                            SINH VIÊN
                        </strong>
                    </aside>
                </Col>
                <Col className="bangdieukhien_giaovien">
                    <FaChalkboardTeacher size={80} />
                    <aside className="bangdieukhien_text">
                        <strong>
                        {Array.isArray(dashboard.dataGV) &&
                            <p>{dashboard.dataGV[0].SO_LUONG_GV}</p>
                        }
                            GIÁO VIÊN
                        </strong>
                    </aside>
                </Col>
                <Col className="bangdieukhien_phongdaotao">
                    <MdEngineering size={80} />
                    <aside className="bangdieukhien_text">
                        <strong>
                            {Array.isArray(dashboard.dataPDT) &&
                                <p>{dashboard.dataPDT[0].SO_LUONG_PDT}</p>
                            }
                            PHÒNG ĐÀO TẠO
                        </strong>
                    </aside>
                </Col>
                {/* <Col className="bangdieukhien_diemtrungbinh">
                    <FaRegChartBar size={80} />
                    <aside className="bangdieukhien_text">
                        <strong>
                            {Array.isArray(dashboard.dataDiem) &&
                                <p>{(dashboard.dataDiem[0].TONG)}</p>
                            }
                            ĐIỂM TRUNG BÌNH
                        </strong>
                    </aside>
                </Col> */}
            </Row>
        </>
    )
}

export default BangDieuKhien
