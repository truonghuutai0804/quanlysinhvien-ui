import React, { useCallback, useEffect, useState } from 'react'
import { Card, Col, Container, Row, Table } from 'react-bootstrap'
import './BangDieuKhien.scss'
import imageDangKiHocPhan from '~/asset/images/hocphan.png'
import imageDanhSachSinhVien from '~/asset/images/student.png'
import imageDanhSachGiaoVien from '~/asset/images/teacher.png'

import { Link } from 'react-router-dom'
import axios from 'axios'

const BangDieuKhien = () => {
    const [trainer, setTrainer] = useState([])
    const maPDT = localStorage.getItem('login')
    const getSinhVien = useCallback(async (id) => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/teacher/${id}`,
            }
            const response = await axios(options)
            const trainers = response.data.dataGV[0]
            if (response.data.message === 'SUCCESS') {
                setTrainer(trainers)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    console.log(trainer)

    useEffect(() => {
        getSinhVien(maPDT)
    }, [getSinhVien, maPDT])

    return (
        <>
            <Container className="wrap-bangdieukhien">
                <Row className="content-bangdieukhien">
                    <Col className="sider-bangdieukhien">
                        <h2>THÔNG TIN NHÂN VIÊN</h2>
                        <Table hover>
                            {trainer && (
                                <tbody>
                                    <tr>
                                        <th>Mã GV:</th>
                                        <td>{trainer.MA_GV}</td>
                                    </tr>
                                    <tr>
                                        <th>Họ Tên:</th>
                                        <td>{trainer.HOTEN_GV}</td>
                                    </tr>
                                    <tr>
                                        <th>Ngày sinh:</th>
                                        <td>{trainer.NGAYSINH_GV}</td>
                                    </tr>
                                    <tr>
                                        <th>Giới tính:</th>
                                        <td>{trainer.GIOITINH_GV === 1 ? 'Nam' : 'Nữ'}</td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                        <Link to="/Trainer/ThongTinCaNhan" className='d-grid col-5 mx-auto'>
                            <p className="btn btn-primary btn-lg" >Xem thêm &gt;&gt;&gt;</p>
                        </Link>
                    </Col>
                    <Col className="body-bangdieukhien">
                        <Row>
                            <Col>
                                <Card className="items-bangdieukhien">
                                    <Card.Link as={Link} to="/Trainer/DanhSachSinhVien">
                                        <Card.Img variant="top" src={imageDanhSachSinhVien} />
                                        <Card.Title className="mt-3">
                                            <strong>DANH SÁCH SINH VIÊN</strong>
                                        </Card.Title>
                                    </Card.Link>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="items-bangdieukhien">
                                    <Card.Link as={Link} to="/Trainer/DanhSachGiaoVien">
                                        <Card.Img variant="top" src={imageDanhSachGiaoVien} />
                                        <Card.Title className="mt-3">
                                            <strong>DANH SÁCH GIÁO VIÊN</strong>
                                        </Card.Title>
                                    </Card.Link>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card className="items-bangdieukhien">
                                    <Card.Link as={Link} to="/Trainer/HocPhan">
                                        <Card.Img variant="top" src={imageDangKiHocPhan} />
                                        <Card.Title className="mt-3">
                                            <strong>QUẢN LÍ HỌC PHẦN</strong>
                                        </Card.Title>
                                    </Card.Link>
                                </Card>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default BangDieuKhien
