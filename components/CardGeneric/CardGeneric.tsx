import theme from "@/constants/theme";
import { ShoppingBag } from "lucide-react-native";
import { Box, Text } from "../RestyleComponents/RestyleComponents";

export default function CardGeneric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
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
          {label}
        </Text>
        <Box padding="s" bg="primary10" borderRadius="m">
          <ShoppingBag color={theme.colors.primary} size={14} />
        </Box>
      </Box>

      <Text fontWeight={"bold"} fontSize={22}>
        {value}
      </Text>
    </Box>
  );
}
