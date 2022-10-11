import Header from './Header'
import './LoginLayout.scss'
function LoginLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container-xxl d-flex">
                <div className="content">{children}</div>
            </div>
        </div>
    )
}

export default LoginLayout