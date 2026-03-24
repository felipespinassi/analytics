import CardGeneric from "@/components/CardGeneric/CardGeneric";
import Loading from "@/components/Loading/Loading";
import RangeSelect from "@/components/RangeSelect/RangeSelect";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { TouchableOpacityBox } from "@/components/TouchableOpacityBox/TouchableOpacityBox";
import theme from "@/constants/theme";
import { useGetDailyOrdersRevenue } from "@/hooks/useGetDailyOrdersRevenue";
import { useGetMarketplaces } from "@/hooks/useGetMarketplaces";
import { useGetOrdersRevenue } from "@/hooks/useGetOrdersRevenue";
import { useGetProductsRanking } from "@/hooks/useGetProductsRanking";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDecimal } from "@/utils/formatDecimal";
import { dateRange } from "@/utils/selectDate";
import dayjs from "dayjs";
import { Calendar as CalendarIcon } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MarketplaceItem from "./components/MarketplaceItem/MarketplaceItem";

export default function index() {
  const [currentTab, setCurrentTab] = useState("produtos");
  const [rangeSelected, setRangeSelected] = useState({
    from: dateRange[3].from,
    to: dateRange[3].to,
    label: dateRange[3].label,
  });

  const { data, isLoading: isMarketplacesLoading } = useGetMarketplaces();
  const { revenue, isLoading } = useGetOrdersRevenue({
    dataInicial: rangeSelected.from,
    dataFinal: rangeSelected.to,
  });

  const { data: dailyRevenue } = useGetDailyOrdersRevenue({});
  const { data: productsRanking, isLoading: isProductsRankingLoading } =
    useGetProductsRanking({
      dataInicial: dayjs(rangeSelected.from).format("YYYY-MM-DD"),
      dataFinal: dayjs(rangeSelected.to).format("YYYY-MM-DD"),
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
                  rangeSelected.label === "Hoje"
                    ? dailyRevenue?.quantidadePedidos || 0
                    : revenue?.companies?.[0]?.quantidadePedidos || 0,
                )}
                loading={isLoading}
              />

              <CardGeneric
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
                label="FATURAMENTO"
                value={formatCurrency(
                  rangeSelected.label === "Hoje"
                    ? dailyRevenue?.totalFaturamento || 0
                    : revenue?.companies?.[0]?.totalFaturamento || 0,
                )}
                loading={isLoading}
              />

              <CardGeneric
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

          {/* MARKETPLACES */}

          <Box mt="l">
            {isMarketplacesLoading ? (
              <Loading />
            ) : (
              <>
                <Box
                  flexDirection="row"
                  backgroundColor="card"
                  borderRadius="s"
                >
                  <TouchableOpacityBox
                    paddingHorizontal="s"
                    paddingVertical="xs"
                    borderRadius="s"
                    backgroundColor={
                      currentTab === "marketplaces" ? "primary" : "card"
                    }
                    alignItems="center"
                    flex={1}
                    onPress={() => setCurrentTab("marketplaces")}
                  >
                    <Text
                      color={
                        currentTab === "marketplaces"
                          ? "foreground"
                          : "mutedForeground"
                      }
                      fontSize={14}
                      fontWeight={"bold"}
                    >
                      Marketplaces
                    </Text>
                  </TouchableOpacityBox>

                  <TouchableOpacityBox
                    backgroundColor={
                      currentTab === "produtos" ? "primary" : "card"
                    }
                    paddingHorizontal="s"
                    paddingVertical="xs"
                    borderRadius="s"
                    alignItems="center"
                    flex={1}
                    onPress={() => setCurrentTab("produtos")}
                  >
                    <Text
                      color={
                        currentTab === "produtos"
                          ? "foreground"
                          : "mutedForeground"
                      }
                      fontSize={14}
                      fontWeight={"bold"}
                    >
                      Produtos
                    </Text>
                  </TouchableOpacityBox>
                </Box>
                {currentTab === "marketplaces" ? (
                  <>
                    {data?.marketplaces?.map(
                      (marketplace: string, index: number) => {
                        return (
                          <MarketplaceItem
                            rangeSelected={rangeSelected}
                            key={index}
                            marketplace={marketplace}
                          />
                        );
                      },
                    )}
                  </>
                ) : (
                  <Box gap="s" mt="s">
                    {productsRanking?.companies?.[0].produtos.map(
                      (produto: any, index: number) => {
                        return (
                          <Box
                            justifyContent="space-between"
                            borderRadius="s"
                            key={index}
                            padding="m"
                            backgroundColor="card"
                            flexDirection="row"
                          >
                            <Box>
                              <Text fontSize={14}>{produto.sku}</Text>
                            </Box>

                            <Text>{produto.valorTotal}</Text>
                          </Box>
                        );
                      },
                    )}
                  </Box>
                )}
              </>
            )}
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
