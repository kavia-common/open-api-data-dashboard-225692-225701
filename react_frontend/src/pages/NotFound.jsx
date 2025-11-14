import React from 'react';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', paddingTop: 40 }}>
      <h2>404 - Not Found</h2>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link to="/"><Button>Go Home</Button></Link>
    </div>
  );
}
