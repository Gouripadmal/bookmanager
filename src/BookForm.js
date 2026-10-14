import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const API = "https://worksheet-library.mashupstack.com/books";

function BookForm() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    published_year: "",
    genre: ""
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`${API}/${id}`)
        .then((response) => {
          setBook(response.data);
        })
        .catch((error) => {
          console.log("Error fetching book", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: book.title,
      author: book.author,
      published_year: Number(book.published_year),
      genre: book.genre
    };

    try {
      if (id) {
        await axios.put(`${API}/${id}`, data);
        alert("Book updated successfully");
      } else {
        await axios.post(API, data);
        alert("Book added successfully");
      }

      navigate("/");
    } catch (error) {
      console.log("Error saving book", error);
      alert("Failed to save book");
    }
  };

  return (
    <div>
      <h2>{id ? "Edit Book" : "Add Book"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={book.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="published_year"
          placeholder="Published Year"
          value={book.published_year}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={book.genre}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {id ? "Update Book" : "Add Book"}
        </button>

        <Link to="/">
          <button type="button">Cancel</button>
        </Link>
      </form>
    </div>
  );
}

export default BookForm;