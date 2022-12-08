import axios from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Button, Container, Dropdown, Form, Modal, Table } from 'react-bootstrap'
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa'
import { GiReturnArrow } from 'react-icons/gi'
import { MdOutlineClose, MdSave } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const QuanLyDiem = () => {
    const [scoreAllSV, setScoreAllSV] = useState([])
    const [reason, setReason] = useState([])
    const [scoreSV, setScoreSV] = useState([])
    const [scoreSVBlockchain, setScoreSVBlockchain] = useState([])
    const [deleteScore, setDeleteScore] = useState([])
    const [editScore, setEditScore] = useState([])
    const [findScoreSV, setFindScoreSV] = useState([])

    const [showXemThongTin, setShowXemThongTin] = useState(false)
    const [showSuaLai, setShowSuaLai] = useState(false)
    const [showXoa, setShowXoa] = useState(false)
    const [showBlockchainSV, setShowBlockchainSV] = useState(false)
    const [showBlockchainHP, setShowBlockchainHP] = useState(false)

    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const print = () => {
        handlePrint()
        setScoreSVBlockchain([])
    }

    const handleShowXemThongTin = (info) => {
        getAllDiemSinhVien(info)
        setShowXemThongTin(true)
    }
    const handleShowSuaLai = (info) => {
        setEditScore(info)
        getLyDo()
        setShowSuaLai(true)
    }

    const handleShowXoa = (info) => {
        setDeleteScore(info)
        setShowXoa(true)
    }

    const handleShowBlockchainSV = () => {
        setShowBlockchainSV(true)
    }

    const handleShowBlockchainHP = () => {
        setShowBlockchainHP(true)
    }

    const handleCloseXemThongTin = () => setShowXemThongTin(false)

    const handleCloseBlockchainSV = () => {
        setScoreSVBlockchain([])
        setShowBlockchainSV(false)
    }

    const handleCloseBlockchainHP = () => {
        setScoreSVBlockchain([])
        setShowBlockchainHP(false)
    }
    const handleCloseSuaLai = () => setShowSuaLai(false)
    const handleCloseXoa = () => setShowXoa(false)

    const getLyDo = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/reason',
            }
            const response = await axios(options)
            const reasons = response.data.data
            if (response.data.message === 'SUCCESS') {
                setReason(reasons)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getDiemSinhVien = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/score',
            }
            const response = await axios(options)
            const scores = response.data.data
            if (response.data.status === 400) {
                setScoreAllSV(scores)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getAllDiemSinhVien = useCallback(async (info) => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/scores/${info}`,
            }
            const response = await axios(options)
            const scores = response.data.data
            if (response.data.message === 'SUCCESS') {
                setScoreSV(scores)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getAllDiemSinhVienBlockchain = async (info) => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/allScoreSV/${info}`,
            }
            const response = await axios(options)
            const scores = response.data.data
            if (response.data.message === 'SUCCESS') {
                const data = arrDiemBlockChain(scores)
                setScoreSVBlockchain({
                    MA_SV: data[0].MA_SV,
                    TEN_SV: data[0].HOTEN_SV,
                    data: data,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getAllDiemHPBlockchain = async (info) => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/scoreGV/Blockchain/${info}`,
            }
            const response = await axios(options)
            const scores = response.data.data
            if (response.data.message === 'SUCCESS') {
                const data = arrDiemBlockChain(scores)
                setScoreSVBlockchain({
                    MA_NHP: data[0].MA_NHP,
                    MA_MH: data[0].MA_MH,
                    TEN_MH: data[0].TEN_MH,
                    data: data,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteDiemSinhVien = async (id) => {
        try {
            const options = {
                method: 'delete',
                url: `http://localhost:8080/api/scores/${id}`,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseXoa()
                Swal.fire('Thành công', 'Bạn đã xóa thành công ', 'success')
                getDiemSinhVien()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const editDiemSinhVien = async (id) => {
        try {
            const options = {
                method: 'put',
                url: `http://localhost:8080/api/scoreAD/${id}`,
                data: editScore,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseSuaLai()
                Swal.fire('Thành công', 'Bạn đã sửa đổi điểm thành công ', 'success')
                getDiemSinhVien()
                getAllDiemSinhVien(id)
            } else {
                Swal.fire('Thất bại', 'Bạn đã sửa đổi điểm thất bại ', 'error')
                console.log(response.data.err)
            }
        } catch (error) {
            Swal.fire('Thất bại', 'Bạn đã sửa đổi điểm thất bại ', 'error')
            console.log(error)
        }
    }

    useEffect(() => {
        getDiemSinhVien()
    }, [getDiemSinhVien])

    const arrDiemBlockChain = (arr) => {
        if (arr.length > 0) {
            var arrDiem = []
            var MA_NHP
            var MA_SV
            var HOTEN_SV
            var MA_MH
            var TEN_MH
            var TIN_CHI
            var DIEM_SO
            var DIEM_CHU
            var LY_DO
            for (let i = 0; i < arr.length; i++) {
                var data = arr[i]
                if (data[2] !== '') {
                    MA_NHP = data[1]
                    MA_SV = data[2]
                    HOTEN_SV = data[3]
                    MA_MH = data[4]
                    TEN_MH = data[5]
                    TIN_CHI = data[6]
                    DIEM_SO = data[7]
                    DIEM_CHU = data[8]
                    LY_DO = data[9]
                    arrDiem.push({
                        MA_NHP: MA_NHP,
                        MA_SV: MA_SV,
                        HOTEN_SV: HOTEN_SV,
                        MA_MH: MA_MH,
                        TEN_MH: TEN_MH,
                        DIEM_SO: DIEM_SO,
                        DIEM_CHU: DIEM_CHU,
                        TIN_CHI: TIN_CHI,
                        LY_DO: LY_DO,
                    })
                }
            }
        }
        return arrDiem
    }

    return (
        <>
            <Container>
                <aside className="ms-4">
                    <aside className="d-flex justify-content-between m-3">
                        <Link className="btn btn-outline-secondary" to="/Trainer">
                            <GiReturnArrow /> Quay Lại
                        </Link>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" className="primary me-3">
                                Xem điểm trên Blockchain
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleShowBlockchainSV}>Theo Sinh Viên</Dropdown.Item>
                                <Dropdown.Item onClick={handleShowBlockchainHP}>Theo Nhóm Học Phần</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </aside>
                    <h2 className="my-5 text-center">DANH SÁCH ĐIỂM SINH VIÊN</h2>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>MSSV</th>
                                <th>Họ tên</th>
                                <th>Tổng số tín chỉ</th>
                                <th>Điểm trung bình tích lũy</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scoreAllSV &&
                                scoreAllSV.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="table-text-center">{idx + 1}</td>
                                        <td>{item.MA_SV}</td>
                                        <td>{item.HOTEN_SV}</td>
                                        <td className="table-text-center">{item.TIN_CHI}</td>
                                        <td className="table-text-center">
                                            {item.TRUNG_BINH !== null ? item.TRUNG_BINH.toFixed(2) : 0}
                                        </td>
                                        <td className="table-text-center">
                                            <strong
                                                className="infor-see"
                                                onClick={() => {
                                                    handleShowXemThongTin(item.MA_SV)
                                                }}
                                            >
                                                <FaEye />
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

            <Modal show={showXemThongTin} onHide={handleCloseXemThongTin} animation={true} scrollable={true} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Điểm cá nhân sinh viên </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Mã môn học</th>
                                <th>Môn học</th>
                                <th>Tín chỉ</th>
                                <th>Điểm chữ</th>
                                <th>Điểm số</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scoreSV &&
                                scoreSV.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{item.MA_MH}</td>
                                        <td>{item.TEN_MH}</td>
                                        <td className="table-text-center">{item.TIN_CHI}</td>
                                        <td className="table-text-center">{item.DIEM_CHU}</td>
                                        <td className="table-text-center">{item.DIEM_SO}</td>
                                        <td className="table-text-center">
                                            {item.DIEM_SO !== null ? (
                                                <strong className="infor-edit" onClick={() => handleShowSuaLai(item)}>
                                                    <FaEdit />
                                                </strong>
                                            ) : null}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseXemThongTin}>
                        <MdOutlineClose /> Trở về
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showXoa} onHide={handleCloseXoa} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa điểm sinh viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Bạn có chắc chắn muốn xóa điểm của sinh viên <b>{deleteScore.HOTEN_SV}</b> không ?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseXoa}>
                        <MdOutlineClose /> Trở về
                    </Button>
                    <Button variant="danger" onClick={() => deleteDiemSinhVien(deleteScore.MA_SV)}>
                        <FaTrashAlt /> Xóa bỏ
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSuaLai} onHide={handleCloseSuaLai} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Điểm của môn {editScore.TEN_MH}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Môn học</Form.Label>
                            <Form.Control type="text" defaultValue={editScore.TEN_MH} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Điểm số</Form.Label>
                            <Form.Control
                                type="text"
                                name="DIEM_SO"
                                value={editScore.DIEM_SO}
                                onChange={(e) => setEditScore({ ...editScore, [e.target.name]: e.target.value })}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Lý do</Form.Label>
                            <Form.Select
                                name="MA_LD"
                                onChange={(e) => setEditScore({ ...editScore, [e.target.name]: e.target.value })}
                            >
                                <option>Chọn lý do</option>
                                {reason &&
                                    reason.map((item, idx) =>
                                        item.MA_LD !== 'L0' ? <option value={item.MA_LD}>{item.LY_DO}</option> : null,
                                    )}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSuaLai}>
                        <MdOutlineClose /> Hủy
                    </Button>
                    <Button variant="primary" onClick={() => editDiemSinhVien(editScore.MA_SV)}>
                        <MdSave /> Lưu lại
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showBlockchainSV}
                onHide={handleCloseBlockchainSV}
                animation={true}
                scrollable={true}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Dữ liệu điểm trong Blockchain</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="my-3 d-flex">
                            <Form.Label>Mã số sinh viên</Form.Label>
                            <Form.Control
                                className="w-25 mx-3"
                                type="text"
                                onChange={(e) => setFindScoreSV(e.target.value)}
                                autoFocus
                            />
                            <Button onClick={() => getAllDiemSinhVienBlockchain(findScoreSV)}>Tìm kiếm</Button>
                        </Form.Group>
                    </Form>
                    {scoreSVBlockchain.MA_SV !== undefined && (
                        <aside ref={componentRef} className="px-3">
                            <h3 className="text-center mt-3">DANH SÁCH ĐIỂM THEO SINH VIÊN TRÊN BLOCKCHAIN</h3>
                            <aside className="d-flex justify-content-center">
                                <p className="m-2">Mã số sinh viên: {scoreSVBlockchain.MA_SV}</p>
                                <p className="m-2">Tên sinh viên: {scoreSVBlockchain.TEN_SV}</p>
                            </aside>
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Mã môn học</th>
                                        <th>Tên môn học</th>
                                        <th>Tín chỉ</th>
                                        <th>Điểm số</th>
                                        <th>Điểm chữ</th>
                                        <th>Ghi chú</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scoreSVBlockchain.data &&
                                        scoreSVBlockchain.data.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>{item.MA_MH}</td>
                                                <td>{item.TEN_MH}</td>
                                                <td className="table-text-center">{item.TIN_CHI}</td>
                                                <td className="table-text-center">{item.DIEM_SO}</td>
                                                <td className="table-text-center">{item.DIEM_CHU}</td>
                                                <td className="table-text-center">{item.LY_DO}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                            <br />
                            <span className="text-end">
                                <p>. . . . . . . ., ngày . . . . tháng . . . . năm . . . . .</p>
                                <p style={{ marginRight: '90px' }}>
                                    <b>Xác nhận</b>
                                </p>
                                <p style={{ marginRight: '100px' }}>Ký tên</p>
                            </span>
                            <br />
                            <br />
                            <br />
                            <br />
                        </aside>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseBlockchainSV}>
                        <MdOutlineClose /> Hủy
                    </Button>
                    <Button variant="primary" onClick={print}>
                        <MdSave /> In dữ liệu
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showBlockchainHP}
                onHide={handleCloseBlockchainHP}
                animation={true}
                scrollable={true}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Dữ liệu điểm trong Blockchain</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="my-3 d-flex">
                            <Form.Label>Mã nhóm học phần</Form.Label>
                            <Form.Control
                                className="w-25 mx-3"
                                type="text"
                                onChange={(e) => setFindScoreSV(e.target.value)}
                                autoFocus
                            />
                            <Button onClick={() => getAllDiemHPBlockchain(findScoreSV)}>Tìm kiếm</Button>
                        </Form.Group>
                    </Form>
                    {scoreSVBlockchain.MA_MH !== undefined && (
                        <aside ref={componentRef} className="px-3">
                            <h3 className="text-center mt-3">DANH SÁCH ĐIỂM THEO NHÓM HỌC PHẦN TRÊN BLOCKCHAIN</h3>
                            <aside className="d-flex justify-content-center">
                                <p className="m-2">Mã môn học: {scoreSVBlockchain.MA_MH}</p>
                                <p className="m-2">Tên môn học: {scoreSVBlockchain.TEN_MH}</p>
                                <p className="m-2">Mã nhóm học phần: {scoreSVBlockchain.MA_NHP}</p>
                            </aside>
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Mã số sinh viên</th>
                                        <th>Họ tên sinh viên</th>
                                        <th>Điểm số</th>
                                        <th>Điểm chữ</th>
                                        <th>Ghi chú</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scoreSVBlockchain.data &&
                                        scoreSVBlockchain.data.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>{item.MA_SV}</td>
                                                <td>{item.HOTEN_SV}</td>
                                                <td className="table-text-center">{item.DIEM_SO}</td>
                                                <td className="table-text-center">{item.DIEM_CHU}</td>
                                                <td></td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                            <br />
                            <span className="text-end">
                                <p>. . . . . . . ., ngày . . . . tháng . . . . năm . . . . .</p>
                                <p style={{ marginRight: '90px' }}>
                                    <b>Xác nhận</b>
                                </p>
                                <p style={{ marginRight: '100px' }}>Ký tên</p>
                            </span>
                            <br />
                            <br />
                            <br />
                            <br />
                        </aside>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseBlockchainHP}>
                        <MdOutlineClose /> Hủy
                    </Button>
                    <Button variant="primary" onClick={print}>
                        <MdSave /> In dữ liệu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default QuanLyDiem
