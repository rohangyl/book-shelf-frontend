import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${BASE_URL}api/books/${id}`);
        console.log("rohan"+res)
        console.log("Book Data:", res.data); 

        setBook(res.data);
      } catch (error) {
        console.error('Failed to fetch book details', error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={() => navigate(-1)}>⬅️ Back</button>
      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Year:</strong> {book.publicationYear}</p>
      <p><strong>Language:</strong> {book.language}</p>
      <p><strong>Theme:</strong> {book.theme}</p>
      <img src={book.coverImage} alt="Cover" style={{ maxWidth: '150px' }} />
    </div>
  );
};

export default BookDetails;
