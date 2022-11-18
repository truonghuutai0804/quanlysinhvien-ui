import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { MdAddBox } from 'react-icons/md'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import axios from 'axios'
import Swal from 'sweetalert2'

function MonHoc() {
    const [subjectInput, setSubjectInput] = useState({})
    const [subject, setSubject] = useState([])
    const [faculty, setFaculty] = useState([])
    const [editInfoPDT, setEditInfoPDT] = useState([])
    const [deleteInfoPDT, setDeleteInfoPDT] = useState([])

    const [showThemMoi, setShowThemMoi] = useState(false)
    const [showSuaLai, setShowSuaLai] = useState(false)
    const [showXoa, setShowXoa] = useState(false)

    const handleShowThemMoi = () => setShowThemMoi(true)
    const handleShowSuaLai = (info) => {
        setEditInfoPDT(info)
        setShowSuaLai(true)
    }
    const handleShowXoa = (info) => {
        setDeleteInfoPDT(info)
        setShowXoa(true)
    }

    const handleCloseThemMoi = () => setShowThemMoi(false)
    const handleCloseSuaLai = () => setShowSuaLai(false)
    const handleCloseXoa = () => setShowXoa(false)

    const getMonHoc = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/subject',
            }
            const response = await axios(options)
            const subjects = response.data.data
            if (response.data.status === 400) {
                setSubject(subjects)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getKhoa = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/faculty',
            }
            const response = await axios(options)
            const faculties = response.data.data
            if (response.data.status === 400) {
                setFaculty(faculties)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const createMonHoc = async () => {
        try {
            const options = {
                method: 'post',
                url: `http://localhost:8080/api/subject/`,
                data: subjectInput,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseThemMoi()
                Swal.fire('Thành công', 'Thêm môn học thành công ', 'success')
                getMonHoc()
            }
        } catch (error) {
            Swal.fire('Thất bại', `Lỗi ${error}`, 'error')
        }
    }

    const updateMonHoc = async (id) => {
        try {
            const options = {
                method: 'put',
                url: `http://localhost:8080/api/subject/${id}`,
                data: editInfoPDT,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseSuaLai()
                Swal.fire('Thành công', 'Sửa môn học thành công ', 'success')
                getMonHoc()
            }
        } catch (error) {
            Swal.fire('Thất bại', `Lỗi ${error}`, 'error')
        }
    }

    const deleteMonHoc = async (id) => {
        try {
            const options = {
                method: 'delete',
                url: `http://localhost:8080/api/subject/${id}`,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseXoa()
                Swal.fire('Thành công', 'Bạn đã xóa thành công ', 'success')
                getMonHoc()
            }
        } catch (error) {
            Swal.fire('Thất bại', `Lỗi ${error}`, 'error')
        }
    }

    useEffect(() => {
        getMonHoc()
        getKhoa()
    }, [getMonHoc, getKhoa])

    return (
        <>
            <aside className="ms-4">
                <h2 className="m-2">Thông tin môn học</h2>
                <aside className="d-flex justify-content-between m-3">
                    <Button variant="outline-primary" onClick={handleShowThemMoi}>
                        <MdAddBox /> Thêm môn học mới
                    </Button>
                </aside>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã môn học</th>
                            <th>Tên môn học</th>
                            <th>Tín chỉ</th>
                            <th>Hoạt động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subject &&
                            subject.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="table-text-center">{idx + 1}</td>
                                    <td className="table-text-center">{item.MA_MH}</td>
                                    <td>{item.TEN_MH}</td>
                                    <td className="table-text-center">{item.TIN_CHI}</td>
                                    <td className="table-text-center">
                                        <strong
                                            className="infor-edit"
                                            onClick={() => {
                                                handleShowSuaLai(item)
                                            }}
                                        >
                                            <FaEdit />
                                        </strong>
                                        <strong
                                            className="infor-remove"
                                            onClick={() => {
                                                handleShowXoa(item)
                                            }}
                                        >
                                            <FaTrashAlt />
                                        </strong>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </aside>

            <Modal show={showThemMoi} onHide={handleCloseThemMoi} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-new">
                        <MdAddBox size={50} />
                        THÊM MÔN HỌC MỚI
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Mã môn học</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="MA_MH"
                                onChange={(e) => setSubjectInput({ ...subjectInput, [e.target.name]: e.target.value })}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Tên môn học</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="TEN_MH"
                                onChange={(e) => setSubjectInput({ ...subjectInput, [e.target.name]: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Khoa</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_KHOA"
                                onChange={(e) => setSubjectInput({ ...subjectInput, [e.target.name]: e.target.value })}
                            >
                                <option value="">Chọn khoa</option>
                                {faculty &&
                                    faculty.map((item, idx) => (
                                        <>
                                            <option key={idx} value={item.MA_KHOA}>
                                                {item.TEN_KHOA}
                                            </option>
                                        </>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Tín chỉ</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="TIN_CHI"
                                onChange={(e) => setSubjectInput({ ...subjectInput, [e.target.name]: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseThemMoi}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={createMonHoc}>
                        Tạo mới
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSuaLai} onHide={handleCloseSuaLai} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-edit">
                        <FaEdit size={50} /> SỬA LẠI THÔNG TIN MÔN HỌC
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Mã môn học</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={editInfoPDT.MA_MH}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Tên môn học</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="TEN_MH"
                                value={editInfoPDT.TEN_MH}
                                onChange={(e) => setEditInfoPDT({ ...editInfoPDT, [e.target.name]: e.target.value })}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Khoa</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_KHOA"
                                value={editInfoPDT.MA_KHOA}
                                onChange={(e) => setEditInfoPDT({ ...editInfoPDT, [e.target.name]: e.target.value })}
                            >
                                <option value="">Chọn nhóm học phần</option>
                                {faculty &&
                                    faculty.map((item, idx) => (
                                        <>
                                            <option key={idx} value={item.MA_KHOA}>
                                                {item.TEN_KHOA}
                                            </option>
                                        </>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Tín chỉ</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="TIN_CHI"
                                value={editInfoPDT.TIN_CHI}
                                onChange={(e) => setEditInfoPDT({ ...editInfoPDT, [e.target.name]: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSuaLai}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={()=>updateMonHoc(editInfoPDT.MA_MH)}>
                        Lưu lại
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showXoa} onHide={handleCloseXoa} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-remove">
                        <FaTrashAlt size={50} /> XÓA THÔNG TIN MÔN HỌC
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Bạn có chắc chắn xóa thông tin của môn học <strong>{deleteInfoPDT.TEN_MH}</strong> này ?
                    </p>
                    <strong>Lưu ý:</strong> Nếu xóa thông tin sẽ mất vĩnh viễn
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => deleteMonHoc(deleteInfoPDT.MA_MH)}>
                        Chắc chắn
                    </Button>
                    <Button variant="secondary" onClick={handleCloseXoa}>
                        Trở về
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default MonHoc
