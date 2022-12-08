import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Table } from 'react-bootstrap'
import './ThongTinCaNhan.scss'
import { Link } from 'react-router-dom'
import { GiReturnArrow } from 'react-icons/gi'

function ThongTinCaNhan() {
    const [trainer, setTrainer] = useState([])
    const maPDT = localStorage.getItem('login')
    const getPhongDaoTao = useCallback(async (id) => {
        try {
            const options = {
                method: 'get',
                url: `http://localhost:8080/api/teacher/${id}`,
            }
            const response = await axios(options)
            const trainers = response.data.dataGV[0]
            if (response.data.message === 'SUCCESS') {
                setTrainer(trainers)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        getPhongDaoTao(maPDT)
    }, [getPhongDaoTao, maPDT])

    return (
        <>
            <Container className="wrap-thongtincanhan">
                <Link to="/Trainer" className="btn btn-outline-primary btn-lg mt-4">
                    <GiReturnArrow /> Quay lại
                </Link>
                <h2>THÔNG TIN NHÂN VIÊN</h2>
                <h3>Thông tin cơ bản</h3>

                <Table hover>
                    <tbody>
                        <tr>
                            <th>Mã PDT:</th>
                            <td>{trainer.MA_GV}</td>
                        </tr>
                        <tr>
                            <th>Họ Tên:</th>
                            <td>{trainer.HOTEN_GV}</td>
                        </tr>
                        <tr>
                            <th>Ngày sinh:</th>
                            <td>{trainer.NGAYSINH_GV}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{trainer.EMAIL_GV}</td>
                        </tr>
                        <tr>
                            <th>Giới tính:</th>
                            <td>{trainer.GIOITINH_GV ? 'Nam' : 'Nữ'}</td>
                        </tr>
                        <tr>
                            <th>Số điện thoại:</th>
                            <td>{trainer.SODIENTHOAI_GV}</td>
                        </tr>
                        <tr>
                            <th>Địa chỉ:</th>
                            <td>{trainer.TINH_THANH}</td>
                        </tr>
                    </tbody>
                </Table>

                <h3>Thông tin gia đình</h3>

                <Table hover>
                    <tbody>
                        <tr>
                            <th>Họ tên cha:</th>
                            <td>{trainer.TENCHA_GV}</td>
                        </tr>
                        <tr>
                            <th>Tuổi của cha:</th>
                            <td>{trainer.TUOICHA_GV}</td>
                        </tr>
                        <tr>
                            <th>Họ tên mẹ:</th>
                            <td>{trainer.TENME_GV}</td>
                        </tr>
                        <tr>
                            <th>Tuổi của mẹ:</th>
                            <td>{trainer.TUOIME_GV}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default ThongTinCaNhan
