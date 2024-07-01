import React, { useState, useEffect } from 'react';
import '../styles/form.css';

const NoteForm = ({ onSave, noteToEdit, categories }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setSelectedCategories(noteToEdit.categories ? noteToEdit.categories.map((category) => category.id) : []);
    }
  }, [noteToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    const note = {
      title,
      content,
      categories: selectedCategories.map(id => ({ id })),
    };

    await onSave(note, noteToEdit?.id);

    setTitle('');
    setContent('');
    setSelectedCategories([]);
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className="category-select">
        <label>Select Categories:</label>
        {categories.map((category) => (
          <div key={category.id}>
            <input
              type="checkbox"
              id={category.id}
              value={category.id}
              checked={selectedCategories.includes(category.id)}
              onChange={handleCategoryChange}
            />
            <label htmlFor={category.id}>{category.name}</label>
          </div>
        ))}
      </div>
      <button type="submit">{noteToEdit ? 'Update Note' : 'Save Note'}</button>
    </form>
  );
};

export default NoteForm;
