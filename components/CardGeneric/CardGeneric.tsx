import { ActivityIndicator } from "react-native";
import { Box, Text } from "../RestyleComponents/RestyleComponents";

export default function CardGeneric({
  label,
  value,
  loading,
  icon,
}: {
  label: string;
  value: string;
  loading?: boolean;
  icon: React.ReactNode;
}) {
  return (
    <Box bg="card" flex={1} padding="m" borderRadius="l">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb="m"
      >
        <Text width={"80%"} fontSize={14} color="mutedForeground">
          {label}
        </Text>
        <Box padding="s" bg="primary10" borderRadius="m">
          {icon}
        </Box>
      </Box>

      <Text fontWeight={"bold"} fontSize={16}>
        {loading ? <ActivityIndicator /> : value}
      </Text>
    </Box>
  );
}
