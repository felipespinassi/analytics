import CardGeneric from "@/components/CardGeneric/CardGeneric";
import RangeSelect from "@/components/RangeSelect/RangeSelect";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import theme from "@/constants/theme";
import { useGetMarketplaces } from "@/hooks/useGetMarketplaces";
import { useGetOrdersRevenue } from "@/hooks/useGetOrdersRevenue";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDecimal } from "@/utils/formatDecimal";
import { dateRange } from "@/utils/selectDate";
import { Calendar as CalendarIcon } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MarketplaceItem from "./components/MarketplaceItem/MarketplaceItem";

export default function index() {
  const [rangeSelected, setRangeSelected] = useState({
    from: dateRange[3].from,
    to: dateRange[3].to,
    label: dateRange[3].label,
  });

  const { data } = useGetMarketplaces();
  const { revenue, isLoading } = useGetOrdersRevenue({
    dataInicial: rangeSelected.from,
    dataFinal: rangeSelected.to,
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <Box padding="m" flex={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text paddingBottom="xs" fontSize={12}>
            Olá, Vendedor 👋
          </Text>
          <Box
            mb="m"
            justifyContent="space-between"
            flexDirection="row"
            width={"auto"}
            alignItems="center"
          >
            <Text fontSize={20} fontWeight={"bold"}>
              Painel de Vendas
            </Text>
          </Box>

          {/* FILTROS */}

          <RangeSelect
            rangeSelected={rangeSelected}
            setRangeSelected={setRangeSelected}
          />

          {/* RESUMO DO DIA  */}
          <Box
            flexDirection="row"
            gap="s"
            alignItems="center"
            marginBottom="s"
            marginTop="l"
          >
            <CalendarIcon size={14} color={theme.colors.mutedForeground} />
            <Text color="mutedForeground" fontSize={14} fontWeight={"bold"}>
              RESUMO DO DIA
            </Text>
          </Box>

          {/* CARDS */}
          <Box gap="s">
            <Box flexDirection="row" gap="s">
              <CardGeneric
                label="PEDIDOS"
                value={formatDecimal(
                  revenue?.companies?.[0]?.quantidadePedidos || 0,
                )}
                loading={isLoading}
              />

              <CardGeneric
                label="PEDIDOS CANCELADOS"
                value={formatDecimal(
                  revenue?.companies?.[0]?.quantidadeCancelados || 0,
                )}
                loading={isLoading}
              />
            </Box>
            <Box flexDirection="row" gap="s">
              <CardGeneric
                label="FATURAMENTO"
                value={formatCurrency(
                  revenue?.companies?.[0]?.totalFaturamento || 0,
                )}
                loading={isLoading}
              />

              <CardGeneric
                label="FATURAMENTO CANCELADO"
                value={formatCurrency(
                  revenue?.companies?.[0]?.totalCancelado || 0,
                )}
                loading={isLoading}
              />
            </Box>
          </Box>

          {/* MARKETPLACES */}
          <Box mt="l">
            <Text color="mutedForeground" fontSize={14} fontWeight={"bold"}>
              MARKETPLACES
            </Text>

            {data?.marketplaces?.map((marketplace: string, index: number) => {
              return (
                <MarketplaceItem
                  rangeSelected={rangeSelected}
                  key={index}
                  marketplace={marketplace}
                />
              );
            })}
          </Box>
          {/* 
          <Box marginVertical="m">
            <Text marginBottom="m" fontWeight={"bold"} color="mutedForeground">
              FATURAMENTO DOS ÚLTIMOS 6 MESES
            </Text>

            <BarChartComponent />
          </Box> */}
        </ScrollView>
      </Box>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    marginTop: -5,
  },
});
