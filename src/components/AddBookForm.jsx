import React, { useState, useContext } from 'react';
import { BookContext } from '../context/BookContext';

const AddBookForm = () => {
  const { fetchBooks } = useContext(BookContext);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationYear: '',
    coverImage: '',
    readStatus: 'unread',
    language: '',
    theme: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('https://book-shelf-backend-ceqs.onrender.com/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to add book');
      } else {
        setSuccess('Book added successfully!');
        setFormData({
          title: '',
          author: '',
          genre: '',
          publicationYear: '',
          coverImage: '',
          readStatus: 'unread',
          language: '',
          theme: ''
        });
        fetchBooks(); // refresh the book list
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h2 style={{ textAlign: 'center' }}>Add New Book</h2>
      <table style={{ margin: '0 auto', borderSpacing: '10px' }}>
        <tbody>
          <tr>
            <td><label htmlFor="title">Title:</label></td>
            <td>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="author">Author:</label></td>
            <td>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="genre">Genre:</label></td>
            <td>
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="publicationYear">Publication Year:</label></td>
            <td>
              <input
                type="number"
                name="publicationYear"
                value={formData.publicationYear}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="coverImage">Cover Image URL:</label></td>
            <td>
              <input
                type="text"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="readStatus">Read Status:</label></td>
            <td>
              <select name="readStatus" value={formData.readStatus} onChange={handleChange}>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label htmlFor="language">Language:</label></td>
            <td>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="theme">Theme:</label></td>
            <td>
              <input
                type="text"
                name="theme"
                value={formData.theme}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={{ textAlign: 'center' }}>
              <button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Book'}
              </button>
            </td>
          </tr>
          {error && (
            <tr>
              <td colSpan="2" style={{ color: 'red', textAlign: 'center' }}>{error}</td>
            </tr>
          )}
          {success && (
            <tr>
              <td colSpan="2" style={{ color: 'green', textAlign: 'center' }}>{success}</td>
            </tr>
          )}
        </tbody>
      </table>
    </form>
  );
}

export default AddBookForm;
