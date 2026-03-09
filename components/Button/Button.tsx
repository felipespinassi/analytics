import React from "react";
import { ActivityIndicator } from "react-native";
import { Text } from "../RestyleComponents/RestyleComponents";
import { TouchableOpacityBox } from "../TouchableOpacityBox/TouchableOpacityBox";

export default function Button({
  children,
  onPress,
  loading,
}: {
  children: React.ReactNode;
  onPress: () => void;
  loading?: boolean;
}) {
  return (
    <TouchableOpacityBox
      backgroundColor="primary"
      padding="m"
      borderRadius="s"
      alignItems="center"
      onPress={onPress}
    >
      {!loading ? (
        <Text color="background" fontWeight={"bold"}>
          {children}
        </Text>
      ) : (
        <ActivityIndicator size="small" color="#fff" />
      )}
    </TouchableOpacityBox>
  );
}
