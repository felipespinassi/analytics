import { BarChartComponent } from "@/components/BarChart/BarChart";
import BottomSheetComponent from "@/components/BottomSheet/BottomSheet";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { TouchableOpacityBox } from "@/components/TouchableOpacityBox/TouchableOpacityBox";
import { useGetOrdersRevenue } from "@/hooks/useGetOrdersRevenue";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  ChartColumn,
  Funnel,
  TrendingDown,
  TrendingUp,
} from "lucide-react-native";
import React, { useRef } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const { data } = useGetOrdersRevenue();

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Box padding="m" flex={1}>
          <Box
            mb="m"
            justifyContent="space-between"
            flexDirection="row"
            width={"auto"}
            alignItems="center"
          >
            <Text fontSize={20} fontWeight={"bold"}>
              Dashboard
            </Text>

            <TouchableOpacityBox
              flexDirection="row"
              onPress={handleOpenBottomSheet}
            >
              <Text mr="s">Filtros</Text>
              <Funnel size={20} color={"black"} />
            </TouchableOpacityBox>
          </Box>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Box gap="s">
              <Box
                bg="successLight"
                borderColor="success"
                borderWidth={0.2}
                gap="s"
                padding="m"
                borderRadius="m"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Text>Pedidos</Text>
                  <Text fontSize={22} fontWeight={"bold"} color="success">
                    {data?.companies[0].quantidadePedidos || 0}
                  </Text>
                </Box>

                <Box padding="s" backgroundColor="success200" borderRadius="m">
                  <TrendingUp color={"green"} />
                </Box>
              </Box>

              <Box
                bg="errorLight"
                borderColor="errorDark"
                borderWidth={0.2}
                gap="s"
                padding="m"
                borderRadius="m"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Text>Pedidos Cancelados</Text>
                  <Text fontSize={22} fontWeight={"bold"} color="error">
                    {data?.companies[0].quantidadeCancelados || 0}
                  </Text>
                </Box>

                <Box padding="s" backgroundColor="error200" borderRadius="m">
                  <TrendingDown color={"red"} />
                </Box>
              </Box>

              <Box
                bg="infoLight"
                borderColor="infoDark"
                borderWidth={0.2}
                gap="s"
                padding="m"
                borderRadius="m"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Text>Faturamento total</Text>
                  <Text fontSize={22} fontWeight={"bold"} color="info">
                    {formatCurrency(data?.companies[0].totalFaturamento || 0)}
                  </Text>
                </Box>

                <Box padding="s" backgroundColor="info200" borderRadius="m">
                  <ChartColumn color={"blue"} />
                </Box>
              </Box>
            </Box>

            <Box mt="xl">
              <Box>
                <Text fontSize={18} fontWeight={"bold"} mb="s">
                  Faturamento últimos 6 meses
                </Text>
              </Box>
              <BarChartComponent />
            </Box>
          </ScrollView>
        </Box>

        <BottomSheetComponent ref={bottomSheetRef} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
