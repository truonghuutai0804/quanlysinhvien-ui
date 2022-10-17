import Header from './Header'
import './TrainerLayout.scss'
function TrainerLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container-xxl d-flex">
                <div className="content">{children}</div>
            </div>
        </div>
    )
}

export default TrainerLayout