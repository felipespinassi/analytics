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

export default function Cards({ rangeSelected }: any) {
  const { revenue, isLoading } = useGetOrdersRevenue({
    dataInicial: dayjs(rangeSelected.from).format("YYYY-MM-DD"),
    dataFinal: dayjs(rangeSelected.to).format("YYYY-MM-DD"),
  });

  const { data: dailyRevenue } = useGetDailyOrdersRevenue({});

  return (
    <Box gap="s">
      <Box flexDirection="row" gap="s">
        <CardGeneric
          icon={<ShoppingBag size={14} color={theme.colors.primary} />}
          label="PEDIDOS"
          value={formatDecimal(
            rangeSelected.label === "Hoje"
              ? dailyRevenue?.quantidadePedidos || 0
              : revenue?.companies?.[0]?.quantidadePedidos || 0,
          )}
          loading={isLoading}
        />

        <CardGeneric
          icon={<Ban size={14} color={theme.colors.primary} />}
          label="PEDIDOS CANCELADOS"
          value={formatDecimal(
            rangeSelected.label === "Hoje"
              ? dailyRevenue?.quantidadeCancelados || 0
              : revenue?.companies?.[0]?.quantidadeCancelados || 0,
          )}
          loading={isLoading}
        />
      </Box>
      <Box flexDirection="row" gap="s">
        <CardGeneric
          icon={<DollarSign size={14} color={theme.colors.primary} />}
          label="FATURAMENTO"
          value={formatCurrency(
            rangeSelected.label === "Hoje"
              ? dailyRevenue?.totalFaturamento || 0
              : revenue?.companies?.[0]?.totalFaturamento || 0,
          )}
          loading={isLoading}
        />

        <CardGeneric
          icon={<BanknoteX size={14} color={theme.colors.primary} />}
          label="FATURAMENTO CANCELADO"
          value={formatCurrency(
            rangeSelected.label === "Hoje"
              ? dailyRevenue?.companies?.[0]?.totalCancelado || 0
              : revenue?.companies?.[0]?.totalCancelado || 0,
          )}
          loading={isLoading}
        />
      </Box>
    </Box>
  );
}
