import { useEffect } from 'react'
// import InputField from '../addBook/InputField'
// import SelectField from '../addBook/SelectField'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import {  useFetchBookByIdQuery, useUpdateBookMutation } from '../../../redux/slice/booksApi/bookApiSlice';
import Loading from '../../../components/Loader';
import InputField from '../Add-book/InputField';
import SelectField from '../Add-book/SelectedField';


const UpdateEditBooks = () => {
  
  const { id } = useParams();
  const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
  const [updateBook] = useUpdateBookMutation();
  const { register, handleSubmit, setValue, reset } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (bookData) {
      setValue('title', bookData.book.title);
      setValue('description', bookData.book.description);
      setValue('category', bookData?.book?.category);
      setValue('trending', bookData.book.trending);
      setValue('oldPrice', bookData.book.oldPrice);
      setValue('newPrice', bookData.book.newPrice);
      setValue('coverImage', bookData.book.coverImage)
    }
  }, [bookData, setValue])

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const updateBookData = {
      title: data?.title,
      description: data?.description,
      category: data?.category,
      trending: data?.trending,
      oldPrice: Number(data?.oldPrice),
      newPrice: Number(data?.newPrice),
      coverImage: data?.coverImage || bookData?.coverImage,
    };
    try {
      // await updateBook({id, updateBookData}).unwrap();
      await updateBook({id, ...updateBookData})
      // await  axios.put(`$${API_URL}/api/books/edit/${id}`, updateBookData, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // })
      console.log("ID :::: :::: ",id)
      Swal.fire({
        title: "Book Updated Successfully",
        // text: "Your book is updated successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!"
      });
      await refetch()
      reset()
      navigate('/dashboard/manage-books');
    } catch (error) {
      console.log("Failed to update book.", error.message);
      alert("Failed to update book.");
    }
  }
  if (isLoading) return <Loading />
  if (isError) return <div>Error fetching book data</div>
  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />

        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
          ]}
          register={register}
        />
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('trending')}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>
        </div>

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
        />

        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />

        <InputField
          label="Cover Image URL"
          name="coverImage"
          type="text"
          placeholder="Cover Image URL"
          register={register}
        />

        <button type="submit" className="w-full py-2 bg-primary text-white font-bold rounded-md">
          Update Book
        </button>
      </form>
    </div>
  )
}

export default UpdateEditBooks;