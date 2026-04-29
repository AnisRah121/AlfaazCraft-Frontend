import axios from "axios";

const API = "https://alfaazcraft-backend.onrender.com/api/posts";

export const getPosts = () => axios.get(API);
export const getPost = (id) => axios.get(`${API}/${id}`);
export const createPost = (data) => axios.post(API, data);
export const updatePost = (id, data) => axios.put(`${API}/${id}`, data);
export const deletePost = (id) => axios.delete(`${API}/${id}`);
