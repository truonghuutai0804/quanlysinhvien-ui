import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap'
import { MdAddBox, MdOutlineUploadFile } from 'react-icons/md'
import { BiImageAdd } from 'react-icons/bi'
import { FaTrashAlt, FaEdit, FaEye } from 'react-icons/fa'
import imageNguoiDung from '~/asset/images/icon_user.png'
import axios from 'axios'

function ThongTinSinhVien() {
    const [student, setStudent] = useState([])

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

    const TooltipXem = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Xem chi tiết
        </Tooltip>
    )
    const TooltipSua = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Sửa lại
        </Tooltip>
    )
    const TooltipXoa = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Xóa bỏ
        </Tooltip>
    )

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

    // const setSinhVien = async() =>{
    //     try {
    //         const options = {
    //             method: 'post',
    //             url: 'http://localhost:8080/api/student',
    //         }
    //         const response = await axios(options)
    //         if (response.data.message === 'SUCCESS') {
    //             alert("Thêm sinh viên thành công")
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        getSinhVien()
    }, [getSinhVien])

    return (
        <>
            <aside className="ms-4">
                <h2 className="m-2">Thông tin sinh viên</h2>
                <aside className="d-flex justify-content-between m-3">
                    <Button variant="outline-primary" onClick={handleShowThemMoi}>
                        <MdAddBox /> Thêm sinh viên mới
                    </Button>
                    <Form.Label htmlFor="getFileXLS" className="btn btn-outline-success btn-block">
                        <MdOutlineUploadFile /> Upload
                    </Form.Label>
                    <Form.Control type="file" accept=".xlsx, .xls" className="d-none" id="getFileXLS" />
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
                                        <OverlayTrigger
                                            placement="left"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={TooltipXem}
                                        >
                                            <strong
                                                className="infor-see"
                                                onClick={() => {
                                                    handleShowXemThongTin(item)
                                                }}
                                            >
                                                <FaEye />
                                            </strong>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="left"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={TooltipSua}
                                        >
                                            <strong
                                                className="infor-edit"
                                                onClick={() => {
                                                    handleShowSuaLai(item)
                                                }}
                                            >
                                                <FaEdit />
                                            </strong>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="left"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={TooltipXoa}
                                        >
                                            <strong
                                                className="infor-remove"
                                                onClick={() => {
                                                    handleShowXoa(item)
                                                }}
                                            >
                                                <FaTrashAlt />
                                            </strong>
                                        </OverlayTrigger>
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
                        THÊM SINH VIÊN MỚI
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
                                            <strong>MSSV</strong>
                                        </Form.Label>
                                        <Form.Control type="text" value={editInfoSV.MA_SV} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Họ Tên</strong>
                                        </Form.Label>
                                        <Form.Control type="text" value={editInfoSV.HOTEN_SV} autoFocus />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Ngày sinh</strong>
                                        </Form.Label>
                                        <Form.Control type="date" value={editInfoSV.NGAYSINH_SV} />
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
                                            <strong>Khoa</strong>
                                        </Form.Label>
                                        <Form.Control type="text" value={editInfoSV.TEN_KHOA} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Chuyên ngành</strong>
                                        </Form.Label>
                                        <Form.Control type="text" value={editInfoSV.TEN_CN} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Lớp</strong>
                                        </Form.Label>
                                        <Form.Control type="text" value={editInfoSV.TEN_LOP} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Số điện thoại liên lạc</strong>
                                        </Form.Label>
                                        <Form.Control type="text" value={editInfoSV.SODIENTHOAI_SV} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Địa chỉ liên lạc</strong>
                                        </Form.Label>
                                        <Form.Control type="text" value={editInfoSV.TINH_THANH} />
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
                        <FaTrashAlt size={50} /> XÓA THÔNG TIN SINH VIÊN
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Bạn có chắc chắn xóa thông tin của sinh viên <strong>{deleteInfoSV.HOTEN_SV}</strong> này ?</p>
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

export default ThongTinSinhVien
