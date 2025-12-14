import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import NoteForm from '../components/NoteForm';
import axios from 'axios';

const Dashboard = () => {
    const [activeView, setActiveView] = useState('add');
    const [notes, setNotes] = useState([]); 
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/note',{headers: {Authorization: `Bearer ${token}`,},});
      setNotes(res.data);
      console.log("response",res.data)
    } catch (error) {
      console.error('Error fetching notes');
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/note/${noteId}`,{headers: {Authorization: `Bearer ${token}`,},});
      setNotes((prev) => prev.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error('Delete note error');
    }
  };

  const handleAddNote = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
    setActiveView('view');
  };

  useEffect(() => {
    fetchNotes([]);
  }, []);

  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} activeView={activeView} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>
      <div className="flex flex-row mt-24 h-[calc(100vh-6rem)] overflow-hidden">
        <Sidebar activeView={activeView} setActiveView={setActiveView} isSidebarOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
        <div  className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50 overflow-y-auto">
          {activeView === 'add' && (
            <NoteForm onAddNote={handleAddNote} />
          )}
          {activeView === 'view' && (
            <div>
              <h2 className='font-bold text-3xl mb-1'>Notes</h2>
              {notes.length === 0 ? (
                <p>No notes available</p>
                ) : (
                  notes.filter(note =>note.title.toLowerCase().includes(searchQuery.toLowerCase())).map((note, index) => (
                    <div key={index} className='bg-white border border-gray-200 rounded-xl p-4 sm:p-5 mb-4 shadow-sm hover:shadow-md transition-shadow'>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 wrap-break-word">{note.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed wrap-break-word">{note.content}</p>
                      <button onClick={() => handleDeleteNote(note._id)} className="mt-2 text-red-600 text-sm font-medium hover:text-red-600  hover:underline focus:outline-none focus:ring-2 focus:ring-red-200 rounded">
                          Delete
                        </button>
                    </div>
                  ))
                )}
                    </div>
                )}
            </div>
        </div>
    </>
  );
};

export default Dashboard;
