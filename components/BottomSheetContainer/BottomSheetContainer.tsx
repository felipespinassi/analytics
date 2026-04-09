import { Theme } from "@/constants/theme";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useTheme } from "@shopify/restyle";
import React from "react";

const renderBackdrop = (props: any) => (
  <BottomSheetBackdrop
    {...props}
    disappearsOnIndex={-1}
    appearsOnIndex={0}
    opacity={0.6}
  />
);

export default function BottomSheetContainer({
  ref,
  onClose,
  children,
  snapPoints,
  enableContentPanningGesture = true,
}: {
  ref: React.RefObject<BottomSheet | null>;
  onClose?: () => void;
  children: React.ReactNode;
  snapPoints?: number[] | string[];
  enableContentPanningGesture?: boolean;
}) {
  const theme = useTheme<Theme>();

  return (
    <BottomSheet
      containerStyle={{ flex: 1 }}
      backdropComponent={renderBackdrop}
      index={-1}
      enablePanDownToClose={true}
      enableContentPanningGesture={enableContentPanningGesture}
      onClose={() => onClose && onClose()}
      ref={ref}
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: theme.colors.background,
      }}
      handleStyle={{
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
      handleIndicatorStyle={{
        backgroundColor: theme.colors.primary,
      }}
    >
      {children}
    </BottomSheet>
  );
}
