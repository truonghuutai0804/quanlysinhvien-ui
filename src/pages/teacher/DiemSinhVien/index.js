import React, { useCallback, useEffect, useState } from 'react'
import { Button, Container, Form, Modal, Table } from 'react-bootstrap'
import './DiemSinhVien.scss'
import axios from 'axios'
import Swal from 'sweetalert2'

function KetQuaHocTap() {
    const [subject, setSubject] = useState([])
    const [input, setInput] = useState([])
    const [edit, setEdit] = useState([])
    const [resultBlockchain, setResultBlockchain] = useState([])
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

    const getDiemSVBlockchain = async () => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/scoreGV/Blockchain/${input.MA_NHP}`,
            }
            const response = await axios(options)
            const results = response.data.data
            if (response.data.message === 'SUCCESS') {
                setResultBlockchain(results)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getDiemSV = async (id) => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/scoreGV/${id}?MA_NHP=${input.MA_NHP}`,
            }
            const response = await axios(options)
            const results = response.data.dataDiem
            if (response.data.message === 'SUCCESS') {
                setResult(results)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const setDiemSVBlockchain = async (id, maSV) => {
        try {
            const options = {
                method: 'post',
                url: `http://localhost:8080/api/scoreGV/${id}?MA_SV=${maSV}`,
                data: edit,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleClose()
                getDiemSVBlockchain()
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
    }, [getMonHoc, MA_GV])

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
                            <b>Học phần: </b>
                        </Form.Label>
                        <Form.Select
                            size="sm"
                            className="namhoc-ketquahoctap"
                            name="MA_NHP"
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                        >
                            <option value="">Chọn nhóm học phần</option>

                            {subject &&
                                subject.map((item, idx) => (
                                    <>
                                        <option key={idx} value={item.MA_NHP}>
                                            {item.TEN_MH} {item.MA_NHP}
                                        </option>
                                    </>
                                ))}
                        </Form.Select>
                    </Form.Group>
                    <Button
                        className="ms-3 button-ketquahoctap"
                        size="sm"
                        onClick={() => {
                            getDiemSVBlockchain()
                            getDiemSV(MA_GV)
                        }}
                    >
                        Liệt kê
                    </Button>
                </Form>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Mã sinh viên</th>
                            <th>Họ tên sinh viên</th>
                            <th>Điểm số</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultBlockchain &&
                            resultBlockchain.map((item, idx) =>
                                item[2] !== '' ? (
                                    <tr key={idx}>
                                        <td className="ketquahoctap-text">{item[2]}</td>
                                        <td>{item[3]}</td>
                                        <td className="ketquahoctap-text">{item[7]}</td>
                                        <td className="ketquahoctap-text">ĐÃ THÊM</td>
                                    </tr>
                                ) : null,
                            )}

                        {result &&
                            result.map((item, idx) =>
                                item.THEM_DIEM !== 1 ? (
                                    <tr key={idx}>
                                        <td className="ketquahoctap-text">{item.MA_SV}</td>
                                        <td>{item.HOTEN_SV}</td>
                                        <td className="ketquahoctap-text">{item.DIEM_SO}</td>
                                        <td className="ketquahoctap-text">
                                            <Button onClick={() => handleShow(item)}>Thêm</Button>
                                        </td>
                                    </tr>
                                ) : null,
                            )}
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
                            <Form.Control type="text" name="HOTEN_SV" value={edit.HOTEN_SV} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Điểm số</Form.Label>
                            <Form.Control
                                type="text"
                                name="DIEM_SO"
                                defaultValue={edit.DIEM_SO}
                                onChange={(e) => {
                                    setEdit({ ...edit, [e.target.name]: e.target.value })
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => setDiemSVBlockchain(edit.MA_NHP, edit.MA_SV)}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default KetQuaHocTap
