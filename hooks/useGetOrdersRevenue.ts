import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useGetOrdersRevenue() {
  const { data, isLoading, error } = useSWR(
    "https://api.expedy.com.br/v2/api/reports/daily-orders?dataInicial=2026-02-01&dataFinal=2026-03-01&tipo=geral",
    fetcher,
  );

  return {
    data,
    isLoading,
    error,
  };
}
