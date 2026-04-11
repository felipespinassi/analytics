import theme from "@/constants/theme";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { TouchableOpacityBox } from "../TouchableOpacityBox/TouchableOpacityBox";

export default function ArrowBack() {
  return (
    <TouchableOpacityBox onPress={() => router.back()}>
      <ArrowLeft size={26} color={theme.colors.primary} />
    </TouchableOpacityBox>
  );
}
