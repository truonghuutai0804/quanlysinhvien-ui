import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap'
import { MdAddBox, MdOutlineUploadFile } from 'react-icons/md'
import { FaTrashAlt, FaEdit, FaEye } from 'react-icons/fa'
import imageNguoiDung from '~/asset/images/icon_user.png'
import { BiImageAdd } from 'react-icons/bi'
import axios from 'axios'
import Swal from 'sweetalert2'

function PhongDaoTao() {
    const [trainer, setTrainer] = useState([])
    const [deleteTrainer, setDeleteTrainer] = useState([])
    const [editTrainer, setEditTrainer] = useState([])
    const [seeTrainer, setSeeTrainer] = useState([])

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
    }, [getPhongDaoTao])

    return (
        <>
            <aside className="ms-4">
                <h2 className="m-2">Thông tin nhân viên phòng đào tạo</h2>
                <aside className="d-flex justify-content-between m-3">
                    <Button variant="outline-primary" onClick={handleShowThemMoi}>
                        <MdAddBox /> Thêm nhân viên mới
                    </Button>
                    <Button variant="outline-success">
                        <MdOutlineUploadFile /> Upload
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
                        <Row>
                            <Col xs={6} md={4}>
                                <img
                                    src={imageNguoiDung}
                                    className="hinhanh_sinhvien"
                                    alt="Hình ảnh người dùng mặc nhiên"
                                />
                                <Form.Label htmlFor="getFile" className="btn btn-outline-success btn-block m-1 mt-3">
                                    <BiImageAdd size={18} /> Thêm ảnh mới
                                </Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    className="d-none"
                                    id="getFile"
                                />
                            </Col>
                            <Col xs={12} md={8}>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Họ Tên</strong>
                                        </Form.Label>
                                        <Form.Control type="text" autoFocus />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Ngày sinh</strong>
                                        </Form.Label>
                                        <Form.Control type="date" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Giới tính</strong>
                                        </Form.Label>
                                        <Form.Select>
                                            <option value="1" selected>
                                                Nam
                                            </option>
                                            <option value="2">Nữ</option>
                                        </Form.Select>
                                    </Form.Group>
                                    {/* <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Email</strong>
                                        </Form.Label>
                                        <Form.Control type="email" />
                                    </Form.Group> */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Số điện thoại liên lạc</strong>
                                        </Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Địa chỉ liên lạc</strong>
                                        </Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseThemMoi}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleCloseThemMoi}>
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
                                        <strong>Giới tính: </strong> {seeTrainer.GIOITINH_GV === 1 ?'Nam' : 'Nữ'}
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
                        <Row>
                            <Col xs={6} md={4}>
                                <img
                                    src={imageNguoiDung}
                                    className="hinhanh_sinhvien"
                                    alt="Hình ảnh người dùng mặc nhiên"
                                />
                                <Form.Label htmlFor="getFile" className="btn btn-outline-success btn-block m-1 mt-3">
                                    <BiImageAdd size={18} /> Sửa lại ảnh
                                </Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    className="d-none"
                                    id="getFile"
                                />
                            </Col>
                            <Col xs={12} md={8}>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Mã phòng đào tạo</strong>
                                        </Form.Label>
                                        <Form.Control type="text" defaultValue={editTrainer.MA_GV} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Họ Tên</strong>
                                        </Form.Label>
                                        <Form.Control type="text" defaultValue={editTrainer.HOTEN_GV} autoFocus />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Ngày sinh</strong>
                                        </Form.Label>
                                        <Form.Control type="date" defaultValue={editTrainer.NGAYSINH_GV} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Giới tính</strong>
                                        </Form.Label>
                                        <Form.Select>
                                            <option value="1" selected>
                                                Nam
                                            </option>
                                            <option value="2">Nữ</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Số điện thoại liên lạc</strong>
                                        </Form.Label>
                                        <Form.Control type="text" defaultValue={editTrainer.SODIENTHOAI_GV} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Địa chỉ liên lạc</strong>
                                        </Form.Label>
                                        <Form.Control type="text" defaultValue={editTrainer.TINH_THANH} />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSuaLai}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleCloseSuaLai}>
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
