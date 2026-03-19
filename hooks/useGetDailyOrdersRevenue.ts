import { fetcher } from "@/utils/fetcher";
import dayjs from "dayjs";
import useSWR from "swr";

export function useGetDailyOrdersRevenue() {
  const dataInicial = dayjs().startOf("day").format("YYYY-MM-DDTHH:MM:ss");
  const dataFinal = dayjs().endOf("day").format("YYYY-MM-DDTHH:MM:ss");

  const { data, isLoading } = useSWR(
    `https://api.expedy.com.br/mobile/faturamento?tipo=geral&dataInicial=${dataInicial}&dataFinal=${dataFinal}`,
    fetcher,
  );

  return {
    data,
    isLoading,
  };
}
