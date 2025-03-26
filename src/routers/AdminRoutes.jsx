/* eslint-disable react/prop-types */

import { Navigate, Outlet } from 'react-router-dom';

const AdminRoutes = ({ children }) => {
    // Check if token is in local storage
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to = "/admin" />
    };

    return children ? children : <Outlet/>;
}

export default AdminRoutes
