import Home from '~/components/pages/Home'
import HeThongTongDai from '~/components/pages/HeThongTongDai'

// Truy cập trang không cần đăng nhập
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/HeThongTongDai', component: HeThongTongDai },
]

// Truy cập trang sau khi đăng nhập
const privateRoutes = []

export { publicRoutes, privateRoutes }
