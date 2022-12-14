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
                    <GiReturnArrow /> Quay L???i
                </Link>
                <h2>K???T QU??? H???C T???P</h2>
                <Form className="form-ketquahoctap">
                    <Form.Group className="mb-3 d-flex">
                        <Form.Label>
                            <b>N??m h???c: </b>
                        </Form.Label>
                        <Form.Select
                            size="sm"
                            className="namhoc-ketquahoctap"
                            name="MA_NH"
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                        >
                            <option value="">Ch???n n??m h???c</option>
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
                            <b>H???c k??: </b>
                        </Form.Label>
                        <Form.Select
                            size="sm"
                            className="namhoc-ketquahoctap"
                            name="MA_HK"
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                        >
                            <option value="">Ch???n h???c k??</option>

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
                        Li???t k??
                    </Button>
                </Form>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>M?? m??n h???c</th>
                            <th>T??n m??n h???c</th>
                            <th>S??? t??n ch???</th>
                            <th>??i???m s???</th>
                            <th>??i???m ch???</th>
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
                                    Vui l??ng ch???n n??m h???c v?? h???c k?? r???i nh???n li???t k?? ????? xem ??i???m
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Row className="ms-3">
                    <Col>
                        <p>T???ng s??? t??n ch??? h???c k???:</p>
                        <p>T???ng s??? t??n ch??? t??ch l??y:</p>
                    </Col>
                    <Col>
                        <p>{tongTinChiHK}</p>
                        <p>{tongTinChiTL}</p>
                    </Col>
                    <Col>
                        <p>??i???m trung b??nh h???c k???:</p>
                        <p>??i???m trung b??nh t??ch l??y:</p>
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
