import { React, useCallback, useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { MdOutlineClose, MdOutlinePrint, MdSave } from 'react-icons/md'
import { FaEdit, FaEye } from 'react-icons/fa'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import axios from 'axios'

function DiemSinhVien() {
    const [show, setShow] = useState(false)
    const [editDiem, setEditDiem] = useState(false)

    const handleEditDiemShow = () => {
        setEditDiem(true)
    }
    const handleEditDiemClose = () => setEditDiem(false)
    
    const handleClose = () => {
        handleEditDiemClose()
        setShow(false) 
    }
    const handleShow = (info) => {
        getInfoDiemSinhVien(info)
        setShow(true)
    }

    const [score, setScore] = useState([])
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

    const getInfoDiemSinhVien = async (info) => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/score/${info}`
            }
            const response = await axios(options)
            const scores = response.data.data
            if (response.data.status === 400) {
                setInfoScore(scores)
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getDiemSinhVien()
    }, [getDiemSinhVien])

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
                    {score && score.map((item, idx)=>(
                        <tr key={idx}>
                            <td className="table-text-center">{idx + 1}</td>
                            <td>{item.HOTEN_SV}</td>
                            <td>{item.MA_SV}</td>
                            <td className="table-text-center">{item.TIN_CHI}</td>
                            <td className="table-text-center">{(item.TRUNG_BINH*4/10).toFixed(2)}</td>
                            <td className="table-text-center">
                                <strong className="infor-printer">
                                    <MdOutlinePrint />
                                </strong>
                                <strong onClick={()=>{handleShow(item.MA_SV)}} className="infor-see">
                                    <FaEye />
                                </strong>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </aside>
            <Modal show={show} onHide={handleClose} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Điểm của Trương Hữu Tài</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Môn học</th>
                                <th>Tín chỉ</th>
                                <th>Điểm chữ</th>
                                <th>Điểm số</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                        {infoScore && infoScore.map((item,idx)=>(
                            <>
                                {editDiem === true ? (
                                    <tr key={idx}>
                                        <td className="table-text-center">{idx + 1}</td>
                                        <td>{item.TEN_MH}</td>
                                        <td className="table-text-center">{item.TIN_CHI}</td>
                                        <td className="table-text-center">{item.DIEM_CHU}</td>
                                        <td className="table-text-center">
                                            <Form.Control type="text" defaultValue={item.DIEM_SO} htmlSize={1} autoFocus />
                                        </td>
                                        <td className="table-text-center">
                                            <strong className="infor-save" onClick={handleEditDiemShow}>
                                                <MdSave />
                                            </strong>
                                            <strong className="infor-close">
                                                <IoMdCloseCircleOutline />
                                            </strong>
                                        </td>
                                    </tr>
                            
                                ) : (
                                    <>
                                    <tr key={idx}>
                                        <td className="table-text-center">{idx + 1}</td>
                                        <td>{item.TEN_MH}</td>
                                        <td className="table-text-center">{item.TIN_CHI}</td>   
                                        <td className="table-text-center">{item.DIEM_CHU}</td>
                                        <td className="table-text-center">{item.DIEM_SO}</td>
                                        <td className="table-text-center">
                                            <strong className="infor-edit" onClick={handleEditDiemShow}>
                                                <FaEdit />
                                            </strong>
                                        </td>
                                    </tr>
                                    </>
                                )}
                            </>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        <MdOutlineClose /> Hủy
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        <MdSave /> Lưu lại
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DiemSinhVien
