import React from "react";
import { Text } from "../RestyleComponents/RestyleComponents";
import { TouchableOpacityBox } from "../TouchableOpacityBox/TouchableOpacityBox";

export default function Button({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress: () => void;
}) {
  return (
    <TouchableOpacityBox
      backgroundColor="primary"
      padding="m"
      borderRadius="s"
      alignItems="center"
      onPress={onPress}
    >
      <Text color="background" fontWeight={"bold"}>
        {children}
      </Text>
    </TouchableOpacityBox>
  );
}
