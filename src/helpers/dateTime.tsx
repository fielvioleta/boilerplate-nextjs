import dayjs from "dayjs";

export const fullDateFormat = (time: any) => {
    return dayjs(time).format("ddd, MMM D, YYYY h:mm A");
};