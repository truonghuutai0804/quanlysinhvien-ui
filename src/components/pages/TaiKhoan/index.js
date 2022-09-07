import React, { useState } from 'react'
import { Button, Table, Tabs, Tab } from 'react-bootstrap'
import { MdAddBox } from 'react-icons/md'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import { GoPrimitiveDot } from 'react-icons/go'
import './TaiKhoan.scss'

function TaiKhoan() {
    const [key, setKey] = useState('quan-tri-vien');

    var password = []
    for (var i = 0; i < 20; i++) {
        password.push(<GoPrimitiveDot key={i} />)
    }
    return (
        <>
            <aside className="ms-4">
                <h2 className="m-2">Thông tin tài khoản</h2>
                <aside className="d-flex justify-content-between m-3">
                    <Button variant="outline-primary">
                        <MdAddBox /> Thêm tài khoản mới
                    </Button>
                </aside>
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
                                <tr>
                                    <td className="table-text-center">1</td>
                                    <td>Trương Hữu Tài</td>
                                    <td>admin</td>
                                    <td>{password}</td>
                                    <td className="table-text-center">
                                        <a href="/#" className="infor-edit">
                                            <FaEdit />
                                        </a>
                                        <a href="/#" className="infor-remove">
                                            <FaTrashAlt />
                                        </a>
                                    </td>
                                </tr>
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
                                <tr>
                                    <td className="table-text-center">1</td>
                                    <td>Trương Hữu Tài</td>
                                    <td>taib1809509</td>
                                    <td>{password}</td>
                                    <td className="table-text-center">
                                        <a href="/#" className="infor-edit">
                                            <FaEdit />
                                        </a>
                                        <a href="/#" className="infor-remove">
                                            <FaTrashAlt />
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-text-center">2</td>
                                    <td>Trần Hoàng Tèo</td>
                                    <td>teob1865423</td>
                                    <td>{password}</td>
                                    <td className="table-text-center">
                                        <a href="/#" className="infor-edit">
                                            <FaEdit />
                                        </a>
                                        <a href="/#" className="infor-remove">
                                            <FaTrashAlt />
                                        </a>
                                    </td>
                                </tr>
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
                                <tr>
                                    <td className="table-text-center">1</td>
                                    <td>Trương Hữu Tài</td>
                                    <td>taib1809509</td>
                                    <td>{password}</td>
                                    <td className="table-text-center">
                                        <a href="/#" className="infor-edit">
                                            <FaEdit />
                                        </a>
                                        <a href="/#" className="infor-remove">
                                            <FaTrashAlt />
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-text-center">3</td>
                                    <td>Phạm Minh Tôm</td>
                                    <td>tomb1836526</td>
                                    <td>{password}</td>
                                    <td className="table-text-center">
                                        <a href="/#" className="infor-edit">
                                            <FaEdit />
                                        </a>
                                        <a href="/#" className="infor-remove">
                                            <FaTrashAlt />
                                        </a>
                                    </td>
                                </tr>
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
                                <tr>
                                    <td className="table-text-center">1</td>
                                    <td>Trương Hữu Tài</td>
                                    <td>taib1809509</td>
                                    <td>{password}</td>
                                    <td className="table-text-center">
                                        <a href="/#" className="infor-edit">
                                            <FaEdit />
                                        </a>
                                        <a href="/#" className="infor-remove">
                                            <FaTrashAlt />
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-text-center">2</td>
                                    <td>Trần Hoàng Tèo</td>
                                    <td>teob1865423</td>
                                    <td>{password}</td>
                                    <td className="table-text-center">
                                        <a href="/#" className="infor-edit">
                                            <FaEdit />
                                        </a>
                                        <a href="/#" className="infor-remove">
                                            <FaTrashAlt />
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-text-center">3</td>
                                    <td>Phạm Minh Tôm</td>
                                    <td>tomb1836526</td>
                                    <td>{password}</td>
                                    <td className="table-text-center">
                                        <a href="/#" className="infor-edit">
                                            <FaEdit />
                                        </a>
                                        <a href="/#" className="infor-remove">
                                            <FaTrashAlt />
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>
            </aside>
        </>
    )
}

export default TaiKhoan
