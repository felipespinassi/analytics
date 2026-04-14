import ArrowBack from "@/components/ArrowBack/ArrowBack";
import RangeSelect from "@/components/RangeSelect/RangeSelect";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { DateRangeContext } from "@/context/DateRangeContext";
import { useLocalSearchParams } from "expo-router";
import React, { useContext } from "react";
import { ScrollView } from "react-native";
import Cards from "./components/Cards/Cards";
import StatusOrders from "./components/StatusOrders/StatusOrders";

export default function IntegrationDetails() {
  const params = useLocalSearchParams();
  const integracao = JSON.parse(params.integracao as string);

  const { rangeSelected, setRangeSelected } = useContext(DateRangeContext);

  return (
    <Box bg="background" flex={1} padding="m">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box flexDirection="row" alignItems="center" gap="m">
          <ArrowBack />
          <Text marginVertical="m">{integracao.nome}</Text>
        </Box>

        <Box mb="m">
          <RangeSelect
            rangeSelected={rangeSelected}
            setRangeSelected={setRangeSelected}
          />
        </Box>

        <Cards rangeSelected={rangeSelected} integracao={integracao} />

        <StatusOrders integracao={integracao} rangeSelected={rangeSelected} />
      </ScrollView>
    </Box>
  );
}
