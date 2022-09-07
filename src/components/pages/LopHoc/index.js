import React, { useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { MdAddBox } from 'react-icons/md'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import './LopHoc.scss'

function LopHoc() {
    const [showThemMoi, setShowThemMoi] = useState(false)
    const [showSuaLai, setShowSuaLai] = useState(false)
    const [showXoa, setShowXoa] = useState(false)

    const handleShowThemMoi = () => setShowThemMoi(true)
    const handleShowSuaLai = () => setShowSuaLai(true)
    const handleShowXoa = () => setShowXoa(true)

    const handleCloseThemMoi = () => setShowThemMoi(false)
    const handleCloseSuaLai = () => setShowSuaLai(false)
    const handleCloseXoa = () => setShowXoa(false)
    return (
        <>
            <aside className="ms-4">
                <h2 className="m-2">Thông tin lớp học</h2>
                <aside className="d-flex justify-content-between m-3">
                    <Button variant="outline-primary" onClick={handleShowThemMoi}>
                        <MdAddBox /> Thêm lớp học mới
                    </Button>
                </aside>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã lớp học</th>
                            <th>Tên lớp học</th>
                            <th>Chuyên Ngành</th>
                            <th>Hoạt động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="table-text-center">1</td>
                            <td className="table-text-center">18V7A1</td>
                            <td>Công nghệ thông tin A1 2018</td>
                            <td>Công nghệ thông tin</td>
                            <td className="table-text-center">
                                <strong className="infor-edit" onClick={handleShowSuaLai}>
                                    <FaEdit />
                                </strong>
                                <strong className="infor-remove" onClick={handleShowXoa}>
                                    <FaTrashAlt />
                                </strong>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-text-center">2</td>
                            <td className="table-text-center">18V7A2</td>
                            <td>Công nghệ thông tin A2 2018</td>
                            <td>Công nghệ thông tin</td>
                            <td className="table-text-center">
                                <strong className="infor-edit" onClick={handleShowSuaLai}>
                                    <FaEdit />
                                </strong>
                                <strong className="infor-remove" onClick={handleShowXoa}>
                                    <FaTrashAlt />
                                </strong>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-text-center">3</td>
                            <td className="table-text-center">18V7A3</td>
                            <td>Công nghệ thông tin A3 2018</td>
                            <td>Công nghệ thông tin</td>
                            <td className="table-text-center">
                                <strong className="infor-edit" onClick={handleShowSuaLai}>
                                    <FaEdit />
                                </strong>
                                <strong className="infor-remove" onClick={handleShowXoa}>
                                    <FaTrashAlt />
                                </strong>
                            </td>
                        </tr>
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
                                <strong>Tên môn học</strong>
                            </Form.Label>
                            <Form.Control type="text" autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Chuyên ngành</strong>
                            </Form.Label>
                            <Form.Select>
                                <option value="1" selected>
                                    Công nghệ thông tin
                                </option>
                                <option value="2">Khoa học máy tính</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
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
                            <Form.Control type="text" value="18V7A1" disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Tên môn học</strong>
                            </Form.Label>
                            <Form.Control type="text" value="Công nghệ thông tin A1 2018" autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Chuyên ngành</strong>
                            </Form.Label>
                            <Form.Select>
                                <option value="1" selected>
                                    Công nghệ thông tin
                                </option>
                                <option value="2">Khoa học máy tính</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
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
                        <FaTrashAlt size={50} /> XÓA THÔNG TIN MÔN HỌC
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Bạn có chắc chắn xóa thông tin của môn học này ?</h4>
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

export default LopHoc
