import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookList from "./BookList";
import BookForm from "./BookForm";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h1>Book Manager App</h1>

        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<BookForm />} />
          <Route path="/edit/:id" element={<BookForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;