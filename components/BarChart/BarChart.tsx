import theme from "@/constants/theme";
import { ActivityIndicator } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Box, Text } from "../RestyleComponents/RestyleComponents";

export const BarChartComponent = ({ data, isLoading }: any) => {
  const pieData = [
    {
      value: data?.statusCount?.naoconferido || 0,
      label: "Não Conferido",
      color: theme.colors.naoConferido,
    },
    {
      value: data?.statusCount?.coletado || 0,
      label: "Coletado",
      color: theme.colors.coletado,
    },

    {
      value: data?.statusCount?.aguardandocoleta || 0,
      label: "Aguardando coleta",
      color: theme.colors.aguardandoColeta,
    },
  ];

  if (isLoading) {
    return (
      <Box flex={1} marginTop="m" justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </Box>
    );
  }

  return (
    <Box flex={1}>
      <Box justifyContent="center" alignItems="center">
        <PieChart
          donut
          data={pieData}
          radius={100}
          innerRadius={50}
          innerCircleColor={theme.colors.card}
          textColor={theme.colors.mutedForeground}
          textSize={12}
        />
      </Box>

      <Box>
        <Box
          justifyContent="space-between"
          flexDirection="row"
          alignItems="center"
          marginTop="m"
        >
          <Box gap="m" flexDirection="row" alignItems="center">
            <Box
              backgroundColor="naoConferido"
              width={10}
              height={10}
              borderRadius="full"
            />
            <Text marginLeft="s">Não Conferido</Text>
          </Box>

          <Text>{data?.statusCount?.naoconferido}</Text>
        </Box>
        <Box
          justifyContent="space-between"
          flexDirection="row"
          alignItems="center"
          marginTop="m"
        >
          <Box gap="m" flexDirection="row" alignItems="center">
            <Box
              backgroundColor="aguardandoColeta"
              width={10}
              height={10}
              borderRadius="full"
            />
            <Text marginLeft="s">Aguardando coleta</Text>
          </Box>

          <Text>{data?.statusCount?.aguardandocoleta}</Text>
        </Box>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          marginTop="m"
        >
          <Box gap="m" flexDirection="row" alignItems="center">
            <Box
              backgroundColor="coletado"
              width={10}
              height={10}
              borderRadius="full"
            />
            <Text marginLeft="s">Coletado</Text>
          </Box>

          <Text>{data?.statusCount?.coletado}</Text>
        </Box>
      </Box>
    </Box>
  );
};
