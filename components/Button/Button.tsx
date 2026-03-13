import React from "react";
import { ActivityIndicator } from "react-native";
import { Text } from "../RestyleComponents/RestyleComponents";
import { TouchableOpacityBox } from "../TouchableOpacityBox/TouchableOpacityBox";

export default function Button({
  children,
  onPress,
  loading,
  variant,
}: {
  children: React.ReactNode;
  onPress: () => void;
  loading?: boolean;
  variant?: "primary" | "secondary";
}) {
  return (
    <TouchableOpacityBox
      flex={1}
      backgroundColor={variant === "primary" ? "primary" : "secondary"}
      padding="m"
      borderRadius="s"
      alignItems="center"
      onPress={onPress}
    >
      {!loading ? (
        <Text
          color={variant === "primary" ? "background" : "mutedForeground"}
          fontWeight={"bold"}
        >
          {children}
        </Text>
      ) : (
        <ActivityIndicator size="small" color="#fff" />
      )}
    </TouchableOpacityBox>
  );
}
