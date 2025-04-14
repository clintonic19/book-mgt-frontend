import { useState } from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useAddBookMutation } from '../../../redux/slice/booksApi/bookApiSlice';
import InputField from '../Add-book/InputField';
import SelectField from '../Add-book/SelectedField';
import { useNavigate } from 'react-router-dom';


const AddBook = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [imageFile, setImageFile] = useState(null);
    const [addBook, {isLoading, isError}] = useAddBookMutation()
    const [imageFileName, setImageFileName] = useState('')
    const navigate = useNavigate();

    // Handle form submission
    const onSubmit = async (data, e) => {
      e.preventDefault();
 
        const newBookData = {
            ...data,
            coverImage: imageFile //Add cover Image 
        }
        try {
            // await addBook({...data, newBookData}).unwrap();
            await addBook({...data, newBookData})
            Swal.fire({ 
                title: "Book added",
                text: "Your book is uploaded successfully!",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, It's Okay!"
              });
              reset();
              setImageFileName('')
              setImageFile(null);
              navigate('/dashboard/manage-books');
        } catch (error) {
            console.error(error);
            // alert("Failed to add book. Please try again.", isError);
            Swal.fire({
                title: "Failed to Add Book",
                // text: "Your book is uploaded successfully!",
                icon: "warning",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, It's Okay!"
              });   
        }
        console.log("New Books Adding::::", newBookData);
        console.log("Book:::::",newBookData);
        console.log("DATA:::::", data);
        
    }


    // Handle file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setImageFile(file);
            setImageFileName(file.name);
        }
    }

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-center font-bold text-gray-800 mb-4">ADD NEW BOOK</h2>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className=''>
        {/* Reusable Input Field for Title */}
        <InputField
          label="Title:"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        {/* Reusable Textarea for Description */}
        <InputField
          label="Description:"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}

        />

        {/* Reusable Select Field for Category */}
        <SelectField
          label="Category:"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
            // Add more options as needed
          ]}
          register={register}
        />

        {/* Trending Checkbox */}
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

        {/* Old Price */}
        <InputField
          label="Old Price:"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
         
        />

        {/* New Price */}
        <InputField
          label="New Price:"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
          
        />

        {/* Cover Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
          {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
         {
            isLoading ? <span className="">Adding.. </span> : <span>Add Book</span>
          }
        </button>
      </form>
    </div>
  )
}

export default AddBook