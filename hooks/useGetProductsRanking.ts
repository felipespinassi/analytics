import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useGetProductsRanking({
  dataInicial,
  dataFinal,
}: {
  dataInicial: string;
  dataFinal: string;
}) {
  const { data, isLoading } = useSWR(
    `https://api.expedy.com.br/v2/api/reports/daily-products/ranking?dataInicial=${dataInicial}&dataFinal=${dataFinal}&tipo=geral&topRank=10&typeRank=quantity&group=true`,
    fetcher,
  );

  return {
    data,
    isLoading,
  };
}
