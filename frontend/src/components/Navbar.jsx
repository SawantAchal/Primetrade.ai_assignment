import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ activeView, searchQuery, setSearchQuery, toggleSidebar }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <nav  className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-4 sm:px-6 z-50">
        <button  className="md:hidden mr-4 text-2xl text-gray-700 hover:text-gray-900 focus:outline-none" onClick={toggleSidebar}>☰</button>
        <h1 className="font-semibold text-lg text-gray-800 flex-1"> Dashboard </h1>
        {activeView === 'view' && (
          <input type="text" placeholder="Search notes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className=" hidden sm:block border border-gray-300 px-4 py-1.5 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 mr-4" />
        )}
        <button onClick={handleLogout} className="text-red-600 font-medium hover:underline"> Logout</button>
      </nav>
    </>
  );
};

export default Navbar;
