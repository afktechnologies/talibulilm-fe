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

// import QnaHero   from "@/components/Qna/QnaHero";
// import QnaClient from "@/components/Qna/QnaClient";
// import type { QnaEntry } from "@/components/Qna/QnaCard";

// type QnaPageData = {
//   categories       : { id: string; label: string }[];
//   questions        : QnaEntry[];
//   popularQuestions : { id: number; number: string; question: string; views: number }[];
// };

// export default async function QnaPage() {
//   let data: QnaPageData;
//   try {
//     const res = await fetch(`https://api.talibulilm.in/qna`, {
//       next: { revalidate: 3600 },
//     });
//     const apiData = await res.json();
//     data = apiData.data || apiData;
//   } catch (error) {
//     // Fallback to static
//     const rawData = await import("@/store/data/qnaData.json");
//     data = rawData.default as QnaPageData;
//     console.warn("Using static QnA data");
//   }

  
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