import theme from "@/constants/theme";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { TextInput } from "react-native";
import { Box, Text } from "../RestyleComponents/RestyleComponents";
import { TouchableOpacityBox } from "../TouchableOpacityBox/TouchableOpacityBox";

type Props = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
};

export function Input({ label, placeholder, value, onChangeText }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box>
      {label && <Text marginBottom="s">{label}</Text>}

      <Box
        borderWidth={1}
        borderColor="border"
        flexDirection="row"
        justifyContent="space-between"
        borderRadius="s"
        bg="card"
      >
        <TextInput
          secureTextEntry={label === "Senha" && !showPassword}
          style={{
            color: theme.colors.foreground,
            paddingHorizontal: theme.spacing.s,
            paddingVertical: theme.spacing.m,
            width: "80%",
          }}
          placeholderTextColor={theme.colors.mutedForeground}
          placeholder={placeholder}
          //   value={value}
          onChangeText={onChangeText}
        />
        {label === "Senha" && (
          <Box justifyContent="center" padding="s">
            {showPassword ? (
              <TouchableOpacityBox onPress={() => setShowPassword(false)}>
                <Eye size={20} color={theme.colors.mutedForeground} />
              </TouchableOpacityBox>
            ) : (
              <TouchableOpacityBox onPress={() => setShowPassword(true)}>
                <EyeOff size={20} color={theme.colors.mutedForeground} />
              </TouchableOpacityBox>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
