import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { TouchableOpacityBox } from "@/components/TouchableOpacityBox/TouchableOpacityBox";
import { marketplaces } from "@/constants/marketplaces";
import theme from "@/constants/theme";
import { useGetMarketplaces } from "@/hooks/useGetMarketplaces";
import { Calendar, ChevronRight, ShoppingBag } from "lucide-react-native";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const { data } = useGetMarketplaces();

  const [rangeSelected, setRangeSelected] = useState(0);

  const daysOfMonth = ["Hoje", "7 dias", "15 dias", "30 dias"];

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container} edges={["top"]}>
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

            <Box flexDirection="row" gap="s">
              {daysOfMonth.map((day, index) => {
                return (
                  <TouchableOpacityBox
                    key={index}
                    paddingHorizontal="m"
                    paddingVertical="s"
                    backgroundColor={
                      rangeSelected === index ? "primary" : "secondary"
                    }
                    borderRadius="l"
                    onPress={() => setRangeSelected(index)}
                  >
                    <Text fontSize={12} fontWeight={"semibold"}>
                      {day}
                    </Text>
                  </TouchableOpacityBox>
                );
              })}
            </Box>
            <Box
              flexDirection="row"
              gap="s"
              alignItems="center"
              marginBottom="s"
              marginTop="l"
            >
              <Calendar size={14} color={theme.colors.mutedForeground} />
              <Text color="mutedForeground" fontSize={14} fontWeight={"bold"}>
                RESUMO DO DIA
              </Text>
            </Box>

            <Box gap="m">
              <Box flexDirection="row" gap="m">
                <Box
                  bg="card"
                  flex={1}
                  borderWidth={0.3}
                  borderColor="mutedForeground"
                  padding="m"
                  borderRadius="l"
                >
                  <Box
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb="s"
                  >
                    <Text fontSize={14} color="mutedForeground">
                      PEDIDOS
                    </Text>
                    <Box padding="s" bg="primary10" borderRadius="m">
                      <ShoppingBag color={theme.colors.primary} size={14} />
                    </Box>
                  </Box>

                  <Text fontWeight={"bold"} fontSize={22}>
                    47
                  </Text>
                </Box>
                <Box
                  bg="card"
                  flex={1}
                  borderWidth={0.3}
                  borderColor="mutedForeground"
                  padding="m"
                  borderRadius="l"
                >
                  <Box
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb="s"
                  >
                    <Text fontSize={14} color="mutedForeground">
                      PEDIDOS CANCELADOS
                    </Text>
                    <Box padding="s" bg="primary10" borderRadius="m">
                      <ShoppingBag color={theme.colors.primary} size={14} />
                    </Box>
                  </Box>

                  <Text fontWeight={"bold"} fontSize={22}>
                    47
                  </Text>
                </Box>
              </Box>
              <Box flexDirection="row" gap="m">
                <Box
                  bg="card"
                  flex={1}
                  borderWidth={0.3}
                  borderColor="mutedForeground"
                  padding="m"
                  borderRadius="l"
                >
                  <Box
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb="s"
                  >
                    <Text fontSize={14} color="mutedForeground">
                      FATURAMENTO
                    </Text>
                    <Box padding="s" bg="primary10" borderRadius="m">
                      <ShoppingBag color={theme.colors.primary} size={14} />
                    </Box>
                  </Box>

                  <Text fontWeight={"bold"} fontSize={22}>
                    47
                  </Text>
                </Box>
                <Box
                  bg="card"
                  flex={1}
                  borderWidth={0.3}
                  borderColor="mutedForeground"
                  padding="m"
                  borderRadius="l"
                >
                  <Box
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb="s"
                  >
                    <Text fontSize={14} color="mutedForeground">
                      VALOR CANCELADO
                    </Text>
                    <Box padding="s" bg="primary10" borderRadius="m">
                      <ShoppingBag color={theme.colors.primary} size={14} />
                    </Box>
                  </Box>

                  <Text fontWeight={"bold"} fontSize={22}>
                    47
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box mt="l">
              <Text color="mutedForeground" fontSize={14} fontWeight={"bold"}>
                MARKETPLACES
              </Text>

              {data?.marketplaces?.map((marketplace: string, index: number) => {
                return (
                  <TouchableOpacityBox
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
                          marketplaces?.[
                            marketplace as keyof typeof marketplaces
                          ].logo
                        }
                        style={{ width: 50, height: 20 }}
                      />
                    </Box>

                    <Box flex={1}>
                      <Text>
                        {
                          marketplaces?.[
                            marketplace as keyof typeof marketplaces
                          ].name
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
          </ScrollView>
        </Box>
      </SafeAreaView>
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
