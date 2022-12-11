import React from 'react'
import { Nav } from 'react-bootstrap'
import { FaBook, FaChalkboardTeacher, FaRegChartBar, FaRegIdCard, FaUserAlt } from 'react-icons/fa'
import { MdEngineering, MdLogout, MdOutlineGroups } from 'react-icons/md'
import { SiGoogleclassroom } from 'react-icons/si'
import { GiGraduateCap } from 'react-icons/gi'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import './Siderbar.scss'

function Siderbar() {
    const eventClick = () => {
        switch (window.location.pathname) {
            case '/Admin/DiemSinhVien':
                return 2
            case '/Admin/PhongDaoTao':
                return 3
            case '/Admin/GiaoVien':
                return 4
            case '/Admin/MonHoc':
                return 5
            case '/Admin/LopHoc':
                return 6
            case '/Admin/ChuyenNganh':
                return 7
            case '/Admin/Khoa':
                return 8
            case '/Admin/LyDo':
                return 9
            case '/Admin/HocPhan':
                return 10    
            case '/Admin/TaiKhoan':
                return 11
            case '/DangNhap':
                return 12
            default:
                return 1
        }
    }

    return (
        <>
            <Nav variant="pills" defaultActiveKey={eventClick()} className="warp-siderbar flex-column">
                <Nav.Item>
                    <Nav.Link as={Link} to="/Admin/" eventKey="1">
                        <FaRegIdCard size={20} className="me-3 tabs-siderbar" />
                        Thông tin sinh viên
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/Admin/DiemSinhVien" eventKey="2">
                        <FaRegChartBar size={20} className="me-3 tabs-siderbar" />
                        Điểm sinh viên
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/Admin/PhongDaoTao" eventKey="3">
                        <MdEngineering size={20} className="me-3 tabs-siderbar" />
                        Phòng đào tạo
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/Admin/GiaoVien" eventKey="4">
                        <FaChalkboardTeacher size={20} className="me-3 tabs-siderbar" />
                        Giáo viên
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/Admin/MonHoc" eventKey="5">
                        <FaBook size={20} className="me-3 tabs-siderbar" />
                        Môn học
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/Admin/LopHoc" eventKey="6">
                        <SiGoogleclassroom size={20} className="me-3 tabs-siderbar" />
                        Lớp học
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/Admin/ChuyenNganh" eventKey="7">
                        <GiGraduateCap size={20} className="me-3 tabs-siderbar" />
                        Chuyên Ngành
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/Admin/Khoa" eventKey="8">
                        <MdOutlineGroups size={20} className="me-3 tabs-siderbar" />
                        Khoa
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/Admin/LyDo" eventKey="9">
                        <AiOutlineQuestionCircle size={20} className="me-3 tabs-siderbar" />
                        Lý do
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/Admin/HocPhan" eventKey="10">
                        <GiGraduateCap size={20} className="me-3 tabs-siderbar" />
                        Học phần
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/Admin/TaiKhoan" eventKey="11">
                        <FaUserAlt size={20} className="me-3 tabs-siderbar" />
                        Tài khoản
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/DangNhap" eventKey="12">
                        <MdLogout size={20} className="me-3 tabs-siderbar" />
                        Đăng xuất
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    )
}

export default Siderbar
