import React from 'react';
import { Routes, Route, redirect } from 'react-router-dom';
import { MyNavbar } from '../UI/MyNavbar';
import { AboutPage } from '../pages/About';
import { PostsPage } from '../pages/Posts';
import { PostIdPage } from '../pages/PostIdPage';
import { Login } from '../pages/Login';
import { ErrorPage } from '../pages/Error';

export function AppRouter() {
  const isAuth = false;
  return isAuth ? (
    <Routes>
      <Route path="/" element={<MyNavbar />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/posts" element={<PostsPage />} />
      <Route path="/posts/:id" element={<PostIdPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}
