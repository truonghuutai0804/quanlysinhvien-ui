import React from 'react'
import { Button, Container, Form, Table } from 'react-bootstrap'
import './DangKiHocPhan.scss'
// import axios from 'axios'

function KetQuaHocTap() {
    // useEffect(() => {
    // }, [])

    return (
        <>
            <Container className="wrap-ketquahoctap">
                <h2>ĐĂNG KÍ HỌC PHẦN</h2>
                <aside>
                    <b>Năm học: </b>
                    <Form.Select size="sm" className="namhoc-ketquahoctap">
                        <option value="1">2019-2020</option>
                        <option value="2">2020-2021</option>
                        <option value="3">2021-2022</option>
                    </Form.Select>
                    <b>Học kì: </b>
                    <Form.Select size="sm" className="namhoc-ketquahoctap">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">hè</option>
                    </Form.Select>
                </aside>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã môn học</th>
                            <th>Tên môn học</th>
                            <th>Số tín chỉ</th>
                            <th>Nhóm học phần</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="ketquahoctap-text">1</td>
                            <td className="ketquahoctap-text">CT147</td>
                            <td>Lập trinh</td>
                            <td className="ketquahoctap-text">3</td>
                            <td className="ketquahoctap-select">
                                <Form.Select size="sm" className="namhoc-ketquahoctap">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </Form.Select>
                            </td>
                            <td className="ketquahoctap-text">
                                <Button size="sm">Đăng kí</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default KetQuaHocTap
