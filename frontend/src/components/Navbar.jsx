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
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow flex items-center px-4 z-50">
        <button className="md:hidden mr-4 text-xl" onClick={toggleSidebar}>☰</button>
        <h1 className="font-semibold text-lg flex-1"> Dashboard </h1>
        {activeView === 'view' && (
          <input type="text" placeholder="Search notes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border px-3 py-1 rounded" />
        )}
        <button onClick={handleLogout} className="text-red-600 font-medium hover:underline"> Logout</button>
      </nav>
    </>
  );
};

export default Navbar;
