import React, { useState, useEffect } from "react";
import NoteList from "../components/NoteList";
import NoteForm from "../components/NoteForm";
import {
  getNotes,
  createNote,
  updateNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
  getCategories,
  filterNotesByCategory,
} from "../services/noteService";
import "../styles/home.css";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const handleSave = async (note, id) => {
    try {
      if (id) {
        await updateNote(id, note);
      } else {
        await createNote(note);
      }
      loadNotes();
      setNoteToEdit(null);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleEdit = (note) => {
    setNoteToEdit(note);
  };

  const handleArchive = async (id) => {
    try {
      await archiveNote(id);
      loadNotes();
    } catch (error) {
      console.error("Error archiving note:", error);
    }
  };

  const handleUnarchive = async (id) => {
    try {
      await unarchiveNote(id);
      loadNotes();
    } catch (error) {
      console.error("Error unarchiving note:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      loadNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleCategoryFilter = async (categoryName) => {
    console.log(notes);
    if (categoryName !== "all") {    
      try{
        const data = await filterNotesByCategory(categoryName);
        setNotes(data);       
    } catch (error) {
      console.error("Error filtering notes by category:", error);
    }}else{
      loadNotes();
    }
  };

  return (
    <div className="container">
      <h1 className="title">Create or Edit a Note</h1>
      <NoteForm
        onSave={handleSave}
        noteToEdit={noteToEdit}
        categories={categories}
      />
      <br></br>
      <h1 className="title">Notes</h1>
      <div className="categoryFilter">
        Filtrar por Categoría: 
        <select onClick={(e) => handleCategoryFilter(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="main-content">
        <NoteList
          notes={notes}
          onArchive={handleArchive}
          onUnarchive={handleUnarchive}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default Home;
