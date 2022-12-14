import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Container, Form, Modal, Table } from 'react-bootstrap'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { GiReturnArrow } from 'react-icons/gi'
import { MdAddBox } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const QuanLyMonHoc = () => {
    const [khoa, setKhoa] = useState([])
    const [data, setData] = useState([])
    const [createInput, setCreateInput] = useState([])
    const [editData, setEditData] = useState([])
    const [deleteData, setDeleteData] = useState([])

    const [showThemMoi, setShowThemMoi] = useState(false)
    const [showSuaLai, setShowSuaLai] = useState(false)
    const [showXoa, setShowXoa] = useState(false)

    const handleShowThemMoi = () => {
        getKhoa()
        setShowThemMoi(true)
    }
    const handleShowSuaLai = (info) => {
        setEditData(info)
        setShowSuaLai(true)
        getKhoa()
    }
    const handleShowXoa = (info) => {
        setShowXoa(true)
        setDeleteData(info)
    }

    const handleCloseThemMoi = () => {
        setCreateInput()
        setShowThemMoi(false)
    }
    const handleCloseSuaLai = () => setShowSuaLai(false)
    const handleCloseXoa = () => setShowXoa(false)

    const getKhoa = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/faculty',
            }
            const response = await axios(options)
            const datas = response.data.data
            if (response.data.status === 400) {
                setKhoa(datas)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const get = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/subject',
            }
            const response = await axios(options)
            const datas = response.data.data
            if (response.data.status === 400) {
                setData(datas)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const create = async () => {
        try {
            const options = {
                method: 'post',
                url: 'http://localhost:8080/api/subject',
                data: createInput,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                Swal.fire('Th??nh c??ng', 'B???n ???? th??m th??nh c??ng ', 'success')
                handleCloseThemMoi()
                get()
            } else {
                Swal.fire('Th???t b???i', 'B???n ???? th??m th???t b???i ', 'error')
                handleCloseThemMoi()
            }
        } catch (error) {
            Swal.fire('Th???t b???i', 'B???n ???? th??m th???t b???i ', 'error')
            handleCloseThemMoi()
        }
    }

    const update = async (id) => {
        try {
            const options = {
                method: 'put',
                url: `http://localhost:8080/api/subject/${id}`,
                data: editData,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                Swal.fire('Th??nh c??ng', 'B???n ???? s???a th??nh c??ng ', 'success')
                handleCloseSuaLai()
                get()
            } else {
                Swal.fire('Th???t b???i', 'B???n ???? s???a th???t b???i ', 'error')
                handleCloseSuaLai()
            }
        } catch (error) {
            Swal.fire('Th???t b???i', 'B???n ???? s???a th???t b???i ', 'error')
            handleCloseSuaLai()
        }
    }

    const Delete = async (id) => {
        try {
            const options = {
                method: 'delete',
                url: `http://localhost:8080/api/subject/${id}`,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                Swal.fire('Th??nh c??ng', 'B???n ???? x??a th??nh c??ng ', 'success')
                handleCloseXoa()
                get()
            } else {
                Swal.fire('Th???t b???i', 'B???n ???? x??a th???t b???i ', 'error')
                handleCloseXoa()
            }
        } catch (error) {
            Swal.fire('Th???t b???i', 'B???n ???? x??a th???t b???i ', 'error')
            handleCloseXoa()
        }
    }

    useEffect(() => {
        get()
    }, [get])

    return (
        <>
            <Container>
                <aside className="ms-4">
                    <aside className="d-flex m-3">
                        <Link className="btn btn-outline-secondary" to="/Trainer">
                            <GiReturnArrow /> Quay L???i
                        </Link>
                    </aside>
                    <h2 className="my-5 text-center">QU???N L?? M??N H???C</h2>
                    <Button onClick={handleShowThemMoi} className='mb-3'>Th??m m??n h???c m???i</Button>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>M?? m??n h???c</th>
                                <th>T??n m??n h???c</th>
                                <th>T??n khoa</th>
                                <th>T??n ch???</th>
                                <th>H??nh ?????ng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data &&
                                data.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="table-text-center">{idx + 1}</td>
                                        <td className="table-text-center">{item.MA_MH}</td>
                                        <td>{item.TEN_MH}</td>
                                        <td>{item.TEN_KHOA}</td>
                                        <td>{item.TIN_CHI}</td>
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
            </Container>

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
                                <strong>M?? m??n h???c m???i</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="MA_MH"
                                onChange={(e) => setCreateInput({ ...createInput, [e.target.name]: e.target.value })}
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
                                onChange={(e) => setCreateInput({ ...createInput, [e.target.name]: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>T??n ch???</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="TIN_CHI"
                                onChange={(e) => setCreateInput({ ...createInput, [e.target.name]: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>T??n khoa</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_KHOA"
                                onChange={(e) => setCreateInput({ ...createInput, [e.target.name]: e.target.value })}
                            >
                                <option value=" ">Ch???n khoa</option>
                                {khoa &&
                                    khoa.map((item, idx) => (
                                        <option key={idx} value={item.MA_KHOA}>
                                            {item.TEN_KHOA}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseThemMoi}>
                        H???y
                    </Button>
                    <Button variant="primary" onClick={create}>
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
                            <Form.Control type="text" value={editData.MA_MH} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>T??n khoa</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_KHOA"
                                value={editData.MA_KHOA}
                                onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
                            >
                                <option value="">Ch???n khoa</option>
                                {khoa &&
                                    khoa.map((item, idx) => (
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
                                <strong>T??n m??n h???c</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="TEN_MH"
                                value={editData.TEN_MH}
                                onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Tin ch???</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="TIN_CHI"
                                value={editData.TIN_CHI}
                                onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSuaLai}>
                        H???y
                    </Button>
                    <Button variant="primary" onClick={() => update(editData.MA_MH)}>
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
                        B???n c?? ch???c ch???n x??a th??ng tin c???a chuy??n ng??nh <strong>{deleteData.TEN_MH}</strong> n??y ?
                    </p>
                    <strong>L??u ??:</strong> N???u x??a th??ng tin s??? m???t v??nh vi???n
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => Delete(deleteData.MA_MH)}>
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

export default QuanLyMonHoc
