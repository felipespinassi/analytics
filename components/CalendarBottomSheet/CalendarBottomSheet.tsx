import theme from "@/constants/theme";
import { dateRange } from "@/utils/selectDate";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Calendar, useDateRange } from "@marceloterreiro/flash-calendar";
import React, { useCallback, useMemo } from "react";
import { Alert, StyleSheet, View } from "react-native";
import BottomSheetContainer from "../BottomSheetContainer/BottomSheetContainer";
import Button from "../Button/Button";
import { Box } from "../RestyleComponents/RestyleComponents";

export const BottomSheetCalendar = ({
  setRangeSelected,
  bottomSheetRef,
}: {
  bottomSheetRef: any;

  setRangeSelected: (range: {
    from: string;
    to: string;
    label: string;
  }) => void;
}) => {
  const {
    calendarActiveDateRanges,
    onCalendarDayPress,
    dateRange: { endId, startId },
  } = useDateRange();

  const calendarTheme = useMemo(
    () => ({
      itemDayContainer: {
        activeDayFiller: {
          backgroundColor: theme.colors.primary,
        },
      },
      itemDay: {
        active: () => ({
          container: {
            backgroundColor: theme.colors.primary,
          },
          content: {
            color: theme.colors.background,
            fontWeight: "700" as const,
          },
        }),
      },
    }),
    [],
  );

  function onCancel() {
    setRangeSelected({
      from: dateRange[2].from,
      to: dateRange[2].to,
      label: dateRange[2].label,
    });
    bottomSheetRef.current?.close();
  }

  function onConfirm() {
    if (startId && endId) {
      setRangeSelected({
        from: startId,
        to: endId,
        label: "Personalizado",
      });
      bottomSheetRef.current?.close();
    } else {
      Alert.alert("Por favor, selecione um intervalo de datas válido.");
    }
  }

  // callbacks
  const onCloseBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <BottomSheetContainer
      snapPoints={["75%"]}
      onClose={onCloseBottomSheet}
      ref={bottomSheetRef}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <View style={styles.card}>
          <View style={styles.calendarContainer}>
            <Calendar.List
              calendarFormatLocale="pt"
              calendarColorScheme={"dark"}
              calendarActiveDateRanges={calendarActiveDateRanges}
              onCalendarDayPress={onCalendarDayPress}
              theme={calendarTheme}
            />
          </View>
        </View>
        <Box flexDirection="row" gap="m">
          <Box flex={1}>
            <Button onPress={onCancel}>Cancelar</Button>
          </Box>

          <Box flex={1}>
            <Button variant="primary" onPress={onConfirm}>
              Confirmar
            </Button>
          </Box>
        </Box>
      </BottomSheetView>
    </BottomSheetContainer>
  );
};

const styles = StyleSheet.create({
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    flex: 1,
    width: "100%",
    maxWidth: 420,
    height: "100%",
    minHeight: "80%",
    maxHeight: 640,
    backgroundColor: theme.colors.background,
    borderRadius: 16,
    padding: 12,
    zIndex: 1,
  },
  calendarContainer: {
    flex: 1,
  },
});
