"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  "Select a category",
  "Fiqh & Worship",
  "Aqeedah",
  "Quran",
  "Hadith",
  "Family & Marriage",
  "Character & Morals",
  "Islamic History",
  "Other",
];

const COUNTRIES = [
  "India", "Pakistan", "Bangladesh", "United Kingdom", "United States",
  "Canada", "Australia", "Saudi Arabia", "UAE", "Malaysia",
  "Indonesia", "South Africa", "Nigeria", "Egypt", "Other",
];

type FormData = {
  name        : string;
  email       : string;
  gender      : string;
  country     : string;
  category    : string;
  title       : string;
  detail      : string;
  agreeToTerms: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const TITLE_MAX  = 120;
const DETAIL_MIN = 80;
const DETAIL_MAX = 1500;

// ─── Success screen ───────────────────────────────────────────────────────────
const SuccessScreen = ({ title }: { title: string }) => (
  <div className="bg-white border border-gray-200 rounded-lg px-6 py-12 text-center">
    <div className="w-10 h-10 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-5">
      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h2 className="text-lg font-bold text-[#003049] mb-2">Question submitted</h2>
    <p className="text-sm text-gray-500 mb-1 max-w-sm mx-auto leading-relaxed">
      Your question has been received and will be reviewed by our team.
    </p>
    <p className="text-xs text-gray-400 italic mb-8 max-w-sm mx-auto">
      &ldquo;{title}&rdquo;
    </p>
    <div className="flex items-center justify-center gap-3">
      <Link
        href="/qna"
        className="text-xs font-semibold text-white bg-[#003049] hover:bg-[#004a6e] px-4 py-2 rounded-md transition-colors"
      >
        Back to Q&amp;A
      </Link>
      <button
        onClick={() => window.location.reload()}
        className="text-xs font-semibold text-gray-600 hover:text-[#003049] border border-gray-200 hover:border-gray-300 px-4 py-2 rounded-md transition-colors"
      >
        Submit another
      </button>
    </div>
  </div>
);

// ─── Field wrapper ─────────────────────────────────────────────────────────────
const Field = ({
  label,
  required,
  hint,
  error,
  children,
}: {
  label   : string;
  required?: boolean;
  hint?   : string;
  error?  : string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="flex items-baseline justify-between mb-1.5">
      <label className="text-xs font-semibold text-gray-600">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {hint && <span className="text-[10px] text-gray-400">{hint}</span>}
    </div>
    {children}
    {error && (
      <p className="mt-1.5 text-[11px] text-red-500 flex items-center gap-1">
        <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {error}
      </p>
    )}
  </div>
);

// ─── Shared input class ───────────────────────────────────────────────────────
const inputCls = (hasError?: boolean) =>
  `w-full text-sm text-gray-800 bg-white border rounded-md px-3 py-2.5 outline-none placeholder-gray-400 transition-colors duration-150 ${
    hasError
      ? "border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-100"
      : "border-gray-200 hover:border-gray-300 focus:border-[#003049] focus:ring-1 focus:ring-[#003049]/10"
  }`;

// ─── Main form ────────────────────────────────────────────────────────────────
const AskForm = () => {
  const [form, setForm] = useState<FormData>({
    name        : "",
    email       : "",
    gender      : "",
    country     : "",
    category    : "",
    title       : "",
    detail      : "",
    agreeToTerms: false,
  });
  const [errors,    setErrors]    = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const set = (field: keyof FormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const clearError = (field: keyof FormData) =>
    setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const e: FormErrors = {};

    if (!form.category || form.category === "Select a category")
      e.category = "Please select a category.";

    if (!form.title.trim())
      e.title = "Question title is required.";
    else if (form.title.trim().length < 10)
      e.title = "Title must be at least 10 characters.";

    if (!form.detail.trim())
      e.detail = "Please provide details for your question.";
    else if (form.detail.trim().length < DETAIL_MIN)
      e.detail = `Please write at least ${DETAIL_MIN} characters (currently ${form.detail.trim().length}).`;

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";

    if (!form.agreeToTerms)
      e.agreeToTerms = "You must agree to the submission guidelines.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Replace with your API call:
    // await fetch('/api/qna/ask', { method: 'POST', body: JSON.stringify(form) })
    await new Promise((r) => setTimeout(r, 1200)); // simulate network
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) return <SuccessScreen title={form.title} />;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">

      {/* ── Section: About you ────────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
        <div className="px-5 py-4">
          <h2 className="text-sm font-bold text-[#003049]">About You</h2>
          <p className="text-xs text-gray-400 mt-0.5">All fields in this section are optional.</p>
        </div>

        <div className="px-5 py-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <Field label="Name">
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Abdullah, Fatima (or leave blank)"
              className={inputCls()}
            />
          </Field>

          {/* Email */}
          <Field label="Email address" error={errors.email}
            hint="We'll notify you when answered">
            <input
              type="email"
              value={form.email}
              onChange={(e) => { set("email", e.target.value); clearError("email"); }}
              placeholder="you@example.com"
              className={inputCls(!!errors.email)}
            />
          </Field>

          {/* Gender */}
          <Field label="Gender"
            hint="Affects some rulings">
            <select
              value={form.gender}
              onChange={(e) => set("gender", e.target.value)}
              className={inputCls()}
            >
              <option value="">Prefer not to say</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </Field>

          {/* Country */}
          <Field label="Country / Region"
            hint="For context-specific answers">
            <select
              value={form.country}
              onChange={(e) => set("country", e.target.value)}
              className={inputCls()}
            >
              <option value="">Select country</option>
              {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
        </div>
      </div>

      {/* ── Section: Your question ─────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
        <div className="px-5 py-4">
          <h2 className="text-sm font-bold text-[#003049]">Your Question</h2>
          <p className="text-xs text-gray-400 mt-0.5">Write clearly and include all relevant context.</p>
        </div>

        <div className="px-5 py-5 space-y-5">
          {/* Category */}
          <Field label="Category" required error={errors.category}>
            <select
              value={form.category}
              onChange={(e) => { set("category", e.target.value); clearError("category"); }}
              className={inputCls(!!errors.category)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} disabled={c === "Select a category"} value={c === "Select a category" ? "" : c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>

          {/* Title */}
          <Field
            label="Question title"
            required
            error={errors.title}
            hint={`${form.title.length} / ${TITLE_MAX}`}
          >
            <input
              type="text"
              value={form.title}
              maxLength={TITLE_MAX}
              onChange={(e) => { set("title", e.target.value); clearError("title"); }}
              placeholder="e.g. Is it permissible to combine prayers when travelling?"
              className={inputCls(!!errors.title)}
            />
          </Field>

          {/* Detail */}
          <Field
            label="Full question"
            required
            error={errors.detail}
            hint={`${form.detail.length} / ${DETAIL_MAX}`}
          >
            <textarea
              value={form.detail}
              maxLength={DETAIL_MAX}
              rows={7}
              onChange={(e) => { set("detail", e.target.value); clearError("detail"); }}
              placeholder={`Describe your question in full. Include any relevant background — e.g. your situation, madhab, previous actions taken — so it can be answered accurately.\n\nMinimum ${DETAIL_MIN} characters.`}
              className={`${inputCls(!!errors.detail)} resize-y min-h-[160px]`}
            />
            {/* Character progress bar */}
            <div className="mt-1.5 h-0.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min((form.detail.length / DETAIL_MAX) * 100, 100)}%`,
                  backgroundColor:
                    form.detail.length < DETAIL_MIN ? "#e5e7eb"
                    : form.detail.length > DETAIL_MAX * 0.9 ? "#f59e0b"
                    : "#003049",
                }}
              />
            </div>
          </Field>
        </div>
      </div>

      {/* ── Agreement & submit ─────────────────────────────────────────── */}
      <div className="space-y-4">
        {/* Checkbox */}
        <label className={`flex items-start gap-3 cursor-pointer group ${errors.agreeToTerms ? "opacity-100" : ""}`}>
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              type="checkbox"
              checked={form.agreeToTerms}
              onChange={(e) => { set("agreeToTerms", e.target.checked); clearError("agreeToTerms"); }}
              className="sr-only"
            />
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors duration-150 ${
              form.agreeToTerms
                ? "bg-[#003049] border-[#003049]"
                : errors.agreeToTerms
                ? "border-red-400 bg-white"
                : "border-gray-300 bg-white group-hover:border-gray-400"
            }`}>
              {form.agreeToTerms && (
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-xs text-gray-500 leading-relaxed">
            I have read the{" "}
            <span className="text-[#003049] font-medium">submission guidelines</span>,
            confirm that I have searched the existing archive, and understand that a
            response is not guaranteed.
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="text-[11px] text-red-500 flex items-center gap-1 -mt-2">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.agreeToTerms}
          </p>
        )}

        {/* Submit row */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-[#003049] hover:bg-[#004a6e] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-md transition-colors duration-200"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                </svg>
                Submitting…
              </>
            ) : (
              "Submit question"
            )}
          </button>

          <Link
            href="/qna"
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
};

export default AskForm;