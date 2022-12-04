import React, { useCallback, useEffect, useState } from 'react'
import { Button, Container, Dropdown, Form, Modal, Table } from 'react-bootstrap'
import './DiemSinhVien.scss'
import axios from 'axios'
import Swal from 'sweetalert2'
import * as XLSX from 'xlsx'
import { Link } from 'react-router-dom'
import { GiReturnArrow } from 'react-icons/gi'

function KetQuaHocTap() {
    const [subject, setSubject] = useState([])
    const [input, setInput] = useState([])
    const [edit, setEdit] = useState([])
    const [selectedFile, setSelectedFile] = useState([])
    const [fileName, setFileName] = useState([])
    const [fileExcel, setFileExcel] = useState([])
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
                Toast.fire({
                    icon: 'success',
                    title: 'Thêm điểm thành công',
                })
                getDiemSV(MA_GV)
            } else if (response.data.err) {
                handleClose()
                Toast.fire({
                    icon: 'error',
                    title: 'Thất bại!',
                })
                console.log(response.data.err)
            } else {
                handleClose()
                Toast.fire({
                    icon: 'error',
                    title: 'Thất bại!',
                })
            }
        } catch (error) {
            handleClose()
            Toast.fire({
                icon: 'error',
                title: 'Thất bại!',
            })
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

    const ImportExcel = (e) => {
        try {
            setSelectedFile(e.target.files[0])
            if (e.target.files[0] !== undefined) {
                let filename = e.target.files[0].name
                setFileName(filename)
                if (typeof FileReader !== 'undefined') {
                    const reader = new FileReader()
                    if (reader.readAsBinaryString) {
                        reader.onload = (e) => {
                            processExcel(reader.result)
                        }
                        reader.readAsBinaryString(e.target.files[0])
                    }
                } else {
                    console.log('Trình duyệt không hỗ trợ HTML5.')
                }
            } else {
                console.log('Không đọc được file. Vui lòng thử lại!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const processExcel = (data) => {
        const workbook = XLSX.read(data, {
            type: 'binary',
        })
        const firstSheet = workbook.SheetNames[0]

        const excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet], {
            range: 16,
        })

        if (typeof excelRows === 'object') {
            setFileExcel(excelRows)
        }
    }

    console.log(fileExcel)

    return (
        <>
            <Container className="wrap-ketquahoctap">
                <aside className="d-flex m-3">
                    <Link to="/Teacher" className="btn btn-outline-primary me-3">
                        <GiReturnArrow /> Quay Lại
                    </Link>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" className="primary me-3">
                            Import/Export Điểm
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <label htmlFor="getFile" className="dropdown-item">
                                Import điểm từ Excel
                            </label>
                            <input
                                type="file"
                                accept=".xlsx, .xls"
                                className="d-none"
                                id="getFile"
                                onChange={ImportExcel}
                            />
                            <Dropdown.Item href="#/action-2">Export thành file Excel</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" className="primary me-3">
                            Thống kê điểm
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">In DSSV theo HP</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">In Điểm theo HP</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </aside>
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
                            getDiemSV(MA_GV)
                        }}
                    >
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
                            <th>Điểm chữ</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.length > 0 ? (
                            result.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="ketquahoctap-text">{idx + 1}</td>
                                    <td className="ketquahoctap-text">{item.MA_SV}</td>
                                    <td>{item.HOTEN_SV}</td>
                                    <td className="ketquahoctap-text">{item.DIEM_SO}</td>
                                    <td className="ketquahoctap-text">{item.DIEM_CHU}</td>
                                    <td className="ketquahoctap-text">
                                        {item.DIEM_SO ? (
                                            'ĐÃ THÊM'
                                        ) : (
                                            <Button onClick={() => handleShow(item)}>Thêm</Button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    Hiện tại vẫn chưa có dữ liệu
                                </td>
                            </tr>
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
