import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { MdAddBox } from 'react-icons/md'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import axios from 'axios'
import Swal from 'sweetalert2'

function LopHoc() {
    const [infoClass, setInfoClass] = useState([])
    const [major, setMajor] = useState([])
    const [addClass, setAddClass] = useState([])
    const [editInfoClass, setEditInfoClass] = useState([])
    const [deleteInfoClass, setDeleteInfoClass] = useState([])

    const [showThemMoi, setShowThemMoi] = useState(false)
    const [showSuaLai, setShowSuaLai] = useState(false)
    const [showXoa, setShowXoa] = useState(false)

    const handleShowThemMoi = () => setShowThemMoi(true)
    const handleShowSuaLai = (info) => {
        setEditInfoClass(info)
        setShowSuaLai(true)
    }
    const handleShowXoa = (info) => {
        setDeleteInfoClass(info)
        setShowXoa(true)
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

    const getLopHoc = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/class',
            }
            const response = await axios(options)
            const classes = response.data.data
            if (response.data.status === 400) {
                setInfoClass(classes)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const createLopHoc = async () => {
        try {
            const options = {
                method: 'post',
                url: `http://localhost:8080/api/class`,
                data: addClass,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseThemMoi()
                Swal.fire('Th??nh c??ng', 'Th??m l???p m???i th??nh c??ng ', 'success')
                getLopHoc()
            }
        } catch (error) {
            Swal.fire('Th???t b???i', `L???i ${error}`, 'error')
        }
    }

    const updateLopHoc = async (id) => {
        try {
            const options = {
                method: 'put',
                url: `http://localhost:8080/api/class/${id}`,
                data: editInfoClass,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseSuaLai()
                Swal.fire('Th??nh c??ng', 'S???a th??ng tin l???p h???c th??nh c??ng ', 'success')
                getLopHoc()
            }
        } catch (error) {
            Swal.fire('Th???t b???i', `L???i ${error}`, 'error')
        }
    }

    const deleteLopHoc = async (id) => {
        try {
            const options = {
                method: 'delete',
                url: `http://localhost:8080/api/class/${id}`,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseXoa()
                Swal.fire('Th??nh c??ng', 'B???n ???? x??a th??nh c??ng ', 'success')
                getLopHoc()
            }
        } catch (error) {
            Swal.fire('Th???t b???i', `L???i ${error}`, 'error')
        }
    }

    useEffect(() => {
        getChuyenNganh()
        getLopHoc()
    }, [getLopHoc, getChuyenNganh])

    return (
        <>
            <aside className="ms-4">
                <h2 className="m-2">Th??ng tin l???p h???c</h2>
                <aside className="d-flex justify-content-between m-3">
                    <Button variant="outline-primary" onClick={handleShowThemMoi}>
                        <MdAddBox /> Th??m l???p h???c m???i
                    </Button>
                </aside>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>M?? l???p h???c</th>
                            <th>T??n l???p h???c</th>
                            <th>Chuy??n Ng??nh</th>
                            <th>Khoa</th>
                            <th>Ho???t ?????ng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {infoClass &&
                            infoClass.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="table-text-center">{idx + 1}</td>
                                    <td className="table-text-center">{item.MA_LOP}</td>
                                    <td>{item.TEN_LOP}</td>
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
                        TH??M M??N H???C M???I
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>M?? l???p</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="MA_LOP"
                                onChange={(e) => setAddClass({ ...addClass, [e.target.name]: e.target.value })}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>T??n l???p</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="TEN_LOP"
                                onChange={(e) => setAddClass({ ...addClass, [e.target.name]: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Chuy??n ng??nh</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_CN"
                                onChange={(e) => setAddClass({ ...addClass, [e.target.name]: e.target.value })}
                            >
                                <option value="">Ch???n chuy??n ng??nh</option>
                                {major &&
                                    major.map((item, idx) => (
                                        <>
                                            <option key={idx} value={item.MA_CN}>
                                                {item.TEN_CN}
                                            </option>
                                        </>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseThemMoi}>
                        H???y
                    </Button>
                    <Button variant="primary" onClick={createLopHoc}>
                        T???o m???i
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSuaLai} onHide={handleCloseSuaLai} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-edit">
                        <FaEdit size={50} /> S???A L???I TH??NG TIN L???P H???C
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>M?? l???p h???c</strong>
                            </Form.Label>
                            <Form.Control type="text" value={editInfoClass.MA_LOP} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>T??n l???p h???c</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={editInfoClass.TEN_LOP}
                                onChange={(e) =>
                                    setEditInfoClass({ ...editInfoClass, [e.target.name]: e.target.value })
                                }
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Chuy??n ng??nh</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_CN"
                                value={editInfoClass.MA_CN}
                                onChange={(e) =>
                                    setEditInfoClass({ ...editInfoClass, [e.target.name]: e.target.value })
                                }
                            >
                                <option value="">Ch???n chuy??n ng??nh</option>
                                {major &&
                                    major.map((item, idx) => (
                                        <>
                                            <option key={idx} value={item.MA_CN}>
                                                {item.TEN_CN}
                                            </option>
                                        </>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSuaLai}>
                        H???y
                    </Button>
                    <Button variant="primary" onClick={()=>updateLopHoc(editInfoClass.MA_LOP)}>
                        L??u l???i
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showXoa} onHide={handleCloseXoa} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-remove">
                        <FaTrashAlt size={50} /> X??A TH??NG TIN L???P H???C
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        B???n c?? ch???c ch???n x??a th??ng tin c???a l???p h???c <strong>{deleteInfoClass.TEN_LOP}</strong> ?
                    </p>
                    <strong>L??u ??:</strong> N???u x??a th??ng tin s??? m???t v??nh vi???n
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => deleteLopHoc(deleteInfoClass.MA_LOP)}>
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

export default LopHoc
