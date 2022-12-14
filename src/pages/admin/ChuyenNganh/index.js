import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { MdAddBox } from 'react-icons/md'
import Swal from 'sweetalert2'

const ChuyenNganh = () => {
    const [major, setMajor] = useState([])
    const [faculty, setFaculty] = useState([])
    const [addMajor, setAddMajor] = useState([])
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

    const createChuyenNganh = async () => {
        try {
            const options = {
                method: 'post',
                url: `http://localhost:8080/api/major/`,
                data: addMajor,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseThemMoi()
                Swal.fire('Th??nh c??ng', 'Th??m chuy??n ng??nh th??nh c??ng ', 'success')
                getChuyenNganh()
            }
        } catch (error) {
            Swal.fire('Th???t b???i', `L???i ${error}`, 'error')
        }
    }

    const updateChuyenNganh = async (id) => {
        try {
            const options = {
                method: 'put',
                url: `http://localhost:8080/api/major/${id}`,
                data: editMajor,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseSuaLai()
                Swal.fire('Th??nh c??ng', 'Th??m chuy??n ng??nh th??nh c??ng ', 'success')
                getChuyenNganh()
            }
        } catch (error) {
            Swal.fire('Th???t b???i', `L???i ${error}`, 'error')
        }
    }

    const deleteChuyenNganh = async (id) => {
        try {
            const options = {
                method: 'delete',
                url: `http://localhost:8080/api/major/${id}`,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseXoa()
                Swal.fire('Th??nh c??ng', 'B???n ???? x??a th??nh c??ng ', 'success')
                getChuyenNganh()
            }
        } catch (error) {
            Swal.fire('Th???t b???i', `L???i ${error}`, 'error')
        }
    }

    useEffect(() => {
        getChuyenNganh()
        getKhoa()
    }, [getChuyenNganh, getKhoa])

    return (
        <>
            <aside className="ms-4">
                <h2 className="m-2">Th??ng tin chuy??n ng??nh</h2>
                <aside className="d-flex justify-content-between m-3">
                    <Button variant="outline-primary" onClick={handleShowThemMoi}>
                        <MdAddBox /> Th??m chuy??n ng??nh m???i
                    </Button>
                </aside>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>M?? chuy??n ng??nh</th>
                            <th>T??n chuy??n ng??nh</th>
                            <th>Khoa</th>
                            <th>Ho???t ?????ng</th>
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
                        TH??M CHUY??N NG??NH M???I
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Khoa</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_KHOA"
                                onChange={(e) => setAddMajor({ ...addMajor, [e.target.name]: e.target.value })}
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
                                <strong>M?? chuy??n ng??nh</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="MA_CN"
                                onChange={(e) => setAddMajor({ ...addMajor, [e.target.name]: e.target.value })}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>T??n chuy??n ng??nh</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="TEN_CN"
                                onChange={(e) => setAddMajor({ ...addMajor, [e.target.name]: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseThemMoi}>
                        H???y
                    </Button>
                    <Button variant="primary" onClick={createChuyenNganh}>
                        T???o m???i
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSuaLai} onHide={handleCloseSuaLai} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-edit">
                        <FaEdit size={50} /> S???A L???I TH??NG TIN CHUY??N NG??NH
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>M?? chuy??n ng??nh</strong>
                            </Form.Label>
                            <Form.Control type="text" value={editMajor.MA_CN} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Khoa</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_KHOA"
                                value={editMajor.MA_KHOA}
                                onChange={(e) => setEditMajor({ ...editMajor, [e.target.name]: e.target.value })}
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
                                <strong>T??n chuy??n ng??nh</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="TEN_CN"
                                value={editMajor.TEN_CN}
                                onChange={(e) => setEditMajor({ ...editMajor, [e.target.name]: e.target.value })}
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSuaLai}>
                        H???y
                    </Button>
                    <Button variant="primary" onClick={()=>updateChuyenNganh(editMajor.MA_CN)}>
                        L??u l???i
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showXoa} onHide={handleCloseXoa} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-remove">
                        <FaTrashAlt size={50} /> X??A CHUY??N NG??NH
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        B???n c?? ch???c ch???n x??a th??ng tin c???a chuy??n ngh??nh <strong>{deleteMajor.TEN_CN}</strong> ?
                    </p>
                    <strong>L??u ??:</strong> N???u x??a th??ng tin chuy??n ngh??nh n??y s??? m???t v??nh vi???n
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => deleteChuyenNganh(deleteMajor.MA_CN)}>
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

export default ChuyenNganh
