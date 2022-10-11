import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap'
import { MdAddBox, MdOutlineUploadFile } from 'react-icons/md'
import { FaTrashAlt, FaEdit, FaEye } from 'react-icons/fa'
import imageNguoiDung from '~/asset/images/icon_user.png'
import { BiImageAdd } from 'react-icons/bi'
import axios from 'axios'

function GiaoVien() {
    const [showThemMoi, setShowThemMoi] = useState(false)
    const [showXemThongTin, setShowXemThongTin] = useState(false)
    const [showSuaLai, setShowSuaLai] = useState(false)
    const [showXoa, setShowXoa] = useState(false)

    const handleShowThemMoi = () => setShowThemMoi(true)
    const handleShowXemThongTin = () => setShowXemThongTin(true)
    const handleShowSuaLai = () => setShowSuaLai(true)
    const handleShowXoa = () => setShowXoa(true)

    const handleCloseThemMoi = () => setShowThemMoi(false)
    const handleCloseXemThongTin = () => setShowXemThongTin(false)
    const handleCloseSuaLai = () => setShowSuaLai(false)
    const handleCloseXoa = () => setShowXoa(false)

    const [teacher, setTeacher] = useState([])

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

    useEffect(() => {
        getGiaoVien()
    }, [getGiaoVien])

    console.log(teacher)

    return (
        <>
            <aside className="ms-4">
                <h2 className="m-2">Thông tin giáo viên</h2>
                <aside className="d-flex justify-content-between m-3">
                    <Button variant="outline-primary" onClick={handleShowThemMoi}>
                        <MdAddBox /> Thêm giáo viên mới
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
                                    <td>{item.NGAYSINH_GV}</td>
                                    <td>{item.SODIENTHOAI_GV}</td>
                                    <td>{item.TINH_THANH}</td>
                                    <td className="table-text-center">
                                        <strong className="infor-see" onClick={handleShowXemThongTin}>
                                            <FaEye />
                                        </strong>
                                        <strong className="infor-edit" onClick={handleShowSuaLai}>
                                            <FaEdit />
                                        </strong>
                                        <strong className="infor-remove" onClick={handleShowXoa}>
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
                                <aside>
                                    <p>
                                        <strong>Họ tên: </strong> Trương Hữu Tài
                                    </p>
                                    <p>
                                        <strong>Ngày sinh: </strong> 08/04/2000
                                    </p>
                                    <p>
                                        <strong>Giới tính: </strong> Nam
                                    </p>
                                    <p>
                                        <strong>Nơi sinh: </strong> Trạm y tế phường 9, Tỉnh Vĩnh Long
                                    </p>
                                    <p>
                                        <strong>Email: </strong> taib1809509@student.ctu.edu.vn
                                    </p>
                                    <p>
                                        <strong>Số chứng minh nhân dân: </strong> 331857042
                                    </p>
                                    <p>
                                        <strong>Lớp: </strong> DI18V7A4
                                    </p>
                                    <p>
                                        <strong>Chuyên ngành: </strong>Công nghệ thông tin
                                    </p>
                                    <p>
                                        <strong>Khoa: </strong> Công nghệ Thông tin & Truyền thông
                                    </p>
                                    <p>
                                        <strong>Điện thoại liên lạc: </strong> 0868071229
                                    </p>
                                    <p>
                                        <strong>Địa chỉ liên lạc: </strong>
                                        18/8, Phạm Hùng, Tổ 58, Khóm 5, Phường 9,Thành phố Vĩnh Long,Tỉnh Vĩnh Long
                                    </p>
                                    <p>
                                        <strong>Dân tộc: </strong> Kinh
                                    </p>
                                    <p>
                                        <strong>Quốc tịch: </strong> Việt Nam
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
                                        <Form.Control type="text" value="GV147" disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Họ Tên</strong>
                                        </Form.Label>
                                        <Form.Control type="text" value="Trương Hữu Tài" autoFocus />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Ngày sinh</strong>
                                        </Form.Label>
                                        <Form.Control type="date" value="2000-04-08" />
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
                                        <Form.Control type="text" value="Trạm y tế phường 9, Tỉnh Vĩnh Long" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Email</strong>
                                        </Form.Label>
                                        <Form.Control type="email" value="taib1809509@student.ctu.edu.vn" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Chứng minh nhân dân</strong>
                                        </Form.Label>
                                        <Form.Control type="text" value="331857042" />
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
                                            <strong>Số điện thoại liên lạc</strong>
                                        </Form.Label>
                                        <Form.Control type="text" value="0868071229" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Địa chỉ liên lạc</strong>
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value="18/8, Phạm Hùng, Tổ 58, Khóm 5, Phường 9,Thành phố Vĩnh Long,Tỉnh Vĩnh Long"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Dân tộc</strong>
                                        </Form.Label>
                                        <Form.Control type="text" value="Kinh" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Quốc tịch</strong>
                                        </Form.Label>
                                        <Form.Control type="text" value="Việt Nam" />
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
                    <h4>Bạn có chắc chắn xóa thông tin của nhân viên phòng đào tạo này ?</h4>
                    <strong>Lưu ý:</strong> Nếu xóa thông tin sẽ mất vĩnh viễn
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseXoa}>
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

export default GiaoVien
