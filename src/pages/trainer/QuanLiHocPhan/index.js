import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Container, Modal, Table, Form } from 'react-bootstrap'
import { MdAddBox } from 'react-icons/md'
import { GiReturnArrow } from 'react-icons/gi'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

function QuanLiHocPhan() {
    const [year, setYear] = useState([])
    const [semester, setSemester] = useState([])
    const [subject, setSubject] = useState([])
    const [teacher, setTeacher] = useState([])
    const [group, setGroup] = useState([])

    const [showXoa, setShowXoa] = useState(false)
    const [showThemMoi, setShowThemMoi] = useState(false)
    const [showSuaLai, setShowSuaLai] = useState(false)

    const [deleteHP, setDeleteHP] = useState({})
    const [createInfoHocPhan, setCreateInfoHocPhan] = useState({})
    const [editInfoHocPhan, setEditInfoHocPhan] = useState({})

    const handleShowThemMoi = () => setShowThemMoi(true)
    const handleShowSuaLai = (info) => {
        setEditInfoHocPhan(info)
        setShowSuaLai(true)
    }
    const handleShowXoa = (info) => {
        setDeleteHP(info)
        setShowXoa(true)
    }
    
    const handleCloseSuaLai = () => setShowSuaLai(false)
    const handleCloseThemMoi = () => setShowThemMoi(false)
    const handleCloseXoa = () => setShowXoa(false)

    const getHocPhan = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/group',
            }
            const response = await axios(options)
            const groups = response.data.data
            if (response.data.status === 400) {
                setGroup(groups)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getMonHoc = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/subject`,
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

    const getGiaoVien = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/teacher',
            }
            const response = await axios(options)
            const teachers = response.data.dataGV
            if (response.data.status === 400) {
                setTeacher(teachers)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const setHocPhan = async () => {
        try {
            const options = {
                method: 'post',
                url: `http://localhost:8080/api/group`,
                data: createInfoHocPhan,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseThemMoi()
                getHocPhan()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateHocPhan = async (id) => {
        try {
            const options = {
                method: 'put',
                url: `http://localhost:8080/api/group/${id}`,
                data: editInfoHocPhan,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseSuaLai()
                getHocPhan()
            }
            else{
                handleCloseSuaLai()  
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteHocPhan = async (id) => {
        try {
            const options = {
                method: 'delete',
                url: `http://localhost:8080/api/group/${id}`,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseXoa()
                getHocPhan()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getHocPhan()
        getMonHoc()
        getNamHoc()
        getHocKi()
        getGiaoVien()
    }, [getHocPhan, getMonHoc, getNamHoc, getHocKi, getGiaoVien])

    return (
        <>
            <Container>
                <aside className="ms-4">
                    <h2 className="my-5 text-center">DANH SÁCH NHÓM HỌC PHẦN</h2>
                    <aside className="d-flex justify-content-between m-3">
                        <Link className="btn btn-outline-secondary" to="/Trainer">
                            <GiReturnArrow /> Quay Lại
                        </Link>
                        <Button variant="outline-primary" onClick={handleShowThemMoi}>
                            <MdAddBox /> Thêm học phần mới
                        </Button>
                    </aside>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Mã nhóm HP</th>
                                <th>Tên môn học</th>
                                <th>Họ tên giáo viên</th>
                                <th>Học kỳ</th>
                                <th>Năm học</th>
                                <th>Số lượng</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {group &&
                                group.map((item, idx) => (
                                    <tr>
                                        <td className="table-text-center">{idx + 1}</td>
                                        <td className="table-text-center">{item.MA_NHP}</td>
                                        <td>{item.TEN_MH}</td>
                                        <td>{item.HOTEN_GV}</td>
                                        <td className="table-text-center" >{item.HOC_KY}</td>
                                        <td>{item.NAM_HOC}</td>
                                        <td className="table-text-center">
                                            {item.CON_LAI}/{item.SO_LUONG}
                                        </td>
                                        <td className="table-text-center">
                                            <strong className="infor-edit" onClick={()=>handleShowSuaLai(item)}>
                                                <FaEdit />
                                            </strong>
                                            <strong className="infor-remove" onClick={() => handleShowXoa(item)}>
                                                <FaTrashAlt />
                                            </strong>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </aside>
            </Container>

            <Modal show={showThemMoi} onHide={handleCloseThemMoi} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-new">
                        <MdAddBox size={50} />
                        THÊM SINH VIÊN MỚI
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Tên môn học</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_MH"
                                onChange={(e) =>
                                    setCreateInfoHocPhan({ ...createInfoHocPhan, [e.target.name]: e.target.value })
                                }
                            >
                                <option value="">Chọn môn học</option>
                                {subject &&
                                    subject.map((item, idx) => (
                                        <option key={idx} value={item.MA_MH}>
                                            {item.TEN_MH}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Giảng viên</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_GV"
                                onChange={(e) =>
                                    setCreateInfoHocPhan({ ...createInfoHocPhan, [e.target.name]: e.target.value })
                                }
                            >
                                <option value="">Chọn giáo viên</option>
                                {teacher &&
                                    teacher.map((item, idx) => (
                                        <option key={idx} value={item.MA_GV}>
                                            {item.HOTEN_GV}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Số lượng</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="SO_LUONG"
                                onChange={(e) =>
                                    setCreateInfoHocPhan({ ...createInfoHocPhan, [e.target.name]: e.target.value })
                                }
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Học kì</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_HK"
                                onChange={(e) =>
                                    setCreateInfoHocPhan({ ...createInfoHocPhan, [e.target.name]: e.target.value })
                                }
                            >
                                <option value="">Chọn học kì</option>
                                {semester &&
                                    semester.map((item, idx) => (
                                        <option key={idx} value={item.MA_HK}>
                                            {item.HOC_KY}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Năm học</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_NH"
                                onChange={(e) =>
                                    setCreateInfoHocPhan({ ...createInfoHocPhan, [e.target.name]: e.target.value })
                                }
                            >
                                <option value="">Chọn năm học</option>
                                {year &&
                                    year.map((item, idx) => (
                                        <option key={idx} value={item.MA_NH}>
                                            {item.NAM_HOC}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseThemMoi}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={setHocPhan}>
                        Tạo mới
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSuaLai} onHide={handleCloseSuaLai} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-edit">
                        <FaEdit size={50} /> SỬA LẠI HỌC PHẦN
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Mã nhóm học phần</strong>
                            </Form.Label>
                            <Form.Control defaultValue={editInfoHocPhan.MA_NHP} type="text" disabled />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Tên môn học</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_MH"
                                value={editInfoHocPhan.MA_MH}
                                onChange={(e) =>
                                    setEditInfoHocPhan({ ...editInfoHocPhan, [e.target.name]: e.target.value })
                                }
                            >
                                {subject &&
                                    subject.map((item, idx) => (
                                        <option key={idx} value={item.MA_MH}>
                                            {item.TEN_MH}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Giảng viên</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_GV"
                                value={editInfoHocPhan.MA_GV}
                                onChange={(e) =>
                                    setEditInfoHocPhan({ ...editInfoHocPhan, [e.target.name]: e.target.value })
                                }
                            >
                                <option value="">Chọn giáo viên</option>
                                {teacher &&
                                    teacher.map((item, idx) => (
                                        <option key={idx} value={item.MA_GV}>
                                            {item.HOTEN_GV}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Số lượng</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={editInfoHocPhan.SO_LUONG}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Học kì</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_HK"
                                value={editInfoHocPhan.MA_HK}
                                onChange={(e) =>
                                    setEditInfoHocPhan({ ...editInfoHocPhan, [e.target.name]: e.target.value })
                                }
                            >
                                <option value="">Chọn học kì</option>
                                {semester &&
                                    semester.map((item, idx) => (
                                        <option key={idx} value={item.MA_HK}>
                                            {item.HOC_KY}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Năm học</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_NH"
                                value={editInfoHocPhan.MA_NH}
                                onChange={(e) =>
                                    setEditInfoHocPhan({ ...editInfoHocPhan, [e.target.name]: e.target.value })
                                }
                            >
                                <option value="">Chọn năm học</option>
                                {year &&
                                    year.map((item, idx) => (
                                        <option key={idx} value={item.MA_NH}>
                                            {item.NAM_HOC}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSuaLai}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={()=>updateHocPhan(editInfoHocPhan.MA_NHP)}>
                        Lưu lại
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showXoa} onHide={handleCloseXoa} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-remove">
                        <FaTrashAlt size={50} /> XÓA HỌC PHẦN
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Bạn có chắc chắn xóa thông tin của học phần <strong>{deleteHP.MA_NHP}</strong> này ?
                    </p>
                    <strong>Lưu ý:</strong> Nếu xóa thông tin sẽ mất vĩnh viễn
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => deleteHocPhan(deleteHP.MA_NHP)}>
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

export default QuanLiHocPhan
