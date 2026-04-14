import { DateRangeContext } from "@/context/DateRangeContext";
import { dateRange } from "@/utils/selectDate";
import dayjs from "dayjs";
import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { Box, Text } from "../RestyleComponents/RestyleComponents";
import { TouchableOpacityBox } from "../TouchableOpacityBox/TouchableOpacityBox";

export default function RangeSelect({
  rangeSelected,
  setRangeSelected,
}: {
  rangeSelected: {
    from: string;
    to: string;
    label: string;
  };
  setRangeSelected: React.Dispatch<
    React.SetStateAction<{
      from: string;
      to: string;
      label: string;
    }>
  >;
}) {
  const { bottomSheetRef } = useContext(DateRangeContext);

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
          backgroundColor={
            rangeSelected.label === "Personalizado" ? "primary" : "secondary"
          }
          borderRadius="l"
          onPress={() => {
            bottomSheetRef.current?.snapToIndex(1);
          }}
        >
          <Text fontSize={12} fontWeight={"semibold"}>
            {rangeSelected.label === "Personalizado" ? (
              <Text fontSize={12}>
                {dayjs(rangeSelected.from).format("DD/MM/YYYY")} -{" "}
                {dayjs(rangeSelected.to).format("DD/MM/YYYY")}
              </Text>
            ) : (
              "Personalizado"
            )}
          </Text>
        </TouchableOpacityBox>
      </Box>
    </ScrollView>
  );
}
