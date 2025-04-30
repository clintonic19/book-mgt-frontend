/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react"
import BookCards from "../books/BookCards";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from "../../redux/slice/booksApi/bookApiSlice";

const categories = [ "Select Category", "Fiction", "Horror", "Adventure", "Biography", "History", "Others" ]

const TopSales = () => {
    // const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Select Category");

    // Fetching the books data from the json file
    // useEffect(() => {
    //     const fetchBooks = async () => {
    //         const response = await fetch("/demoData/books.json")
    //         const data = await response.json()
    //         setBooks(data)
    //     }
    //     fetchBooks()
    //     console.log(fetchBooks);
    // }, []);

    // Fetching the books data from the DATABASE
    const { data: books = []  } = useFetchAllBooksQuery();

  // Filter the books based on the selected category
  const filteredBooks = selectedCategory === "Select Category" 
  ? books 
  : books?.books?.filter(book => book?.books?.category?.toLowerCase() === selectedCategory?.toLowerCase());
    
  // const filteredBook = selectedCategory === "Select Category" ? books :  books?.books?.filter(book => book?.category === selectedCategory?.toLowerCase());
    // console.log(":::::::::",books.books);
    
  return (
    <>
      <div className="py-12 ">
      <h2 className="md:text-4xl text-2xl font-semibold mb-5"> Top Selling Books  </h2>
      
      {/* filter Category of Seller */}
        <div className="mb-8 flex items-center gap-4">
            <select 
            onChange={(e)=> setSelectedCategory(e?.target?.value)}
            name="category" id="category" 
            className="bg-[#EAEAEA] py-2 px-4 rounded-md focus:outline-none">
                {
                    categories?.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))
                }
            </select>
        </div>

        {/* SWIPPER HERE... */}
        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation = {true}
        
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },

          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },

        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
            {
              // filteredBook?.books?.length > 0 && books?.books?.map((book, index) => (
              filteredBooks?.books?.length > 0 && books?.books?.map((book, index) => (
                //   <SwiperSlide key={index} >
                //       <BookCards book={book}/>
              //   </SwiperSlide>
              //   ))
              // Object.keys(books).length > 0 && books?.books?.map((book, index) => (
                // filteredBooks?.data?.length > 0 && filteredBooks?.map((book, index) => (
                    <SwiperSlide key={index} >
                        <BookCards book={book}/>
                    </SwiperSlide>
                                    ))
            }
      </Swiper>
            </div>
    </>
  )
}

export default TopSales
