import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap'
import { MdAddBox, MdOutlineUploadFile } from 'react-icons/md'
import { FaTrashAlt, FaEdit, FaEye } from 'react-icons/fa'
import imageNguoiDung from '~/asset/images/icon_user.png'
import axios from 'axios'
import Swal from 'sweetalert2'

function PhongDaoTao() {
    const [trainer, setTrainer] = useState([])
    const [addTrainer, setAddTrainer] = useState([])
    const [deleteTrainer, setDeleteTrainer] = useState([])
    const [editTrainer, setEditTrainer] = useState([])
    const [seeTrainer, setSeeTrainer] = useState([])
    const [infoProvince, setInfoProvince] = useState([])

    const [showThemMoi, setShowThemMoi] = useState(false)
    const [showXemThongTin, setShowXemThongTin] = useState(false)
    const [showSuaLai, setShowSuaLai] = useState(false)
    const [showXoa, setShowXoa] = useState(false)

    const handleShowThemMoi = () => setShowThemMoi(true)

    const handleShowXemThongTin = (info) => {
        setSeeTrainer(info)
        setShowXemThongTin(true)
    }
    const handleShowSuaLai = (info) => {
        setEditTrainer(info)
        setShowSuaLai(true)
    }
    const handleShowXoa = (info) => {
        setDeleteTrainer(info)
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

    const getPhongDaoTao = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/trainer',
            }
            const response = await axios(options)
            const trains = response.data.dataPDT
            if (response.data.status === 400) {
                setTrainer(trains)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const createPhongDaoTao = async () => {
        try {
            const options = {
                method: 'post',
                url: `http://localhost:8080/api/trainer/`,
                data: addTrainer,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseThemMoi()
                Swal.fire('Thành công', 'Thêm phòng đào tạo thành công ', 'success')
                getPhongDaoTao()
            }
        } catch (error) {
            Swal.fire('Thất bại', `Lỗi ${error}`, 'error')
        }
    }

    const updatePhongDaoTao = async (id) => {
        try {
            const options = {
                method: 'put',
                url: `http://localhost:8080/api/trainteacher/${id}`,
                data: editTrainer,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseSuaLai()
                Swal.fire('Thành công', 'Sửa thông tin phòng đào tạo thành công ', 'success')
                getPhongDaoTao()
            }
        } catch (error) {
            Swal.fire('Thất bại', `Lỗi ${error}`, 'error')
        }
    }

    const deletePhongDaoTao = async (id) => {
        try {
            const options = {
                method: 'delete',
                url: `http://localhost:8080/api/trainteacher/${id}`,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseXoa()
                Swal.fire('Thành công', 'Bạn đã xóa thành công ', 'success')
                getPhongDaoTao()
            }
        } catch (error) {
            Swal.fire('Thất bại', `Lỗi ${error}`, 'error')
        }
    }

    useEffect(() => {
        getPhongDaoTao()
        getTinh()
    }, [getPhongDaoTao, getTinh])

    return (
        <>
            <aside className="ms-4">
                <h2 className="m-2">Thông tin nhân viên phòng đào tạo</h2>
                <aside className="d-flex justify-content-between m-3">
                    <Button variant="outline-primary" onClick={handleShowThemMoi}>
                        <MdAddBox /> Thêm nhân viên mới
                    </Button>
                </aside>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã</th>
                            <th>Họ tên</th>
                            <th>Giới tính</th>
                            <th>Ngày sinh</th>
                            <th>Địa chỉ</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainer &&
                            trainer.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="table-text-center">{idx + 1}</td>
                                    <td>{item.MA_GV}</td>
                                    <td>{item.HOTEN_GV}</td>
                                    <td>{item.GIOITINH_GV === 1 ? 'Nam' : 'Nữ'}</td>
                                    <td>{item.NGAYSINH_GV}</td>
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

            <Modal show={showThemMoi} onHide={handleCloseThemMoi} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-new">
                        <MdAddBox size={50} />
                        THÊM PHÒNG ĐÀO TẠO MỚI
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
                                    name="MA_GV"
                                    onChange={(e) => setAddTrainer({ ...addTrainer, [e.target.name]: e.target.value })}
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
                                    onChange={(e) => setAddTrainer({ ...addTrainer, [e.target.name]: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Ngày sinh</strong>
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    name="NGAYSINH_GV"
                                    onChange={(e) => setAddTrainer({ ...addTrainer, [e.target.name]: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Giới tính</strong>
                                </Form.Label>
                                <Form.Select
                                    name="GIOITINH_GV"
                                    onChange={(e) => setAddTrainer({ ...addTrainer, [e.target.name]: e.target.value })}
                                >
                                    <option value=" ">Chọn giới tính</option>
                                    <option value="1">Nam</option>
                                    <option value="0">Nữ</option>
                                </Form.Select>
                            </Form.Group>
                            {/* <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Lớp</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_LOP"
                                onChange={(e) =>
                                    setTrainer({ ...addTrainer, [e.target.name]: e.target.value })
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
                        </Form.Group> */}
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Số điện thoại</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="SODIENTHOAI_GV"
                                    onChange={(e) => setAddTrainer({ ...addTrainer, [e.target.name]: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Địa chỉ</strong>
                                </Form.Label>
                                <Form.Select
                                    name="MA_TINH"
                                    onChange={(e) => setAddTrainer({ ...addTrainer, [e.target.name]: e.target.value })}
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
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseThemMoi}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={createPhongDaoTao}>
                        Tạo mới
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showXemThongTin} onHide={handleCloseXemThongTin} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-see">
                        <FaEye size={50} /> THÔNG TIN PHÒNG ĐÀO TẠO
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
                                        <strong>Mã : </strong> {seeTrainer.MA_GV}
                                    </p>
                                    <p>
                                        <strong>Họ tên: </strong> {seeTrainer.HOTEN_GV}
                                    </p>
                                    <p>
                                        <strong>Ngày sinh: </strong> {seeTrainer.NGAYSINH_GV}
                                    </p>
                                    <p>
                                        <strong>Giới tính: </strong> {seeTrainer.GIOITINH_GV === 1 ? 'Nam' : 'Nữ'}
                                    </p>
                                    {/* <p>
                                        <strong>Email: </strong> taib1809509@student.ctu.edu.vn
                                    </p> */}
                                    <p>
                                        <strong>Điện thoại liên lạc: </strong> {seeTrainer.SODIENTHOAI_GV}
                                    </p>
                                    <p>
                                        <strong>Địa chỉ liên lạc: </strong> {seeTrainer.TINH_THANH}
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
                        <FaEdit size={50} /> SỬA LẠI THÔNG TIN PHÒNG ĐÀO TẠO
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Mã phòng đào tạo</strong>
                                </Form.Label>
                                <Form.Control type="text" name="MA_GV" value={editTrainer.MA_GV} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Họ Tên</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="HOTEN_GV"
                                    value={editTrainer.HOTEN_GV}
                                    onChange={(e) =>
                                        setEditTrainer({ ...editTrainer, [e.target.name]: e.target.value })
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
                                    value={editTrainer.NGAYSINH_GV}
                                    onChange={(e) =>
                                        setEditTrainer({ ...editTrainer, [e.target.name]: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Giới tính</strong>
                                </Form.Label>
                                <Form.Select
                                    value={editTrainer.GIOITINH_GV}
                                    name="GIOITINH_GV"
                                    onChange={(e) =>
                                        setEditTrainer({ ...editTrainer, [e.target.name]: e.target.value })
                                    }
                                >
                                    <option value="1">Nam</option>
                                    <option value="0">Nữ</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Số điện thoại liên lạc</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="SODIENTHOAI_GV"
                                    value={editTrainer.SODIENTHOAI_GV}
                                    onChange={(e) =>
                                        setEditTrainer({ ...editTrainer, [e.target.name]: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Địa chỉ liên lạc</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TINH_THANH"
                                    value={editTrainer.TINH_THANH}
                                    onChange={(e) =>
                                        setEditTrainer({ ...editTrainer, [e.target.name]: e.target.value })
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
                    <Button variant="primary" onClick={() => updatePhongDaoTao(editTrainer.MA_GV)}>
                        Lưu lại
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showXoa} onHide={handleCloseXoa} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-remove">
                        <FaTrashAlt size={50} /> XÓA THÔNG TIN PHÒNG ĐÀO TẠO
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Bạn có chắc chắn xóa thông tin của nhân viên <strong>{deleteTrainer.HOTEN_GV}</strong> này ?
                    </p>
                    <strong>Lưu ý:</strong> Nếu xóa thông tin sẽ mất vĩnh viễn
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => deletePhongDaoTao(deleteTrainer.MA_GV)}>
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

export default PhongDaoTao
