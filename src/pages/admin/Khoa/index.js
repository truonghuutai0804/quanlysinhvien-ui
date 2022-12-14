import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { MdAddBox } from 'react-icons/md'
import Swal from 'sweetalert2'


const Khoa = () => {
    const [infoFaculty, setInfoFaculty] = useState([])
    const [editInfoFaculty, setEditInfoFaculty] = useState([])
    const [createInfoFaculty, setCreateInfoFaculty] = useState([])
    const [deleteInfoFaculty, setDeleteInfoFaculty] = useState([])
    const [seeEditInfoFaculty, setSeeEditInfoFaculty] = useState([])

    const [showThemMoi, setShowThemMoi] = useState(false)
    const [showSuaLai, setShowSuaLai] = useState(false)
    const [showXoa, setShowXoa] = useState(false)

    const handleShowThemMoi = () => setShowThemMoi(true)
    const handleShowSuaLai = (info) => {
        setShowSuaLai(true)
        setSeeEditInfoFaculty(info)
    }
    const handleShowXoa = (info) => {
        setShowXoa(true)
        setDeleteInfoFaculty(info)
    }

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

    const setKhoa = async () => {
        try {
            const options = {
                method: 'post',
                url: 'http://localhost:8080/api/faculty',
                data: createInfoFaculty
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseThemMoi()
                Swal.fire('Th??nh c??ng', 'B???n ???? th??m m???i th??nh c??ng ', 'success')
                getKhoa()
            }
        } catch (error) {
            Swal.fire('Th???t b???i', error, 'error')
        }
    }

    const editKhoa = async (id) => {
        try {
            const options = {
                method: 'put',
                url: `http://localhost:8080/api/faculty/${id}`,
                data: editInfoFaculty
            }
            console.log(editInfoFaculty)
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseSuaLai()
                Swal.fire('Th??nh c??ng', 'B???n ???? s???a l???i th??nh c??ng ', 'success')
                getKhoa()
            }
        } catch (error) {
            Swal.fire('Th???t b???i', `L???i ${error}`, 'error')
        }
    }

    const deleteKhoa = async (id) => {
        try {
            const options = {
                method: 'delete',
                url: `http://localhost:8080/api/faculty/${id}`,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseXoa()
                Swal.fire('Th??nh c??ng', 'B???n ???? x??a th??nh c??ng ', 'success')
                getKhoa()
            }
        } catch (error) {
            Swal.fire('Th???t b???i', `L???i ${error}`, 'error')
        }
    }

    useEffect(() => {
        getKhoa()
    }, [getKhoa])

    return (
        <>
            <aside className="ms-4">
                <h2 className="m-2">Th??ng tin khoa</h2>
                <aside className="d-flex justify-content-between m-3">
                    <Button variant="outline-primary" onClick={handleShowThemMoi}>
                        <MdAddBox /> Th??m khoa m???i
                    </Button>
                </aside>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>M?? khoa</th>
                            <th>T??n khoa</th>
                            <th>Ho???t ?????ng</th>
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
                                        <strong className="infor-remove" onClick={()=>handleShowXoa(item)}>
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
                        TH??M SINH VI??N M???I
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>M?? khoa</strong>
                            </Form.Label>
                            <Form.Control type="text"
                                name='MA_KHOA'
                                onChange={(e) => setCreateInfoFaculty({ ...createInfoFaculty, [e.target.name]: e.target.value })}
                                autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>T??n khoa</strong>
                            </Form.Label>
                            <Form.Control type="text"
                                name='TEN_KHOA'
                                onChange={(e) => setCreateInfoFaculty({ ...createInfoFaculty, [e.target.name]: e.target.value })}
                                autoFocus />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseThemMoi}>
                        H???y
                    </Button>
                    <Button variant="primary" onClick={()=>setKhoa()}>
                        T???o m???i
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSuaLai} onHide={handleCloseSuaLai} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-edit">
                        <FaEdit size={50} /> S???A L???I TH??NG TIN KHOA
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>M?? khoa</strong>
                            </Form.Label>
                            <Form.Control 
                                type="text"
                                defaultValue={seeEditInfoFaculty.MA_KHOA}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>T??n khoa</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="TEN_KHOA"
                                onChange={(e) => setEditInfoFaculty({ ...editInfoFaculty, [e.target.name]: e.target.value })}
                                defaultValue={seeEditInfoFaculty.TEN_KHOA}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSuaLai}>
                        H???y
                    </Button>
                    <Button variant="primary" onClick={()=>editKhoa(seeEditInfoFaculty.MA_KHOA)}>
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
                    <p>B???n c?? ch???c ch???n x??a th??ng tin c???a khoa <strong>{deleteInfoFaculty.TEN_KHOA}</strong> n??y ?</p>
                    <strong>L??u ??:</strong> N???u x??a th??ng tin khoa n??y s??? m???t v??nh vi???n
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={()=>deleteKhoa(deleteInfoFaculty.MA_KHOA)}>
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

export default Khoa
