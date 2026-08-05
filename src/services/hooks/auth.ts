import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/endpoints/auth";
import type { LoginPayload, RegisterPayload } from "@/types/auth";

export const useLogin = () =>
  useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
  });

export const useRegister = () =>
  useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
  });

export const useLogout = () =>
  useMutation({
    mutationFn: () => authApi.logout(),
  });
