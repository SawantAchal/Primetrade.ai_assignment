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
      <div className='flex mt-24'>
        <Sidebar activeView={activeView} setActiveView={setActiveView} isSidebarOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
        <div className='flex-1 p-4'>
          {activeView === 'add' && (
            <NoteForm onAddNote={handleAddNote} />
          )}
          {activeView === 'view' && (
            <div>
              <h3>Notes</h3>
              {notes.length === 0 ? (
                <p>No notes available</p>
                ) : (
                  notes.filter(note =>note.title.toLowerCase().includes(searchQuery.toLowerCase())).map((note, index) => (
                    <div key={index}>
                    <strong>{note.title}</strong>
                    <p>{note.content}</p>
                    <button onClick={() => handleDeleteNote(note._id)}className="mt-2 text-red-600 text-sm hover:underline">
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
