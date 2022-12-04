import { React, useCallback, useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { MdOutlineClose, MdSave } from 'react-icons/md'
import { FaEdit, FaEye } from 'react-icons/fa'
import axios from 'axios'
import Swal from 'sweetalert2'

function DiemSinhVien() {
    const [show, setShow] = useState(false)
    const [showEditDiem, setShowEditDiem] = useState(false)
    const [infoEditDiem, setInfoEditDiem] = useState([])

    const handleEditDiemShow = (info) => {
        setInfoEditDiem(info)
        setShowEditDiem(true)
    }
    const handleShow = (info) => {
        getInfoDiemSinhVien(info.MA_SV)
        setShow(true)
    }

    const handleEditDiemClose = () => {
        setShowEditDiem(false)
    }
    const handleClose = () => setShow(false)

    const [score, setScore] = useState([])
    const [scoreBC, setScoreBC] = useState([])
    const [infoScore, setInfoScore] = useState([])

    const getDiemSinhVien = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/score',
            }
            const response = await axios(options)
            const scores = response.data.data
            if (response.data.status === 400) {
                setScore(scores)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getDiemSinhVienBlockchain = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/scoreAllSV',
            }
            const response = await axios(options)
            const scores = response.data.data
            if (response.data.message === 'SUCCESS') {
                setScoreBC(scores)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const editDiemSinhVienBlockchain = async (id) => {
        try {
            const options = {
                method: 'put',
                url: `http://localhost:8080/api/scoreAD/${id}`,
                data: infoEditDiem,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleEditDiemClose()
                Toast.fire({
                    icon: 'success',
                    title: 'Sửa điểm thành công',
                })
                getInfoDiemSinhVien(id)
                getDiemSinhVienBlockchain()
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Thất bại',
                })
                console.log(response.data.err)
            }
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: 'Thất bại',
            })
            console.log(error)
        }
    }

    const getInfoDiemSinhVien = async (info) => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/allScoreSV/${info}`,
            }
            const response = await axios(options)
            const scores = response.data.data
            if (response.data.message === 'SUCCESS') {
                setInfoScore(scores)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDiemSinhVien()
        getDiemSinhVienBlockchain()
    }, [getDiemSinhVien, getDiemSinhVienBlockchain])

    let arrDiem = []

    if (score.length > 0 && scoreBC.length > 0) {
        for (let x = 0; x < score.length; x++) {
            let MA_SV = score[x].MA_SV
            let HOTEN_SV = score[x].HOTEN_SV
            let DIEM_SO = 0
            let TIN_CHI = 0
            for (let y = 0; y < scoreBC.length; y++) {
                let diem = score[x]
                let diemBC = scoreBC[y]
                if (diem.MA_SV === diemBC[2]) {
                    DIEM_SO += Number(diemBC[7]) * Number(diemBC[6])
                    TIN_CHI += Number(diemBC[6])
                }
            }
            DIEM_SO = ((DIEM_SO / TIN_CHI) * 4) / 10
            arrDiem.push({ MA_SV: MA_SV, HOTEN_SV: HOTEN_SV, DIEM_SO: DIEM_SO, TIN_CHI: TIN_CHI })
        }
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
    })

    return (
        <>
            <aside className="ms-4">
                <h2 className="m-2">Điểm của sinh viên</h2>
                <Table bordered hover className="mt-5">
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
                        {arrDiem !== [] &&
                            arrDiem.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="table-text-center">{idx + 1}</td>
                                    <td>{item.HOTEN_SV}</td>
                                    <td>{item.MA_SV}</td>
                                    <td className="table-text-center">{item.TIN_CHI}</td>
                                    <td className="table-text-center">
                                        {isNaN(item.DIEM_SO.toFixed(2)) ? 0 : item.DIEM_SO.toFixed(2)}
                                    </td>
                                    <td className="table-text-center">
                                        <strong
                                            onClick={() => {
                                                handleShow(item)
                                            }}
                                            className="infor-see"
                                        >
                                            <FaEye />
                                        </strong>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </aside>

            <Modal show={show} onHide={handleClose} animation={true} scrollable={true} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Điểm cá nhân sinh viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Mã môn học</th>
                                <th>Môn học</th>
                                <th>Tín chỉ</th>
                                <th>Điểm chữ</th>
                                <th>Điểm số</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {infoScore &&
                                infoScore.map((item, idx) =>
                                    item[2] !== '' ? (
                                        <tr key={idx}>
                                            <td>{item[4]}</td>
                                            <td>{item[5]}</td>
                                            <td className="table-text-center">{item[6]}</td>
                                            <td className="table-text-center">{item[8]}</td>
                                            <td className="table-text-center">{item[7]}</td>
                                            <td className="table-text-center">
                                                <strong className="infor-edit" onClick={() => handleEditDiemShow(item)}>
                                                    <FaEdit />
                                                </strong>
                                            </td>
                                        </tr>
                                    ) : null,
                                )}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        <MdOutlineClose /> Trở về
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditDiem} onHide={handleEditDiemClose} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Điểm của môn {infoEditDiem[5]}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Môn học</Form.Label>
                            <Form.Control type="text" defaultValue={infoEditDiem[5]} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Điểm số</Form.Label>
                            <Form.Control
                                type="text"
                                name="7"
                                defaultValue={infoEditDiem[7]}
                                onChange={(e) => setInfoEditDiem({ ...infoEditDiem, [e.target.name]: e.target.value })}
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditDiemClose}>
                        <MdOutlineClose /> Hủy
                    </Button>
                    <Button variant="primary" onClick={() => editDiemSinhVienBlockchain(infoEditDiem[2])}>
                        <MdSave /> Lưu lại
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DiemSinhVien
