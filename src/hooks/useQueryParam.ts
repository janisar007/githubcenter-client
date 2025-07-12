import { useLocation } from "react-router-dom";

export function useQueryParam(param: string): string | null {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  return params.get(param);
}
