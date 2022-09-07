import React from 'react'
import { Button, Form } from 'react-bootstrap'
import './DangNhap.scss'
const DangNhap = () => {
    return (
        <>
            <Form className="wrap-login mt-5">
                <h2 className='title-login mb-4'>ĐĂNG NHẬP</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" className="text-login" placeholder="Nhập tài khoản" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" className="text-login"  placeholder="Nhập mật khẩu" />
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" className="text-login" label="Ghi nhớ" />
                </Form.Group>
                <Button variant="success" type="submit" className="submit-login">
                    <strong>Đăng nhập</strong>
                </Button>
            </Form>
        </>
    )
}

export default DangNhap
