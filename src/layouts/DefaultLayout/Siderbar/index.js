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
            case '/Admin/ThongTinSinhVien':
                return 2
            case '/Admin/DiemSinhVien':
                return 3
            case '/Admin/PhongDaoTao':
                return 4
            case '/Admin/GiaoVien':
                return 5
            case '/Admin/MonHoc':
                return 6
            case '/Admin/LopHoc':
                return 7
            case '/Admin/ChuyenNganh':
                return 8
            case '/Admin/Khoa':
                return 9
            case '/Admin/TaiKhoan':
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
                    <Nav.Link as={Link} to="/Admin/" eventKey="1">
                        <MdDashboard size={20} className="me-3 tabs-siderbar" />
                        Bảng điều khiển
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/Admin/ThongTinSinhVien" eventKey="2">
                        <FaRegIdCard size={20} className="me-3 tabs-siderbar" />
                        Thông tin sinh viên
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/Admin/DiemSinhVien" eventKey="3">
                        <FaRegChartBar size={20} className="me-3 tabs-siderbar" />
                        Điểm sinh viên
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/Admin/PhongDaoTao" eventKey="4">
                        <MdEngineering size={20} className="me-3 tabs-siderbar" />
                        Phòng đào tạo
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/Admin/GiaoVien" eventKey="5">
                        <FaChalkboardTeacher size={20} className="me-3 tabs-siderbar" />
                        Giáo viên
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/Admin/MonHoc" eventKey="6">
                        <FaBook size={20} className="me-3 tabs-siderbar" />
                        Môn học
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/Admin/LopHoc" eventKey="7">
                        <SiGoogleclassroom size={20} className="me-3 tabs-siderbar" />
                        Lớp học
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/Admin/ChuyenNganh" eventKey="8">
                        <GiGraduateCap size={20} className="me-3 tabs-siderbar" />
                        Chuyên Ngành
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/Admin/Khoa" eventKey="9">
                        <MdOutlineGroups size={20} className="me-3 tabs-siderbar" />
                        Khoa
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/Admin/TaiKhoan" eventKey="10">
                        <FaUserAlt size={20} className="me-3 tabs-siderbar" />
                        Tài khoản
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/DangNhap" eventKey="11">
                        <MdLogout size={20} className="me-3 tabs-siderbar" />
                        Đăng xuất
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    )
}

export default Siderbar
