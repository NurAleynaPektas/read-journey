import { api } from "./client";

export async function getOwnBooks() {
  const { data } = await api.get("/books/own");
  return data;
}

export async function addBook({ title, author, totalPages }) {
  const { data } = await api.post("/books/add", { title, author, totalPages });
  return data;
}

export async function removeBook(id) {
  const { data } = await api.delete(`/books/remove/${id}`);
  return data;
}
