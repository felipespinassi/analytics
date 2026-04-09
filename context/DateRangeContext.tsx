import { BottomSheetCalendar } from "@/components/CalendarBottomSheet/CalendarBottomSheet";
import { Box } from "@/components/RestyleComponents/RestyleComponents";
import { dateRange } from "@/utils/selectDate";
import BottomSheet from "@gorhom/bottom-sheet";
import { createContext, useRef, useState } from "react";

export const DateRangeContext = createContext({} as any);

export function DateRangeProvider({ children }: { children: React.ReactNode }) {
  //  const bottomSheetRef = useRef<BottomSheet>(null);
  const [rangeSelected, setRangeSelected] = useState({
    from: dateRange[3].from,
    to: dateRange[3].to,
    label: dateRange[3].label,
  });
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <DateRangeContext.Provider
      value={{ rangeSelected, setRangeSelected, bottomSheetRef }}
    >
      <Box flex={1}>
        {children}
        <BottomSheetCalendar
          setRangeSelected={setRangeSelected}
          bottomSheetRef={bottomSheetRef}
        />
      </Box>
    </DateRangeContext.Provider>
  );
}
