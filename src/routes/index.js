import BangDieuKhien from '~/components/pages/BangDieuKhien'
import ThongTinSinhVien from '~/components/pages/ThongTinSinhVien'
import DiemSinhVien from '~/components/pages/DiemSinhVien'
import PhongDaoTao from '~/components/pages/PhongDaoTao'
import GiaoVien from '~/components/pages/GiaoVien'
import MonHoc from '~/components/pages/MonHoc'
import LopHoc from '~/components/pages/LopHoc'
import TaiKhoan from '~/components/pages/TaiKhoan'
import DangNhap from '~/components/pages/DangNhap'
import ChuyenNganh from '~/components/pages/ChuyenNganh'
import Khoa from '~/components/pages/Khoa'
import {LoginLayout} from '~/components/Layouts'

// Truy cập trang không cần đăng nhập
const publicRoutes = [
    { path: '/', component: BangDieuKhien },
    { path: '/ThongTinSinhVien', component: ThongTinSinhVien },
    { path: '/DiemSinhVien', component: DiemSinhVien },
    { path: '/PhongDaoTao', component: PhongDaoTao },
    { path: '/GiaoVien', component: GiaoVien },
    { path: '/MonHoc', component: MonHoc },
    { path: '/LopHoc', component: LopHoc },
    { path: '/ChuyenNganh', component: ChuyenNganh },
    { path: '/Khoa', component: Khoa },
    { path: '/TaiKhoan', component: TaiKhoan },
    { path: '/DangNhap', component: DangNhap, layout: LoginLayout },
]

// Truy cập trang sau khi đăng nhập
const privateRoutes = [ ]

export { publicRoutes, privateRoutes }
