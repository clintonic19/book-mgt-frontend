import { Link, useNavigate } from "react-router-dom"
import { FaBars } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";

import AvatarImage from "../assets/avatarImg.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../reactContext/authContext";


const navigateDropwdown =[  
    // {name: "Profile", href: "/profile"},
    // {name: "Dashboard", href: "/dashboard"},
    {name: "Orders", href: "/orders"},
    {name: "Check Out", href: "/checkout"},
    {name: "Cart", href: "/cart"},
]

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const [ searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
 
    //ADDING THE CART ITEMS FROM REDUX STORE, CARTSLICE AND DISPLAYING IT IN THE NAVBAR
    const cartItem = useSelector(state => state.cart.cartItems);

    const handleSearch = (e) =>{
        e.preventDefault();
        if(searchQuery.trim() != ''){
             // Example: Navigate to a search page with query as URL param
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            // navigate(`/search?q=${searchQuery}`);
            setSearchQuery('');
        }else{
            navigate('/');
        }
    }
   
    //LOGOUT FUNCTION
  const handleLogout =  () =>{
        try {
            logout();
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <header className="max-h-screen-2xl mx-auto px-4 py-6">
     
     <nav className="flex justify-between items-center ">
     
     {/* Left side of the Navbar */}
        <div className="flex items-center gap-4 md:gap-16"> 
            <Link to="/">
                <FaBars size={18}/>
            </Link>

            {/* Search Bar Input  */}
            {/* <div className="relative sm:w-72 w-40 space-x-2 "> */}
                {/* <IoSearch size={18} className="absolute inline-block left-4 inset-y-2" /> */}
                {/* <input type="text" placeholder="Search here..." className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none " /> */}
                {/* <button className="flex flex-col">Search</button> */}
            {/* </div> */}

            {/* NEW CODE FOR SEARCH BAR */}

            <div className="flex w-full gap-5 ">
            <IoSearch size={30} className="relative inline-block left-11 inset-y-1" />
            <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="email"
                placeholder="Search books..."
                className="bg-[#EAEAEA] w-full py-1  md:px-8 px-6 rounded-md focus:outline-none"
            />
            <button onClick={handleSearch} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark">
              Search
            </button>
          </div>
        </div>

        {/* Right side of the Navbar */}
        <div className="relative md:space-x-4 space-x-3 flex items-center" >
        {
            currentUser ? (
                < >
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="relative">
                        <img src={AvatarImage} alt="avatar" size={20}
                         className={`w-8 h-8 rounded-full ${currentUser ? 'ring--2 ring-blue-800' : '' } ` }  />
                    </button>

                    {/* Mapping the DropDown Menu  */}
                    {
                        isDropdownOpen && (
                            <div className="absolute top-12 right-0 bg-white w-48 p-4 shadow-md rounded-md z-40">
                                {
                                    navigateDropwdown.map((items, index) => (
                                        <Link onClick={()=>{setIsDropdownOpen(false)}} to={items.href} key={index} className="block py-2 hover:bg-gray-100 text-sm">{items.name}</Link>
                                    ))
                                }

                                {/* LOGOUT BUTTON SESSION */}
                                <li className="list-none">
                                    <button 
                                    onClick={handleLogout}
                                    className="block w-full text-left py-2 hover:bg-gray-100 text-sm">Logout</button>
                                </li>
                            </div>
                        )
                    }
                </>
            ) : (
                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-primary flex gap-2">
                    <FaUser size={20}/> Account
                    </Link>
                </div>
            )
        }
            {/* <FaUser size={20}/> */}
            <button className="hidden sm:block">
                <FaRegHeart size={20} />
            </button>

            {/* LINK for Shopping-Cart */}
            <Link to="/cart" className="bg-primary text-white p-1 sm:px-6 px-2 rounded-md flex items-center gap-1">
                <GiShoppingCart size={20} /> 

                {/* Displaying the Cart Items */}
                {
                    cartItem.length > 0 ? (
                        <span className="text-sm font-semibold sm:ml-1">{cartItem.length}</span>
                    ) : (
                        <span className="text-sm font-semibold sm:ml-1">Cart</span> 
                        // <span className="text-sm font-semibold sm:ml-1">0</span> 
                    )
                }                           
            </Link>
        </div>

     </nav>
    </header>
  )
}

export default Navbar
