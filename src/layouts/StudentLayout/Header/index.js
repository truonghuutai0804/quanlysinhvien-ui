import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { FaSchool } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './Header.scss'
const Header = () => {
    const MA_SV = localStorage.getItem('login')
    const [student, setStudent] = useState([])
    const getGV = useCallback(async (id) => {
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
        getGV(MA_SV)
    }, [getGV, MA_SV])

    return (
        <>
        <aside className='header-login d-flex'>
            <a href='/' className='header-logo d-flex'>
                <FaSchool size={50} />
                <h1 className='header-text'>HỆ THỐNG QUẢN LÝ SINH VIÊN</h1>
            </a>
            <aside className='mt-4 d-flex ms-auto '>
                    <p className='me-3 text-white'>Xin chào <strong>{student.HOTEN_SV} </strong> </p>
                    <Link to="/DangNhap" className='btn btn-danger pt-0 text-white'> Đăng xuất </Link>
                </aside>
        </aside>
        </>
    )
}

export default Header
