import apiClient from "./client";

export async function getProducts() {
  const { data } = await apiClient.get("/products");
  return data;
}

