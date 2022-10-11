import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { MdAddBox } from 'react-icons/md'

const Khoa = () => {
    const [infoFaculty, setInfoFaculty] = useState([])
    const [editInfoFaculty, setEditInfoFaculty] = useState([])
    const [seeEditInfoFaculty, setSeeEditInfoFaculty] = useState([])

    const [showThemMoi, setShowThemMoi] = useState(false)
    const [showSuaLai, setShowSuaLai] = useState(false)
    const [showXoa, setShowXoa] = useState(false)

    const handleShowThemMoi = () => setShowThemMoi(true)
    const handleShowSuaLai = (info) => {
        setShowSuaLai(true)
        setSeeEditInfoFaculty(info)
    }
    const handleShowXoa = () => setShowXoa(true)

    const handleCloseThemMoi = () => setShowThemMoi(false)
    const handleCloseSuaLai = () => setShowSuaLai(false)
    const handleCloseXoa = () => setShowXoa(false)

    const getKhoa = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/faculty',
            }
            const response = await axios(options)
            const faculties = response.data.data
            if (response.data.status === 400) {
                setInfoFaculty(faculties)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        getKhoa()
    }, [getKhoa])

    return (
        <>
            <aside className="ms-4">
                <h2 className="m-2">Thông tin khoa</h2>
                <aside className="d-flex justify-content-between m-3">
                    <Button variant="outline-primary" onClick={handleShowThemMoi}>
                        <MdAddBox /> Thêm khoa mới
                    </Button>
                </aside>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã khoa</th>
                            <th>Tên khoa</th>
                            <th>Hoạt động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {infoFaculty &&
                            infoFaculty.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="table-text-center">{idx + 1}</td>
                                    <td className="table-text-center">{item.MA_KHOA}</td>
                                    <td>{item.TEN_KHOA}</td>
                                    <td className="table-text-center">
                                        <strong className="infor-edit" onClick={() => handleShowSuaLai(item)}>
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
                        THÊM SINH VIÊN MỚI
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Tên khoa</strong>
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
                        <FaEdit size={50} /> SỬA LẠI THÔNG TIN CHUYÊN NGÀNH
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Mã khoa</strong>
                            </Form.Label>
                            <Form.Control type="text" value={seeEditInfoFaculty.MA_KHOA} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Tên khoa</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="TEN_KHOA"
                                defaultValue={seeEditInfoFaculty.TEN_KHOA}
                                onChange={(e) => setEditInfoFaculty({ ...editInfoFaculty, [e.target.name]: e.target.value })}
                                autoFocus
                            />
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
                        <FaTrashAlt size={50} /> XÓA CHUYÊN NGÀNH
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Bạn có chắc chắn xóa thông tin của chuyên nghành này ?</h4>
                    <strong>Lưu ý:</strong> Nếu xóa thông tin chuyên nghành này sẽ mất vĩnh viễn
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

export default Khoa
