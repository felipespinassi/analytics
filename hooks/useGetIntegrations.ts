import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useGetIntegrations(marketplace: string) {
  const { data, isLoading, mutate } = useSWR(
    `https://api.expedy.com.br/mobile/integracoes?marketplace=${marketplace}`,
    fetcher,
  );

  return {
    data,
    isLoading,
    mutate,
  };
}
