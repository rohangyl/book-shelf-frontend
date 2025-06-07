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
  const formStyle = {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
    backgroundColor: '#fefefe',
  };
  
  const fieldContainer = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
  };
  
  const buttonStyle = {
    padding: '0.7rem 1.5rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
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
        fetchBooks(); 
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
  <h2 style={{ textAlign: 'center' }}>Add New Book</h2>

  <div style={fieldContainer}>
    <label htmlFor="title">Title:</label>
    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
  </div>

  <div style={fieldContainer}>
    <label htmlFor="author">Author:</label>
    <input type="text" name="author" value={formData.author} onChange={handleChange} required />
  </div>

  <div style={fieldContainer}>
    <label htmlFor="genre">Genre:</label>
    <input type="text" name="genre" value={formData.genre} onChange={handleChange} />
  </div>

  <div style={fieldContainer}>
    <label htmlFor="publicationYear">Publication Year:</label>
    <input type="number" name="publicationYear" value={formData.publicationYear} onChange={handleChange}  min="0"
  style={{
    borderColor: formData.publicationYear < 0 ? 'red' : undefined,
  }} />
  </div>

  <div style={fieldContainer}>
    <label htmlFor="coverImage">Cover Image URL:</label>
    <input type="text" name="coverImage" value={formData.coverImage} onChange={handleChange} />
  </div>

  <div style={fieldContainer}>
    <label htmlFor="readStatus">Read Status:</label>
    <select name="readStatus" value={formData.readStatus} onChange={handleChange}>
      <option value="unread">Unread</option>
      <option value="read">Read</option>
    </select>
  </div>

  <div style={fieldContainer}>
    <label htmlFor="language">Language:</label>
    <input type="text" name="language" value={formData.language} onChange={handleChange} />
  </div>

  <div style={fieldContainer}>
    <label htmlFor="theme">Theme:</label>
    <input type="text" name="theme" value={formData.theme} onChange={handleChange} />
  </div>

  {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
  {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}

  <div style={{ textAlign: 'center', marginTop: '1rem' }}>
    <button type="submit" disabled={loading} style={buttonStyle}>
      {loading ? 'Adding...' : 'Add Book'}
    </button>
  </div>
</form>

  );
}

export default AddBookForm;
