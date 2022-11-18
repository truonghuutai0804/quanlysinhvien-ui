import React, { useCallback, useEffect, useState } from 'react'
import { Button, Table, Tabs, Tab } from 'react-bootstrap'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import { GoPrimitiveDot } from 'react-icons/go'
import axios from 'axios'

function TaiKhoan() {
    const [key, setKey] = useState('quan-tri-vien')

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

    console.log(accountAdmin)
    console.log(accountSV)

    useEffect(() => {
        getTaiKhoan()
    }, [getTaiKhoan])
    return (
        <>
            <aside className="ms-4">
                <h2 className="m-2">Thông tin tài khoản</h2>
                <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3 justify-content-center">
                    <Tab eventKey="quan-tri-vien" title="Quản trị viên">
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Họ tên</th>
                                    <th>Tài khoản</th>
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
                                            <td>{item.MATKHAU_GV}</td>
                                            <td className="table-text-center">
                                                <a href="/#" className="infor-edit">
                                                    <FaEdit />
                                                </a>
                                                <a href="/#" className="infor-remove">
                                                    <FaTrashAlt />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="phong-dao-tao" title="Phòng đào tạo">
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Họ tên</th>
                                    <th>Tài khoản</th>
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
                                            <td>{item.MATKHAU_GV}</td>
                                            <td className="table-text-center">
                                                <a href="/#" className="infor-edit">
                                                    <FaEdit />
                                                </a>
                                                <a href="/#" className="infor-remove">
                                                    <FaTrashAlt />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="giao-vien" title="Giáo viên">
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Họ tên</th>
                                    <th>Tài khoản</th>
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
                                            <td>{item.MATKHAU_GV}</td>
                                            <td className="table-text-center">
                                                <a href="/#" className="infor-edit">
                                                    <FaEdit />
                                                </a>
                                                <a href="/#" className="infor-remove">
                                                    <FaTrashAlt />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="sinh-vien" title="Sinh viên">
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Họ tên</th>
                                    <th>Tài khoản</th>
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
                                            <td>{item.MATKHAU_SV}</td>
                                            <td className="table-text-center">
                                                <a href="/#" className="infor-edit">
                                                    <FaEdit />
                                                </a>
                                                <a href="/#" className="infor-remove">
                                                    <FaTrashAlt />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>
            </aside>
        </>
    )
}

export default TaiKhoan
