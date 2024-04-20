
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()

    const handleLogOut = () => {
        localStorage.removeItem("token");
        return navigate('/login')
    };

    return (
        <div>
            <button
                className="btn btn-danger fw-bolder mt-n1"
                onClick={handleLogOut}
            >
                {t("login.logout")}
            </button>
        </div>
    );
}


export default Logout;