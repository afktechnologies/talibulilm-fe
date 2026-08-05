"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegister } from "@/services/hooks/auth";
import type { RegisterPayload } from "@/types/auth";
import { Field } from "./Field";
import { SubmitButton } from "./SubmitButton";
import { inputCls } from "./authFormStyles";

type FormErrors = Partial<Record<keyof RegisterPayload, string>>;

const EMPTY_FORM: RegisterPayload = { email: "", password: "", firstName: "", lastName: "" };
const PASSWORD_MIN = 8;

export default function RegisterForm() {
  const router = useRouter();
  const register = useRegister();

  const [form, setForm] = useState<RegisterPayload>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const set = (field: keyof RegisterPayload, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const clearError = (field: keyof RegisterPayload) =>
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (form.password.length < PASSWORD_MIN)
      e.password = `Password must be at least ${PASSWORD_MIN} characters.`;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!validate()) return;

    try {
      await register.mutateAsync({
        ...form,
        lastName: form.lastName?.trim() ? form.lastName : undefined,
      });
      router.push("/");
      router.refresh();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Unable to create your account");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {formError && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-md px-3 py-2.5">
          {formError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="First name" required error={errors.firstName}>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => {
              set("firstName", e.target.value);
              clearError("firstName");
            }}
            placeholder="Abdullah"
            className={inputCls(!!errors.firstName)}
          />
        </Field>

        <Field label="Last name">
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            placeholder="(optional)"
            className={inputCls()}
          />
        </Field>
      </div>

      <Field label="Email address" required error={errors.email}>
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

      <Field
        label="Password"
        required
        error={errors.password}
      >
        <input
          type="password"
          value={form.password}
          onChange={(e) => {
            set("password", e.target.value);
            clearError("password");
          }}
          placeholder={`At least ${PASSWORD_MIN} characters`}
          className={inputCls(!!errors.password)}
        />
      </Field>

      <SubmitButton loading={register.isPending} loadingLabel="Creating account…">
        Create account
      </SubmitButton>
    </form>
  );
}
