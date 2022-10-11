import Header from './Header'
import Siderbar from './Siderbar'
import './DefaultLayout.scss'
function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container-xxl d-flex">
                <Siderbar />
                <div className="content">{children}</div>
            </div>
        </div>
    )
}

export default DefaultLayout
