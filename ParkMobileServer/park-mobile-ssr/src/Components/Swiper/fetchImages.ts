"use server";

import { apiClient } from "@/api/ApiClient";

export async function fetchImages(screenWidth: number) {
  try {
    const data = screenWidth > 1024 ? await apiClient.GetSliderData() : await apiClient.GetMobileSliderData();
    return data.map(el => el.imageData);
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}