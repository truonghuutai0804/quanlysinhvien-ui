import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import './KetQuaHocTap.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { GiReturnArrow } from 'react-icons/gi'

function KetQuaHocTap() {
    const [year, setYear] = useState([])
    const [semester, setSemester] = useState([])
    const [input, setInput] = useState([])
    const [ketQua, setKetQua] = useState([])

    const [resultAll, setResultAll] = useState([])
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

    const getTatCaKetQuaSV = useCallback(async (id) => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/scores/${id}`,
            }
            const response = await axios(options)
            const results = response.data.data
            if (response.data.message === 'SUCCESS') {
                setResultAll(results)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getKetQua = useCallback(
        async (id) => {
            try {
                const options = {
                    method: 'get',
                    url: `http://localhost:8080/api/score/${id}?MA_NH=${input.MA_NH}&MA_HK=${input.MA_HK}`,
                }
                const response = await axios(options)
                const results = response.data.data
                if (response.data.status === 400) {
                    setKetQua(results)
                    getTatCaKetQuaSV(MA_SV)
                }
            } catch (error) {
                console.log(error)
            }
        },
        [input.MA_HK, input.MA_NH, getTatCaKetQuaSV, MA_SV],
    )

    useEffect(() => {
        getNamHoc()
        getHocKi()
    }, [getNamHoc, getHocKi, MA_SV])

    var tongDiemTBHK = 0
    var tongDiemHK = 0
    var tongTinChiHK = 0

    var tongDiemTBTL = 0
    var tongDiemTL = 0
    var tongTinChiTL = 0

    if (ketQua.length > 0) {
        ketQua.forEach((item) => {
            tongDiemHK += item.DIEM_SO * item.TIN_CHI
            tongTinChiHK += item.TIN_CHI
        })
        tongDiemTBHK = (4 * (tongDiemHK / tongTinChiHK)) / 10
    }

    if (resultAll.length > 0) {
        resultAll.forEach((item) => {
            tongDiemTL += item.DIEM_SO * item.TIN_CHI
            tongTinChiTL += item.TIN_CHI
        })
        tongDiemTBTL = (4 * (tongDiemTL / tongTinChiTL)) / 10
    }

    return (
        <>
            <Container className="wrap-ketquahoctap">
                <Link to="/" className="btn btn-outline-primary m-3">
                    <GiReturnArrow /> Quay Lại
                </Link>
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
                            <option value="">Chọn năm học</option>
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
                            <option value="">Chọn học kì</option>

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
                    <Button className="ms-3 button-ketquahoctap" size="sm" onClick={() => getKetQua(MA_SV)}>
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
                        {ketQua.length > 0 ? (
                            ketQua.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="ketquahoctap-text">{idx + 1}</td>
                                    <td className="ketquahoctap-text">{item.MA_MH}</td>
                                    <td>{item.TEN_MH}</td>
                                    <td className="ketquahoctap-text">{item.TIN_CHI}</td>
                                    <td className="ketquahoctap-text">{item.DIEM_SO}</td>
                                    <td className="ketquahoctap-text">{item.DIEM_CHU}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    Vui lòng chọn năm học và học kì rồi nhấn liệt kê để xem điểm
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Row className="ms-3">
                    <Col>
                        <p>Tổng số tín chỉ học kỳ:</p>
                        <p>Tống số tín chỉ tích lũy:</p>
                    </Col>
                    <Col>
                        <p>{tongTinChiHK}</p>
                        <p>{tongTinChiTL}</p>
                    </Col>
                    <Col>
                        <p>Ðiểm trung bình học kỳ:</p>
                        <p>Ðiểm trung bình tích lũy:</p>
                    </Col>
                    <Col>
                        <p>{tongDiemTBHK.toFixed(2)}</p>
                        <p>{tongDiemTBTL.toFixed(2)}</p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default KetQuaHocTap
