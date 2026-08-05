import type { Metadata } from "next";
import Link from "next/link";
import { primary_font } from "@/app/font/font";
import RegisterForm from "@/components/common/Auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create account — Talibulilm",
};

export default function RegisterPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-16 max-md:py-10">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-8 max-md:p-6 animate-[fadeSlideUp_0.5s_ease_both]">
        <h1 className={`${primary_font.className} text-2xl font-bold text-[#003049] mb-1`}>
          Create your account
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Join Talibulilm to save your progress and bookmarks.
        </p>

        <RegisterForm />

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-[#003049] font-semibold hover:text-[#c69e30] transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
