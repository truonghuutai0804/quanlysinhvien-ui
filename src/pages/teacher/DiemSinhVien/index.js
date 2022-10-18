import React, { useCallback, useEffect, useState } from 'react'
import { Button, Container, Form, Modal, Table } from 'react-bootstrap'
import './DiemSinhVien.scss'
import axios from 'axios'
import Swal from 'sweetalert2'

function KetQuaHocTap() {
    const [year, setYear] = useState([])
    const [semester, setSemester] = useState([])
    const [subject, setSubject] = useState([])
    const [input, setInput] = useState([])
    const [edit, setEdit] = useState([])
    const [editDiem, setEditDiem] = useState([])
    const [result, setResult] = useState([])
    const MA_GV = localStorage.getItem('login')

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = (info) => {
        setShow(true)
        setEdit(info)
    }

    const getMonHoc = useCallback(async (id) => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/subject/${id}`,
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

    const getDiemSV = async (id) => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/scoreGV/${id}?MA_NH=${input.MA_NH}&MA_HK=${input.MA_HK}&MA_NHP=${input.MA_NHP}`,
            }
            const response = await axios(options)
            const results = response.data.dataDiem
            if (response.data.message === 'SUCCESS') {
                setResult(results)
            }
            console.log(results)
        } catch (error) {
            console.log(error)
        }
    }

    const editDiemSV = async (id, maSV) => {
        try {
            const options = {
                method: 'put',
                url: `http://localhost:8080/api/score/${id}?MA_SV=${maSV}`,
                data: editDiem,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleClose()
                getDiemSV(MA_GV)
                Toast.fire({
                    icon: 'success',
                    title: 'Thêm điểm thành công',
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMonHoc(MA_GV)
        getNamHoc()
        getHocKi()
    }, [getNamHoc, getHocKi, getMonHoc, MA_GV])

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
    })

    return (
        <>
            <Container className="wrap-ketquahoctap">
                <h2>DANH SÁCH ĐIỂM SINH VIÊN</h2>
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
                    <Form.Group className="mb-3 d-flex">
                        <Form.Label>
                            <b>Học phần: </b>
                        </Form.Label>
                        <Form.Select
                            size="sm"
                            className="namhoc-ketquahoctap"
                            name="MA_NHP"
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                        >
                            {subject &&
                                subject.map((item, idx) => (
                                    <>
                                        <option key={idx} value={item.MA_NHP}>
                                            {item.TEN_MH} {item.MA_NHP.slice(-2)}
                                        </option>
                                    </>
                                ))}
                        </Form.Select>
                    </Form.Group>
                    <Button className="ms-3 button-ketquahoctap" size="sm" onClick={() => getDiemSV(MA_GV)}>
                        Liệt kê
                    </Button>
                </Form>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã sinh viên</th>
                            <th>Họ tên sinh viên</th>
                            <th>Điểm số</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result &&
                            result.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="ketquahoctap-text">{idx + 1}</td>
                                    <td className="ketquahoctap-text">{item.MA_SV}</td>
                                    <td>{item.HOTEN_SV}</td>
                                    <td className="ketquahoctap-text">{item.DIEM_SO}</td>
                                    <td className="ketquahoctap-text">
                                        {item.DIEM_SO === '' ? (
                                            <Button onClick={() => handleShow(item)}>Thêm</Button>
                                        ) : (
                                            'ĐÃ THÊM'
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm điểm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Mã sinh viên</Form.Label>
                            <Form.Control type="text" value={edit.MA_SV} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Họ tên sinh viên</Form.Label>
                            <Form.Control type="text" value={edit.HOTEN_SV} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Điểm số</Form.Label>
                            <Form.Control
                                type="text"
                                name="DIEM_SO"
                                defaultValue={edit.DIEM_SO}
                                onChange={(e) => setEditDiem({ ...editDiem, [e.target.name]: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => editDiemSV(edit.MA_NHP, edit.MA_SV)}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default KetQuaHocTap
