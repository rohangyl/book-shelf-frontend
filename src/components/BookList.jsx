import React, { useContext, useState } from 'react';
import { BookContext } from '../context/BookContext';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
  const { books, loading, error } = useContext(BookContext);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;
  const navigate = useNavigate();


  if (loading) return <p>Loading books...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (books.length === 0) return <p>No books found.</p>;

  // Pagination calculation
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const thStyle = {
    borderBottom: '2px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2'
  };

  const tdStyle = {
    borderBottom: '1px solid #ccc',
    padding: '8px',
    verticalAlign: 'top'
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Books</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th style={thStyle}>Cover</th>
            <th style={thStyle}>Title</th>
            {/* <th style={thStyle}>Author</th>
            <th style={thStyle}>Genre</th>
            <th style={thStyle}>Year</th>
            <th style={thStyle}>Read Status</th>
            <th style={thStyle}>Language</th>
            <th style={thStyle}>Theme</th> */}
          </tr>
        </thead>
        <tbody>
          {currentBooks.map(book => (
            <tr key={book._id}>
              <td style={tdStyle}>
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={`${book.title} cover`}
                    style={{ maxWidth: '60px', maxHeight: '90px' }}
                  />
                ) : 'N/A'}
              </td>
              <td style={tdStyle} onClick={() => navigate(`/book/${book._id}`)} >
                {book.title}
              </td>
              {/* <td style={tdStyle}>{book.author}</td>
              <td style={tdStyle}>{book.genre || 'N/A'}</td>
              <td style={tdStyle}>{book.publicationYear || 'N/A'}</td>
              <td style={tdStyle}>{book.readStatus}</td>
              <td style={tdStyle}>{book.language || 'N/A'}</td>
              <td style={tdStyle}>{book.theme || 'N/A'}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            style={{
              margin: '0 5px',
              padding: '5px 10px',
              backgroundColor: currentPage === i + 1 ? '#007bff' : '#eee',
              color: currentPage === i + 1 ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookList;
