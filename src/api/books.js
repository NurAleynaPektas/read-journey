import { api } from "./client";

export async function getRecommendedBooks({
  page = 1,
  limit = 8,
  title = "",
  author = "",
}) {
  const params = { page, limit };
  if (title?.trim()) params.title = title.trim();
  if (author?.trim()) params.author = author.trim();

  const { data } = await api.get("/books/recommend", { params });
  return data;
}
