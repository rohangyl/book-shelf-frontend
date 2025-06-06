import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import SVGComponent from '../svgfolder/Search';

const LiveSearchTable = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const debouncedSearchRef = useRef();

  useEffect(() => {
    debouncedSearchRef.current = debounce(async (searchTerm) => {
      if (!searchTerm) {
        setResults([]);
        setNoResults(false);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/books/search?q=${searchTerm}`);
        setResults(res.data);
        setNoResults(res.data.length === 0);
      } catch (err) {
        console.error(err);
        setResults([]);
        setNoResults(true);
      }
      setLoading(false);
    }, 300);

    return () => {
      debouncedSearchRef.current.cancel();
    };
  }, []);

  useEffect(() => {
    debouncedSearchRef.current(query);
  }, [query]);
  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto' }}>
      <h2><SVGComponent></SVGComponent> Search Book</h2>
      <input
        type="text"
        placeholder="Type to search by title or author..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', marginBottom: '1rem' }}
      />

      {loading && <p>🔄 Searching...</p>}
      {noResults && !loading && <p style={{ color: 'red' }}>❌ No results found</p>}

      {results.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Author</th>
              <th style={thStyle}>Genre</th>
              <th style={thStyle}>Year</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Language</th>
              <th style={thStyle}>Theme</th>
              <th style={thStyle}>Cover</th>
            </tr>
          </thead>
          <tbody>
            {results.map((book) => (
              <tr key={book._id} style={trStyle}>
                <td style={tdStyle}>{book.title}</td>
                <td style={tdStyle}>{book.author}</td>
                <td style={tdStyle}>{book.genre || 'N/A'}</td>
                <td style={tdStyle}>{book.publicationYear || 'N/A'}</td>
                <td style={tdStyle}>{book.readStatus}</td>
                <td style={tdStyle}>{book.language || 'N/A'}</td>
                <td style={tdStyle}>{book.theme || 'N/A'}</td>
                <td style={tdStyle}>
                  {book.coverImage ? (
                    <img
                      src={book.coverImage}
                      alt={`${book.title} cover`}
                      style={{ maxWidth: '80px', maxHeight: '100px' }}
                    />
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  backgroundColor: '#f2f2f2',
  textAlign: 'left',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  verticalAlign: 'top',
};

const trStyle = {
  borderBottom: '1px solid #ddd',
};

export default LiveSearchTable;
