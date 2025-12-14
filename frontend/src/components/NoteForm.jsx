import React, { useState } from 'react';
import axios from 'axios'

const NoteForm = ({ onAddNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/note/add',{ title, content },{headers: {Authorization: `Bearer ${token}`,'Content-Type': 'application/json',},});
      onAddNote(res.data);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding note:',);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow max-w-md">
        <input type="text" placeholder="Title" className="border w-full p-2 mb-3" name='title' value={title} onChange={(e) => setTitle(e.target.value)}/>    
        <input type="text" placeholder="Content" className="border w-full p-2 mb-3" name='content' value={content} onChange={(e) => setContent(e.target.value)}/>  
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Note
        </button>
      </form>
    </>
  );
};

export default NoteForm;
