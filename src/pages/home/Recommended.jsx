
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BookCards from "../books/BookCards";
import { useFetchAllBooksQuery } from "../../redux/slice/booksApi/bookApiSlice";

const Recommended = () => {
    // const [books, setBooks] = useState([]);
        
    //     useEffect(() => {
    //         const fetchBooks = async () => {
    //             const response = await fetch("/demoData/books.json")
    //             const data = await response.json()
    //             setBooks(data)
    //         }
    //         fetchBooks()
    //     }, []);

          // Fetching the books data from the DATABASE
        const { data: books = [] } = useFetchAllBooksQuery()
  return (
    <div className="py-16">

      <h3 className="md:text-4xl text-2xl font-semibold mb-5"> Recommended Books </h3>

      {/* SWIPER SESSION HERE */}
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
                books?.books?.length > 0 && books?.books?.slice(5, 16)?.map((book, index) => (
                    <SwiperSlide key={index} >
                        <BookCards book={book}/>
                    </SwiperSlide>
                    
                ))
            }
      </Swiper>
    </div>
  )
}

export default Recommended
