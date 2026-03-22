import dayjs from "dayjs";

export const dateRange = [
  {
    from: dayjs().startOf("day").format("YYYY-MM-DDTHH:MM:ss"),
    to: dayjs().endOf("day").format("YYYY-MM-DDTHH:MM:ss"),
    label: "Hoje",
  },
  {
    from: dayjs()
      .subtract(7, "day")
      .startOf("day")
      .format("YYYY-MM-DDTHH:MM:ss"),
    to: dayjs().endOf("day").format("YYYY-MM-DDTHH:MM:ss"),
    label: "7 dias",
  },
  {
    from: dayjs()
      .subtract(15, "day")
      .startOf("day")
      .format("YYYY-MM-DDTHH:MM:ss"),
    to: dayjs().endOf("day").format("YYYY-MM-DDTHH:MM:ss"),
    label: "15 dias",
  },
  {
    from: dayjs()
      .subtract(30, "day")
      .startOf("day")
      .format("YYYY-MM-DDTHH:MM:ss"),
    to: dayjs().endOf("day").format("YYYY-MM-DDTHH:MM:ss"),
    label: "30 dias",
  },
];
