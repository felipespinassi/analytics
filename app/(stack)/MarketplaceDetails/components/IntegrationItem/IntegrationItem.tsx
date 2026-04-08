import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { TouchableOpacityBox } from "@/components/TouchableOpacityBox/TouchableOpacityBox";
import { marketplaces } from "@/constants/marketplaces";
import theme from "@/constants/theme";
import { useGetDailyOrdersRevenue } from "@/hooks/useGetDailyOrdersRevenue";
import { useGetOrdersRevenue } from "@/hooks/useGetOrdersRevenue";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDecimal } from "@/utils/formatDecimal";
import dayjs from "dayjs";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import { Image } from "react-native";

export default function IntegrationItem({
  integracao,
  marketplace,
  rangeSelected,
}: {
  integracao: any;
  marketplace: string;
  rangeSelected: {
    from: string;
    to: string;
    label: string;
  };
}) {
  const { revenue } = useGetOrdersRevenue({
    dataInicial: dayjs(rangeSelected.from).format("YYYY-MM-DD"),
    dataFinal: dayjs(rangeSelected.to).format("YYYY-MM-DD"),
    integracao: integracao.id as string,
  });

  const { data: dailyRevenue } = useGetDailyOrdersRevenue({
    integracao: integracao.id as string,
  });

  return (
    <TouchableOpacityBox
      onPress={() =>
        router.push({
          pathname: "/(stack)/IntegrationDetails/IntegrationDetails",
          params: {
            integracao: JSON.stringify(integracao),
            rangeSelected: JSON.stringify(rangeSelected),
          },
        })
      }
      gap="m"
      flex={1}
      borderRadius="m"
      padding="m"
      marginTop="s"
      flexDirection="row"
      bg="card"
    >
      <Box bg="container" borderRadius="s" padding="s" justifyContent="center">
        <Image
          resizeMode="contain"
          source={marketplaces?.[marketplace as keyof typeof marketplaces].logo}
          style={{ width: 50, height: 20 }}
        />
      </Box>

      <Box flex={1}>
        <Text fontSize={14}>{integracao?.nome}</Text>
      </Box>

      <Box justifyContent="center" gap="xs" alignItems="flex-end">
        <Text fontWeight={"bold"} fontSize={12}>
          {formatCurrency(
            rangeSelected.label === "Hoje"
              ? dailyRevenue?.totalFaturamento || 0
              : revenue?.companies?.[0]?.totalFaturamento || 0,
          )}
        </Text>
        <Text fontSize={10} color="mutedForeground">
          {formatDecimal(
            rangeSelected.label === "Hoje"
              ? dailyRevenue?.quantidadePedidos || 0
              : revenue?.companies?.[0]?.quantidadePedidos || 0,
          )}{" "}
          Pedidos
        </Text>
      </Box>
      <Box justifyContent="center">
        <ChevronRight size={18} color={theme.colors.mutedForeground} />
      </Box>
    </TouchableOpacityBox>
  );
}
