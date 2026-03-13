import { BarChartComponent } from "@/components/BarChart/BarChart";
import { BottomSheetCalendar } from "@/components/CalendarBottomSheet/CalendarBottomSheet";
import CardGeneric from "@/components/CardGeneric/CardGeneric";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { TouchableOpacityBox } from "@/components/TouchableOpacityBox/TouchableOpacityBox";
import { marketplaces } from "@/constants/marketplaces";
import theme from "@/constants/theme";
import { useGetMarketplaces } from "@/hooks/useGetMarketplaces";
import { useGetOrdersRevenue } from "@/hooks/useGetOrdersRevenue";
import { dateRange } from "@/utils/selectDate";
import { router } from "expo-router";
import { Calendar as CalendarIcon, ChevronRight } from "lucide-react-native";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function index() {
  const [isOpen, setIsOpen] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const [rangeSelected, setRangeSelected] = useState({
    from: dateRange[2].from,
    to: dateRange[2].to,
    label: dateRange[2].label,
  });

  const { data } = useGetMarketplaces();
  const { revenue } = useGetOrdersRevenue({
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
                    day.label === "Personalizado"
                      ? (setRangeSelected(day), setIsOpen(true))
                      : setRangeSelected(day);
                  }}
                >
                  <Text fontSize={12} fontWeight={"semibold"}>
                    {day.label}
                  </Text>
                </TouchableOpacityBox>
              );
            })}
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
          <Box gap="m">
            <Box flexDirection="row" gap="m">
              <CardGeneric
                label="PEDIDOS"
                value={revenue?.companies?.[0]?.quantidadePedidos || 0}
              />

              <CardGeneric
                label="PEDIDOS CANCELADOS"
                value={revenue?.companies?.[0]?.quantidadeCancelados || 0}
              />
            </Box>
            <Box flexDirection="row" gap="m">
              <CardGeneric
                label="FATURAMENTO"
                value={formatCurrency(
                  revenue?.companies?.[0]?.totalFaturamento || 0,
                )}
              />

              <CardGeneric
                label="VALOR CANCELADO"
                value={formatCurrency(
                  revenue?.companies?.[0]?.totalCancelado || 0,
                )}
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
                <TouchableOpacityBox
                  onPress={() =>
                    router.push({
                      pathname: "/(stack)/marketplaceDetails",
                      params: { marketplace },
                    })
                  }
                  key={index}
                  gap="m"
                  flex={1}
                  borderWidth={0.3}
                  borderRadius="m"
                  borderColor="mutedForeground"
                  padding="m"
                  marginTop="s"
                  flexDirection="row"
                  bg="card"
                >
                  <Box
                    bg="container"
                    borderRadius="s"
                    padding="s"
                    justifyContent="center"
                  >
                    <Image
                      resizeMode="contain"
                      source={
                        marketplaces?.[marketplace as keyof typeof marketplaces]
                          .logo
                      }
                      style={{ width: 50, height: 20 }}
                    />
                  </Box>

                  <Box flex={1}>
                    <Text>
                      {
                        marketplaces?.[marketplace as keyof typeof marketplaces]
                          .name
                      }
                    </Text>
                    <Text fontSize={12}>2 lojas</Text>
                  </Box>

                  <Box justifyContent="flex-end">
                    <Text fontWeight={"bold"} fontSize={12}>
                      R$ 1.000,00
                    </Text>
                    <Text fontSize={10}>121 Pedidos</Text>
                  </Box>
                  <Box justifyContent="center">
                    <ChevronRight
                      size={18}
                      color={theme.colors.mutedForeground}
                    />
                  </Box>
                </TouchableOpacityBox>
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
