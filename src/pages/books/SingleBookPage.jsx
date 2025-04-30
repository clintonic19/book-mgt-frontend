import { FiShoppingCart } from 'react-icons/fi';
import { addToCart } from '../../redux/slice/cartSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFetchBookByIdQuery } from '../../redux/slice/booksApi/bookApiSlice';
import { getImgUrl } from '../../utils/imgUrl';
import Loading from '../../components/Loader'

const SingleBookPage = () => {
    const {id} = useParams();
    const {data: book, isLoading, isError} = useFetchBookByIdQuery(id);

    const dispatch =  useDispatch();
    console.log("Book SinglePage::::", book);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    if(isLoading) return <div className='py-5'><Loading/></div>
    // if(isError) return <div>Error Occurred trying to load book info</div>
    
  return (
    <div className="max-w-lg shadow-md p-5">
            <h1 className="text-2xl font-bold mb-6">{book?.book.title}</h1>

            <div className=''>
                <div>
                    <img
                        src={`${getImgUrl(book?.book?.coverImage)}`}
                        // src={`${getImgUrl(book?.coverImage)}`}
                        alt={book?.title}
                        size = {50}
                        className="mb-8"
                    />
                </div>

                <div className='mb-5'>
                    <p className="text-gray-700 mb-2"><strong>Author:</strong> { book?.book.author || 'admin' }</p>
                    <p className="text-gray-700 mb-4">
                        <strong>Published:</strong> {new Date( book?.book.createdAt )?.toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 mb-4 capitalize">
                        <strong>Category:</strong> { book?.book.category }
                        
                    </p>
                    <p className="text-gray-700"><strong>Description:</strong> { book?.book.description }</p>
                </div>

                <button onClick={() => handleAddToCart(book)} className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
                    <FiShoppingCart className="" />
                    <span className="">Add to Cart</span>

                </button>
            </div>
        </div>
  )
}

export default SingleBookPage
