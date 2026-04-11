import ArrowBack from "@/components/ArrowBack/ArrowBack";
import CardGeneric from "@/components/CardGeneric/CardGeneric";
import Loading from "@/components/Loading/Loading";
import RangeSelect from "@/components/RangeSelect/RangeSelect";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { marketplaces } from "@/constants/marketplaces";
import theme from "@/constants/theme";
import { DateRangeContext } from "@/context/DateRangeContext";
import { useGetDailyOrdersRevenue } from "@/hooks/useGetDailyOrdersRevenue";
import { useGetIntegrations } from "@/hooks/useGetIntegrations";
import { useGetOrdersRevenue } from "@/hooks/useGetOrdersRevenue";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDecimal } from "@/utils/formatDecimal";
import dayjs from "dayjs";
import { useLocalSearchParams } from "expo-router";
import { Ban, BanknoteX, DollarSign, ShoppingBag } from "lucide-react-native";
import { useContext } from "react";
import { Image, ScrollView } from "react-native";
import IntegrationItem from "./components/IntegrationItem/IntegrationItem";

export default function MarketplaceDetails() {
  const params = useLocalSearchParams();

  const { rangeSelected, setRangeSelected } = useContext(DateRangeContext);
  const { data, isLoading: isIntegrationsLoading } = useGetIntegrations(
    params.marketplace as string,
  );
  const { revenue } = useGetOrdersRevenue({
    dataInicial: dayjs(rangeSelected.from).format("YYYY-MM-DD"),
    dataFinal: dayjs(rangeSelected.to).format("YYYY-MM-DD"),
    marketplace: params.marketplace as string,
  });

  const { data: dailyRevenue } = useGetDailyOrdersRevenue({
    marketplace: params.marketplace as string,
  });

  return (
    <Box bg="background" flex={1} padding="m">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box mb="m" flexDirection="row" alignItems="center" gap="m">
          <ArrowBack />
          <Image
            resizeMode="contain"
            source={
              marketplaces?.[params.marketplace as keyof typeof marketplaces]
                .logo
            }
            style={{ width: 100, height: 30 }}
          />

          {/* <Text fontSize={12}>{data?.integracoes?.length} Lojas</Text> */}
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

        <Box mt="l">
          <Text color="mutedForeground" fontSize={14} fontWeight={"bold"}>
            INTEGRAÇÕES
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
