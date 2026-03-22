import React from "react";
import { ActivityIndicator } from "react-native";
import { Box } from "../RestyleComponents/RestyleComponents";

export default function Loading() {
  return (
    <Box mt="xxl">
      <ActivityIndicator size="large" />
    </Box>
  );
}
