import React from 'react';
import '../styles/note.css';

const Note = ({ note, onArchive, onUnarchive, onDelete, onEdit }) => (
  <div className="note">
    <h3 className="note-title">{note.title}</h3>
    <p className="note-content">{note.content}</p>
    <div className="note-categories">
      <strong>Categories:</strong>
      <ul>
        {note.categories.map(category => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
    <div className="note-actions">
      {note.archived ? (
        <>
          <button onClick={() => onUnarchive(note.id)}>Unarchive</button>
          <button onClick={() => onDelete(note.id)}>Delete</button>
        </>
      ) : (
        <>
          <button onClick={() => onEdit(note)}>Edit</button>
          <button onClick={() => onArchive(note.id)}>Archive</button>
          <button onClick={() => onDelete(note.id)}>Delete</button>
        </>
      )}
    </div>
  </div>
);

export default Note;
