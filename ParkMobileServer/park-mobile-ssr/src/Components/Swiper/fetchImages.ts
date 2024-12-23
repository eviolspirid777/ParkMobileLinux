"use server";

import { apiClient } from "@/api/ApiClient";

export async function fetchImages() {
  "use cache";
  try {
    const data = await apiClient.GetSliderData();
    return data.map(el => el.imageData);
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}