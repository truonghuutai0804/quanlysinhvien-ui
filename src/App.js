import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { privateRoutes, teacherRoutes, trainerRoutes, studentRoutes } from './routes'
import { DefaultLayout, StudentLayout, TeacherLayout, TrainerLayout } from './layouts'

function App() {
    const login = localStorage.getItem('login')
    const level = localStorage.getItem('level')
    const pathDangNhap = '/DangNhap'
    const checkLogin = () => {
        if (login !== null || window.location.pathname === pathDangNhap) return true
        return false
    }

    const checkLevel = () => {
        if (level === '04' || level === null) return true
        return false
    }

    if (window.location.pathname === '/') {
        switch (level) {
            case '01':
                window.location.pathname = '/Admin'
                break
            case '02':
                window.location.pathname = '/Teacher'
                break
            case '03':
                window.location.pathname = '/Trainer'
                break
            default:
                break
        }
    }

    return (
        <Router>
            <div className="App">
                <Routes>
                    {level === '01' &&
                        privateRoutes.map((route, idx) => {
                            var Layout = route.layout || DefaultLayout
                            var Page = route.component
                            return (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    element={
                                        checkLogin() ? (
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        ) : (
                                            ((window.location.pathname = pathDangNhap),
                                            (<Navigate replace to="/DangNhap" />))
                                        )
                                    }
                                />
                            )
                        })}
                    {level === '02' &&
                        teacherRoutes.map((route, idx) => {
                            var Layout = route.layout || TeacherLayout
                            var Page = route.component
                            return (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    element={
                                        checkLogin() ? (
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        ) : (
                                            ((window.location.pathname = pathDangNhap),
                                            (<Navigate replace to="/DangNhap" />))
                                        )
                                    }
                                />
                            )
                        })}
                    {level === '03' &&
                        trainerRoutes.map((route, idx) => {
                            var Layout = route.layout || TrainerLayout
                            var Page = route.component
                            return (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    element={
                                        checkLogin() ? (
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        ) : (
                                            ((window.location.pathname = pathDangNhap),
                                            (<Navigate replace to="/DangNhap" />))
                                        )
                                    }
                                />
                            )
                        })}
                    {checkLevel() &&
                        studentRoutes.map((route, idx) => {
                            var Layout = route.layout || StudentLayout
                            var Page = route.component
                            return (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    element={
                                        checkLogin() ? (
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        ) : (
                                            ((window.location.pathname = pathDangNhap),
                                            (<Navigate replace to="/DangNhap" />))
                                        )
                                    }
                                />
                            )
                        })}
                </Routes>
            </div>
        </Router>
    )
}

export default App
