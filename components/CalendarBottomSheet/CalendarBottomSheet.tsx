import theme from "@/constants/theme";
import { dateRange } from "@/utils/selectDate";
import { Calendar, useDateRange } from "@marceloterreiro/flash-calendar";
import React, { useMemo } from "react";
import { Alert, Modal, Pressable, StyleSheet, View } from "react-native";
import Button from "../Button/Button";
import { Box } from "../RestyleComponents/RestyleComponents";

export const BottomSheetCalendar = ({
  isOpen,
  setIsOpen,
  setRangeSelected,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
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
    setIsOpen(false);
    setRangeSelected({
      from: dateRange[2].from,
      to: dateRange[2].to,
      label: dateRange[2].label,
    });
  }

  function onConfirm() {
    if (startId && endId) {
      setRangeSelected({
        from: startId,
        to: endId,
        label: "Personalizado",
      });
      setIsOpen(false);
    } else {
      Alert.alert("Por favor, selecione um intervalo de datas válido.");
    }
  }
  return (
    <Modal
      animationType="fade"
      transparent
      visible={isOpen}
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <Pressable
          style={styles.backdropOverlay}
          onPress={() => setIsOpen(false)}
        />
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

          <Box flexDirection="row" gap="m">
            <Button onPress={onCancel}>Cancelar</Button>

            <Button variant="primary" onPress={onConfirm}>
              Confirmar
            </Button>
          </Box>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    height: "75%",
    minHeight: 420,
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
