import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './DangNhap.scss'

const DangNhap = () => {
    const [accountInput, setAccountInput] = useState({})
    const navigate = useNavigate()
    localStorage.removeItem('login')
    const loginAccount = async (e) => {
        try {
            e.preventDefault()
            // console.log(accountInput)
            const options = {
                method: 'post',
                url: 'http://localhost:8080/api/login',
                data: accountInput,
            }
            const response = await axios(options)
            const message = response.data.message
            if (message === 'SUCCESS') {
                const data = response.data.dataLogin[0].MA_GV
                localStorage.setItem('login', data)
                const level = response.data.dataLogin[0].MA_CD
                switch (level) {
                    case '01':
                         console.log('Quản trị viên')
                         navigate('/Admin/')
                         break;
                    case '02':
                         console.log('Giảng viên')
                         break;
                    default:
                         console.log('Phòng đào tạo')
                         break;
                }
            }
            else if (message === 'FAIL'){
                console.log('Đăng nhập thất bại, do sai mật khẩu hoặc tài khoản');
            }
            else if (message === 'ERR'){
                console.log('Đăng nhập thất bại, vui lòng không bỏ trống tài khoản và mật khẩu');
            }
            else {
                console.log(message);
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
                    <Button variant="success" type="submit" className="submit-login" onClick={loginAccount}>
                        <strong>Đăng nhập</strong>
                    </Button>
                </Form>
            </aside>
        </>
    )
}

export default DangNhap
