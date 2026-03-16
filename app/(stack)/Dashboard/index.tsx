import { BarChartComponent } from "@/components/BarChart/BarChart";
import { BottomSheetCalendar } from "@/components/CalendarBottomSheet/CalendarBottomSheet";
import CardGeneric from "@/components/CardGeneric/CardGeneric";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { TouchableOpacityBox } from "@/components/TouchableOpacityBox/TouchableOpacityBox";
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
import MarketplaceSelected from "./components/MarketplaceSelected/MarketplaceSelected";

export default function index() {
  const [isOpen, setIsOpen] = useState(false);

  const [rangeSelected, setRangeSelected] = useState({
    from: dateRange[2].from,
    to: dateRange[2].to,
    label: dateRange[2].label,
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

          <Box flexDirection="row" gap="s">
            {dateRange.map((day, index) => {
              return (
                <TouchableOpacityBox
                  key={index}
                  paddingHorizontal="m"
                  paddingVertical="s"
                  backgroundColor={
                    rangeSelected.label === day.label ? "primary" : "secondary"
                  }
                  borderRadius="l"
                  onPress={() => {
                    setRangeSelected(day);
                  }}
                >
                  <Text fontSize={12} fontWeight={"semibold"}>
                    {day.label}
                  </Text>
                </TouchableOpacityBox>
              );
            })}

            <TouchableOpacityBox
              paddingHorizontal="m"
              paddingVertical="s"
              backgroundColor={"secondary"}
              borderRadius="l"
              onPress={() => {
                setIsOpen(true);
              }}
            >
              <Text fontSize={12} fontWeight={"semibold"}>
                Personalizado
              </Text>
            </TouchableOpacityBox>
          </Box>

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
                <MarketplaceSelected
                  rangeSelected={rangeSelected}
                  key={index}
                  marketplace={marketplace}
                />
              );
            })}
          </Box>

          <Box marginVertical="m">
            <Text marginBottom="m" fontWeight={"bold"} color="mutedForeground">
              FATURAMENTO DOS ÚLTIMOS 6 MESES
            </Text>

            <BarChartComponent />
          </Box>
        </ScrollView>
      </Box>

      {isOpen && (
        <BottomSheetCalendar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setRangeSelected={setRangeSelected}
        />
      )}
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
