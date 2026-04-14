import CardGeneric from "@/components/CardGeneric/CardGeneric";
import { Box } from "@/components/RestyleComponents/RestyleComponents";
import theme from "@/constants/theme";
import { useGetDailyOrdersRevenue } from "@/hooks/useGetDailyOrdersRevenue";
import { useGetOrdersRevenue } from "@/hooks/useGetOrdersRevenue";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDecimal } from "@/utils/formatDecimal";
import dayjs from "dayjs";
import { Ban, BanknoteX, DollarSign, ShoppingBag } from "lucide-react-native";
import React from "react";

export default function Cards({
  rangeSelected,
  params,
}: {
  rangeSelected: { label: string; from: string; to: string };
  params: { marketplace: string };
}) {
  const { revenue, isLoading } = useGetOrdersRevenue({
    dataInicial: dayjs(rangeSelected.from).format("YYYY-MM-DD"),
    dataFinal: dayjs(rangeSelected.to).format("YYYY-MM-DD"),
    marketplace: params.marketplace as string,
  });

  const { data: dailyRevenue } = useGetDailyOrdersRevenue({
    marketplace: params.marketplace as string,
  });

  return (
    <Box gap="m">
      <Box flexDirection="row" gap="m">
        <CardGeneric
          loading={isLoading}
          icon={<ShoppingBag size={14} color={theme.colors.primary} />}
          label="PEDIDOS"
          value={formatDecimal(
            rangeSelected.label === "Hoje"
              ? dailyRevenue?.quantidadePedidos || 0
              : revenue?.companies?.[0]?.quantidadePedidos || 0,
          )}
        />
        <CardGeneric
          loading={isLoading}
          icon={<Ban size={14} color={theme.colors.primary} />}
          label="PEDIDOS CANCELADOS"
          value={formatDecimal(
            rangeSelected.label === "Hoje"
              ? dailyRevenue?.quantidadeCancelados || 0
              : revenue?.companies?.[0]?.quantidadeCancelados || 0,
          )}
        />
      </Box>

      <Box flexDirection="row" gap="m">
        <CardGeneric
          loading={isLoading}
          icon={<DollarSign size={14} color={theme.colors.primary} />}
          label="FATURAMENTO"
          value={formatCurrency(
            rangeSelected.label === "Hoje"
              ? dailyRevenue?.totalFaturamento || 0
              : revenue?.companies?.[0]?.totalFaturamento || 0,
          )}
        />
        <CardGeneric
          loading={isLoading}
          icon={<BanknoteX size={14} color={theme.colors.primary} />}
          label="FATURAMENTO CANCELADO"
          value={formatCurrency(
            rangeSelected.label === "Hoje"
              ? dailyRevenue?.totalCancelado || 0
              : revenue?.companies?.[0]?.totalCancelado || 0,
          )}
        />
      </Box>
    </Box>
  );
}
