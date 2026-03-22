import { fetcher } from "@/utils/fetcher";
import dayjs from "dayjs";
import useSWR from "swr";

export function useGetOrdersStatus({
  marketplace,
  integracao,
}: {
  marketplace?: string;
  integracao?: string;
}) {
  const dataInicial = dayjs().startOf("day").format("YYYY-MM-DDTHH:MM:ss");
  const dataFinal = dayjs().endOf("day").format("YYYY-MM-DDTHH:MM:ss");

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
