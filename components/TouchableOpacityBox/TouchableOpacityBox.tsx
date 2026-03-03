import { Theme } from "@/constants/theme";
import { createBox } from "@shopify/restyle";
import React, { PropsWithChildren } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

const TouchableOpacityBoxBase = createBox<Theme, TouchableOpacityProps>(
  TouchableOpacity,
);

type TouchableOpacityBoxProps = PropsWithChildren<TouchableOpacityProps> &
  React.ComponentProps<typeof TouchableOpacityBoxBase>;

export const TouchableOpacityBox = ({
  children,
  ...rest
}: TouchableOpacityBoxProps) => {
  return (
    <TouchableOpacityBoxBase activeOpacity={0.7} {...rest}>
      {children}
    </TouchableOpacityBoxBase>
  );
};
