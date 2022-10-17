import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import './KetQuaHocTap.scss'
import axios from 'axios'

function KetQuaHocTap() {
    const [year, setYear] = useState([])
    const [semester, setSemester] = useState([])
    const [input, setInput] = useState([])
    const [result, setResult] = useState([])
    const MA_SV = localStorage.getItem('login')

    const getNamHoc = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/year',
            }
            const response = await axios(options)
            const years = response.data.data
            if (response.data.message === 'SUCCESS') {
                setYear(years)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getHocKi = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/semester',
            }
            const response = await axios(options)
            const semesters = response.data.data
            if (response.data.message === 'SUCCESS') {
                setSemester(semesters)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getKetQua = async (id) => {
        try {
            //e.preventDefault()
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/scoreSV/${id}?MA_NH=${input.MA_NH}&MA_HK=${input.MA_HK}`,
            }
            const response = await axios(options)
            const results = response.data.dataDiem
            if (response.data.message === 'SUCCESS') {
                setResult(results)
            }
            console.log(result);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getNamHoc()
        getHocKi()
    }, [getNamHoc, getHocKi])

    return (
        <>
            <Container className="wrap-ketquahoctap">
                <h2>KẾT QUẢ HỌC TẬP</h2>
                <Form className="form-ketquahoctap">
                    <Form.Group className="mb-3 d-flex">
                        <Form.Label>
                            <b>Năm học: </b>
                        </Form.Label>
                        <Form.Select
                            size="sm"
                            className="namhoc-ketquahoctap"
                            name="MA_NH"
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                        >
                            {year &&
                                year.map((item, idx) => (
                                    <>
                                        <option key={idx} value={item.MA_NH}>
                                            {item.NAM_HOC}
                                        </option>
                                    </>
                                ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex">
                        <Form.Label>
                            <b>Học kì: </b>
                        </Form.Label>
                        <Form.Select
                            size="sm"
                            className="namhoc-ketquahoctap"
                            name="MA_HK"
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                        >
                            {semester &&
                                semester.map((item, idx) => (
                                    <>
                                        <option key={idx} value={item.MA_HK}>
                                            {item.HOC_KY}
                                        </option>
                                    </>
                                ))}
                        </Form.Select>
                    </Form.Group>
                    <Button className="ms-3 button-ketquahoctap" size="sm" onClick={()=>getKetQua(MA_SV)}>
                        Liệt kê
                    </Button>
                </Form>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã môn học</th>
                            <th>Tên môn học</th>
                            <th>Số tín chỉ</th>
                            <th>Điểm số</th>
                            <th>Điểm chữ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result &&
                            result.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="ketquahoctap-text">{idx + 1}</td>
                                    <td className="ketquahoctap-text">{item.MA_MH}</td>
                                    <td>{item.TEN_MH}</td>
                                    <td className="ketquahoctap-text">{item.TIN_CHI}</td>
                                    <td className="ketquahoctap-text">{item.DIEM_SO}</td>
                                    <td className="ketquahoctap-text">{item.DIEM_CHU}</td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
                <Row className="ms-3">
                    <Col>
                        <p>Tổng số tín chỉ tích lũy học kỳ:</p>
                        <p>Tống số tín chỉ tích lũy:</p>
                    </Col>
                    <Col>
                        <p>Ðiểm trung bình học kỳ:</p>
                        <p>Ðiểm trung bình tích lũy:</p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default KetQuaHocTap
