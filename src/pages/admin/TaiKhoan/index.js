import React, { useCallback, useEffect, useState } from 'react'
import { Table, Tabs, Tab, Modal, Button } from 'react-bootstrap'
import { FaEdit, FaLock } from 'react-icons/fa'
import { GoPrimitiveDot } from 'react-icons/go'
import axios from 'axios'
import Swal from 'sweetalert2'

function TaiKhoan() {
    const [key, setKey] = useState('quan-tri-vien')
    const [dataKhoa, setDataKhoa] = useState([])
    const [dataTrangThai, setDataTrangThai] = useState([])
    const [showKhoa, setShowKhoa] = useState(false)

    const handleShowKhoa = (info) => {
        setDataKhoa(info)
        setDataTrangThai(trangthai(info))
        setShowKhoa(true)
    }

    const handleCloseKhoa = () => setShowKhoa(false)

    var password = []
    for (var i = 0; i < 20; i++) {
        password.push(<GoPrimitiveDot key={i} />)
    }

    const [accountAdmin, setAccountAdmin] = useState([])
    const [accountPDT, setAccountPDT] = useState([])
    const [accountGV, setAccountGV] = useState([])
    const [accountSV, setAccountSV] = useState([])

    const getTaiKhoan = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/account',
            }
            const response = await axios(options)
            const accountsAdmin = response.data.dataAdmin
            const accountsPDT = response.data.dataPDT
            const accountsGV = response.data.dataGV
            const accountsSV = response.data.dataSV

            if (response.data.message === 'SUCCESS') {
                setAccountAdmin(accountsAdmin)
                setAccountPDT(accountsPDT)
                setAccountGV(accountsGV)
                setAccountSV(accountsSV)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const khoaTaiKhoan = async (id) => {
        try {
            const options = {
                method: 'put',
                url: `http://localhost:8080/api/account/${id}`,
                data: dataKhoa,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                getTaiKhoan()
                handleCloseKhoa()
                if (response.data.result === 1) {
                    Swal.fire('Thành công', 'Bạn đã khóa tài khoản thành công ', 'success')
                } else {
                    Swal.fire('Thành công', 'Bạn đã mở khóa tài khoản thành công ', 'success')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const trangthai = (info) => {
        var TRANGTHAI = 0
        if (info.TRANGTHAI_GV !== undefined) {
            TRANGTHAI = info.TRANGTHAI_GV
        } else {
            TRANGTHAI = info.TRANGTHAI_SV
        }
        return TRANGTHAI
    }

    console.log(dataTrangThai)

    useEffect(() => {
        getTaiKhoan()
    }, [getTaiKhoan])
    return (
        <>
            <aside className="ms-4">
                <h2 className="m-2">Thông tin tài khoản</h2>
                <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3 justify-content-center">
                    <Tab eventKey="quan-tri-vien" title="QUẢN TRỊ VIÊN">
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Họ tên</th>
                                    <th>Tài khoản</th>
                                    <th>Trạng thái</th>
                                    <th>Mật khẩu</th>
                                    <th>Hoạt động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accountAdmin &&
                                    accountAdmin.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="table-text-center">{idx + 1}</td>
                                            <td>{item.HOTEN_GV}</td>
                                            <td>{item.MA_GV}</td>
                                            <td className="table-text-center text-success">Hoạt động</td>
                                            <td>* * * * * * * *</td>
                                            <td className="table-text-center">
                                                <a href="/#" className="infor-edit">
                                                    <FaEdit />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="phong-dao-tao" title="PHÒNG ĐÀO TẠO">
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Họ tên</th>
                                    <th>Tài khoản</th>
                                    <th>Trạng thái</th>
                                    <th>Mật khẩu</th>
                                    <th>Hoạt động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accountPDT &&
                                    accountPDT.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="table-text-center">{idx + 1}</td>
                                            <td>{item.HOTEN_GV}</td>
                                            <td>{item.MA_GV}</td>
                                            {item.TRANGTHAI_GV === 0 ? (
                                                <td className="table-text-center text-success">Hoạt động</td>
                                            ) : (
                                                <td className="table-text-center text-danger">Đã khóa</td>
                                            )}
                                            <td>* * * * * * * *</td>
                                            <td className="table-text-center">
                                                <a href="/#" className="infor-edit">
                                                    <FaEdit />
                                                </a>
                                                <b className="infor-remove" onClick={() => handleShowKhoa(item)}>
                                                    <FaLock />
                                                </b>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="giao-vien" title="GIÁO VIÊN">
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Họ tên</th>
                                    <th>Tài khoản</th>
                                    <th>Trạng thái</th>
                                    <th>Mật khẩu</th>
                                    <th>Hoạt động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accountGV &&
                                    accountGV.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="table-text-center">{idx + 1}</td>
                                            <td>{item.HOTEN_GV}</td>
                                            <td>{item.MA_GV}</td>
                                            {item.TRANGTHAI_GV === 0 ? (
                                                <td className="table-text-center text-success">Hoạt động</td>
                                            ) : (
                                                <td className="table-text-center text-danger">Đã khóa</td>
                                            )}
                                            <td>* * * * * * * *</td>
                                            <td className="table-text-center">
                                                <a href="/#" className="infor-edit">
                                                    <FaEdit />
                                                </a>
                                                <b className="infor-remove" onClick={() => handleShowKhoa(item)}>
                                                    <FaLock />
                                                </b>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="sinh-vien" title="SINH VIÊN">
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Họ tên</th>
                                    <th>Tài khoản</th>
                                    <th>Trạng thái</th>
                                    <th>Mật khẩu</th>
                                    <th>Hoạt động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accountSV &&
                                    accountSV.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="table-text-center">{idx + 1}</td>
                                            <td>{item.HOTEN_SV}</td>
                                            <td>{item.MA_SV}</td>
                                            {item.TRANGTHAI_SV === 0 ? (
                                                <td className="table-text-center text-success">Hoạt động</td>
                                            ) : (
                                                <td className="table-text-center text-danger">Đã khóa</td>
                                            )}
                                            <td>* * * * * * * *</td>
                                            <td className="table-text-center">
                                                <a href="/#" className="infor-edit">
                                                    <FaEdit />
                                                </a>
                                                <b className="infor-remove" onClick={() => handleShowKhoa(item)}>
                                                    <FaLock />
                                                </b>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>

                <Modal show={showKhoa} onHide={handleCloseKhoa} animation={true} scrollable={true}>
                    <Modal.Header closeButton>
                        <Modal.Title className="infor-remove">
                            {dataTrangThai === 0 ? 'KHÓA TÀI KHOẢN' : 'MỞ KHÓA TÀI KHOẢN'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {dataTrangThai === 0 ? (
                            <p>
                                Bạn có chắc chắn khóa tài khoản{' '}
                                <strong>{dataKhoa.HOTEN_GV ? dataKhoa.HOTEN_GV : dataKhoa.HOTEN_SV}</strong> này ?
                            </p>
                        ) : (
                            <p>
                                Bạn có chắc chắn mở khóa tài khoản{' '}
                                <strong>{dataKhoa.HOTEN_GV ? dataKhoa.HOTEN_GV : dataKhoa.HOTEN_SV}</strong> này ?
                            </p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="danger"
                            onClick={() => khoaTaiKhoan(dataKhoa.MA_GV ? dataKhoa.MA_GV : dataKhoa.MA_SV)}
                        >
                            Chắc chắn
                        </Button>
                        <Button variant="secondary" onClick={handleCloseKhoa}>
                            Trở về
                        </Button>
                    </Modal.Footer>
                </Modal>
            </aside>
        </>
    )
}

export default TaiKhoan
