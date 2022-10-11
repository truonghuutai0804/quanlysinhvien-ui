import React from 'react'
import { FaSchool } from 'react-icons/fa'
import './Header.scss'
const Header = () => {
    return (
        <>
        <aside className='header-login'>
            <a href='/DangNhap' className='header-logo d-flex'>
                <FaSchool size={50} />
                <h1 className='header-text'>HỆ THỐNG QUẢN LÝ SINH VIÊN</h1>
            </a>
        </aside>
        </>
    )
}

export default Header
