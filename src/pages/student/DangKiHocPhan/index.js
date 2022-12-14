import React, { useCallback, useEffect, useState } from 'react'
import { Button, Container, Form, Modal, Table } from 'react-bootstrap'
import './DangKiHocPhan.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { GiReturnArrow } from 'react-icons/gi'

function KetQuaHocTap() {
    const [subject, setSubject] = useState([])
    const [group, setGroup] = useState([])
    const [year, setYear] = useState([])
    const [semester, setSemester] = useState([])
    const [createScore, setCreateScore] = useState([])
    const [findGroup, setFindGroup] = useState([])
    const [show, setShow] = useState(false)
    const MA_SV = localStorage.getItem('login')

    const handleClose = () => setShow(false)

    const handleShow = (info) => {
        getNamHoc()
        setCreateScore(info)
        setShow(true)
    }

    const handleShowHocKi = e =>{
        getHocKi()
        setFindGroup(e)
    }

    const handleShowHocPhan = e =>{
        getHocPhan(createScore.MA_MH, findGroup, e)
    }

    const getMonHoc = useCallback(async (id) => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/subjects/${id}`,
            }
            const response = await axios(options)
            const subjects = response.data.data
            if (response.data.message === 'SUCCESS') {
                setSubject(subjects)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getHocPhan = async (id, maNH, maHK) => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/group/${id}?MA_HK=${maHK}&MA_NH=${maNH}`,
            }
            const response = await axios(options)
            const groups = response.data.data
            if (response.data.message === 'SUCCESS') {
                setGroup(groups)
            }
        } catch (error) {
            console.log(error)
        }
    }

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

    const setDiem = async (id) => {
        try {
            const options = {
                method: 'post',
                url: `http://localhost:8080/api/score/${id}`,
                data: createScore,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                getMonHoc(MA_SV)
                handleClose()
                Swal.fire('Th??nh c??ng', '????ng k?? h???c ph???n th??nh c??ng ', 'success')
            } else {
                handleClose()
                Swal.fire('Th???t b???i', '????ng k?? h???c ph???n kh??ng th??nh c??ng', 'error')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMonHoc(MA_SV)
    }, [getMonHoc, MA_SV])

    return (
        <>
            <Container className="wrap-ketquahoctap">
                <Link to="/" className="btn btn-outline-primary m-3">
                    <GiReturnArrow /> Quay L???i
                </Link>
                <h2>????NG K?? H???C PH???N</h2>

                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>M?? m??n h???c</th>
                            <th>T??n m??n h???c</th>
                            <th>S??? t??n ch???</th>
                            <th>H??nh ?????ng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subject ? (
                            subject.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="ketquahoctap-text">{idx + 1}</td>
                                    <td className="ketquahoctap-text">{item.MA_MH}</td>
                                    <td>{item.TEN_MH}</td>
                                    <td className="ketquahoctap-text">{item.TIN_CHI}</td>
                                    <td className="ketquahoctap-text">
                                        <Button size="sm" onClick={() => handleShow(item)}>
                                            <FaPlus /> ????ng k??
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td>B???n ???? ????ng k?? h???t t???t c??? m??n h???c m?? b???n c?? th??? h???c</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>????ng k?? h???c ph???n {createScore.TEN_MH}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>T??n m??n h???c</Form.Label>
                            <Form.Control type="text" defaultValue={createScore.TEN_MH} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>N??m h???c</Form.Label>
                            <Form.Select
                                className="namhoc-ketquahoctap"
                                onChange={(e) => handleShowHocKi(e.target.value)}
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
                        <Form.Group className="mb-3">
                            <Form.Label>H???c k??</Form.Label>
                            <Form.Select
                                className="namhoc-ketquahoctap"
                                onChange={(e) => handleShowHocPhan(e.target.value)}
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
                        <Form.Group className="mb-3">
                            <Form.Label>Nh??m h???c ph???n</Form.Label>
                            <Form.Select
                                className="namhoc-ketquahoctap"
                                name="MA_NHP"
                                onChange={(e) => setCreateScore({ ...createScore, [e.target.name]: e.target.value })}
                            >
                                <option value="">Ch???n nh??m h???c ph???n</option>
                                {group &&
                                    group.map((item, idx) => (
                                        <>
                                            <option key={idx} value={item.MA_NHP}>
                                                {item.TEN_MH} {item.MA_NHP}
                                            </option>
                                        </>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        H???y
                    </Button>
                    <Button variant="primary" onClick={() => setDiem(MA_SV)}>
                        X??c nh???n
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default KetQuaHocTap
