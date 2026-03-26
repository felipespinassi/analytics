import dayjs from "dayjs";

export const dateRange = [
  {
    from: dayjs().format("YYYY-MM-DD"),
    to: dayjs().format("YYYY-MM-DD"),
    label: "Hoje",
  },
  {
    from: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
    to: dayjs().format("YYYY-MM-DD"),
    label: "7 dias",
  },
  {
    from: dayjs().subtract(15, "day").format("YYYY-MM-DD"),
    to: dayjs().format("YYYY-MM-DD"),
    label: "15 dias",
  },
  {
    from: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
    to: dayjs().format("YYYY-MM-DD"),
    label: "30 dias",
  },
];
