import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }){
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated){
        return <Navigate to="/admin-login" replace/>;
    }

    return children;
}

export default ProtectedRoute;