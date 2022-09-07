import { React, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import { MdAddBox, MdOutlineUploadFile } from 'react-icons/md'
import { FaTrashAlt, FaEdit, FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './DiemSinhVien.scss'

function DiemSinhVien() {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <aside className="ms-4">
                <h2 className="m-2">Điểm của sinh viên</h2>
                <aside className="d-flex justify-content-between m-3">
                    <Button variant="outline-primary">
                        <MdAddBox /> Thêm điểm sinh viên 
                    </Button>
                    <Button variant="outline-success">
                        <MdOutlineUploadFile /> Upload
                    </Button>
                </aside>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Họ tên</th>
                            <th>MSSV</th>
                            <th>Số tính chỉ</th>
                            <th>Trung bình điểm tích lũy</th>
                            <th>Hoạt động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="table-text-center">1</td>
                            <td>Trương Hữu Tài</td>
                            <td>B1809509</td>
                            <td className="table-text-center">155</td>
                            <td className="table-text-center">3.20</td>
                            <td className="table-text-center">
                                <Link to="/DiemSinhVien" onClick={handleShow} className="infor-see">
                                    <FaEye />
                                </Link>

                                <Link to="/#" className="infor-remove">
                                    <FaTrashAlt />
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-text-center">2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td className="table-text-center">3</td>
                            <td>Larry the Bird</td>
                            <td>Thornton</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </aside>
            <Modal show={show} onHide={handleClose} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Điểm của Trương Hữu Tài</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Môn học</th>
                                <th>Tín chỉ</th>
                                <th>Điểm chữ</th>
                                <th>Điểm số</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="table-text-center">1</td>
                                <td>Tin học căn bản</td>
                                <td className="table-text-center">2</td>
                                <td className="table-text-center">A</td>
                                <td className="table-text-center">10.0</td>
                                <td className="table-text-center">
                                    <Link to="/" className="infor-edit">
                                        <FaEdit />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-text-center">2</td>
                                <td>Lập trình web</td>
                                <td className="table-text-center">3</td>
                                <td className="table-text-center">B</td>
                                <td className="table-text-center">7.5</td>
                                <td className="table-text-center">
                                    <Link to="/" className="infor-edit">
                                        <FaEdit />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-text-center">3</td>
                                <td>Lập trình căn bản</td>
                                <td className="table-text-center">3</td>
                                <td className="table-text-center">B+</td>
                                <td className="table-text-center">8.5</td>
                                <td className="table-text-center" >
                                    <Link to="/" className="infor-edit">
                                        <FaEdit />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-text-center">4</td>
                                <td>Tin học căn bản</td>
                                <td className="table-text-center">2</td>
                                <td className="table-text-center">A</td>
                                <td className="table-text-center">10.0</td>
                                <td className="table-text-center">
                                    <Link to="/" className="infor-edit">
                                        <FaEdit />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-text-center">5</td>
                                <td>Lập trình web</td>
                                <td className="table-text-center">3</td>
                                <td className="table-text-center">B</td>
                                <td className="table-text-center">7.5</td>
                                <td className="table-text-center">
                                    <Link to="/" className="infor-edit">
                                        <FaEdit />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-text-center">6</td>
                                <td>Lập trình căn bản</td>
                                <td className="table-text-center">3</td>
                                <td className="table-text-center">B+</td>
                                <td className="table-text-center">8.5</td>
                                <td className="table-text-center">
                                    <Link to="/" className="infor-edit">
                                        <FaEdit />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-text-center">7</td>
                                <td>Tin học căn bản</td>
                                <td className="table-text-center">2</td>
                                <td className="table-text-center">A</td>
                                <td className="table-text-center">10.0</td>
                                <td className="table-text-center">
                                    <Link to="/" className="infor-edit">
                                        <FaEdit />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-text-center">8</td>
                                <td>Lập trình web</td>
                                <td className="table-text-center">3</td>
                                <td className="table-text-center">B</td>
                                <td className="table-text-center">7.5</td>
                                <td className="table-text-center">
                                    <Link to="/" className="infor-edit">
                                        <FaEdit />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-text-center">9</td>
                                <td>Lập trình căn bản</td>
                                <td className="table-text-center">3</td>
                                <td className="table-text-center">B+</td>
                                <td className="table-text-center">8.5</td>
                                <td className="table-text-center">
                                    <Link to="/" className="infor-edit">
                                        <FaEdit />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-text-center">10</td>
                                <td>Tin học căn bản</td>
                                <td className="table-text-center">2</td>
                                <td className="table-text-center">A</td>
                                <td className="table-text-center">10.0</td>
                                <td className="table-text-center">
                                    <Link to="/" className="infor-edit">
                                        <FaEdit />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-text-center">11</td>
                                <td>Lập trình web</td>
                                <td className="table-text-center">3</td>
                                <td className="table-text-center">B</td>
                                <td className="table-text-center">7.5</td>
                                <td className="table-text-center">
                                    <Link to="/" className="infor-edit">
                                        <FaEdit />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-text-center">12</td>
                                <td>Lập trình căn bản</td>
                                <td className="table-text-center">3</td>
                                <td className="table-text-center">B+</td>
                                <td className="table-text-center">8.5</td>
                                <td className="table-text-center">
                                    <Link to="/" className="infor-edit">
                                        <FaEdit />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-text-center">13</td>
                                <td>Tin học căn bản</td>
                                <td className="table-text-center">2</td>
                                <td className="table-text-center">A</td>
                                <td className="table-text-center">10.0</td>
                                <td className="table-text-center">
                                    <Link to="/" className="infor-edit">
                                        <FaEdit />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-text-center">14</td>
                                <td>Lập trình web</td>
                                <td className="table-text-center">3</td>
                                <td className="table-text-center">B</td>
                                <td className="table-text-center">7.5</td>
                                <td className="table-text-center">
                                    <Link to="/" className="infor-edit">
                                        <FaEdit />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-text-center">15</td>
                                <td>Lập trình căn bản</td>
                                <td className="table-text-center">3</td>
                                <td className="table-text-center">B+</td>
                                <td className="table-text-center">8.5</td>
                                <td className="table-text-center">
                                    <Link to="/" className="infor-edit">
                                        <FaEdit />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-text-center">16</td>
                                <td>Tin học căn bản</td>
                                <td className="table-text-center">2</td>
                                <td className="table-text-center">A</td>
                                <td className="table-text-center">10.0</td>
                                <td className="table-text-center">
                                    <Link to="/" className="infor-edit">
                                        <FaEdit />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-text-center">17</td>
                                <td>Lập trình web</td>
                                <td className="table-text-center">3</td>
                                <td className="table-text-center">B</td>
                                <td className="table-text-center">7.5</td>
                                <td className="table-text-center">
                                    <Link to="/" className="infor-edit">
                                        <FaEdit />
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-text-center">18</td>
                                <td>Lập trình căn bản</td>
                                <td className="table-text-center">3</td>
                                <td className="table-text-center">B+</td>
                                <td className="table-text-center">8.5</td>
                                <td className="table-text-center">
                                    <Link to="/" className="infor-edit">
                                        <FaEdit />
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DiemSinhVien
