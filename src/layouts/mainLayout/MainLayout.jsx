
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { useTranslation } from 'react-i18next';

const MainLayout = () => {
    const token = localStorage.getItem('token')
    
    if (!token) {
        const navigate = useNavigate()
        navigate('/login')
    }
    
    const { t } = useTranslation()

    return (
        <div className='wrapper' style={{ minHeight: '100h' }}>
            <Sidebar />
            <div className="main">
                <TopNav />
                <main className="content">
                    <div className="container-fluid p-0">
                        <Outlet />
                    </div>
                </main>
                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <p className="mb-0">
                                    © 2023 - <a className="text-muted">{t("butterfly")}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default MainLayout;
