import dayjs from "dayjs";

export const dateRange = [
  // {
  //   from: dayjs().startOf("day").format("YYYY-MM-DD"),
  //   to: dayjs().endOf("day").format("YYYY-MM-DD"),
  //   label: "Hoje",
  // },
  {
    from: dayjs().subtract(7, "day").startOf("day").format("YYYY-MM-DD"),
    to: dayjs().endOf("day").format("YYYY-MM-DD"),
    label: "7 dias",
  },
  {
    from: dayjs().subtract(15, "day").startOf("day").format("YYYY-MM-DD"),
    to: dayjs().endOf("day").format("YYYY-MM-DD"),
    label: "15 dias",
  },
  {
    from: dayjs().subtract(11, "day").startOf("day").format("YYYY-MM-DD"),
    to: dayjs().endOf("day").format("YYYY-MM-DD"),
    label: "30 dias",
  },

  {
    from: "",
    to: "",
    label: "Personalizado",
  },
];
