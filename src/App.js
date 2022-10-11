import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { privateRoutes } from './routes'
import { DefaultLayout } from './layouts'

function App() {
    const login = localStorage.getItem('login')
    const pathDangNhap = '/DangNhap'
    const checkLogin = () => {
        if (login !== null || window.location.pathname === pathDangNhap) return true
        return false
    }

    return (
        <Router>
            <div className="App">
                <Routes>
                    {privateRoutes.map((route, idx) => {
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
                                        window.location.pathname = pathDangNhap,
                                        <Navigate replace to="/DangNhap" />
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
