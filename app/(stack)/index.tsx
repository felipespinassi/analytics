import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { TouchableOpacityBox } from "@/components/TouchableOpacityBox/TouchableOpacityBox";
import theme from "@/constants/theme";
import { useGetOrdersRevenue } from "@/hooks/useGetOrdersRevenue";
import { Calendar, ShoppingBag } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const { data } = useGetOrdersRevenue();

  const [rangeSelected, setRangeSelected] = useState(0);

  const daysOfMonth = ["Hoje", "7 dias", "15 dias", "30 dias"];
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
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

                  <Text fontWeight={"bold"}>47</Text>
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

                  <Text fontWeight={"bold"}>47</Text>
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

                  <Text fontWeight={"bold"}>47</Text>
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

                  <Text fontWeight={"bold"}>47</Text>
                </Box>
              </Box>
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
  },
});
