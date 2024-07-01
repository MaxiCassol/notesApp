import axios from 'axios';

const API_URL = 'http://localhost:3000/notes';

export const getNotes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getArchivedNotes = async () => {
  const response = await axios.get(`${API_URL}/archived`);
  return response.data;
};

export const createNote = async (note) => {
  const response = await axios.post(API_URL, note);
  return response.data;
};

export const updateNote = async (id, note) => {
  const response = await axios.patch(`${API_URL}/${id}`, note);
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const archiveNote = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/archive`);
  return response.data;
};

export const unarchiveNote = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/unarchive`);
  return response.data;
};

export const addCategoryToNote = async (noteId, categoryId) => {
  const response = await axios.post(`${API_URL}/${noteId}/categories/${categoryId}`);
  return response.data;
};

export const removeCategoryFromNote = async (noteId, categoryId) => {
  const response = await axios.delete(`${API_URL}/${noteId}/categories/${categoryId}`);
  return response.data;
};

export const filterNotesByCategory = async (categoryName) => {
  const response = await axios.get(`${API_URL}/category/${categoryName}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(`http://localhost:3000/categories`);
  return response.data;
};