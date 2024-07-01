import React from 'react';
import Note from './Note';
import '../styles/noteList.css';

const NoteList = ({ notes, onArchive, onUnarchive, onDelete, onEdit }) => {
  if (!notes.length) {
    return <p>No notes available</p>;
  }

  return (
    <ul className="note-list">
      {notes.map(note => (
        <li key={note.id} className="note-item">
          <Note
            note={note}
            onEdit={onEdit}
            onArchive={onArchive}
            onUnarchive={onUnarchive}
            onDelete={onDelete}            
          />
        </li>
      ))}
    </ul>
  );
};

export default NoteList;



