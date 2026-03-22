import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useGetOrdersStatus({
  marketplace,
  integracao,
  dataInicial,
  dataFinal,
}: {
  marketplace?: string;
  integracao?: string;
  dataInicial: string;
  dataFinal: string;
}) {
  const { data, isLoading } = useSWR(
    marketplace
      ? `https://api.expedy.com.br/mobile/status?tipo=marketplace&marketplace=${marketplace}&dataInicial=${dataInicial}&dataFinal=${dataFinal}`
      : integracao
        ? `https://api.expedy.com.br/mobile/status?tipo=integracao&integracao=${integracao}&dataInicial=${dataInicial}&dataFinal=${dataFinal}`
        : `https://api.expedy.com.br/mobile/status?tipo=geral&dataInicial=${dataInicial}&dataFinal=${dataFinal}`,
    fetcher,
  );

  return {
    data,
    isLoading,
  };
}
