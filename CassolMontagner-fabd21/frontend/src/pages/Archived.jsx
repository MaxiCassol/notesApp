import React, { useState, useEffect } from 'react';
import NoteList from '../components/NoteList';
import { getArchivedNotes, unarchiveNote, deleteNote } from '../services/noteService';
import '../styles/archived.css';

const Archived = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadArchivedNotes();
  }, []);

  const loadArchivedNotes = async () => {
    const data = await getArchivedNotes();
    setNotes(data);
  };

  const handleUnarchive = async (id) => {
    await unarchiveNote(id);
    loadArchivedNotes();
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    loadArchivedNotes();
  };

  return (
    <div className="container">
      <nav className="navbar">
        <h1>Archived Notes</h1>
      </nav>
      <div className="main-content">
        <NoteList notes={notes} 
        onUnarchive={handleUnarchive}         
        onDelete={handleDelete} />
      </div>      
    </div>
  );
};

export default Archived;
