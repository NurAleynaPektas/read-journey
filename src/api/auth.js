import { api } from "./client";

export async function signUp({ name, email, password }) {
  const { data } = await api.post("/users/signup", { name, email, password });
  return data; 
}

export async function signIn({ email, password }) {
  const { data } = await api.post("/users/signin", { email, password });
  return data;
}

export async function signOut() {
  const { data } = await api.post("/users/signout");
  return data;
}
