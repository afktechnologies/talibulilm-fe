import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { qnaApi } from "../api/endpoints/qna";

export const useQnaData = (options = {}) => {
  return useQuery({
    queryKey: ["qna-data"],
    queryFn: () => qnaApi.getQnaData(),
    select: (response) => response,
    ...options,
  });
};

export const useAskQuestion = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (formData: any) => qnaApi.askQuestion(formData),
    onSuccess: () => {
      // Optionally invalidate queries
      queryClient.invalidateQueries({ queryKey: ["qna-data"] });
    },
  });
};