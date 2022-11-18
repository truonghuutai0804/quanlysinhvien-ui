import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap'
import { MdAddBox } from 'react-icons/md'
import { FaTrashAlt, FaEdit, FaEye } from 'react-icons/fa'
import imageNguoiDung from '~/asset/images/icon_user.png'
import axios from 'axios'
import { GiReturnArrow } from 'react-icons/gi'
import { Link } from 'react-router-dom'

function DanhSachSinhVien() {
    const [student, setStudent] = useState([])
    const [infoClass, setInfoClass] = useState([])
    const [infoProvince, setInfoProvince] = useState([])
    const [createInfoStudent, setCreateInfoStudent] = useState([])

    const [infoSV, setInfoSV] = useState({})
    const [editInfoSV, setEditInfoSV] = useState({})
    const [deleteInfoSV, setDeleteInfoSV] = useState({})

    const [showThemMoi, setShowThemMoi] = useState(false)
    const [showXemThongTin, setShowXemThongTin] = useState(false)
    const [showSuaLai, setShowSuaLai] = useState(false)
    const [showXoa, setShowXoa] = useState(false)

    const handleShowThemMoi = () => setShowThemMoi(true)

    const handleShowXemThongTin = (info) => {
        setInfoSV(info)
        setShowXemThongTin(true)
    }
    const handleShowSuaLai = (info) => {
        setEditInfoSV(info)
        setShowSuaLai(true)
    }

    const handleShowXoa = (info) => {
        setDeleteInfoSV(info)
        setShowXoa(true)
    }

    const handleCloseThemMoi = () => setShowThemMoi(false)
    const handleCloseXemThongTin = () => setShowXemThongTin(false)
    const handleCloseSuaLai = () => setShowSuaLai(false)
    const handleCloseXoa = () => setShowXoa(false)

    const getSinhVien = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/student',
            }
            const response = await axios(options)
            const students = response.data.data
            if (response.data.status === 400) {
                setStudent(students)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getLop = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/class',
            }
            const response = await axios(options)
            const classes = response.data.data
            if (response.data.status === 400) {
                setInfoClass(classes)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getTinh = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/province',
            }
            const response = await axios(options)
            const provinces = response.data.data
            if (response.data.status === 400) {
                setInfoProvince(provinces)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const setSinhVien = async () => {
        try {
            const options = {
                method: 'post',
                url: 'http://localhost:8080/api/student',
                data: createInfoStudent,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseThemMoi()
                getSinhVien()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const editSinhVien = async (id) => {
        try {
            const options = {
                method: 'put',
                url: `http://localhost:8080/api/student/${id}`,
                data: editInfoSV,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseSuaLai()
                getSinhVien()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deteleSinhVien = async (id) => {
        try {
            const options = {
                method: 'delete',
                url: `http://localhost:8080/api/student/${id}`,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseXoa()
                getSinhVien()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSinhVien()
        getLop()
        getTinh()
    }, [getSinhVien, getLop, getTinh])

    return (
        <>
            <Container>
                <aside className="ms-4">
                    <h2 className="my-5 text-center">DANH SÁCH SINH VIÊN</h2>
                    <aside className="d-flex justify-content-between m-3">
                        <Link className="btn btn-outline-secondary" to="/Trainer">
                            <GiReturnArrow /> Quay Lại
                        </Link>
                        <Button variant="outline-primary" onClick={handleShowThemMoi}>
                            <MdAddBox /> Thêm sinh viên mới
                        </Button>
                    </aside>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>MSSV</th>
                                <th>Họ tên</th>
                                <th>Giới tính</th>
                                <th>Ngày sinh</th>
                                <th>Lớp</th>
                                <th>Ngành học</th>
                                <th>Khoa</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {student &&
                                student.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="table-text-center">{idx + 1}</td>
                                        <td>{item.MA_SV}</td>
                                        <td>{item.HOTEN_SV}</td>
                                        <td>{item.GIOITINH_SV === 1 ? 'Nam' : 'Nữ'}</td>
                                        <td>{item.NGAYSINH_SV}</td>
                                        <td>{item.TEN_LOP}</td>
                                        <td>{item.TEN_CN}</td>
                                        <td>{item.TEN_KHOA}</td>
                                        <td className="table-text-center">
                                            <strong
                                                className="infor-see"
                                                onClick={() => {
                                                    handleShowXemThongTin(item)
                                                }}
                                            >
                                                <FaEye />
                                            </strong>

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
                                <strong>Mã số</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="MA_SV"
                                onChange={(e) =>
                                    setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                }
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Họ và Tên</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="HOTEN_SV"
                                onChange={(e) =>
                                    setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Ngày sinh</strong>
                            </Form.Label>
                            <Form.Control
                                type="date"
                                name="NGAYSINH_SV"
                                onChange={(e) =>
                                    setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Giới tính</strong>
                            </Form.Label>
                            <Form.Select
                                name="GIOITINH_SV"
                                onChange={(e) =>
                                    setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                }
                            >
                                <option value=" ">Chọn giới tính</option>
                                <option value="1">Nam</option>
                                <option value="0">Nữ</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Lớp</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_LOP"
                                onChange={(e) =>
                                    setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                }
                            >
                                <option value=" ">Chọn lớp</option>
                                {infoClass &&
                                    infoClass.map((item, idx) => (
                                        <option key={idx} value={item.MA_LOP}>
                                            {item.TEN_LOP}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Số điện thoại</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="SODIENTHOAI_SV"
                                onChange={(e) =>
                                    setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Địa chỉ</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_TINH"
                                onChange={(e) =>
                                    setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                }
                            >
                                <option value=" ">Chọn tỉnh thành</option>
                                {infoProvince &&
                                    infoProvince.map((item, idx) => (
                                        <option key={idx} value={item.MA_TINH}>
                                            {item.TINH_THANH}
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
                    <Button variant="primary" onClick={setSinhVien}>
                        Tạo mới
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showXemThongTin} onHide={handleCloseXemThongTin} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-see">
                        <FaEye size={50} /> THÔNG TIN SINH VIÊN
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <Col xs={6} md={4}>
                                <img
                                    src={imageNguoiDung}
                                    className="hinhanh_sinhvien"
                                    alt="Hình ảnh người dùng mặc nhiên"
                                />
                            </Col>
                            <Col xs={12} md={8}>
                                <aside>
                                    <p>
                                        <strong>MSSV: </strong> {infoSV.MA_SV}
                                    </p>
                                    <p>
                                        <strong>Họ tên: </strong> {infoSV.HOTEN_SV}
                                    </p>
                                    <p>
                                        <strong>Ngày sinh: </strong> {infoSV.NGAYSINH_SV}
                                    </p>
                                    <p>
                                        <strong>Lớp: </strong> {infoSV.TEN_LOP}
                                    </p>
                                    <p>
                                        <strong>Chuyên ngành: </strong> {infoSV.TEN_CN}
                                    </p>
                                    <p>
                                        <strong>Khoa: </strong> {infoSV.TEN_KHOA}
                                    </p>
                                    <p>
                                        <strong>Điện thoại liên lạc: </strong> {infoSV.SODIENTHOAI_SV}
                                    </p>
                                    <p>
                                        <strong>Địa chỉ liên lạc: </strong> {infoSV.TINH_THANH}
                                    </p>
                                </aside>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseXemThongTin}>
                        Trở về
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSuaLai} onHide={handleCloseSuaLai} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-edit">
                        <FaEdit size={50} /> SỬA LẠI THÔNG TIN SINH VIÊN
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Mã số</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="HOTEN_SV"
                                    value={editInfoSV.MA_SV}
                                    onChange={(e) =>
                                        setEditInfoSV({
                                            ...editInfoSV,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Họ Tên</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="HOTEN_SV"
                                    value={editInfoSV.HOTEN_SV}
                                    onChange={(e) =>
                                        setEditInfoSV({
                                            ...editInfoSV,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Ngày sinh</strong>
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    name="NGAYSINH_SV"
                                    value={editInfoSV.NGAYSINH_SV}
                                    onChange={(e) =>
                                        setEditInfoSV({
                                            ...editInfoSV,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Giới tính</strong>
                                </Form.Label>
                                <Form.Select
                                    name="GIOITINH_SV"
                                    value={editInfoSV.GIOITINH_SV}
                                    onChange={(e) =>
                                        setEditInfoSV({
                                            ...editInfoSV,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                >
                                    <option value="1">Nam</option>
                                    <option value="0">Nữ</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Lớp</strong>
                                </Form.Label>
                                <Form.Select
                                    name="MA_LOP"
                                    value={editInfoSV.MA_LOP}
                                    onChange={(e) =>
                                        setEditInfoSV({
                                            ...editInfoSV,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                >
                                    {infoClass &&
                                        infoClass.map((item, idx) => (
                                            <option key={idx} value={item.MA_LOP} >
                                                {item.TEN_LOP}
                                            </option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Số điện thoại</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="SODIENTHOAI_SV"
                                    value={editInfoSV.SODIENTHOAI_SV}
                                    onChange={(e) =>
                                        setEditInfoSV({
                                            ...editInfoSV,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Địa chỉ liên lạc</strong>
                                </Form.Label>
                                <Form.Select
                                    name="MA_TINH"
                                    value={editInfoSV.TINH_THANH}
                                    onChange={(e) =>
                                        setEditInfoSV({
                                            ...editInfoSV,
                                            [e.target.name]: e.target.value
                                        })
                                    }
                                >
                                    {infoProvince &&
                                        infoProvince.map((item, idx) => (
                                            <option key={idx} value={item.MA_TNH}>
                                                {item.TINH_THANH}
                                            </option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSuaLai}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={()=>editSinhVien(editInfoSV.MA_SV)}>
                        Lưu lại
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showXoa} onHide={handleCloseXoa} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-remove">
                        <FaTrashAlt size={50} /> XÓA THÔNG TIN SINH VIÊN
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Bạn có chắc chắn xóa thông tin của sinh viên <strong>{deleteInfoSV.HOTEN_SV}</strong> này ?
                    </p>
                    <strong>Lưu ý:</strong> Nếu xóa thông tin sẽ mất vĩnh viễn
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => deteleSinhVien(deleteInfoSV.MA_SV)}>
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

export default DanhSachSinhVien
