import { apiClient } from "../client";

export interface SupplicationCategory {
  slug: string;
  title: string;
  arabicTitle: string;
  description: string;
  backgroundImage: string;
  duas: any[]; // DuaEntry[]
}

export const supplicationApi = {
  getCategories: () => 
    apiClient.get("supplications/categories").json<{data: any[]}>(),
  
  getSupplicationBySlug: (slug: string) => 
    apiClient.get(`supplications/${slug}`).json<{data: SupplicationCategory}>(),
  
  // If no backend yet, can add more
};