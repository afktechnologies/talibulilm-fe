import { useQuery } from "@tanstack/react-query";
import { supplicationApi } from "../api/endpoints/supplication";

export const useSupplicationCategories = (options = {}) => {
  return useQuery({
    queryKey: ["supplication-categories"],
    queryFn: () => supplicationApi.getCategories(),
    select: (response) => response.data,
    ...options,
  });
};

export const useSupplicationBySlug = (slug: string, options = {}) => {
  return useQuery({
    queryKey: ["supplication", slug],
    queryFn: () => supplicationApi.getSupplicationBySlug(slug),
    select: (response) => response.data,
    ...options,
  });
};