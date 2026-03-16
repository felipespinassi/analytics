import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { TouchableOpacityBox } from "@/components/TouchableOpacityBox/TouchableOpacityBox";
import { marketplaces } from "@/constants/marketplaces";
import theme from "@/constants/theme";
import { useGetOrdersRevenue } from "@/hooks/useGetOrdersRevenue";
import { formatCurrency } from "@/utils/formatCurrency";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import { Image } from "react-native";

export default function MarketplaceSelected({
  marketplace,
  rangeSelected,
}: {
  marketplace: string;
  rangeSelected: {
    from: string;
    to: string;
    label: string;
  };
}) {
  const { revenue } = useGetOrdersRevenue({
    dataInicial: rangeSelected.from,
    dataFinal: rangeSelected.to,
    marketplace,
  });

  return (
    <TouchableOpacityBox
      onPress={() =>
        router.push({
          pathname: "/(stack)/MarketplaceDetails/MarketplaceDetails",
          params: { marketplace },
        })
      }
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
      <Box bg="container" borderRadius="s" padding="s" justifyContent="center">
        <Image
          resizeMode="contain"
          source={marketplaces?.[marketplace as keyof typeof marketplaces].logo}
          style={{ width: 50, height: 20 }}
        />
      </Box>

      <Box flex={1}>
        <Text>
          {marketplaces?.[marketplace as keyof typeof marketplaces].name}
        </Text>
        <Text fontSize={12}>2 lojas</Text>
      </Box>

      <Box justifyContent="flex-end">
        <Text fontWeight={"bold"} fontSize={12}>
          R$ {formatCurrency(revenue?.companies?.[0]?.totalFaturamento || 0)}
        </Text>
        <Text fontSize={10}>121 Pedidos</Text>
      </Box>
      <Box justifyContent="center">
        <ChevronRight size={18} color={theme.colors.mutedForeground} />
      </Box>
    </TouchableOpacityBox>
  );
}
