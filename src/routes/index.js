import BangDieuKhien from '~/pages/BangDieuKhien'
import ThongTinSinhVien from '~/pages/ThongTinSinhVien'
import DiemSinhVien from '~/pages/DiemSinhVien'
import PhongDaoTao from '~/pages/PhongDaoTao'
import GiaoVien from '~/pages/GiaoVien'
import MonHoc from '~/pages/MonHoc'
import LopHoc from '~/pages/LopHoc'
import TaiKhoan from '~/pages/TaiKhoan'
import DangNhap from '~/pages/DangNhap'
import ChuyenNganh from '~/pages/ChuyenNganh'
import Khoa from '~/pages/Khoa'
import { LoginLayout } from '~/layouts'

// Truy cập trang sau khi đăng nhập
const privateRoutes = [
    { path: '/Admin/', component: BangDieuKhien },
    { path: '/Admin/ThongTinSinhVien', component: ThongTinSinhVien },
    { path: '/Admin/DiemSinhVien', component: DiemSinhVien },
    { path: '/Admin/PhongDaoTao', component: PhongDaoTao },
    { path: '/Admin/GiaoVien', component: GiaoVien },
    { path: '/Admin/MonHoc', component: MonHoc },
    { path: '/Admin/LopHoc', component: LopHoc },
    { path: '/Admin/ChuyenNganh', component: ChuyenNganh },
    { path: '/Admin/Khoa', component: Khoa },
    { path: '/Admin/TaiKhoan', component: TaiKhoan },
    { path: '/DangNhap', component: DangNhap, layout: LoginLayout },
]


export { privateRoutes }
