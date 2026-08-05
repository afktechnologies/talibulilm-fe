import { useQuery } from "@tanstack/react-query";
import { tafsirApi } from "../api/endpoints/tafsir";

export const useTafsirsByAyahId = (ayahId: string | number | undefined, options = {}) => {
  return useQuery({
    queryKey: ["tafsirs", ayahId],
    queryFn: () => tafsirApi.getTafsirsByAyahId(ayahId!),
    select: (response) => response.data,
    enabled: !!ayahId,
    ...options,
  });
};
