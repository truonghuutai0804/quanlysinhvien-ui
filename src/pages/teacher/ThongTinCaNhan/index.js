import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Table } from 'react-bootstrap'
import './ThongTinCaNhan.scss'
import { Link } from 'react-router-dom'
import { GiReturnArrow } from 'react-icons/gi'
import moment from 'moment'

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
                <Link to="/Teacher" className="btn btn-outline-primary btn-lg mt-4">
                    <GiReturnArrow /> Quay lại
                </Link>
                <h2>THÔNG TIN GIÁO VIÊN</h2>
                <h3>Thông tin cơ bản</h3>
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
                            <td>{moment(teacher.NGAYSINH_GV).format('DD/MM/YYYY')}</td>
                        </tr>
                        <tr>
                            <th>Giới tính:</th>
                            <td>{teacher.GIOITINH_GV ? 'Nam' : 'Nữ'}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{teacher.EMAIL_GV}</td>
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

                <h3>Thông tin gia đình</h3>

                <Table hover>
                    <tbody>
                        <tr>
                            <th>Họ tên cha:</th>
                            <td>{teacher.TENCHA_GV}</td>
                        </tr>
                        <tr>
                            <th>Tuổi của cha:</th>
                            <td>{teacher.TUOICHA_GV}</td>
                        </tr>
                        <tr>
                            <th>Họ tên mẹ:</th>
                            <td>{teacher.TENME_GV}</td>
                        </tr>
                        <tr>
                            <th>Tuổi của mẹ:</th>
                            <td>{teacher.TUOIME_GV}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default ThongTinCaNhan
