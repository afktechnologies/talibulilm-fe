import { apiClient } from "../client";

export interface QnaEntry {
  id: number;
  number: string;
  category: string;
  categoryLabel: string;
  question: string;
  summary: string;
  answer: any[];
  references: string[];
  date: string;
  views: number;
}

export const qnaApi = {
  getQnaData: () => 
    apiClient.get("qna").json<{categories: any[], questions: QnaEntry[], popularQuestions: any[]}>(),
  
  askQuestion: (formData: any) => 
    apiClient.post("qna/ask", { json: formData }).json(),
};