import Header from './Header'
import './TeacherLayout.scss'
function TeacherLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container-xxl d-flex">
                <div className="content">{children}</div>
            </div>
        </div>
    )
}

export default TeacherLayout