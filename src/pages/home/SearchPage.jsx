import { useLocation } from "react-router-dom";
import { useSearchBooksQuery } from "../../redux/slice/booksApi/bookApiSlice";
import Loader from "../../components/Loader";

// Sample book data (replace with API call or Redux state as needed)
// const books = [
//   { id: 1, title: "React for Beginners", author: "Jane Doe" },
//   { id: 2, title: "Advanced React Patterns", author: "John Smith" },
//   { id: 3, title: "JavaScript: The Good Parts", author: "Douglas Crockford" },
//   { id: 4, title: "Clean Code", author: "Robert C. Martin" },
// ];

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q")?.toLowerCase() || "";
  const  {data: book, isLoading }  = useSearchBooksQuery(query);

  console.log("Find Book:::", book);
  console.log("Find Book ID:::::", book?.book?.book._id);


  // Filter the books based on query
  const filteredBooks = book?.filter(book =>
    book?.title?.toLowerCase().includes(query)
  );

  if(isLoading) return < Loader />

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for: "{query}"</h1>

      {filteredBooks?.length > 0 ? (
        <ul className="space-y-3">
          {filteredBooks?.map(book => (
            <li key={book?.id} className="border p-4 rounded-md shadow hover:shadow-md transition">
              <h2 className="text-xl font-semibold">{book?.title}</h2>
              <p className="text-sm text-gray-600">by {book?.description}</p>
            </li>

          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No books found.</p>
      )}
    </div>
  );
};

export default SearchPage;
