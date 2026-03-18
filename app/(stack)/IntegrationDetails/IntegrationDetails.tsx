import CardGeneric from "@/components/CardGeneric/CardGeneric";
import RangeSelect from "@/components/RangeSelect/RangeSelect";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { useGetOrdersRevenue } from "@/hooks/useGetOrdersRevenue";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDecimal } from "@/utils/formatDecimal";
import { dateRange } from "@/utils/selectDate";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView } from "react-native";

export default function IntegrationDetails() {
  const params = useLocalSearchParams();
  const integracao = JSON.parse(params.integracao as string);
  const [rangeSelected, setRangeSelected] = useState({
    from: dateRange[3].from,
    to: dateRange[3].to,
    label: dateRange[3].label,
  });

  const { revenue } = useGetOrdersRevenue({
    dataInicial: rangeSelected.from,
    dataFinal: rangeSelected.to,
    integracao: integracao.id as string,
  });

  return (
    <Box bg="background" flex={1} padding="m">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text marginVertical="m">{integracao.nome}</Text>
        <Box mb="m">
          <RangeSelect
            rangeSelected={rangeSelected}
            setRangeSelected={setRangeSelected}
          />
        </Box>
        <Box gap="m">
          <Box flexDirection="row" gap="m">
            <CardGeneric
              label="PEDIDOS"
              value={formatDecimal(
                revenue?.companies?.[0]?.quantidadePedidos || 0,
              )}
            />
            <CardGeneric
              label="PEDIDOS CANCELADOS"
              value={formatCurrency(
                revenue?.companies?.[0]?.quantidadeCancelados || 0,
              )}
            />
          </Box>

          <Box flexDirection="row" gap="m">
            <CardGeneric
              label="FATURAMENTO"
              value={formatCurrency(
                revenue?.companies?.[0]?.totalFaturamento || 0,
              )}
            />
            <CardGeneric
              label="FATURAMENTO CANCELADO"
              value={formatCurrency(
                revenue?.companies?.[0]?.totalCancelado || 0,
              )}
            />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}
