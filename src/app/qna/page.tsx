/**
 * /qna/page.tsx  — server component
 *
 * To replace static JSON with a live API:
 *   const data = await fetch('/api/qna', { next: { revalidate: 3600 } }).then(r => r.json())
 */

import QnaHero   from "@/components/Qna/QnaHero";
import QnaClient from "@/components/Qna/QnaClient";
import type { QnaEntry } from "@/components/Qna/QnaCard";
import rawData from "@/store/data/qnaData.json";

type QnaPageData = {
  categories       : { id: string; label: string }[];
  questions        : QnaEntry[];
  popularQuestions : { id: number; number: string; question: string; views: number }[];
};

export default function QnaPage() {
  const data = rawData as QnaPageData;

  return (
    <main className="min-h-screen">
      <QnaHero />
      <QnaClient
        categories={data.categories}
        questions={data.questions}
        popularQuestions={data.popularQuestions}
      />
    </main>
  );
}