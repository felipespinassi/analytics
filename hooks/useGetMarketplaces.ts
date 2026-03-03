import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useGetMarketplaces() {
  const { data, isLoading, error } = useSWR(
    "https://api.expedy.com.br/mobile/marketplaces",
    fetcher,
  );

  return {
    data,
    isLoading,
    error,
  };
}
