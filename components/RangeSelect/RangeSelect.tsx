import { dateRange } from "@/utils/selectDate";
import React from "react";
import { ScrollView } from "react-native";
import { Box, Text } from "../RestyleComponents/RestyleComponents";
import { TouchableOpacityBox } from "../TouchableOpacityBox/TouchableOpacityBox";

export default function RangeSelect({
  rangeSelected,
  setRangeSelected,
  bottomSheetRef,
}: any) {
  // ref

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Box flexDirection="row" gap="s" flex={1}>
        {dateRange.map((day, index) => {
          return (
            <TouchableOpacityBox
              key={index}
              paddingHorizontal="m"
              paddingVertical="s"
              backgroundColor={
                rangeSelected.label === day.label ? "primary" : "secondary"
              }
              borderRadius="l"
              onPress={() => {
                setRangeSelected(day);
              }}
            >
              <Text fontSize={12} fontWeight={"semibold"}>
                {day.label}
              </Text>
            </TouchableOpacityBox>
          );
        })}

        <TouchableOpacityBox
          paddingHorizontal="m"
          paddingVertical="s"
          backgroundColor={"secondary"}
          borderRadius="l"
          onPress={() => {
            bottomSheetRef.current?.snapToIndex(1);
          }}
        >
          <Text fontSize={12} fontWeight={"semibold"}>
            Personalizado
          </Text>
        </TouchableOpacityBox>
      </Box>
    </ScrollView>
  );
}
