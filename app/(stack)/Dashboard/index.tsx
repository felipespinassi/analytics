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
import BarChartComponent from "./components/BarChart/BarChart";
import MarketplaceItem from "./components/MarketplaceItem/MarketplaceItem";
import ProductsRankingItem from "./components/ProductsRanking/ProductsRanking";

export default function index() {
  const [currentTab, setCurrentTab] = useState<
    "marketplaces" | "produtos" | "coleta"
  >("marketplaces");
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

  const items = {
    marketplaces: (
      <>
        {data?.marketplaces?.map((marketplace, index) => {
          return (
            <MarketplaceItem
              rangeSelected={rangeSelected}
              key={index}
              marketplace={marketplace}
            />
          );
        })}
      </>
    ),
    produtos: (
      <Box gap="s" mt="s">
        {productsRanking?.companies?.[0]?.produtos?.map((produto, index) => {
          return (
            <ProductsRankingItem key={index} produto={produto} index={index} />
          );
        })}
      </Box>
    ),
    coleta: (
      <Box marginVertical="m">
        <BarChartComponent
          data={pickupConference}
          isLoading={isPickupConferenceLoading}
        />
      </Box>
    ),
  };

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
            {rangeSelected.label === "Personalizado"
              ? `${dayjs(rangeSelected.from).format("DD/MM")} - ${dayjs(rangeSelected.to).format("DD/MM")}`
              : rangeSelected.label}
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
                  paddingVertical="s"
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
                  paddingVertical="s"
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
                  paddingVertical="s"
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

              {items[currentTab as keyof typeof items]}
            </>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
}
