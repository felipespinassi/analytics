import theme from "@/constants/theme";
import { TextInput } from "react-native";
import { Box, Text } from "../RestyleComponents/RestyleComponents";

type Props = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
};

export function Input({ label, placeholder, value, onChangeText }: Props) {
  return (
    <Box>
      {label && <Text marginBottom="s">{label}</Text>}

      <Box
        borderWidth={1}
        borderColor="border"
        borderRadius="s"
        paddingHorizontal="m"
        paddingVertical="m"
        bg="card"
      >
        <TextInput
          style={{ color: theme.colors.foreground }}
          placeholderTextColor={theme.colors.mutedForeground}
          keyboardType="visible-password"
          placeholder={placeholder}
          //   value={value}
          onChangeText={onChangeText}
        />
      </Box>
    </Box>
  );
}
