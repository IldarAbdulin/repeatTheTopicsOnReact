import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MyNavbar } from '../UI/MyNavbar';
import { AboutPage } from '../pages/About';
import { PostsPage } from '../pages/Posts';
import { PostIdPage } from '../pages/PostIdPage';
import { Login } from '../pages/Login';
import { ErrorPage } from '../pages/Error';
import { AuthContext } from '../context';

export function AppRouter() {
  const { isAuth } = useContext(AuthContext);
  console.log(isAuth);
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
