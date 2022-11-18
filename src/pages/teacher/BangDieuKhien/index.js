import React, { useCallback, useEffect, useState } from 'react'
import { Card, Col, Container, Row, Table } from 'react-bootstrap'
import './BangDieuKhien.scss'
import imageDangKiHocPhan from '~/asset/images/hetinchi.gif'
import imageKetQuaHocTap from '~/asset/images/ql_diem.gif'
import { Link } from 'react-router-dom'
import axios from 'axios'

const BangDieuKhien = () => {
    const [teacher, setTeacher] = useState([])
    const maGV = localStorage.getItem('login')
    const getGiaoVien = useCallback(async (id) => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/teacher/${id}`,
            }
            const response = await axios(options)
            const teachers = response.data.dataGV[0]
            if (response.data.message === 'SUCCESS') {
                setTeacher(teachers)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        getGiaoVien(maGV)
    }, [getGiaoVien, maGV])

    return (
        <>
            <Container className="wrap-bangdieukhien">
                <Row className="content-bangdieukhien">
                    <Col className="sider-bangdieukhien">
                        <h2>THÔNG TIN GIÁO VIÊN</h2>
                        <Table hover>
                            <tbody>
                                <tr>
                                    <th>Mã GV:</th>
                                    <td>{teacher.MA_GV}</td>
                                </tr>
                                <tr>
                                    <th>Họ Tên:</th>
                                    <td>{teacher.HOTEN_GV}</td>
                                </tr>
                                <tr>
                                    <th>Ngày sinh:</th>
                                    <td>{teacher.NGAYSINH_GV}</td>
                                </tr>
                                <tr>
                                    <th>Giới tính:</th>
                                    <td>{teacher.GIOITINH_GV ? 'Nam' : 'Nữ'}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Link to="/Teacher/ThongTinCaNhan">
                            <h4>Xem thêm ...</h4>
                        </Link>
                    </Col>
                    <Col className="body-bangdieukhien">
                        <Row>
                            <Col>
                                <Card className="items-bangdieukhien">
                                    <Card.Link as={Link} to="/Teacher/DiemSinhVien">
                                        <Card.Img variant="top" src={imageKetQuaHocTap} />
                                        <Card.Title>Quản lý điểm</Card.Title>
                                    </Card.Link>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default BangDieuKhien
