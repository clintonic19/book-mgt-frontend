/* eslint-disable react/prop-types */
import {FiShoppingCart} from "react-icons/fi"
import { getImgUrl } from "../../utils/imgUrl.js";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice.js";

const BookCards = ({book}) => {
    const dispatch = useDispatch();

    // Adding book to cart handler
    const addToCartHandler = (products) => {
        try {
            // Dispatching the action to add the book to cart
            dispatch(addToCart(products));
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <>
            <div className=" rounded-lg transition-shadow duration-300">
        <div
            className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-4"
        >
            <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
            <Link to = {`/books/${book?._id}`}>
                <img
                sizes={510}
                src={`${getImgUrl(book?.coverImage)}`}
                // alt="Book Cover Page"
                className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                />
            </Link >
            </div>

            <div>
            <Link to = {`/books/${book?._id}`}>
                <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
                    {/* Book Title */}
                    {book?.title}
                </h3>
            </Link>

            <p className="text-gray-600 mb-5"> {book?.description?.length > 80 ? `${book?.description?.slice(0, 80)} Read more...` : book?.description}</p>
            <p className="font-medium mb-5">
                ${book?.newPrice} <span className="line-through font-normal ml-2">${book?.oldPrice}</span>
            </p>
            <button
                onClick={() => addToCartHandler(book)}
             className="btn-primary text-white px-6 space-x-1 flex items-center gap-1 ">
                <FiShoppingCart className=" " />
                <span className="" >Add to Cart</span>
            </button>
            </div>
        </div>
        </div>
    
    </>
  )
}

export default BookCards
