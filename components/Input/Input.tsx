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

      <Box borderWidth={1} borderColor="border" borderRadius="s" bg="card">
        <TextInput
          style={{
            color: theme.colors.foreground,
            paddingHorizontal: theme.spacing.s,
            paddingVertical: theme.spacing.m,
          }}
          placeholderTextColor={theme.colors.mutedForeground}
          placeholder={placeholder}
          //   value={value}
          onChangeText={onChangeText}
        />
      </Box>
    </Box>
  );
}
