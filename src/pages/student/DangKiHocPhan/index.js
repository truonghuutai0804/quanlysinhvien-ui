import React, { useCallback, useEffect, useState } from 'react'
import { Button, Container, Form, Modal, Table } from 'react-bootstrap'
import './DangKiHocPhan.scss'
import axios from 'axios'

function KetQuaHocTap() {
    const [subject, setSubject] = useState([])
    const [group, setGroup] = useState([])
    const [createScore, setCreateScore] = useState([])
    const [show, setShow] = useState(false)
    const MA_SV = localStorage.getItem('login')

    const handleClose = () => setShow(false)

    const handleShow = (info) => {
        getHocPhan(info.MA_MH)
        setCreateScore(info)
        setShow(true)
    }

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

    const getHocPhan = async (id) => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/groups/${id}`,
            }
            const response = await axios(options)
            const groups = response.data.data
            if (response.data.message === 'SUCCESS') {
                setGroup(groups)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const setDiem = async (id) => {
        try {
            const options = {
                method: 'post',
                url: `http://localhost:8080/api/score/${id}`,
                data: createScore,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleClose()
            }else{
                handleClose()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMonHoc()
    }, [getMonHoc])

    return (
        <>
            <Container className="wrap-ketquahoctap">
                <h2>ĐĂNG KÍ HỌC PHẦN</h2>

                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã môn học</th>
                            <th>Tên môn học</th>
                            <th>Số tín chỉ</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subject &&
                            subject.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="ketquahoctap-text">{idx + 1}</td>
                                    <td className="ketquahoctap-text">{item.MA_MH}</td>
                                    <td>{item.TEN_MH}</td>
                                    <td className="ketquahoctap-text">{item.TIN_CHI}</td>
                                    <td className="ketquahoctap-text">
                                            <Button size="sm" onClick={() => handleShow(item)}>
                                                Đăng kí
                                            </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên môn học</Form.Label>
                            <Form.Control type="text" defaultValue={createScore.TEN_MH} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mã nhóm học phần</Form.Label>
                            <Form.Select
                                size="sm"
                                className="namhoc-ketquahoctap"
                                name="MA_NHP"
                                onChange={(e) => setCreateScore({ ...createScore, [e.target.name]: e.target.value })}
                            >
                                <option value="">Chọn nhóm học phần</option>
                                {group &&
                                    group.map((item, idx) => (
                                        <>
                                            <option key={idx} value={item.MA_NHP}>
                                               {item.TEN_MH} {item.MA_NHP}
                                            </option>
                                        </>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={()=>setDiem(MA_SV)}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default KetQuaHocTap
