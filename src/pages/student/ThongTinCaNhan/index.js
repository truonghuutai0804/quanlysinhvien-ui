import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Table } from 'react-bootstrap'
import './ThongTinCaNhan.scss'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { GiReturnArrow } from 'react-icons/gi'

function ThongTinCaNhan() {
    const [student, setStudent] = useState([])
    const maSV = localStorage.getItem('login')
    const getSinhVien = useCallback(async (id) => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/student/${id}`,
            }
            const response = await axios(options)
            const students = response.data.data[0]
            if (response.data.status === 400) {
                setStudent(students)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        getSinhVien(maSV)
    }, [getSinhVien, maSV])

    return (
        <>
            <Container className="wrap-thongtincanhan">
                <Link to="/" className="btn btn-outline-primary m-3">
                    <GiReturnArrow /> Quay Lại
                </Link>
                <h2>THÔNG TIN SINH VIÊN</h2>
                <Table hover>
                    <tbody>
                        <tr>
                            <th>Mã SV:</th>
                            <td>{student.MA_SV}</td>
                        </tr>
                        <tr>
                            <th>Họ Tên:</th>
                            <td>{student.HOTEN_SV}</td>
                        </tr>
                        <tr>
                            <th>Ngày sinh:</th>
                            <td>{moment(student.NGAYSINH_SV).format('DD/MM/YYYY')}</td>
                        </tr>
                        <tr>
                            <th>Giới tính:</th>
                            <td>{student.GIOITINH_SV ? 'Nam' : 'Nữ'}</td>
                        </tr>
                        <tr>
                            <th>Số điện thoại:</th>
                            <td>{student.SODIENTHOAI_SV}</td>
                        </tr>
                        <tr>
                            <th>Địa chỉ:</th>
                            <td>{student.TINH_THANH}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default ThongTinCaNhan
