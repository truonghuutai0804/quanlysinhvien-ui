import React from 'react'
import { Nav } from 'react-bootstrap'
import { FaBook, FaChalkboardTeacher, FaRegChartBar, FaRegIdCard, FaUserAlt } from 'react-icons/fa'
import { MdDashboard, MdEngineering, MdLogout, MdOutlineGroups } from 'react-icons/md'
import { SiGoogleclassroom } from 'react-icons/si'
import { GiGraduateCap } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import './Siderbar.scss'

function Siderbar() {
    const eventClick = () => {
        switch (window.location.pathname) {
            case '/ThongTinSinhVien':
                return 2
            case '/DiemSinhVien':
                return 3
            case '/PhongDaoTao':
                return 4
            case '/GiaoVien':
                return 5
            case '/MonHoc':
                return 6
            case '/LopHoc':
                return 7
            case '/ChuyenNganh':
                return 8
            case '/Khoa':
                return 9
            case '/TaiKhoan':
                return 10
            case '/DangNhap':
                return 11
            default:
                return 1
        }
    }

    return (
        <>
            <Nav variant="pills" defaultActiveKey={eventClick()} className="warp-siderbar flex-column">
                <Nav.Item>
                    <Nav.Link as={Link} to="/" eventKey="1">
                        <MdDashboard size={20} className="me-3" />
                        Bảng điều khiển
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/ThongTinSinhVien" eventKey="2">
                        <FaRegIdCard size={20} className="me-3" />
                        Thông tin sinh viên
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/DiemSinhVien" eventKey="3">
                        <FaRegChartBar size={20} className="me-3" />
                        Điểm sinh viên
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/PhongDaoTao" eventKey="4">
                        <MdEngineering size={20} className="me-3" />
                        Phòng đào tạo
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/GiaoVien" eventKey="5">
                        <FaChalkboardTeacher size={20} className="me-3" />
                        Giáo viên
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/MonHoc" eventKey="6">
                        <FaBook size={20} className="me-3" />
                        Môn học
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/LopHoc" eventKey="7">
                        <SiGoogleclassroom size={20} className="me-3" />
                        Lớp học
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/ChuyenNganh" eventKey="8">
                        <GiGraduateCap size={20} className="me-3" />
                        Chuyên Ngành
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/Khoa" eventKey="9">
                        <MdOutlineGroups size={20} className="me-3" />
                        Khoa
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/TaiKhoan" eventKey="10">
                        <FaUserAlt size={20} className="me-3" />
                        Tài khoản
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/DangNhap" eventKey="11">
                        <MdLogout size={20} className="me-3" />
                        Đăng xuất
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    )
}

export default Siderbar
