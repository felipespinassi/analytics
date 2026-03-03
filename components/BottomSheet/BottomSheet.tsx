import { marketplaces } from "@/constants/marketplaces";
import { useGetMarketplaces } from "@/hooks/useGetMarketplaces";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { Image, StyleSheet } from "react-native";
import { Box, Text } from "../RestyleComponents/RestyleComponents";
import { TouchableOpacityBox } from "../TouchableOpacityBox/TouchableOpacityBox";

const BottomSheetComponent = forwardRef<BottomSheet>((props, ref) => {
  const snapPoints = useMemo(() => ["75%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const { data } = useGetMarketplaces();

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
    >
      <BottomSheetView style={styles.contentContainer}>
        {/* <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacityBox
              borderRadius="full"
              padding="xs"
              backgroundColor="cardInfoBackground"
            >
              <Image
                resizeMode="contain"
                source={require("../../assets/mercadolivre.png")}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacityBox>
          )}
          data={marketplaces}
        /> */}
        <Text mb="s" fontSize={16} fontWeight="bold">
          Marketplaces
        </Text>
        <Box gap="m" flexDirection="row" flexWrap="wrap">
          {data?.marketplaces.map((marketplace: any) => (
            <TouchableOpacityBox
              borderRadius="s"
              bg="gray100"
              key={marketplace}
              paddingHorizontal="s"
            >
              <Image
                resizeMode="contain"
                source={marketplaces[marketplace as keyof typeof marketplaces].logo}
                style={{ width: 60, height: 30 }}
              />
            </TouchableOpacityBox>
          ))}
        </Box>
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
  },
});

export default BottomSheetComponent;
