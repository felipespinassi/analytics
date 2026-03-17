import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { TouchableOpacityBox } from "@/components/TouchableOpacityBox/TouchableOpacityBox";
import { marketplaces } from "@/constants/marketplaces";
import theme from "@/constants/theme";
import { useGetOrdersRevenue } from "@/hooks/useGetOrdersRevenue";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDecimal } from "@/utils/formatDecimal";
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
      borderRadius="m"
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

      <Box justifyContent="center" gap="xs" alignItems="flex-end">
        <Text fontWeight={"bold"} fontSize={12}>
          R$ {formatCurrency(revenue?.companies?.[0]?.totalFaturamento || 0)}
        </Text>
        <Text color="mutedForeground" fontSize={10}>
          {formatDecimal(revenue?.companies?.[0]?.quantidadePedidos || 0)}{" "}
          Pedidos
        </Text>
      </Box>
      <Box justifyContent="center">
        <ChevronRight size={18} color={theme.colors.mutedForeground} />
      </Box>
    </TouchableOpacityBox>
  );
}
