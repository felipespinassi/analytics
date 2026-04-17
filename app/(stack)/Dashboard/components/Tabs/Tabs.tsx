import Loading from "@/components/Loading/Loading";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { TouchableOpacityBox } from "@/components/TouchableOpacityBox/TouchableOpacityBox";
import { useGetMarketplaces } from "@/hooks/useGetMarketplaces";
import { FlashList } from "@shopify/flash-list";
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

  const { data, isLoading: isMarketplacesLoading } = useGetMarketplaces();

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

      {currentTab === "coleta" && (
        <Box marginVertical="m">
          <BarChartComponent />
        </Box>
      )}

      {currentTab === "produtos" && (
        <Box gap="s" mt="s">
          <ProductsRankingItem rangeSelected={rangeSelected} />
        </Box>
      )}

      {currentTab === "marketplaces" && (
        <>
          {isMarketplacesLoading ? (
            <Loading />
          ) : (
            <>
              <FlashList
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <MarketplaceItem
                      rangeSelected={rangeSelected}
                      marketplace={item}
                    />
                  );
                }}
                data={data?.marketplaces}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
