import CardGeneric from "@/components/CardGeneric/CardGeneric";
import Loading from "@/components/Loading/Loading";
import RangeSelect from "@/components/RangeSelect/RangeSelect";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { marketplaces } from "@/constants/marketplaces";
import { useGetDailyOrdersRevenue } from "@/hooks/useGetDailyOrdersRevenue";
import { useGetIntegrations } from "@/hooks/useGetIntegrations";
import { useGetOrdersRevenue } from "@/hooks/useGetOrdersRevenue";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDecimal } from "@/utils/formatDecimal";
import { dateRange } from "@/utils/selectDate";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, ScrollView } from "react-native";
import IntegrationItem from "./components/IntegrationItem/IntegrationItem";

export default function MarketplaceDetails() {
  const params = useLocalSearchParams();
  const [rangeSelected, setRangeSelected] = useState({
    from: dateRange[3].from,
    to: dateRange[3].to,
    label: dateRange[3].label,
  });
  const { data, isLoading: isIntegrationsLoading } = useGetIntegrations(
    params.marketplace as string,
  );
  const { revenue } = useGetOrdersRevenue({
    dataInicial: rangeSelected.from,
    dataFinal: rangeSelected.to,
    marketplace: params.marketplace as string,
  });

  const { data: dailyRevenue } = useGetDailyOrdersRevenue({
    marketplace: params.marketplace as string,
  });

  return (
    <Box bg="background" flex={1} padding="m">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box mb="m">
          <Image
            resizeMode="contain"
            source={
              marketplaces?.[params.marketplace as keyof typeof marketplaces]
                .logo
            }
            style={{ width: 100, height: 30 }}
          />

          <Text fontSize={12}>{data?.integracoes?.length} Lojas</Text>
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
              label="PEDIDOS"
              value={formatDecimal(
                rangeSelected.label === "Hoje"
                  ? dailyRevenue?.quantidadePedidos || 0
                  : revenue?.companies?.[0]?.quantidadePedidos || 0,
              )}
            />
            <CardGeneric
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
              label="FATURAMENTO"
              value={formatCurrency(
                rangeSelected.label === "Hoje"
                  ? dailyRevenue?.totalFaturamento || 0
                  : revenue?.companies?.[0]?.totalFaturamento || 0,
              )}
            />
            <CardGeneric
              label="FATURAMENTO CANCELADO"
              value={formatCurrency(
                rangeSelected.label === "Hoje"
                  ? dailyRevenue?.totalCancelado || 0
                  : revenue?.companies?.[0]?.totalCancelado || 0,
              )}
            />
          </Box>
        </Box>

        <Box mt="l">
          <Text color="mutedForeground" fontSize={14} fontWeight={"bold"}>
            MARKETPLACES
          </Text>

          {isIntegrationsLoading ? (
            <Loading />
          ) : (
            <>
              {data?.integracoes?.map((integracao: any, index: number) => {
                return (
                  <IntegrationItem
                    rangeSelected={rangeSelected}
                    key={index}
                    integracao={integracao}
                    marketplace={params.marketplace as string}
                  />
                );
              })}
            </>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
}
