import QnaHero from "@/components/Qna/QnaHero";
import QnaClient from "@/components/Qna/QnaClient";
import type { QnaEntry } from "@/components/Qna/QnaCard";
import { qnaApi } from "@/services/api/endpoints/qna";
import type { QnaList } from "@/types/qna";

// Q&A content is admin-managed and can change at any time; render per-request
// rather than at build time so the page never depends on backend availability
// during the build itself.
export const dynamic = "force-dynamic";

type Category = { id: string; label: string };
type PopularItem = { id: number; number: string; question: string; views: number };

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// The full answer is authored as HTML via the admin panel's rich-text
// editor and rendered as such in QnaCard — but the collapsed-card summary
// is plain text, so any HTML fallen back on here must have its tags
// stripped first or they'd show up literally (e.g. "<p>...</p>").
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function mapQnaEntry(item: QnaList): QnaEntry {
  const answerText = item.answer?.answer ?? "";
  return {
    id: item.id,
    number: `Q${String(item.id).padStart(3, "0")}`,
    category: String(item.categoryId ?? ""),
    categoryLabel: item.category?.name ?? "General",
    question: item.question,
    summary: item.answer?.shortAnswer?.trim() || `${stripHtml(answerText).slice(0, 160).trim()}…`,
    answer: [{ heading: null, text: answerText }],
    references: item.answer?.references ?? [],
    date: formatDate(item.createdAt),
    views: item.viewCount,
  };
}

export default async function QnaPage() {
  const [categoriesRes, qnaRes] = await Promise.all([
    qnaApi.getCategories(),
    qnaApi.getAll(),
  ]);

  const categories: Category[] = [
    { id: "all", label: "All Questions" },
    ...categoriesRes.data.map((c) => ({ id: String(c.id), label: c.name })),
  ];

  const questions: QnaEntry[] = qnaRes.data.map(mapQnaEntry);

  const popularQuestions: PopularItem[] = [...questions]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)
    .map((q) => ({ id: q.id, number: q.number, question: q.question, views: q.views }));

  return (
    <main className="min-h-screen">
      <QnaHero />
      <QnaClient
        categories={categories}
        questions={questions}
        popularQuestions={popularQuestions}
      />
    </main>
  );
}
