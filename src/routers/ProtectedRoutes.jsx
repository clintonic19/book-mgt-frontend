import PropTypes from 'prop-types';
import { useAuth } from '../reactContext/authContext'
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';

// Protected Routes
const ProtectedRoutes = ({children}) => {
    const {currentUser, loading } = useAuth();

    if(loading){
        return <Loader/>
    }

    if(currentUser){
        return children;
    }
  return <Navigate to="/login" replace/>;
}

// PropTypes Validation
ProtectedRoutes.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoutes
// export default ProtectedRoutes
