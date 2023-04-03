import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {

    const { emailSuccess, passwordSuccess } = useSelector(state => state.loginState);

    if (!emailSuccess && !passwordSuccess) {
        return <Navigate to="/" replace />;
    }
    return children;
};
export default ProtectedRoute;