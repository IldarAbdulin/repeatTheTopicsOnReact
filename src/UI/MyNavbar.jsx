import React from 'react';
import { Link } from 'react-router-dom';

export function MyNavbar() {
  return (
    <div className="myNavbar">
      <div className="navbar__links">
        <Link to="/about">О сайте</Link>
        <Link to="/posts">Посты</Link>
      </div>
    </div>
  );
}
