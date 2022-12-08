import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap'
import { MdAddBox } from 'react-icons/md'
import { FaTrashAlt, FaEdit, FaEye } from 'react-icons/fa'
import imageNguoiDung from '~/asset/images/icon_user.png'
import { BiImageAdd } from 'react-icons/bi'
import axios from 'axios'
import Swal from 'sweetalert2'
import { GiReturnArrow } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import moment from 'moment'

function DanhSachGiaoVien() {
    const [teacher, setTeacher] = useState([])
    const [deleteTeacher, setDeleteTeacher] = useState([])
    const [editTeacher, setEditTeacher] = useState([])
    const [seeTeacher, setSeeTeacher] = useState([])

    const [showThemMoi, setShowThemMoi] = useState(false)
    const [showXemThongTin, setShowXemThongTin] = useState(false)
    const [showSuaLai, setShowSuaLai] = useState(false)
    const [showXoa, setShowXoa] = useState(false)

    const handleShowThemMoi = () => setShowThemMoi(true)
    const handleShowXemThongTin = (info) => {
        setSeeTeacher(info)
        setShowXemThongTin(true)
    }
    const handleShowSuaLai = (info) => {
        setEditTeacher(info)
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

    console.log(teacher)

    return (
        <>
            <Container>
                <aside className="ms-4">
                    <h2 className="my-5 text-center">DANH SÁCH GIÁO VIÊN</h2>
                    <aside className="d-flex justify-content-between m-3">
                        <Link className="btn btn-outline-secondary" to="/Trainer" >
                            <GiReturnArrow/> Quay Lại
                        </Link>
                        <Button variant="outline-primary" onClick={handleShowThemMoi}>
                            <MdAddBox /> Thêm giáo viên mới
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
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Nơi sinh</strong>
                                        </Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Email</strong>
                                        </Form.Label>
                                        <Form.Control type="email" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Chứng minh nhân dân</strong>
                                        </Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Lớp</strong>
                                        </Form.Label>
                                        <Form.Select>
                                            <option value="1" selected>
                                                Công nghệ thông tin A1 2018
                                            </option>
                                            <option value="2">Công nghệ thông tin A2 2018</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Chuyên ngành</strong>
                                        </Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Khoa</strong>
                                        </Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
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
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Dân tộc</strong>
                                        </Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Quốc tịch</strong>
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
                        <FaEye size={50} /> THÔNG TIN GIÁO VIÊN
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
                            <aside className="border rounded border-secondary mb-2">
                                    <h5 className="text-center my-2">Thông tin cơ bản</h5>
                                    <aside className="ms-2">
                                        <p>
                                            <strong>MSSV: </strong> {seeTeacher.MA_GV}
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
                                            <strong>Cha của sinh viên: </strong> {seeTeacher.TENCHA_GV}
                                        </p>
                                        <p>
                                            <strong>Tuổi của cha sinh viên: </strong> {seeTeacher.TUOICHA_GV}
                                        </p>
                                        <p>
                                            <strong>Mẹ của sinh viên: </strong> {seeTeacher.TENME_GV}
                                        </p>
                                        <p>
                                            <strong>Tuổi của mẹ sinh viên: </strong> {seeTeacher.TUOIME_GV}
                                        </p>
                                    </aside>
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
                        <FaEdit size={50} /> SỬA LẠI THÔNG TIN GIÁO VIÊN
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
                                            <strong>Mã giáo viên</strong>
                                        </Form.Label>
                                        <Form.Control type="text" value={editTeacher.MA_GV} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Họ Tên</strong>
                                        </Form.Label>
                                        <Form.Control type="text" defaultValue={editTeacher.HOTEN_GV} autoFocus />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Ngày sinh</strong>
                                        </Form.Label>
                                        <Form.Control type="date" defaultValue={editTeacher.NGAYSINH_GV} />
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
                                            <strong>Lớp</strong>
                                        </Form.Label>
                                        <Form.Control type="text" value="18V7A4" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Chuyên ngành</strong>
                                        </Form.Label>
                                        <Form.Control type="text" value="Công nghệ thông tin" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Khoa</strong>
                                        </Form.Label>
                                        <Form.Control type="text" value="Công nghệ thông tin & Truyền thông" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Số điện thoại</strong>
                                        </Form.Label>
                                        <Form.Control type="text" defaultValue={editTeacher.SODIENTHOAI_GV} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Địa chỉ</strong>
                                        </Form.Label>
                                        <Form.Control type="text" defaultValue={editTeacher.TINH_THANH} />
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
