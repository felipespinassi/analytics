import Loading from "@/components/Loading/Loading";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { TouchableOpacityBox } from "@/components/TouchableOpacityBox/TouchableOpacityBox";
import { useGetMarketplaces } from "@/hooks/useGetMarketplaces";
import { useGetOrdersPickup } from "@/hooks/useGetOrdersPickup";
import { useGetProductsRanking } from "@/hooks/useGetProductsRanking";
import dayjs from "dayjs";
import React, { useState } from "react";
import BarChartComponent from "./components/BarChart/BarChart";
import MarketplaceItem from "./components/MarketplaceItem/MarketplaceItem";
import ProductsRankingItem from "./components/ProductsRanking/ProductsRanking";

export default function Tabs({
  rangeSelected,
}: {
  rangeSelected: { label: string; from: string; to: string };
}) {
  const [currentTab, setCurrentTab] = useState<
    "marketplaces" | "produtos" | "coleta"
  >("marketplaces");

  const { data: productsRanking, isLoading: isProductsRankingLoading } =
    useGetProductsRanking({
      dataInicial: dayjs(rangeSelected.from).format("YYYY-MM-DD"),
      dataFinal: dayjs(rangeSelected.to).format("YYYY-MM-DD"),
    });
  const { data, isLoading: isMarketplacesLoading } = useGetMarketplaces();

  const { data: pickupConference, isLoading: isPickupConferenceLoading } =
    useGetOrdersPickup();

  const items = {
    marketplaces: (
      <>
        {isMarketplacesLoading ? (
          <Loading />
        ) : (
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
        )}
      </>
    ),
    produtos: (
      <>
        {isProductsRankingLoading ? (
          <Loading />
        ) : (
          <Box gap="s" mt="s">
            {productsRanking?.companies?.[0]?.produtos?.map(
              (produto, index) => {
                return (
                  <ProductsRankingItem
                    key={index}
                    produto={produto}
                    index={index}
                  />
                );
              },
            )}
          </Box>
        )}
      </>
    ),
    coleta: (
      <>
        {isPickupConferenceLoading ? (
          <Loading />
        ) : (
          <Box marginVertical="m">
            <BarChartComponent
              data={pickupConference}
              isLoading={isPickupConferenceLoading}
            />
          </Box>
        )}
      </>
    ),
  };
  return (
    <>
      <Box
        flexDirection="row"
        marginTop="s"
        backgroundColor="card"
        borderRadius="s"
      >
        <TouchableOpacityBox
          paddingHorizontal="s"
          paddingVertical="s"
          borderRadius="s"
          backgroundColor={currentTab === "marketplaces" ? "primary" : "card"}
          alignItems="center"
          flex={1}
          onPress={() => setCurrentTab("marketplaces")}
        >
          <Text
            color={
              currentTab === "marketplaces" ? "foreground" : "mutedForeground"
            }
            fontSize={14}
            fontWeight={"bold"}
          >
            Marketplaces
          </Text>
        </TouchableOpacityBox>

        <TouchableOpacityBox
          backgroundColor={currentTab === "produtos" ? "primary" : "card"}
          paddingHorizontal="s"
          paddingVertical="s"
          borderRadius="s"
          alignItems="center"
          flex={1}
          onPress={() => setCurrentTab("produtos")}
        >
          <Text
            color={currentTab === "produtos" ? "foreground" : "mutedForeground"}
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
            color={currentTab === "coleta" ? "foreground" : "mutedForeground"}
            fontSize={14}
            fontWeight={"bold"}
          >
            Coleta
          </Text>
        </TouchableOpacityBox>
      </Box>

      {items[currentTab as keyof typeof items]}
    </>
  );
}
