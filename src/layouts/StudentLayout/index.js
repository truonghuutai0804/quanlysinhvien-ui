import Header from './Header'
import './StudentLayout.scss'
function StudentLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container-xxl d-flex">
                <div className="content">{children}</div>
            </div>
        </div>
    )
}

export default StudentLayout