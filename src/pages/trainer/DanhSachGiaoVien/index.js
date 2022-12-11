import React, { useCallback, useEffect, useState } from 'react'
import { Button, Container, Form, Modal, Table } from 'react-bootstrap'
import { MdAddBox } from 'react-icons/md'
import { FaTrashAlt, FaEdit, FaEye } from 'react-icons/fa'
import axios from 'axios'
import Swal from 'sweetalert2'
import { GiReturnArrow } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import moment from 'moment'

function DanhSachGiaoVien() {
    const [teacher, setTeacher] = useState([])
    const [infoProvince, setInfoProvince] = useState([])
    const [create, setCreate] = useState([])
    const [deleteTeacher, setDeleteTeacher] = useState([])
    const [edit, setEdit] = useState([])
    const [seeTeacher, setSeeTeacher] = useState([])

    const [showThemMoi, setShowThemMoi] = useState(false)
    const [showXemThongTin, setShowXemThongTin] = useState(false)
    const [showSuaLai, setShowSuaLai] = useState(false)
    const [showXoa, setShowXoa] = useState(false)

    const handleShowThemMoi = () => {
        getTinh()
        setShowThemMoi(true)
    }
    const handleShowXemThongTin = (info) => {
        setSeeTeacher(info)
        setShowXemThongTin(true)
    }
    const handleShowSuaLai = (info) => {
        getTinh()
        setEdit(info)
        setShowSuaLai(true)
    }
    const handleShowXoa = (info) => {
        setDeleteTeacher(info)
        setShowXoa(true)
    }

    const handleCloseThemMoi = () => setShowThemMoi(false)
    const handleCloseXemThongTin = () => setShowXemThongTin(false)
    const handleCloseSuaLai = () => setShowSuaLai(false)
    const handleCloseXoa = () => setShowXoa(false)

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

    const setGiaoVien = async () => {
        try {
            const options = {
                method: 'post',
                url: 'http://localhost:8080/api/teacher',
                data: create,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseThemMoi()
                Swal.fire('Thành công', 'Bạn đã thêm mới thành công ', 'success')
                getGiaoVien()
            }else{
                Swal.fire('Thất bại', 'Bạn đã thêm mới thất bại ', 'error')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const editGiaoVien = async (id) => {
        try {
            const options = {
                method: 'put',
                url: `http://localhost:8080/api/trainteacher/${id}`,
                data: edit,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseSuaLai()
                Swal.fire('Thành công', 'Bạn đã sửa thành công ', 'success')
                getGiaoVien()
            }else{
                Swal.fire('Thất bại', 'Bạn đã sửa thất bại ', 'error')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteGiaoVien = async (id) => {
        try {
            const options = {
                method: 'delete',
                url: `http://localhost:8080/api/trainteacher/${id}`,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseXoa()
                Swal.fire('Thành công', 'Bạn đã xóa thành công ', 'success')
                getGiaoVien()
            }
        } catch (error) {
            Swal.fire('Thất bại', `Lỗi ${error}`, 'error')
        }
    }

    useEffect(() => {
        getGiaoVien()
    }, [getGiaoVien])

    return (
        <>
            <Container>
                <aside className="ms-4">
                    <Link className="btn btn-outline-secondary mt-3" to="/Trainer">
                        <GiReturnArrow /> Quay Lại
                    </Link>
                    <h2 className="my-3 text-center">DANH SÁCH GIÁO VIÊN</h2>
                    <Button variant="outline-primary" className="mb-3 ms-4" onClick={handleShowThemMoi}>
                        <MdAddBox /> Thêm giáo viên mới
                    </Button>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Mã</th>
                                <th>Họ tên</th>
                                <th>Giới tính</th>
                                <th>Ngày sinh</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teacher &&
                                teacher.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="table-text-center">{idx + 1}</td>
                                        <td>{item.MA_GV}</td>
                                        <td>{item.HOTEN_GV}</td>
                                        <td>{item.GIOITINH_GV === 1 ? 'Nam' : 'Nữ'}</td>
                                        <td>{moment(item.NGAYSINH_GV).format('DD/MM/YYYY')}</td>
                                        <td>{item.SODIENTHOAI_GV}</td>
                                        <td>{item.TINH_THANH}</td>
                                        <td className="table-text-center">
                                            <strong className="infor-see" onClick={() => handleShowXemThongTin(item)}>
                                                <FaEye />
                                            </strong>
                                            <strong className="infor-edit" onClick={() => handleShowSuaLai(item)}>
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
                        THÊM GIÁO VIÊN MỚI
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
                                name="MA_GV"
                                onChange={(e) =>
                                    setCreate({ ...create, [e.target.name]: e.target.value })
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
                                name="HOTEN_GV"
                                onChange={(e) =>
                                    setCreate({ ...create, [e.target.name]: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Ngày sinh</strong>
                            </Form.Label>
                            <Form.Control
                                type="date"
                                name="NGAYSINH_GV"
                                onChange={(e) =>
                                    setCreate({ ...create, [e.target.name]: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Giới tính</strong>
                            </Form.Label>
                            <Form.Select
                                name="GIOITINH_GV"
                                onChange={(e) =>
                                    setCreate({ ...create, [e.target.name]: e.target.value })
                                }
                            >
                                <option value=" ">Chọn giới tính</option>
                                <option value="1">Nam</option>
                                <option value="0">Nữ</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Số điện thoại</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="SODIENTHOAI_GV"
                                onChange={(e) =>
                                    setCreate({ ...create, [e.target.name]: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Email cá nhân</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="EMAIL_GV"
                                    onChange={(e) =>
                                        setCreate({ ...create, [e.target.name]: e.target.value })
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
                                    setCreate({ ...create, [e.target.name]: e.target.value })
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
                                    name="TENCHA_GV"
                                    onChange={(e) =>
                                        setCreate({ ...create, [e.target.name]: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Tuổi cha</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TUOICHA_GV"
                                    onChange={(e) =>
                                        setCreate({ ...create, [e.target.name]: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Họ tên mẹ</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TENME_GV"
                                    onChange={(e) =>
                                        setCreate({ ...create, [e.target.name]: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Tuổi mẹ</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TUOIME_GV"
                                    onChange={(e) =>
                                        setCreate({ ...create, [e.target.name]: e.target.value })
                                    }
                                />
                            </Form.Group>
                        </Form.Group>
                    </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseThemMoi}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={setGiaoVien}>
                        Tạo mới
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showXemThongTin} onHide={handleCloseXemThongTin} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-see">
                        <FaEye size={50} /> THÔNG TIN GIÁO VIÊN
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <aside className="border rounded border-secondary mb-2">
                            <h5 className="text-center my-2">Thông tin cơ bản</h5>
                            <aside className="ms-2">
                                <p>
                                    <strong>Mã số: </strong> {seeTeacher.MA_GV}
                                </p>
                                <p>
                                    <strong>Họ tên: </strong> {seeTeacher.HOTEN_GV}
                                </p>
                                <p>
                                    <strong>Ngày sinh: </strong> {moment(seeTeacher.NGAYSINH_GV).format('DD/MM/YYYY')}
                                </p>
                                <p>
                                    <strong>Điện thoại liên lạc: </strong> {seeTeacher.SODIENTHOAI_GV}
                                </p>
                                <p>
                                    <strong>Email: </strong> {seeTeacher.EMAIL_GV}
                                </p>
                                <p>
                                    <strong>Địa chỉ liên lạc: </strong> {seeTeacher.TINH_THANH}
                                </p>
                            </aside>
                        </aside>
                        <aside className="border rounded border-secondary">
                            <h5 className="text-center my-2">Thông tin gia đình</h5>
                            <aside className="ms-2">
                                <p>
                                    <strong>Cha của giáo viên: </strong> {seeTeacher.TENCHA_GV}
                                </p>
                                <p>
                                    <strong>Tuổi của cha giáo viên: </strong> {seeTeacher.TUOICHA_GV}
                                </p>
                                <p>
                                    <strong>Mẹ của giáo viên: </strong> {seeTeacher.TENME_GV}
                                </p>
                                <p>
                                    <strong>Tuổi của mẹ giáo viên: </strong> {seeTeacher.TUOIME_GV}
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
                        <FaEdit size={50} /> SỬA LẠI THÔNG TIN GIÁO VIÊN
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
                                    value={edit.MA_GV}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Họ Tên</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="HOTEN_GV"
                                    value={edit.HOTEN_GV}
                                    onChange={(e) =>
                                        setEdit({
                                            ...edit,
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
                                    name="NGAYSINH_GV"
                                    value={edit.NGAYSINH_GV}
                                    onChange={(e) =>
                                        setEdit({
                                            ...edit,
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
                                    name="GIOITINH_GV"
                                    value={edit.GIOITINH_GV}
                                    onChange={(e) =>
                                        setEdit({
                                            ...edit,
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
                                    <strong>Số điện thoại</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="SODIENTHOAI_GV"
                                    value={edit.SODIENTHOAI_GV}
                                    onChange={(e) =>
                                        setEdit({
                                            ...edit,
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
                                    name="EMAIL_GV"
                                    value={edit.EMAIL_GV}
                                    onChange={(e) =>
                                        setEdit({
                                            ...edit,
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
                                    value={edit.MA_TINH}
                                    onChange={(e) =>
                                        setEdit({
                                            ...edit,
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
                                    name="TENCHA_GV"
                                    value={edit.TENCHA_GV}
                                    onChange={(e) =>
                                        setEdit({
                                            ...edit,
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
                                    name="TUOICHA_GV"
                                    value={edit.TUOICHA_GV}
                                    onChange={(e) =>
                                        setEdit({
                                            ...edit,
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
                                    name="TENME_GV"
                                    value={edit.TENME_GV}
                                    onChange={(e) =>
                                        setEdit({
                                            ...edit,
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
                                    name="TUOIME_GV"
                                    value={edit.TUOIME_GV}
                                    onChange={(e) =>
                                        setEdit({
                                            ...edit,
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
                    <Button variant="primary" onClick={()=>editGiaoVien(edit.MA_GV)}>
                        Lưu lại
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showXoa} onHide={handleCloseXoa} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-remove">
                        <FaTrashAlt size={50} /> XÓA THÔNG TIN GIÁO VIÊN
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Bạn có chắc chắn xóa thông tin của giáo viên <strong>{deleteTeacher.HOTEN_GV}</strong> này ?
                    </p>
                    <strong>Lưu ý:</strong> Nếu xóa thông tin sẽ mất vĩnh viễn
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => deleteGiaoVien(deleteTeacher.MA_GV)}>
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

export default DanhSachGiaoVien
