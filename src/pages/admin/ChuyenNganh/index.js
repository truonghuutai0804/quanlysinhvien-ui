import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { MdAddBox } from 'react-icons/md'
import Swal from 'sweetalert2'

const ChuyenNganh = () => {
    const [major, setMajor] = useState([])
    const [editMajor, setEditMajor] = useState([])
    const [deleteMajor, setDeleteMajor] = useState([])

    const [showThemMoi, setShowThemMoi] = useState(false)
    const [showSuaLai, setShowSuaLai] = useState(false)
    const [showXoa, setShowXoa] = useState(false)

    const handleShowThemMoi = () => setShowThemMoi(true)
    const handleShowSuaLai = (info) => {
        setShowSuaLai(true)
        setEditMajor(info)
    }
    const handleShowXoa = (info) => {
        setShowXoa(true)
        setDeleteMajor(info)
    }

    const handleCloseThemMoi = () => setShowThemMoi(false)
    const handleCloseSuaLai = () => setShowSuaLai(false)
    const handleCloseXoa = () => setShowXoa(false)

    const getChuyenNganh = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/major',
            }
            const response = await axios(options)
            const majors = response.data.data
            if (response.data.status === 400) {
                setMajor(majors)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const deleteChuyenNganh = async (id) => {
        try {
            const options = {
                method: 'delete',
                url: `http://localhost:8080/api/major/${id}`,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseXoa()
                Swal.fire('Thành công', 'Bạn đã xóa thành công ', 'success')
                getChuyenNganh()
            }
        } catch (error) {
            Swal.fire('Thất bại', `Lỗi ${error}`, 'error')
        }
    }

    useEffect(() => {
        getChuyenNganh()
    }, [getChuyenNganh])

    return (
        <>
            <aside className="ms-4">
                <h2 className="m-2">Thông tin chuyên ngành</h2>
                <aside className="d-flex justify-content-between m-3">
                    <Button variant="outline-primary" onClick={handleShowThemMoi}>
                        <MdAddBox /> Thêm chuyên ngành mới
                    </Button>
                </aside>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã chuyên ngành</th>
                            <th>Tên chuyên ngành</th>
                            <th>Khoa</th>
                            <th>Hoạt động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {major &&
                            major.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="table-text-center">{idx + 1}</td>
                                    <td className="table-text-center">{item.MA_CN}</td>
                                    <td>{item.TEN_CN}</td>
                                    <td>{item.TEN_KHOA}</td>
                                    <td className="table-text-center">
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
                                <strong>Khoa</strong>
                            </Form.Label>
                            <Form.Select>
                                <option value="1" selected>
                                    Công nghệ thông tin & Truyền thông
                                </option>
                                <option value="2">Kinh tế</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Tên chuyên ngành</strong>
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
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Tên chuyên ngành</strong>
                                </Form.Label>
                                <Form.Control type="text" value={editMajor.MA_CN} disabled />
                            </Form.Group>
                            <Form.Label>
                                <strong>Khoa</strong>
                            </Form.Label>
                            <Form.Select>
                                <option value="1" selected>
                                    Công nghệ thông tin & Truyền thông
                                </option>
                                <option value="2">Kinh tế</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Tên chuyên ngành</strong>
                            </Form.Label>
                            <Form.Control type="text" value={editMajor.TEN_CN} autoFocus />
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
                    <p>
                        Bạn có chắc chắn xóa thông tin của chuyên nghành <strong>{deleteMajor.TEN_CN}</strong> ?
                    </p>
                    <strong>Lưu ý:</strong> Nếu xóa thông tin chuyên nghành này sẽ mất vĩnh viễn
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={()=>deleteChuyenNganh(deleteMajor.MA_CN)}>
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

export default ChuyenNganh
