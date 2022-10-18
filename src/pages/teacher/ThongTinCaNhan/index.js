import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Table } from 'react-bootstrap'
import './ThongTinCaNhan.scss'

function ThongTinCaNhan() {
    const [teacher, setTeacher] = useState([])
    const maGV = localStorage.getItem('login')
    const getGiaoVien = useCallback(async (id) => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/teacher/${id}`,
            }
            const response = await axios(options)
            const teachers = response.data.dataGV[0]
            if (response.data.message === 'SUCCESS') {
                setTeacher(teachers)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        getGiaoVien(maGV)
    }, [getGiaoVien, maGV])

    return (
        <>
            <Container className="wrap-thongtincanhan">
                <h2>THÔNG TIN GIÁO VIÊN</h2>
                <Table hover>
                    <tbody>
                        <tr>
                            <th>Mã GV:</th>
                            <td>{teacher.MA_GV}</td>
                        </tr>
                        <tr>
                            <th>Họ Tên:</th>
                            <td>{teacher.HOTEN_GV}</td>
                        </tr>
                        <tr>
                            <th>Ngày sinh:</th>
                            <td>{teacher.NGAYSINH_GV}</td>
                        </tr>
                        <tr>
                            <th>Giới tính:</th>
                            <td>{teacher.GIOITINH_GV ? 'Nam' : 'Nữ'}</td>
                        </tr>
                        <tr>
                            <th>Số điện thoại:</th>
                            <td>{teacher.SODIENTHOAI_GV}</td>
                        </tr>
                        <tr>
                            <th>Địa chỉ:</th>
                            <td>{teacher.TINH_THANH}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default ThongTinCaNhan
