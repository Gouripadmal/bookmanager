import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Book Manager</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/add">Add Book</Link>
      </div>
    </nav>
  );
}

export default Navbar;