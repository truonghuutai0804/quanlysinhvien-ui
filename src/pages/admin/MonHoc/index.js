import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { MdAddBox } from 'react-icons/md'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import axios from 'axios'
import Swal from 'sweetalert2'

function MonHoc() {
    const [subjectInput, setSubjectInput] = useState({})
    const [subject, setSubject] = useState([])
    const [faculty, setFaculty] = useState([])
    const [editInfoPDT, setEditInfoPDT] = useState([])
    const [deleteInfoPDT, setDeleteInfoPDT] = useState([])

    const [showThemMoi, setShowThemMoi] = useState(false)
    const [showSuaLai, setShowSuaLai] = useState(false)
    const [showXoa, setShowXoa] = useState(false)

    const handleShowThemMoi = () => setShowThemMoi(true)
    const handleShowSuaLai = (info) => {
        setEditInfoPDT(info)
        setShowSuaLai(true)
    }
    const handleShowXoa = (info) => {
        setDeleteInfoPDT(info)
        setShowXoa(true)
    }

    const handleCloseThemMoi = () => setShowThemMoi(false)
    const handleCloseSuaLai = () => setShowSuaLai(false)
    const handleCloseXoa = () => setShowXoa(false)

    const getMonHoc = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/subject',
            }
            const response = await axios(options)
            const subjects = response.data.data
            if (response.data.status === 400) {
                setSubject(subjects)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getKhoa = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/faculty',
            }
            const response = await axios(options)
            const faculties = response.data.data
            if (response.data.status === 400) {
                setFaculty(faculties)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const createMonHoc = async () => {
        try {
            const options = {
                method: 'post',
                url: `http://localhost:8080/api/subject/`,
                data: subjectInput,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseThemMoi()
                Swal.fire('Th??nh c??ng', 'Th??m m??n h???c th??nh c??ng ', 'success')
                getMonHoc()
            }
        } catch (error) {
            Swal.fire('Th???t b???i', `L???i ${error}`, 'error')
        }
    }

    const updateMonHoc = async (id) => {
        try {
            const options = {
                method: 'put',
                url: `http://localhost:8080/api/subject/${id}`,
                data: editInfoPDT,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseSuaLai()
                Swal.fire('Th??nh c??ng', 'S???a m??n h???c th??nh c??ng ', 'success')
                getMonHoc()
            }
        } catch (error) {
            Swal.fire('Th???t b???i', `L???i ${error}`, 'error')
        }
    }

    const deleteMonHoc = async (id) => {
        try {
            const options = {
                method: 'delete',
                url: `http://localhost:8080/api/subject/${id}`,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseXoa()
                Swal.fire('Th??nh c??ng', 'B???n ???? x??a th??nh c??ng ', 'success')
                getMonHoc()
            }
        } catch (error) {
            Swal.fire('Th???t b???i', `L???i ${error}`, 'error')
        }
    }

    useEffect(() => {
        getMonHoc()
        getKhoa()
    }, [getMonHoc, getKhoa])

    return (
        <>
            <aside className="ms-4">
                <h2 className="m-2">Th??ng tin m??n h???c</h2>
                <aside className="d-flex justify-content-between m-3">
                    <Button variant="outline-primary" onClick={handleShowThemMoi}>
                        <MdAddBox /> Th??m m??n h???c m???i
                    </Button>
                </aside>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>M?? m??n h???c</th>
                            <th>T??n m??n h???c</th>
                            <th>T??n ch???</th>
                            <th>Ho???t ?????ng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subject &&
                            subject.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="table-text-center">{idx + 1}</td>
                                    <td className="table-text-center">{item.MA_MH}</td>
                                    <td>{item.TEN_MH}</td>
                                    <td className="table-text-center">{item.TIN_CHI}</td>
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
                        TH??M M??N H???C M???I
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>M?? m??n h???c</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="MA_MH"
                                onChange={(e) => setSubjectInput({ ...subjectInput, [e.target.name]: e.target.value })}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>T??n m??n h???c</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="TEN_MH"
                                onChange={(e) => setSubjectInput({ ...subjectInput, [e.target.name]: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Khoa</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_KHOA"
                                onChange={(e) => setSubjectInput({ ...subjectInput, [e.target.name]: e.target.value })}
                            >
                                <option value="">Ch???n khoa</option>
                                {faculty &&
                                    faculty.map((item, idx) => (
                                        <>
                                            <option key={idx} value={item.MA_KHOA}>
                                                {item.TEN_KHOA}
                                            </option>
                                        </>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>T??n ch???</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="TIN_CHI"
                                onChange={(e) => setSubjectInput({ ...subjectInput, [e.target.name]: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseThemMoi}>
                        H???y
                    </Button>
                    <Button variant="primary" onClick={createMonHoc}>
                        T???o m???i
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSuaLai} onHide={handleCloseSuaLai} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-edit">
                        <FaEdit size={50} /> S???A L???I TH??NG TIN M??N H???C
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>M?? m??n h???c</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={editInfoPDT.MA_MH}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>T??n m??n h???c</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="TEN_MH"
                                value={editInfoPDT.TEN_MH}
                                onChange={(e) => setEditInfoPDT({ ...editInfoPDT, [e.target.name]: e.target.value })}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Khoa</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_KHOA"
                                value={editInfoPDT.MA_KHOA}
                                onChange={(e) => setEditInfoPDT({ ...editInfoPDT, [e.target.name]: e.target.value })}
                            >
                                <option value="">Ch???n nh??m h???c ph???n</option>
                                {faculty &&
                                    faculty.map((item, idx) => (
                                        <>
                                            <option key={idx} value={item.MA_KHOA}>
                                                {item.TEN_KHOA}
                                            </option>
                                        </>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>T??n ch???</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="TIN_CHI"
                                value={editInfoPDT.TIN_CHI}
                                onChange={(e) => setEditInfoPDT({ ...editInfoPDT, [e.target.name]: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSuaLai}>
                        H???y
                    </Button>
                    <Button variant="primary" onClick={()=>updateMonHoc(editInfoPDT.MA_MH)}>
                        L??u l???i
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showXoa} onHide={handleCloseXoa} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-remove">
                        <FaTrashAlt size={50} /> X??A TH??NG TIN M??N H???C
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        B???n c?? ch???c ch???n x??a th??ng tin c???a m??n h???c <strong>{deleteInfoPDT.TEN_MH}</strong> n??y ?
                    </p>
                    <strong>L??u ??:</strong> N???u x??a th??ng tin s??? m???t v??nh vi???n
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => deleteMonHoc(deleteInfoPDT.MA_MH)}>
                        Ch???c ch???n
                    </Button>
                    <Button variant="secondary" onClick={handleCloseXoa}>
                        Tr??? v???
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default MonHoc
