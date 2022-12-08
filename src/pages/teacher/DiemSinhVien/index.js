import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Container, Dropdown, Form, Modal, Table } from 'react-bootstrap'
import { useReactToPrint } from 'react-to-print'
import './DiemSinhVien.scss'
import axios from 'axios'
import Swal from 'sweetalert2'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { Link } from 'react-router-dom'
import { GiReturnArrow } from 'react-icons/gi'
import { MdAdd, MdOutlineClose, MdOutlineEdit, MdSave } from 'react-icons/md'

function KetQuaHocTap() {
    const [reason, setReason] = useState([])
    const [subject, setSubject] = useState([])
    const [input, setInput] = useState([])
    const [inputExport, setInputExport] = useState([])
    const [edit, setEdit] = useState([])
    const [fileName, setFileName] = useState([])
    const [getDSSVPrint, setGetDSSVPrint] = useState([])
    const [fileExcel, setFileExcel] = useState([])
    const [result, setResult] = useState([])
    const MA_GV = localStorage.getItem('login')
    const [editScore, setEditScore] = useState([])

    const [show, setShow] = useState(false)
    const [showImport, setShowImport] = useState(false)
    const [showExport, setShowExport] = useState(false)
    const [showPrintStudent, setShowPrintStudent] = useState(false)
    const [showPrintScore, setShowPrintScore] = useState(false)
    const [showSuaLai, setShowSuaLai] = useState(false)

    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const print = () => {
        handlePrint()
        setGetDSSVPrint([])
    }

    const handleCloseExport = () => {
        setShowExport(false)
    }

    const handleShowExport = () => {
        setShowExport(true)
    }

    const handleShowSuaLai = (info) => {
        setEditScore(info)
        getLyDo()
        setShowSuaLai(true)
    }

    const handleCloseSuaLai = () => setShowSuaLai(false)

    const handleClosePrintScore = () => {
        setShowPrintScore(false)
        setGetDSSVPrint([])
    }

    const handleShowPrintScore = () => {
        setShowPrintScore(true)
    }

    const handleClosePrintStudent = () => {
        setShowPrintStudent(false)
        setGetDSSVPrint([])
    }

    const handleShowPrintStudent = () => {
        setShowPrintStudent(true)
    }

    const handleCloseImport = () => {
        clearFile()
        setShowImport(false)
    }

    const handleShowImport = () => {
        setShowImport(true)
    }

    const clearFile = useCallback(() => {
        setFileExcel()
        setFileName()
    }, [])

    const handleClose = () => setShow(false)

    const handleShow = (info) => {
        setShow(true)
        setEdit(info)
    }

    const getMonHoc = useCallback(async (id) => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/subject/${id}`,
            }
            const response = await axios(options)
            const subjects = response.data.data
            if (response.data.message === 'SUCCESS') {
                setSubject(subjects)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getDiemSVExport = async (id) => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/scoresGV/${id}?MA_NHP=${inputExport.MA_NHP}`,
            }
            const response = await axios(options)
            const results = response.data.dataDiem
            if (response.data.message === 'SUCCESS') {
                //setResultExport(results)
                processExport(results)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getSVPrint = async (id) => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/scoreSVPrintGV/${id}?MA_NHP=${input.MA_NHP}`,
            }
            const response = await axios(options)
            const results = response.data.dataDiem
            if (response.data.message === 'SUCCESS') {
                setGetDSSVPrint(results)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getDiemSV = async (id) => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/scoreGV/${id}?MA_NHP=${input.MA_NHP}`,
            }
            const response = await axios(options)
            const results = response.data.dataDiem
            if (response.data.message === 'SUCCESS') {
                setResult(results)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const setDiemSVBlockchain = async (id, maSV) => {
        try {
            const options = {
                method: 'post',
                url: `http://localhost:8080/api/scoreGV/${id}?MA_SV=${maSV}`,
                data: edit,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleClose()
                Toast.fire({
                    icon: 'success',
                    title: 'Thêm điểm thành công',
                })
                getDiemSV(MA_GV)
            } else if (response.data.err) {
                handleClose()
                Toast.fire({
                    icon: 'error',
                    title: 'Thất bại!',
                })
                console.log(response.data.err)
            } else {
                handleClose()
                Toast.fire({
                    icon: 'error',
                    title: 'Thất bại!',
                })
            }
        } catch (error) {
            handleClose()
            Toast.fire({
                icon: 'error',
                title: 'Thất bại!',
            })
            console.log(error)
        }
    }

    const setDiemSVImport = async () => {
        try {
            const options = {
                method: 'post',
                url: `http://localhost:8080/api/scoreImGV`,
                data: fileExcel.data,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                Toast.fire({
                    icon: 'success',
                    title: 'Thêm điểm thành công',
                })
                getDiemSV(MA_GV)
                clearFile()
            } else if (response.data.err) {
                Toast.fire({
                    icon: 'error',
                    title: 'Thất bại!',
                })
                console.log(response.data.err)
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Thất bại!',
                })
            }
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: 'Thất bại!',
            })
            console.log(error)
        }
    }

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
                getDiemSV(MA_GV)
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
        getMonHoc(MA_GV)
    }, [getMonHoc, MA_GV])

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

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'
    const processExport = (csvData) => {
        const ws = XLSX.utils.json_to_sheet(csvData, {
            header: ['MA_NHP', 'MA_SV', 'HOTEN_SV', 'MA_MH', 'TEN_MH', 'TIN_CHI', 'DIEM_SO'],
        })
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, 'Nhóm học phần ' + inputExport.MA_NHP + fileExtension)
    }

    const ImportExcel = (e) => {
        try {
            // setSelectedFile(e.target.files[0])
            if (e.target.files[0] !== undefined) {
                let filename = e.target.files[0].name
                setFileName(filename)
                if (typeof FileReader !== 'undefined') {
                    const reader = new FileReader()
                    if (reader.readAsBinaryString) {
                        reader.onload = (e) => {
                            processExcel(reader.result)
                        }
                        reader.readAsBinaryString(e.target.files[0])
                    }
                } else {
                    console.log('Trình duyệt không hỗ trợ HTML5.')
                }
            } else {
                console.log('Không đọc được file. Vui lòng thử lại!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const processExcel = (data) => {
        const workbook = XLSX.read(data, {
            type: 'binary',
        })
        const firstSheet = workbook.SheetNames[0]

        const excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet], {
            header: 1,
            defval: '',
            blankrows: true,
        })

        if (typeof excelRows === 'object') {
            var header = []
            var dataTable = []

            for (var i = 0; i < excelRows.length; i++) {
                if (i === 0) {
                    header = excelRows[i]
                } else {
                    dataTable.push(excelRows[i])
                }
            }

            if (header.length > 0 && dataTable.length > 0) {
                setFileExcel({
                    header: header,
                    data: dataTable,
                })
            }
        }
    }

    return (
        <>
            <Container className="wrap-ketquahoctap">
                <aside className="d-flex m-3">
                    <Link to="/Teacher" className="btn btn-outline-primary me-3">
                        <GiReturnArrow /> Quay Lại
                    </Link>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" className="primary me-3">
                            Import/Export Điểm
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleShowImport}>Import điểm từ Excel</Dropdown.Item>
                            <Dropdown.Item onClick={handleShowExport}>Export thành file Excel</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" className="primary me-3">
                            Thống kê
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleShowPrintStudent}>In DSSV theo HP</Dropdown.Item>
                            <Dropdown.Item onClick={handleShowPrintScore}>In Điểm theo HP</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </aside>
                <h2>DANH SÁCH ĐIỂM SINH VIÊN</h2>
                <Form className="form-ketquahoctap">
                    <Form.Group className="mb-3 d-flex">
                        <Form.Label>
                            <b>Học phần: </b>
                        </Form.Label>
                        <Form.Select
                            size="sm"
                            className="namhoc-ketquahoctap"
                            name="MA_NHP"
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                        >
                            <option value="0">Chọn nhóm học phần</option>

                            {subject &&
                                subject.map((item, idx) => (
                                    <>
                                        <option key={idx} value={item.MA_NHP}>
                                            {item.TEN_MH} {item.MA_NHP}
                                        </option>
                                    </>
                                ))}
                        </Form.Select>
                    </Form.Group>
                    <Button
                        className="ms-3 button-ketquahoctap"
                        size="sm"
                        onClick={() => {
                            getDiemSV(MA_GV)
                        }}
                    >
                        Liệt kê
                    </Button>
                </Form>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã sinh viên</th>
                            <th>Họ tên sinh viên</th>
                            <th>Điểm số</th>
                            <th>Điểm chữ</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.length > 0 ? (
                            result.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="ketquahoctap-text">{idx + 1}</td>
                                    <td className="ketquahoctap-text">{item.MA_SV}</td>
                                    <td>{item.HOTEN_SV}</td>
                                    <td className="ketquahoctap-text">{item.DIEM_SO}</td>
                                    <td className="ketquahoctap-text">{item.DIEM_CHU}</td>
                                    <td className="ketquahoctap-text">
                                        {!item.DIEM_SO ? (
                                            <Button onClick={() => handleShow(item)}>
                                                <MdAdd /> Thêm
                                            </Button>
                                        ) : item.MA_LD === 'L0' ? (
                                            <Button onClick={() => handleShowSuaLai(item)}>
                                                <MdOutlineEdit /> Sửa
                                            </Button>
                                        ) : (
                                            'ĐÃ SỬA'
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    Hiện tại vẫn chưa có dữ liệu
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm điểm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Mã sinh viên</Form.Label>
                            <Form.Control type="text" value={edit.MA_SV} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Họ tên sinh viên</Form.Label>
                            <Form.Control type="text" name="HOTEN_SV" value={edit.HOTEN_SV} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Điểm số</Form.Label>
                            <Form.Control
                                type="text"
                                name="DIEM_SO"
                                onChange={(e) => {
                                    setEdit({ ...edit, [e.target.name]: e.target.value })
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => setDiemSVBlockchain(edit.MA_NHP, edit.MA_SV)}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showImport} onHide={handleCloseImport} size="lg" scrollable="true">
                <Modal.Header closeButton>
                    <Modal.Title>Import điểm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="getFile" className="btn btn-primary mb-3 me-3">
                        Import
                    </label>
                    <input type="file" accept=".xlsx, .xls" className="d-none" id="getFile" onChange={ImportExcel} />
                    <label>{fileName}</label>
                    {fileExcel !== undefined && fileExcel.header !== undefined && fileExcel.data !== undefined ? (
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    {fileExcel.header.map((item, idx) => (
                                        <th key={idx}>{item}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {fileExcel.data.map((rows, idx) => (
                                    <tr>
                                        <td>{idx + 1}</td>
                                        {rows.map((item, i) => (
                                            <td key={i}>{item}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : null}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseImport}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={setDiemSVImport}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showExport} onHide={handleCloseExport}>
                <Modal.Header closeButton>
                    <Modal.Title>Export điểm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Học phần</Form.Label>
                            <Form.Select
                                size="sm"
                                className="namhoc-ketquahoctap"
                                name="MA_NHP"
                                onChange={(e) => setInputExport({ ...inputExport, [e.target.name]: e.target.value })}
                            >
                                <option value="0">Chọn nhóm học phần</option>

                                {subject &&
                                    subject.map((item, idx) => (
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
                    <Button variant="secondary" onClick={handleCloseExport}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => getDiemSVExport(MA_GV)}>
                        Xuất tệp
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showPrintStudent} onHide={handleClosePrintStudent} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>In danh sách sinh viên trong theo học phần</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="d-flex justify-content-center">
                        <Form.Group className="mb-3 d-flex">
                            <Form.Label>
                                <b>Học phần: </b>
                            </Form.Label>
                            <Form.Select
                                size="sm"
                                className="h-75"
                                name="MA_NHP"
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                            >
                                <option value="0">Chọn nhóm học phần</option>

                                {subject &&
                                    subject.map((item, idx) => (
                                        <>
                                            <option key={idx} value={item.MA_NHP}>
                                                {item.TEN_MH} {item.MA_NHP}
                                            </option>
                                        </>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Button
                            className="ms-3 h-25"
                            size="sm"
                            onClick={() => {
                                getSVPrint(MA_GV)
                            }}
                        >
                            Xuất
                        </Button>
                    </Form>
                    <aside ref={componentRef} className="px-2">
                        <h3 className="text-center mt-3">DANH SÁCH SINH VIÊN</h3>
                        <p className="text-center">
                            Nhóm học phần:{' '}
                            {getDSSVPrint[0] !== undefined && getDSSVPrint[0].TEN_MH + ' ' + getDSSVPrint[0].MA_NHP}
                        </p>
                        <p className="text-center">
                            <span className="me-3">
                                Năm học: {getDSSVPrint[0] !== undefined && getDSSVPrint[0].NAM_HOC}
                            </span>
                            <span>Học kì: {getDSSVPrint[0] !== undefined && getDSSVPrint[0].HOC_KY}</span>
                        </p>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th rowSpan="2" className="py-4">
                                        #
                                    </th>
                                    <th rowSpan="2" className="py-4">
                                        MSSV
                                    </th>
                                    <th rowSpan="2" className="py-4">
                                        Họ và tên
                                    </th>
                                    <th colSpan="15">Tuần</th>
                                    <th rowSpan="2" className="py-4">
                                        Điểm số
                                    </th>
                                    <th rowSpan="2" className="py-4">
                                        Ghi chú
                                    </th>
                                </tr>
                                <tr>
                                    <th>1</th>
                                    <th>2</th>
                                    <th>3</th>
                                    <th>4</th>
                                    <th>5</th>
                                    <th>6</th>
                                    <th>7</th>
                                    <th>8</th>
                                    <th>9</th>
                                    <th>10</th>
                                    <th>11</th>
                                    <th>12</th>
                                    <th>13</th>
                                    <th>14</th>
                                    <th>15</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getDSSVPrint[0] !== undefined ? (
                                    getDSSVPrint.map((item, idx) => (
                                        <tr>
                                            <td>{idx + 1}</td>
                                            <td>{item.MA_SV}</td>
                                            <td>{item.HOTEN_SV}</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="20" className="text-center">
                                            {' '}
                                            Chưa có sinh viên đăng kí
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </aside>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePrintStudent}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={print}>
                        In danh sách
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showPrintScore} onHide={handleClosePrintScore} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>In danh sách sinh viên trong theo học phần</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="d-flex justify-content-center">
                        <Form.Group className="mb-3 d-flex">
                            <Form.Label>
                                <b>Học phần: </b>
                            </Form.Label>
                            <Form.Select
                                size="sm"
                                className="h-75"
                                name="MA_NHP"
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                            >
                                <option value="0">Chọn nhóm học phần</option>

                                {subject &&
                                    subject.map((item, idx) => (
                                        <>
                                            <option key={idx} value={item.MA_NHP}>
                                                {item.TEN_MH} {item.MA_NHP}
                                            </option>
                                        </>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Button
                            className="ms-3 h-25"
                            size="sm"
                            onClick={() => {
                                getSVPrint(MA_GV)
                            }}
                        >
                            Xuất
                        </Button>
                    </Form>
                    <aside ref={componentRef} className="px-2">
                        <h3 className="text-center mt-3">DANH SÁCH ĐIỂM</h3>
                        <p className="text-center">
                            Nhóm học phần:{' '}
                            {getDSSVPrint[0] !== undefined && getDSSVPrint[0].TEN_MH + ' ' + getDSSVPrint[0].MA_NHP}
                        </p>
                        <p className="text-center">
                            <span className="me-3">
                                Năm học: {getDSSVPrint[0] !== undefined && getDSSVPrint[0].NAM_HOC}
                            </span>
                            <span>Học kì: {getDSSVPrint[0] !== undefined && getDSSVPrint[0].HOC_KY}</span>
                        </p>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th rowSpan="2" className="py-4">
                                        #
                                    </th>
                                    <th rowSpan="2" className="py-4">
                                        MSSV
                                    </th>
                                    <th rowSpan="2" className="py-4">
                                        Họ và tên
                                    </th>
                                    <th rowSpan="2" className="py-4">
                                        Điểm số
                                    </th>
                                    <th rowSpan="2" className="py-4">
                                        Điểm chữ
                                    </th>
                                    <th rowSpan="2" className="py-4">
                                        Ghi chú
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {getDSSVPrint[0] !== undefined ? (
                                    getDSSVPrint.map((item, idx) => (
                                        <tr>
                                            <td>{idx + 1}</td>
                                            <td>{item.MA_SV}</td>
                                            <td>{item.HOTEN_SV}</td>
                                            <td>{item.DIEM_SO}</td>
                                            <td>{item.DIEM_CHU}</td>
                                            <td>{item.LY_DO === 'Nhập điểm ban đâu' ? null : item.LY_DO}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="20" className="text-center">
                                            {' '}
                                            Chưa có sinh viên đăng kí
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </aside>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePrintScore}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={print}>
                        In danh sách
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
        </>
    )
}

export default KetQuaHocTap
