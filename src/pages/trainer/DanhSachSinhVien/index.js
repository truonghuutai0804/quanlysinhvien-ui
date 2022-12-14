import React, { useCallback, useEffect, useState } from 'react'
import { Button, Container, Form, Modal, Table } from 'react-bootstrap'
import { MdAddBox } from 'react-icons/md'
import { FaTrashAlt, FaEdit, FaEye } from 'react-icons/fa'
import axios from 'axios'
import { GiReturnArrow } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Swal from 'sweetalert2'


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
                Swal.fire('Thành công', 'Bạn đã thêm mới thành công ', 'success')
                getSinhVien()
            }else{
                Swal.fire('Thất bại', 'Bạn đã thêm mới thất bại ', 'error')
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
                Swal.fire('Thành công', 'Bạn đã sửa thành công ', 'success')
                getSinhVien()
            }else{
                Swal.fire('Thất bại', 'Bạn đã sửa thất bại ', 'error')
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
                Swal.fire('Thành công', 'Bạn đã xóa thành công ', 'success')
                getSinhVien()
            }
            else{
                Swal.fire('Thất bại', 'Bạn đã xóa thất bại ', 'error')
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
                    <Link className="btn btn-outline-secondary mt-3" to="/Trainer">
                        <GiReturnArrow /> Quay Lại
                    </Link>
                    <h2 className="my-3 text-center">DANH SÁCH SINH VIÊN</h2>
                    <Button variant="outline-primary" className="mb-3 ms-4" onClick={handleShowThemMoi}>
                        <MdAddBox /> Thêm sinh viên mới
                    </Button>
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
                                        <td>{moment(item.NGAYSINH_SV).format("DD/MM/YYYY")}</td>
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
                        <h3>Thông tin cơ bản</h3>
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
                                    <strong>Email cá nhân</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="EMAIL_SV"
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
                            <h3 className='mt-4'>Thông tin gia đình</h3>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Họ tên cha</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TENCHA_SV"
                                    onChange={(e) =>
                                        setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Tuổi cha</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TUOICHA_SV"
                                    onChange={(e) =>
                                        setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Họ tên mẹ</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TENME_SV"
                                    onChange={(e) =>
                                        setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Tuổi mẹ</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TUOIME_SV"
                                    onChange={(e) =>
                                        setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                    }
                                />
                            </Form.Group>
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
                        <FaEye size={50} /> THÔNG TIN SINH VIÊN: {infoSV.HOTEN_SV}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <aside className="border rounded border-secondary mb-2 ">
                            <h5 className="text-center my-2">Thông tin cơ bản</h5>
                            <aside className="ms-4">
                                <p>
                                    <strong>MSSV: </strong> {infoSV.MA_SV}
                                </p>
                                <p>
                                    <strong>Họ tên: </strong> {infoSV.HOTEN_SV}
                                </p>
                                <p>
                                    <strong>Ngày sinh: </strong> {moment(infoSV.NGAYSINH_SV).format("DD/MM/YYYY")}
                                </p>
                                <p>
                                    <strong>Email: </strong> {infoSV.EMAIL_SV}
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
                        </aside>
                        <aside className="border rounded border-secondary">
                            <h5 className="text-center my-2">Thông tin gia đình</h5>
                            <aside className="ms-4">
                                <p>
                                    <strong>Cha của sinh viên: </strong> {infoSV.TENCHA_SV}
                                </p>
                                <p>
                                    <strong>Tuổi của cha sinh viên: </strong> {infoSV.TUOICHA_SV}
                                </p>
                                <p>
                                    <strong>Mẹ của sinh viên: </strong> {infoSV.TENME_SV}
                                </p>
                                <p>
                                    <strong>Tuổi của mẹ sinh viên: </strong> {infoSV.TUOIME_SV}
                                </p>
                            </aside>
                        </aside>
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
                        <FaEdit size={50} /> SỬA LẠI THÔNG TIN: {editInfoSV.HOTEN_SV}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Form>
                            <h3>Thông tin cơ bản</h3>
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
                                    <strong>Email</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="EMAIL_SV"
                                    value={editInfoSV.EMAIL_SV}
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
                                    <strong>Địa chỉ liên lạc</strong>
                                </Form.Label>
                                <Form.Select
                                    name="MA_TINH"
                                    value={editInfoSV.MA_TINH}
                                    onChange={(e) =>
                                        setEditInfoSV({
                                            ...editInfoSV,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                >
                                    {infoProvince &&
                                        infoProvince.map((item, idx) => (
                                            <option key={idx} value={item.MA_TINH}>
                                                {item.TINH_THANH}
                                            </option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Họ tên cha</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TENCHA_SV"
                                    value={editInfoSV.TENCHA_SV}
                                    onChange={(e) =>
                                        setEditInfoSV({
                                            ...editInfoSV,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <h3 className='mt-3'>Thông tin gia đình</h3>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Tuổi của cha</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TUOICHA_SV"
                                    value={editInfoSV.TUOICHA_SV}
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
                                    <strong>Họ tên mẹ</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TENME_SV"
                                    value={editInfoSV.TENME_SV}
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
                                    <strong>Tuổi của mẹ</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TUOIME_SV"
                                    value={editInfoSV.TUOIME_SV}
                                    onChange={(e) =>
                                        setEditInfoSV({
                                            ...editInfoSV,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSuaLai}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => editSinhVien(editInfoSV.MA_SV)}>
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
