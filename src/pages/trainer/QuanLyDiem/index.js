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
        getLyDo()
        setShowBlockchainSV(true)
    }

    const handleShowBlockchainHP = () => {
        getLyDo()
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
                Swal.fire('Th??nh c??ng', 'B???n ???? x??a th??nh c??ng ', 'success')
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
                Swal.fire('Th??nh c??ng', 'B???n ???? s???a ?????i ??i???m th??nh c??ng ', 'success')
                getDiemSinhVien()
                getAllDiemSinhVien(id)
            } else {
                Swal.fire('Th???t b???i', 'B???n ???? s???a ?????i ??i???m th???t b???i ', 'error')
                console.log(response.data.err)
            }
        } catch (error) {
            Swal.fire('Th???t b???i', 'B???n ???? s???a ?????i ??i???m th???t b???i ', 'error')
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

    const reasons = (info) =>{
        for(var i = 0; i < reason.length; i++){
            if(info === reason[i].MA_LD){
                return reason[i].LY_DO
            }
        }
    }

    return (
        <>
            <Container>
                <aside className="ms-4">
                    <aside className="d-flex justify-content-between m-3">
                        <Link className="btn btn-outline-secondary" to="/Trainer">
                            <GiReturnArrow /> Quay L???i
                        </Link>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" className="primary me-3">
                                Xem ??i???m tr??n Blockchain
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleShowBlockchainSV}>Theo Sinh Vi??n</Dropdown.Item>
                                <Dropdown.Item onClick={handleShowBlockchainHP}>Theo Nh??m H???c Ph???n</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </aside>
                    <h2 className="my-5 text-center">DANH S??CH ??I???M SINH VI??N</h2>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>MSSV</th>
                                <th>H??? t??n</th>
                                <th>T???ng s??? t??n ch???</th>
                                <th>??i???m trung b??nh t??ch l??y</th>
                                <th>H??nh ?????ng</th>
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
                    <Modal.Title>??i???m c?? nh??n sinh vi??n </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>M?? m??n h???c</th>
                                <th>M??n h???c</th>
                                <th>T??n ch???</th>
                                <th>??i???m ch???</th>
                                <th>??i???m s???</th>
                                <th>H??nh ?????ng</th>
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
                        <MdOutlineClose /> Tr??? v???
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showXoa} onHide={handleCloseXoa} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title>X??a ??i???m sinh vi??n</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        B???n c?? ch???c ch???n mu???n x??a ??i???m c???a sinh vi??n <b>{deleteScore.HOTEN_SV}</b> kh??ng ?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseXoa}>
                        <MdOutlineClose /> Tr??? v???
                    </Button>
                    <Button variant="danger" onClick={() => deleteDiemSinhVien(deleteScore.MA_SV)}>
                        <FaTrashAlt /> X??a b???
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSuaLai} onHide={handleCloseSuaLai} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title>??i???m c???a m??n {editScore.TEN_MH}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>M??n h???c</Form.Label>
                            <Form.Control type="text" defaultValue={editScore.TEN_MH} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>??i???m s???</Form.Label>
                            <Form.Control
                                type="text"
                                name="DIEM_SO"
                                value={editScore.DIEM_SO}
                                onChange={(e) => setEditScore({ ...editScore, [e.target.name]: e.target.value })}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>L?? do</Form.Label>
                            <Form.Select
                                name="MA_LD"
                                onChange={(e) => setEditScore({ ...editScore, [e.target.name]: e.target.value })}
                            >
                                <option>Ch???n l?? do</option>
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
                        <MdOutlineClose /> H???y
                    </Button>
                    <Button variant="primary" onClick={() => editDiemSinhVien(editScore.MA_SV)}>
                        <MdSave /> L??u l???i
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
                    <Modal.Title>D??? li???u ??i???m trong Blockchain</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="my-3 d-flex">
                            <Form.Label>M?? s??? sinh vi??n</Form.Label>
                            <Form.Control
                                className="w-25 mx-3"
                                type="text"
                                onChange={(e) => setFindScoreSV(e.target.value)}
                                autoFocus
                            />
                            <Button onClick={() => getAllDiemSinhVienBlockchain(findScoreSV)}>T??m ki???m</Button>
                        </Form.Group>
                    </Form>
                    {scoreSVBlockchain.MA_SV !== undefined && (
                        <aside ref={componentRef} className="px-3">
                            <h3 className="text-center mt-3">DANH S??CH ??I???M THEO SINH VI??N TR??N BLOCKCHAIN</h3>
                            <aside className="d-flex justify-content-center">
                                <p className="m-2">M?? s??? sinh vi??n: {scoreSVBlockchain.MA_SV}</p>
                                <p className="m-2">T??n sinh vi??n: {scoreSVBlockchain.TEN_SV}</p>
                            </aside>
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>M?? m??n h???c</th>
                                        <th>T??n m??n h???c</th>
                                        <th>T??n ch???</th>
                                        <th>??i???m s???</th>
                                        <th>??i???m ch???</th>
                                        <th>Ghi ch??</th>
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
                                                <td className="table-text-center">{reasons(item.LY_DO)}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                            <br />
                            <span className="text-end">
                                <p>. . . . . . . ., ng??y . . . . th??ng . . . . n??m . . . . .</p>
                                <p style={{ marginRight: '90px' }}>
                                    <b>X??c nh???n</b>
                                </p>
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
                        <MdOutlineClose /> H???y
                    </Button>
                    <Button variant="primary" onClick={print}>
                        <MdSave /> In d??? li???u
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
                    <Modal.Title>D??? li???u ??i???m trong Blockchain</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="my-3 d-flex">
                            <Form.Label>M?? nh??m h???c ph???n</Form.Label>
                            <Form.Control
                                className="w-25 mx-3"
                                type="text"
                                onChange={(e) => setFindScoreSV(e.target.value)}
                                autoFocus
                            />
                            <Button onClick={() => getAllDiemHPBlockchain(findScoreSV)}>T??m ki???m</Button>
                        </Form.Group>
                    </Form>
                    {scoreSVBlockchain.MA_MH !== undefined && (
                        <aside ref={componentRef} className="px-3">
                            <h3 className="text-center mt-3">DANH S??CH ??I???M THEO NH??M H???C PH???N TR??N BLOCKCHAIN</h3>
                            <aside className="d-flex justify-content-center">
                                <p className="m-2">M?? m??n h???c: {scoreSVBlockchain.MA_MH}</p>
                                <p className="m-2">T??n m??n h???c: {scoreSVBlockchain.TEN_MH}</p>
                                <p className="m-2">M?? nh??m h???c ph???n: {scoreSVBlockchain.MA_NHP}</p>
                            </aside>
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>M?? s??? sinh vi??n</th>
                                        <th>H??? t??n sinh vi??n</th>
                                        <th>??i???m s???</th>
                                        <th>??i???m ch???</th>
                                        <th>Ghi ch??</th>
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
                                                <td className="table-text-center">{reasons(item.LY_DO)}</td>
                                                <td></td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                            <br />
                            <span className="text-end">
                                <p>. . . . . . . ., ng??y . . . . th??ng . . . . n??m . . . . .</p>
                                <p style={{ marginRight: '90px' }}>
                                    <b>X??c nh???n</b>
                                </p>
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
                        <MdOutlineClose /> H???y
                    </Button>
                    <Button variant="primary" onClick={print}>
                        <MdSave /> In d??? li???u
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default QuanLyDiem
