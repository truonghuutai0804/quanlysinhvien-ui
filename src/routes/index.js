import { LoginLayout } from '~/layouts'
import {
    ChuyenNganh,
    DiemSinhVien,
    GiaoVien,
    Khoa,
    LopHoc,
    MonHoc,
    PhongDaoTao,
    TaiKhoan,
    ThongTinSinhVien,
} from '~/pages/admin'

import { 
    BangDieuKhienSV, 
    DangKiHocPhanSV, 
    KetQuaHocTapSV, 
    ThongTinCaNhanSV 
} from '~/pages/student'

import BangDieuKhienGV from '~/pages/teacher/BangDieuKhien'
import ThongTinCaNhanGV from '~/pages/teacher/ThongTinCaNhan'
import DiemSinhVienGV from '~/pages/teacher/DiemSinhVien'

import BangDieuKhienPDT from '~/pages/trainer/BangDieuKhien'
import ThongTinCaNhanPDT from '~/pages/trainer/ThongTinCaNhan'
import DanhSachSinhVienPDT from '~/pages/trainer/DanhSachSinhVien'
import DanhSachGiaoVienPDT from '~/pages/trainer/DanhSachGiaoVien'
import QuanLiHocPhanPDT from '~/pages/trainer/QuanLiHocPhan'
import QuanLyNamHocPDT from '~/pages/trainer/QuanLyNamHoc'
import QuanLyDiemPDT from '~/pages/trainer/QuanLyDiem'
import QuanLyLyDoPDT from '~/pages/trainer/QuanLyLyDo'
import QuanLyKhoaPDT from '~/pages/trainer/QuanLyKhoa'


import DangNhap from '~/pages/DangNhap'

// Truy cập trang sau khi đăng nhập
const privateRoutes = [
    { path: '/Admin/', component: ThongTinSinhVien },
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

const teacherRoutes = [
    { path: '/Teacher/', component: BangDieuKhienGV },
    { path: '/Teacher/ThongTinCaNhan', component: ThongTinCaNhanGV },
    { path: '/Teacher/DiemSinhVien', component: DiemSinhVienGV },
    { path: '/DangNhap', component: DangNhap, layout: LoginLayout },
]

const trainerRoutes = [
    { path: '/Trainer/', component: BangDieuKhienPDT },
    { path: '/Trainer/ThongTinCaNhan', component: ThongTinCaNhanPDT },
    { path: '/Trainer/DanhSachSinhVien', component: DanhSachSinhVienPDT },
    { path: '/Trainer/DanhSachGiaoVien', component: DanhSachGiaoVienPDT },
    { path: '/Trainer/HocPhan', component: QuanLiHocPhanPDT },
    { path: '/Trainer/DiemSinhVien', component: QuanLyDiemPDT},
    { path: '/Trainer/NamHoc', component: QuanLyNamHocPDT},
    { path: '/Trainer/LyDo', component: QuanLyLyDoPDT},
    { path: '/Trainer/Khoa', component: QuanLyKhoaPDT},
    { path: '/DangNhap', component: DangNhap, layout: LoginLayout },
]

const studentRoutes = [
    { path: '/', component: BangDieuKhienSV },
    { path: '/ThongTinCaNhan', component: ThongTinCaNhanSV },
    { path: '/DangKiHocPhan', component: DangKiHocPhanSV },
    { path: '/KetQua', component: KetQuaHocTapSV },
    { path: '/DangNhap', component: DangNhap, layout: LoginLayout },
]

export { privateRoutes, teacherRoutes, trainerRoutes, studentRoutes }
