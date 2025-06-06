
import React from 'react';
import { Link } from 'react-router-dom';
import SVGComponent from '../svgfolder/Search1svg';

const Navbar = () => (
  <nav style={{ padding: '1rem', background: '#f4f4f4', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
    <Link to="/" style={{ marginRight: '1rem' }}>View Books</Link>
    <Link to="/add" style={{ marginRight: '1rem' }}>Add Book</Link>
    <Link to="/search"> <SVGComponent></SVGComponent> Search Book</Link>
  </nav>
);

export default Navbar;
