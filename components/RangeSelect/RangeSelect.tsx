import { dateRange } from "@/utils/selectDate";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { BottomSheetCalendar } from "../CalendarBottomSheet/CalendarBottomSheet";
import { Box, Text } from "../RestyleComponents/RestyleComponents";
import { TouchableOpacityBox } from "../TouchableOpacityBox/TouchableOpacityBox";

export default function RangeSelect({ rangeSelected, setRangeSelected }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Box flexDirection="row" gap="s">
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
            setIsOpen(true);
          }}
        >
          <Text fontSize={12} fontWeight={"semibold"}>
            Personalizado
          </Text>
        </TouchableOpacityBox>

        {isOpen && (
          <BottomSheetCalendar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setRangeSelected={setRangeSelected}
          />
        )}
      </Box>
    </ScrollView>
  );
}
