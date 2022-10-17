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
    const getSinhVien = useCallback(async (id) => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/student/${id}`,
            }
            const response = await axios(options)
            const teachers = response.data.data[0]
            if (response.data.status === 400) {
                setTeacher(teachers)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        getSinhVien(maGV)
    }, [getSinhVien, maGV])

    return (
        <>
            <Container className="wrap-bangdieukhien">
                <Row className="content-bangdieukhien">
                    <Col className="sider-bangdieukhien">
                        <h2>THÔNG TIN SINH VIÊN</h2>
                        <Table hover>
                            <tbody>
                                <tr>
                                    <th>Mã GV:</th>
                                    <td>{student.MA_GV}</td>
                                </tr>
                                <tr>
                                    <th>Họ Tên:</th>
                                    <td>{student.HOTEN_GV}</td>
                                </tr>
                                <tr>
                                    <th>Ngày sinh:</th>
                                    <td>{student.NGAYSINH_GV}</td>
                                </tr>
                                <tr>
                                    <th>Giới tính:</th>
                                    <td>{student.GIOITINH_GV ? 'Nam' : 'Nữ'}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Link to="/ThongTinCaNhan">
                            <h4>Xem thêm ...</h4>
                        </Link>
                    </Col>
                    <Col className="body-bangdieukhien">
                        <Row>
                            <Col>
                                <Card className="items-bangdieukhien">
                                    <Card.Link as={Link} to="/DangKiHocPhan">
                                        <Card.Img variant="top" src={imageDangKiHocPhan} />
                                        <Card.Title>Đăng kí học phần</Card.Title>
                                    </Card.Link>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="items-bangdieukhien">
                                    <Card.Link as={Link} to="/KetQua">
                                        <Card.Img variant="top" src={imageKetQuaHocTap} />
                                        <Card.Title>Kết quả học tập</Card.Title>
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
