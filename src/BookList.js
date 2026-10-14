import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "https://worksheet-library.mashupstack.com/books";

function BookList() {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await axios.get(API);
      setBooks(response.data);
    } catch (error) {
      console.log("Error fetching books", error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`${API}/${id}`);
        getBooks();
      } catch (error) {
        console.log("Error deleting book", error);
      }
    }
  };

  return (
    <div>
      <Link to="/add">
        <button>Add Book</button>
      </Link>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published Year</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published_year}</td>
              <td>{book.genre}</td>
              <td>
                <Link to={`/edit/${book.id}`}>
                  <button>Edit</button>
                </Link>

                <button onClick={() => handleDelete(book.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {books.length === 0 && <p>No books available.</p>}
    </div>
  );
}

export default BookList;