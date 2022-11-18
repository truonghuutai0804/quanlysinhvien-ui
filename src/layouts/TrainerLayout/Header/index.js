import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { FaSchool } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './Header.scss'
const Header = () => {
    const MA_GV = localStorage.getItem('login')
    const [teacher, setTeacher] = useState([])
    const getGV = useCallback(async (id) => {
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
        getGV(MA_GV)
    }, [getGV, MA_GV])
    return (
        <>
            <aside className="header-login d-flex">
                <a href="/Trainer" className="header-logo d-flex">
                    <FaSchool size={50} />
                    <h1 className="header-text">HỆ THỐNG QUẢN LÝ SINH VIÊN</h1>
                </a>
                <aside className="mt-4 d-flex ms-auto ">
                    <p className="me-3 text-white">
                        Xin chào <strong>{teacher.HOTEN_GV} </strong>{' '}
                    </p>
                    <Link to="/DangNhap" className="btn btn-danger pt-0 text-white">
                        Đăng xuất
                    </Link>
                </aside>
            </aside>
        </>
    )
}

export default Header
