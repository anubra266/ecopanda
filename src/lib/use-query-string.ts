import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useQueryString() {
  const searchParams = useSearchParams()!;

  const query = searchParams.get("query") ?? "";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      if (!value) return "";
      const params = new URLSearchParams(searchParams as any);
      params.set(name, value);

      return "?" + params.toString();
    },
    [searchParams]
  );

  return {
    query,
    createQueryString,
  };
}
