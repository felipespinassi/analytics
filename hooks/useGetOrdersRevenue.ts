import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useGetOrdersRevenue({
  dataInicial,
  dataFinal,
}: {
  dataInicial: string;
  dataFinal: string;
}) {
  const { data, isLoading, error } = useSWR(
    `https://api.expedy.com.br/v2/api/reports/daily-orders?dataInicial=${dataInicial}&dataFinal=${dataFinal}&tipo=geral`,
    fetcher,
  );

  return {
    revenue: data,
    isLoading,
    error,
  };
}
