import { DateRangeContext } from "@/context/DateRangeContext";
import { fetcher } from "@/utils/fetcher";
import dayjs from "dayjs";
import { useContext } from "react";
import useSWR from "swr";

export function useGetOrdersPickup() {
  const { rangeSelected } = useContext(DateRangeContext);

  const dataInicio = dayjs(rangeSelected.from).format("YYYY-MM-DD");
  const dataFinal = dayjs(rangeSelected.to).format("YYYY-MM-DD");
  const { data, isLoading } = useSWR(
    `https://api.expedy.com.br/expedycao/coleta/orders?dataInicio=${dataInicio}&dataFinal=${dataFinal}`,
    fetcher,
  );

  return {
    data,
    isLoading,
  };
}
