import dayjs from "dayjs";

export const dateRange = [
  {
    from: dayjs().startOf("day").add(3, "hour").format("YYYY-MM-DDTHH:mm:ss"),
    to: dayjs().endOf("day").add(3, "hour").format("YYYY-MM-DDTHH:mm:ss"),
    label: "Hoje",
  },
  {
    from: dayjs()
      .startOf("day")
      .subtract(7, "day")
      .add(3, "hour")
      .format("YYYY-MM-DDTHH:mm:ss"),
    to: dayjs().endOf("day").add(3, "hour").format("YYYY-MM-DDTHH:mm:ss"),
    label: "7 dias",
  },
  {
    from: dayjs()
      .startOf("day")
      .subtract(15, "day")
      .add(3, "hour")
      .format("YYYY-MM-DDTHH:mm:ss"),
    to: dayjs().endOf("day").add(3, "hour").format("YYYY-MM-DDTHH:mm:ss"),
    label: "15 dias",
  },
  {
    from: dayjs()
      .startOf("day")
      .subtract(30, "day")
      .add(3, "hour")
      .format("YYYY-MM-DDTHH:mm:ss"),
    to: dayjs().endOf("day").add(3, "hour").format("YYYY-MM-DDTHH:mm:ss"),
    label: "30 dias",
  },
];
