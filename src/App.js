import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddBookForm from './components/AddBookForm';
import BookList from './components/BookList';
import SearchBooks from './components/SearchBooks';
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
            <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Book Shelf</h1>

      <Navbar />
      <div style={{ padding: '1rem' }}>

        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<AddBookForm />} />
          <Route path="/search" element={<SearchBooks />} />
          {/* <Route path="/chat" element={<Chatbot />} /> */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
