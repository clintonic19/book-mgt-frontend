import {createBrowserRouter} from 'react-router-dom';
import App from '../App.jsx';
import Home from '../pages/home/HomePage.jsx'
import Login from '../components/Login.jsx';
import Register from '../components/Register.jsx';
import Cart from '../pages/books/Cart.jsx';
import Checkout from '../pages/books/Checkout.jsx';
import SingleBookPage from '../pages/books/SingleBookPage.jsx';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import OrdersPage from '../pages/books/OrdersPage.jsx';
import AdminRoutes from './AdminRoutes.jsx';
import  Admin from '../components/AdminLogin.jsx';
import DashboardView from '../pages/dashboard/DashboardView.jsx';
import DashboardLayout from '../pages/dashboard/DashboardLayout.jsx';
import ManageBooks from '../pages/dashboard/manage-books/ManageBooks.jsx';
import UpdateEditBooks from '../pages/dashboard/Edit-books/UpdateEditBooks.jsx';
import AddBook from '../pages/dashboard/Add-book/AddBook.jsx';
import SearchPage from '../pages/home/SearchPage.jsx';

const router = createBrowserRouter([

     // DECLARATION OF ROUTES FOR THE APPLICATION
     {
        path: "/",
        element: <App/>,

        children:[
            {
                path: "/",
                element: <Home/>
            },

            {
                path:'/orders',
                element: <ProtectedRoutes><OrdersPage/></ProtectedRoutes>
            },

            {
                path:'/about',
                element: <h1>About</h1>
            },
// Search Page Route
            {
                path:'/search',
                element: <SearchPage/>
            },

            {
                path:'/login',
                element: <Login/>
            },

            {
                path:'/register',
                element: <Register/>
            },

            {
                path:'/cart',
                element: <Cart/>
            },   
            
            {
                path:'/checkout',
                element: <ProtectedRoutes><Checkout/></ProtectedRoutes>
            }, 

            {
                path:'/books/:id',
                element: <SingleBookPage/>
            },

        ]
    },

    //ADMIN LOGIN ROUTE
    {
        path: "/admin",
        element: <Admin/>,
        // element: <div>Admin Page</div>,
    },

    //ADMIN ROUTES OR DASHBOARD ROUTES
    {
            path: "/dashboard",
            element: <AdminRoutes> <DashboardLayout/>  </AdminRoutes>,
            children: [
                {
                    path: "",
                    element: <AdminRoutes> <DashboardView/> </AdminRoutes>
                },

                {
                    path: "add-new-books",
                    element: <AdminRoutes> <AddBook/> </AdminRoutes>
                },

                {
                    path: "edit-books/:id",
                    element: <AdminRoutes> <UpdateEditBooks/> </AdminRoutes>
                },
                
                {
                    path: "manage-books",
                    element: <AdminRoutes> <ManageBooks/> </AdminRoutes>
                },

                // {
                //     path: "delete-books/:id",
                //     element: <div> Delete Added Book</div>
                // }

            ]
    }
])

export default router;