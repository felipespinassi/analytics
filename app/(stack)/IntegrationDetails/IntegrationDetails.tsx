import ArrowBack from "@/components/ArrowBack/ArrowBack";
import CardGeneric from "@/components/CardGeneric/CardGeneric";
import Loading from "@/components/Loading/Loading";
import RangeSelect from "@/components/RangeSelect/RangeSelect";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import type { Theme } from "@/constants/theme";
import theme from "@/constants/theme";
import { DateRangeContext } from "@/context/DateRangeContext";
import { useGetDailyOrdersRevenue } from "@/hooks/useGetDailyOrdersRevenue";
import { useGetOrdersRevenue } from "@/hooks/useGetOrdersRevenue";
import { useGetOrdersStatus } from "@/hooks/useGetOrdersStatus";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDecimal } from "@/utils/formatDecimal";
import dayjs from "dayjs";
import { useLocalSearchParams } from "expo-router";
import { Ban, BanknoteX, DollarSign, ShoppingBag } from "lucide-react-native";
import React, { useContext } from "react";
import { ScrollView } from "react-native";

type StatusColor = keyof Theme["colors"];

export default function IntegrationDetails() {
  const params = useLocalSearchParams();
  const integracao = JSON.parse(params.integracao as string);

  const { rangeSelected, setRangeSelected } = useContext(DateRangeContext);

  const { revenue } = useGetOrdersRevenue({
    dataInicial: dayjs(rangeSelected.from).format("YYYY-MM-DD"),
    dataFinal: dayjs(rangeSelected.to).format("YYYY-MM-DD"),
    integracao: integracao.id as string,
  });
  const { data: dailyRevenue } = useGetDailyOrdersRevenue({
    integracao: integracao.id as string,
  });

  const { data: ordersStatus, isLoading: isOrdersStatusLoading } =
    useGetOrdersStatus({
      integracao: integracao.id as string,
      dataInicial: rangeSelected.from,
      dataFinal: rangeSelected.to,
    });
  const statusStyle = {
    pendente: { name: "Pendente", color: "statusPendente" },
    expedir: { name: "Expedir", color: "statusExpedir" },
    emseparacao: { name: "Em Separação", color: "statusEmSeparacao" },
    completo: { name: "Completo", color: "statusCompleto" },
    cancelado: { name: "Cancelado", color: "statusCancelado" },
    aprovado: { name: "Aprovado", color: "statusAprovado" },
  };
  return (
    <Box bg="background" flex={1} padding="m">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box flexDirection="row" alignItems="center" gap="m">
          <ArrowBack />
          <Text marginVertical="m">{integracao.nome}</Text>
        </Box>
        <Box mb="m">
          <RangeSelect
            rangeSelected={rangeSelected}
            setRangeSelected={setRangeSelected}
          />
        </Box>
        <Box gap="m">
          <Box flexDirection="row" gap="m">
            <CardGeneric
              icon={<ShoppingBag size={14} color={theme.colors.primary} />}
              label="PEDIDOS"
              value={formatDecimal(
                rangeSelected.label === "Hoje"
                  ? dailyRevenue?.quantidadePedidos || 0
                  : revenue?.companies?.[0]?.quantidadePedidos || 0,
              )}
            />
            <CardGeneric
              icon={<Ban size={14} color={theme.colors.primary} />}
              label="PEDIDOS CANCELADOS"
              value={formatCurrency(
                rangeSelected.label === "Hoje"
                  ? dailyRevenue?.quantidadeCancelados || 0
                  : revenue?.companies?.[0]?.quantidadeCancelados || 0,
              )}
            />
          </Box>

          <Box flexDirection="row" gap="m">
            <CardGeneric
              icon={<DollarSign size={14} color={theme.colors.primary} />}
              label="FATURAMENTO"
              value={formatCurrency(
                rangeSelected.label === "Hoje"
                  ? dailyRevenue?.totalFaturamento || 0
                  : revenue?.companies?.[0]?.totalFaturamento || 0,
              )}
            />
            <CardGeneric
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

        <Box>
          <Box>
            <Text color="mutedForeground" marginVertical="m">
              Total de pedidos por status
            </Text>
          </Box>

          {isOrdersStatusLoading ? (
            <Loading />
          ) : (
            <Box gap="s">
              {ordersStatus?.pedidos?.map((pedido: any, index: number) => {
                return (
                  <Box
                    backgroundColor="cardBackground"
                    borderRadius="s"
                    flex={1}
                    padding="s"
                    justifyContent="space-between"
                    flexDirection="row"
                    key={index}
                  >
                    <Text
                      color={
                        statusStyle[pedido.status as keyof typeof statusStyle]
                          ?.color as StatusColor
                      }
                    >
                      {statusStyle[pedido.status as keyof typeof statusStyle]
                        ?.name || pedido.status}
                    </Text>
                    <Text
                      color={
                        statusStyle[pedido.status as keyof typeof statusStyle]
                          ?.color as StatusColor
                      }
                    >
                      {pedido.total}
                    </Text>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
}
