import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useGetOrdersRevenue({
  dataInicial,
  dataFinal,
  marketplace,
}: {
  dataInicial: string;
  dataFinal: string;
  marketplace?: string;
}) {
  const { data, isLoading, error } = useSWR(
    marketplace
      ? `https://api.expedy.com.br/v2/api/reports/daily-orders?dataInicial=${dataInicial}&dataFinal=${dataFinal}&tipo=marketplace&marketplace=${marketplace}`
      : `https://api.expedy.com.br/v2/api/reports/daily-orders?dataInicial=${dataInicial}&dataFinal=${dataFinal}&tipo=geral`,
    fetcher,
  );

  return {
    revenue: data,
    isLoading,
    error,
  };
}
