import { BarChartComponent } from "@/components/BarChart/BarChart";
import CardGeneric from "@/components/CardGeneric/CardGeneric";
import Loading from "@/components/Loading/Loading";
import RangeSelect from "@/components/RangeSelect/RangeSelect";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { TouchableOpacityBox } from "@/components/TouchableOpacityBox/TouchableOpacityBox";
import theme from "@/constants/theme";
import { DateRangeContext } from "@/context/DateRangeContext";
import { useGetDailyOrdersRevenue } from "@/hooks/useGetDailyOrdersRevenue";
import { useGetMarketplaces } from "@/hooks/useGetMarketplaces";
import { useGetOrdersPickup } from "@/hooks/useGetOrdersPickup";
import { useGetOrdersRevenue } from "@/hooks/useGetOrdersRevenue";
import { useGetProductsRanking } from "@/hooks/useGetProductsRanking";
import { ACCESS_TOKEN, TOKEN_EXPIRE_TIME } from "@/storage/storageConfig";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDecimal } from "@/utils/formatDecimal";
import dayjs from "dayjs";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
  Ban,
  BanknoteX,
  Calendar as CalendarIcon,
  DollarSign,
  LogOut,
  ShoppingBag,
} from "lucide-react-native";
import React, { useContext, useState } from "react";
import { Alert, ScrollView } from "react-native";
import MarketplaceItem from "./components/MarketplaceItem/MarketplaceItem";

export default function index() {
  const [currentTab, setCurrentTab] = useState("marketplaces");
  const { rangeSelected, setRangeSelected } = useContext(DateRangeContext);

  const { data, isLoading: isMarketplacesLoading } = useGetMarketplaces();
  const { revenue, isLoading } = useGetOrdersRevenue({
    dataInicial: dayjs(rangeSelected.from).format("YYYY-MM-DD"),
    dataFinal: dayjs(rangeSelected.to).format("YYYY-MM-DD"),
  });

  const { data: dailyRevenue } = useGetDailyOrdersRevenue({});
  const { data: productsRanking, isLoading: isProductsRankingLoading } =
    useGetProductsRanking({
      dataInicial: dayjs(rangeSelected.from).format("YYYY-MM-DD"),
      dataFinal: dayjs(rangeSelected.to).format("YYYY-MM-DD"),
    });
  const { data: pickupConference, isLoading: isPickupConferenceLoading } =
    useGetOrdersPickup();

  return (
    <Box bg="background" padding="m" flex={1}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
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
          </Box>
          <TouchableOpacityBox
            marginRight="s"
            onPress={async () => {
              Alert.alert(
                "Sair",
                "Tem certeza que deseja sair?",
                [
                  {
                    text: "Cancelar",
                    style: "cancel",
                  },
                  {
                    text: "Sair",
                    style: "destructive",
                    onPress: async () => {
                      await SecureStore.deleteItemAsync(ACCESS_TOKEN);
                      await SecureStore.deleteItemAsync(TOKEN_EXPIRE_TIME);
                      router.replace("/");
                    },
                  },
                ],
                { cancelable: true },
              );
            }}
          >
            <LogOut size={22} color={theme.colors.primary} />
          </TouchableOpacityBox>
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

        {/* MARKETPLACES */}

        <Box mt="l">
          {isMarketplacesLoading ? (
            <Loading />
          ) : (
            <>
              <Box flexDirection="row" backgroundColor="card" borderRadius="s">
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
                <TouchableOpacityBox
                  backgroundColor={currentTab === "coleta" ? "primary" : "card"}
                  paddingHorizontal="s"
                  paddingVertical="xs"
                  borderRadius="s"
                  alignItems="center"
                  flex={1}
                  onPress={() => setCurrentTab("coleta")}
                >
                  <Text
                    color={
                      currentTab === "coleta" ? "foreground" : "mutedForeground"
                    }
                    fontSize={14}
                    fontWeight={"bold"}
                  >
                    Coleta
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
                <>
                  {currentTab === "produtos" ? (
                    <Box gap="s" mt="s">
                      {productsRanking?.companies?.[0]?.produtos?.map(
                        (produto: any, index: number) => {
                          return (
                            <Box
                              borderRadius="s"
                              key={index}
                              padding="m"
                              backgroundColor="card"
                              gap="s"
                            >
                              <Box>
                                <Text fontSize={14} fontWeight="bold">
                                  {produto.productName}
                                </Text>
                                <Text fontSize={12} color="mutedForeground">
                                  SKU: {produto.sku}
                                </Text>
                              </Box>

                              <Box
                                flexDirection="row"
                                justifyContent="space-between"
                              >
                                <Text fontSize={12} color="mutedForeground">
                                  Vendida:{" "}
                                  {formatDecimal(
                                    Number(produto.quantidadeVendida || 0),
                                  )}
                                </Text>
                                <Text fontSize={12} color="mutedForeground">
                                  Cancelada:{" "}
                                  {formatDecimal(
                                    Number(produto.quantidadeCancelada || 0),
                                  )}
                                </Text>
                              </Box>

                              <Box
                                flexDirection="row"
                                justifyContent="space-between"
                              >
                                <Text
                                  fontSize={13}
                                  fontWeight="bold"
                                  color="primary"
                                >
                                  Total:{" "}
                                  {formatCurrency(
                                    Number(produto.valorTotal || 0),
                                  )}
                                </Text>
                                <Text
                                  fontSize={13}
                                  fontWeight="bold"
                                  color="primary"
                                >
                                  Preco medio:{" "}
                                  {formatCurrency(
                                    Number(produto.precoMedio || 0),
                                  )}
                                </Text>
                              </Box>
                            </Box>
                          );
                        },
                      )}
                    </Box>
                  ) : (
                    <Box marginVertical="m">
                      <BarChartComponent
                        data={pickupConference}
                        isLoading={isPickupConferenceLoading}
                      />
                    </Box>
                  )}
                </>
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
  );
}
