import React, { useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { MdAddBox } from 'react-icons/md'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import './MonHoc.scss'

function MonHoc() {
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
                <h2 className="m-2">Thông tin môn học</h2>
                <aside className="d-flex justify-content-between m-3">
                    <Button variant="outline-primary" onClick={handleShowThemMoi}>
                        <MdAddBox /> Thêm môn học mới
                    </Button>
                </aside>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã môn học</th>
                            <th>Tên môn học</th>
                            <th>Tín chỉ</th>
                            <th>Hoạt động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="table-text-center">1</td>
                            <td className="table-text-center">CT182</td>
                            <td>Tin học căn bản</td>
                            <td className="table-text-center">2</td>
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
                            <td className="table-text-center">CT185</td>
                            <td>Lập trình căn bản</td>
                            <td className="table-text-center">3</td>
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
                            <td className="table-text-center">CT192</td>
                            <td>Lập trình web</td>
                            <td className="table-text-center">3</td>
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
                                <strong>Tín chỉ</strong>
                            </Form.Label>
                            <Form.Control type="text" autoFocus />
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
                            <Form.Control type="text" value="CT179" disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Tên môn học</strong>
                            </Form.Label>
                            <Form.Control type="text" value="Lập trình căn bản" autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Tín chỉ</strong>
                            </Form.Label>
                            <Form.Control type="text" value="3" />
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

export default MonHoc
