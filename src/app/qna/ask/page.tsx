/**
 * /qna/ask/page.tsx — server component
 *
 * To handle the submission server-side, create a route handler at:
 *   /app/api/qna/ask/route.ts
 * and call it from AskForm's handleSubmit with:
 *   await fetch('/api/qna/ask', { method: 'POST', body: JSON.stringify(form) })
 */

import AskHero            from "@/components/Qna/Ask/AskHero";
import AskForm            from "@/components/Qna/Ask/AskForm";
import AskGuidelines      from "@/components/Qna/Ask/AskGuidelines";
import AskGuidelinesMobile from "@/components/Qna/Ask/AskGuidelinesMobile";

export default function AskPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      {/* Header — matches QnA list page style */}
      <AskHero />

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <div className="flex items-start gap-10">

          {/* ── Left: form ────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Collapsible guidelines on mobile */}
            <AskGuidelinesMobile />

            <AskForm />
          </div>

          {/* ── Right: guidelines sidebar (desktop) ───────────────────── */}
          <AskGuidelines />
        </div>
      </div>
    </main>
  );
}