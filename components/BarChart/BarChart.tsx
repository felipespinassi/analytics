import theme from "@/constants/theme";
import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

export const BarChartComponent = () => {
  const barData = [
    { value: 250, label: "Set" },
    { value: 500, label: "Out", frontColor: "#177AD5" },
    { value: 745, label: "Nov", frontColor: "#177AD5" },
    { value: 320, label: "Dez" },
    { value: 600, label: "Jan", frontColor: "#177AD5" },
    { value: 256, label: "Fev" },
  ];
  return (
    <View>
      <BarChart
        barWidth={30}
        noOfSections={3}
        barBorderRadius={4}
        frontColor="lightgray"
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
        xAxisLabelTextStyle={{
          color: theme.colors.mutedForeground,
          fontSize: 12,
        }}
        yAxisTextStyle={{ color: theme.colors.mutedForeground, fontSize: 12 }}
      />
    </View>
  );
};
