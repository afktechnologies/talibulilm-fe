"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/services/hooks/auth";
import type { LoginPayload } from "@/types/auth";
import { Field } from "./Field";
import { SubmitButton } from "./SubmitButton";
import { inputCls } from "./authFormStyles";

type FormErrors = Partial<Record<keyof LoginPayload, string>>;

export default function LoginForm() {
  const router = useRouter();
  const login = useLogin();

  const [form, setForm] = useState<LoginPayload>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const set = (field: keyof LoginPayload, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const clearError = (field: keyof LoginPayload) =>
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });

  function validate(): boolean {
    const e: FormErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.password) e.password = "Password is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!validate()) return;

    try {
      await login.mutateAsync(form);
      router.push("/");
      router.refresh();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Invalid credentials");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {formError && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-md px-3 py-2.5">
          {formError}
        </div>
      )}

      <Field label="Email address" error={errors.email}>
        <input
          type="email"
          value={form.email}
          onChange={(e) => {
            set("email", e.target.value);
            clearError("email");
          }}
          placeholder="you@example.com"
          className={inputCls(!!errors.email)}
        />
      </Field>

      <Field label="Password" error={errors.password}>
        <input
          type="password"
          value={form.password}
          onChange={(e) => {
            set("password", e.target.value);
            clearError("password");
          }}
          placeholder="Your password"
          className={inputCls(!!errors.password)}
        />
      </Field>

      <SubmitButton loading={login.isPending} loadingLabel="Signing in…">
        Sign in
      </SubmitButton>
    </form>
  );
}
