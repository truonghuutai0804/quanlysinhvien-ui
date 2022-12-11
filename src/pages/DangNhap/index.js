import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import './DangNhap.scss'
import Swal from 'sweetalert2'


const DangNhap = () => {
    const [accountInput, setAccountInput] = useState({})
    const [error, setError] = useState([])
    localStorage.removeItem('login')
    localStorage.removeItem('level')
    const loginAccount = async (e) => {
        try {
            e.preventDefault()
            const options = {
                method: 'post',
                url: 'http://localhost:8080/api/login',
                data: accountInput,
            }
            const response = await axios(options)
            const message = response.data.message
            const result = response.data.res
            var data = ''
            var level = ''
            if (message === 'SUCCESS') {
                if (result === 'TEACHER') {
                    data = response.data.dataLogin[0].MA_GV
                    level = response.data.dataLogin[0].MA_CD
                } else {
                    data = response.data.dataLogin[0].MA_SV
                    level = '04'
                }
                localStorage.setItem('login', data)
                localStorage.setItem('level', level)
                switch (level) {
                    case '01':
                        window.location.pathname = '/Admin'
                        break
                    case '02':
                        window.location.pathname = '/Teacher'
                        break
                    case '03':
                        window.location.pathname = '/Trainer'
                        break
                    default:
                        window.location.pathname = '/'
                        break
                }
            } else if (message === 'FAIL') {
                Swal.fire('Thất bại', 'Do sai mật khẩu hoặc tài khoản', 'error')
            } else if (message === 'ERR') {
                Swal.fire('Thất bại', 'Vui lòng không bỏ trống tài khoản hoặc mật khẩu', 'error')
            } else if (message === 'LOCK') {
                Swal.fire('Thất bại', 'Tài khoản đã bị khóa', 'error')
            } else if (message === 'EXIST') {
                Swal.fire('Thất bại', 'Tài khoản không tồn tại', 'error')
            } else {
                setError(message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <aside className="wrap-login mt-5">
                <h2 className="title-login mb-4">ĐĂNG NHẬP</h2>
                <Form method="POST">
                    <Form.Group className="mb-3">
                        <Form.Control
                            name="username"
                            type="text"
                            className="text-login"
                            placeholder="Nhập tài khoản"
                            onChange={(e) => setAccountInput({ ...accountInput, [e.target.name]: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            name="password"
                            type="password"
                            className="text-login"
                            placeholder="Nhập mật khẩu"
                            onChange={(e) => setAccountInput({ ...accountInput, [e.target.name]: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <small>{error}</small>
                    <Button variant="success" type="submit" className="submit-login" onClick={loginAccount}>
                        <strong>Đăng nhập</strong>
                    </Button>
                </Form>
            </aside>
        </>
    )
}

export default DangNhap
