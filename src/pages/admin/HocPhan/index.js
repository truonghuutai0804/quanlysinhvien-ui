import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Container, Modal, Table, Form } from 'react-bootstrap'
import { MdAddBox } from 'react-icons/md'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

function HocPhan() {
    const [year, setYear] = useState([])
    const [semester, setSemester] = useState([])
    const [subject, setSubject] = useState([])
    const [teacher, setTeacher] = useState([])
    const [group, setGroup] = useState([])

    const [showXoa, setShowXoa] = useState(false)
    const [showThemMoi, setShowThemMoi] = useState(false)
    const [showSuaLai, setShowSuaLai] = useState(false)

    const [deleteHP, setDeleteHP] = useState({})
    const [createInfoHocPhan, setCreateInfoHocPhan] = useState({})
    const [editInfoHocPhan, setEditInfoHocPhan] = useState({})

    const handleShowThemMoi = () => setShowThemMoi(true)
    const handleShowSuaLai = (info) => {
        setEditInfoHocPhan(info)
        setShowSuaLai(true)
    }
    const handleShowXoa = (info) => {
        setDeleteHP(info)
        setShowXoa(true)
    }
    
    const handleCloseSuaLai = () => setShowSuaLai(false)
    const handleCloseThemMoi = () => setShowThemMoi(false)
    const handleCloseXoa = () => setShowXoa(false)

    const getHocPhan = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/group',
            }
            const response = await axios(options)
            const groups = response.data.data
            if (response.data.status === 400) {
                setGroup(groups)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getMonHoc = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/subject`,
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

    const getNamHoc = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/year',
            }
            const response = await axios(options)
            const years = response.data.data
            if (response.data.message === 'SUCCESS') {
                setYear(years)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getHocKi = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/semester',
            }
            const response = await axios(options)
            const semesters = response.data.data
            if (response.data.message === 'SUCCESS') {
                setSemester(semesters)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getGiaoVien = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/teacher',
            }
            const response = await axios(options)
            const teachers = response.data.dataGV
            if (response.data.status === 400) {
                setTeacher(teachers)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const setHocPhan = async () => {
        try {
            const options = {
                method: 'post',
                url: `http://localhost:8080/api/group`,
                data: createInfoHocPhan,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseThemMoi()
                getHocPhan()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateHocPhan = async (id) => {
        try {
            const options = {
                method: 'put',
                url: `http://localhost:8080/api/group/${id}`,
                data: editInfoHocPhan,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseSuaLai()
                getHocPhan()
            }
            else{
                handleCloseSuaLai()  
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteHocPhan = async (id) => {
        try {
            const options = {
                method: 'delete',
                url: `http://localhost:8080/api/group/${id}`,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseXoa()
                getHocPhan()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getHocPhan()
        getMonHoc()
        getNamHoc()
        getHocKi()
        getGiaoVien()
    }, [getHocPhan, getMonHoc, getNamHoc, getHocKi, getGiaoVien])

    return (
        <>
            <Container>
                <aside className="ms-4">
                    <h2 className="my-5 text-center">DANH S??CH NH??M H???C PH???N</h2>
                        <Button variant="outline-primary" className='mb-3 ms-4' onClick={handleShowThemMoi}>
                            <MdAddBox /> Th??m h???c ph???n m???i
                        </Button>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>M?? nh??m HP</th>
                                <th>T??n m??n h???c</th>
                                <th>H??? t??n gi??o vi??n</th>
                                <th>H???c k???</th>
                                <th>N??m h???c</th>
                                <th>S??? l?????ng</th>
                                <th>H??nh ?????ng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {group &&
                                group.map((item, idx) => (
                                    <tr>
                                        <td className="table-text-center">{idx + 1}</td>
                                        <td className="table-text-center">{item.MA_NHP}</td>
                                        <td>{item.TEN_MH}</td>
                                        <td>{item.HOTEN_GV}</td>
                                        <td className="table-text-center" >{item.HOC_KY}</td>
                                        <td>{item.NAM_HOC}</td>
                                        <td className="table-text-center">
                                            {item.CON_LAI}/{item.SO_LUONG}
                                        </td>
                                        <td className="table-text-center">
                                            <strong className="infor-edit" onClick={()=>handleShowSuaLai(item)}>
                                                <FaEdit />
                                            </strong>
                                            <strong className="infor-remove" onClick={() => handleShowXoa(item)}>
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
                        TH??M SINH VI??N M???I
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>T??n m??n h???c</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_MH"
                                onChange={(e) =>
                                    setCreateInfoHocPhan({ ...createInfoHocPhan, [e.target.name]: e.target.value })
                                }
                            >
                                <option value="">Ch???n m??n h???c</option>
                                {subject &&
                                    subject.map((item, idx) => (
                                        <option key={idx} value={item.MA_MH}>
                                            {item.TEN_MH}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Gi???ng vi??n</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_GV"
                                onChange={(e) =>
                                    setCreateInfoHocPhan({ ...createInfoHocPhan, [e.target.name]: e.target.value })
                                }
                            >
                                <option value="">Ch???n gi??o vi??n</option>
                                {teacher &&
                                    teacher.map((item, idx) => (
                                        <option key={idx} value={item.MA_GV}>
                                            {item.HOTEN_GV}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>S??? l?????ng</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="SO_LUONG"
                                onChange={(e) =>
                                    setCreateInfoHocPhan({ ...createInfoHocPhan, [e.target.name]: e.target.value })
                                }
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>H???c k??</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_HK"
                                onChange={(e) =>
                                    setCreateInfoHocPhan({ ...createInfoHocPhan, [e.target.name]: e.target.value })
                                }
                            >
                                <option value="">Ch???n h???c k??</option>
                                {semester &&
                                    semester.map((item, idx) => (
                                        <option key={idx} value={item.MA_HK}>
                                            {item.HOC_KY}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>N??m h???c</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_NH"
                                onChange={(e) =>
                                    setCreateInfoHocPhan({ ...createInfoHocPhan, [e.target.name]: e.target.value })
                                }
                            >
                                <option value="">Ch???n n??m h???c</option>
                                {year &&
                                    year.map((item, idx) => (
                                        <option key={idx} value={item.MA_NH}>
                                            {item.NAM_HOC}
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
                    <Button variant="primary" onClick={setHocPhan}>
                        T???o m???i
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSuaLai} onHide={handleCloseSuaLai} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-edit">
                        <FaEdit size={50} /> S???A L???I H???C PH???N
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>M?? nh??m h???c ph???n</strong>
                            </Form.Label>
                            <Form.Control defaultValue={editInfoHocPhan.MA_NHP} type="text" disabled />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>T??n m??n h???c</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_MH"
                                value={editInfoHocPhan.MA_MH}
                                onChange={(e) =>
                                    setEditInfoHocPhan({ ...editInfoHocPhan, [e.target.name]: e.target.value })
                                }
                            >
                                {subject &&
                                    subject.map((item, idx) => (
                                        <option key={idx} value={item.MA_MH}>
                                            {item.TEN_MH}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Gi???ng vi??n</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_GV"
                                value={editInfoHocPhan.MA_GV}
                                onChange={(e) =>
                                    setEditInfoHocPhan({ ...editInfoHocPhan, [e.target.name]: e.target.value })
                                }
                            >
                                <option value="">Ch???n gi??o vi??n</option>
                                {teacher &&
                                    teacher.map((item, idx) => (
                                        <option key={idx} value={item.MA_GV}>
                                            {item.HOTEN_GV}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>S??? l?????ng</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={editInfoHocPhan.SO_LUONG}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>H???c k??</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_HK"
                                value={editInfoHocPhan.MA_HK}
                                onChange={(e) =>
                                    setEditInfoHocPhan({ ...editInfoHocPhan, [e.target.name]: e.target.value })
                                }
                            >
                                <option value="">Ch???n h???c k??</option>
                                {semester &&
                                    semester.map((item, idx) => (
                                        <option key={idx} value={item.MA_HK}>
                                            {item.HOC_KY}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>N??m h???c</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_NH"
                                value={editInfoHocPhan.MA_NH}
                                onChange={(e) =>
                                    setEditInfoHocPhan({ ...editInfoHocPhan, [e.target.name]: e.target.value })
                                }
                            >
                                <option value="">Ch???n n??m h???c</option>
                                {year &&
                                    year.map((item, idx) => (
                                        <option key={idx} value={item.MA_NH}>
                                            {item.NAM_HOC}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSuaLai}>
                        H???y
                    </Button>
                    <Button variant="primary" onClick={()=>updateHocPhan(editInfoHocPhan.MA_NHP)}>
                        L??u l???i
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showXoa} onHide={handleCloseXoa} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-remove">
                        <FaTrashAlt size={50} /> X??A H???C PH???N
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        B???n c?? ch???c ch???n x??a th??ng tin c???a h???c ph???n <strong>{deleteHP.MA_NHP}</strong> n??y ?
                    </p>
                    <strong>L??u ??:</strong> N???u x??a th??ng tin s??? m???t v??nh vi???n
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => deleteHocPhan(deleteHP.MA_NHP)}>
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

export default HocPhan
