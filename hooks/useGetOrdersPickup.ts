import { fetcher } from "@/utils/fetcher";
import dayjs from "dayjs";
import useSWR from "swr";

export function useGetOrdersPickup() {
  const dataInicio = dayjs()
    .subtract(3, "day")
    .subtract(3, "hour")
    .toISOString();
  const dataFinal = dayjs().toISOString();
  const { data, isLoading } = useSWR(
    `https://api.expedy.com.br/expedycao/coleta/orders?dataInicio=${dataInicio}&dataFinal=${dataFinal}`,
    fetcher,
  );

  return {
    data,
    isLoading,
  };
}
