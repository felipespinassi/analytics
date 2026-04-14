import RangeSelect from "@/components/RangeSelect/RangeSelect";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import theme from "@/constants/theme";
import { DateRangeContext } from "@/context/DateRangeContext";
import dayjs from "dayjs";
import { Calendar as CalendarIcon } from "lucide-react-native";
import React, { useContext } from "react";
import { ScrollView } from "react-native";
import Cards from "./components/Cards/Cards";
import Header from "./components/Header/Header";
import Tabs from "./components/Tabs/Tabs";

export default function index() {
  const { rangeSelected, setRangeSelected } = useContext(DateRangeContext);

  return (
    <Box bg="background" padding="m" flex={1}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <RangeSelect
          rangeSelected={rangeSelected}
          setRangeSelected={setRangeSelected}
        />

        <Box
          flexDirection="row"
          gap="s"
          alignItems="center"
          marginBottom="s"
          marginTop="l"
        >
          <CalendarIcon size={14} color={theme.colors.mutedForeground} />
          <Text color="mutedForeground" fontSize={14} fontWeight={"bold"}>
            {rangeSelected.label === "Personalizado"
              ? `${dayjs(rangeSelected.from).format("DD/MM")} - ${dayjs(rangeSelected.to).format("DD/MM")}`
              : rangeSelected.label}
          </Text>
        </Box>

        <Cards rangeSelected={rangeSelected} />

        <Tabs rangeSelected={rangeSelected} />
      </ScrollView>
    </Box>
  );
}
