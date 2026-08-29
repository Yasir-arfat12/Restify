import React from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import LowerBar from './LowerBar';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-surface-900">
      <Header />
      <LowerBar />
      <main className="flex-1 page-enter">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
