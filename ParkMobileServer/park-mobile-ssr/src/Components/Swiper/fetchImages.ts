"use server";

import { apiClient } from "@/api/ApiClient";

export async function fetchImages() {
  try {
    const data = await apiClient.GetSliderData();
    return data.map(el => el.imageData);
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}