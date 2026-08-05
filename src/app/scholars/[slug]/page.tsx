import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { scholarApi } from "@/services/api/endpoints/scholar";
import { ScholarStatus, type ScholarList } from "@/types/scholar";
import ScholarDetail from "@/components/Scholars/ScholarDetail";

interface ScholarPageProps {
  params: Promise<{ slug: string }>;
}

async function getPublishedScholar(slug: string): Promise<ScholarList | null> {
  try {
    const response = await scholarApi.getScholarBySlug(slug);
    // `findBySlug` on the backend doesn't filter by status (used by the
    // admin panel too) — enforce "published only" here so a guessed
    // draft/archived slug 404s on the public site instead of leaking.
    if (response.data.status !== ScholarStatus.PUBLISHED) return null;
    return response.data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: ScholarPageProps): Promise<Metadata> {
  const { slug } = await params;
  const scholar = await getPublishedScholar(slug);

  if (!scholar) {
    return { title: "Scholar Not Found | Talibulilm" };
  }

  return {
    title: `${scholar.name} | Talibulilm`,
    description: scholar.biographySummary || `${scholar.name} — ${scholar.title ?? "Islamic scholar"}.`,
  };
}

export default async function ScholarDetailPage({ params }: ScholarPageProps) {
  const { slug } = await params;
  const scholar = await getPublishedScholar(slug);

  if (!scholar) {
    notFound();
  }

  return <ScholarDetail scholar={scholar} />;
}
