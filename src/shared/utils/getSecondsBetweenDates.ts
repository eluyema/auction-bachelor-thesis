export const getSecondsBetweenDates = (date1: Date, date2: Date) => {
    const ms1 = date1.getTime();
    const ms2 = date2.getTime();

    const differenceInMs = Math.abs(ms1 - ms2);

    return Math.floor(differenceInMs / 1000);
};
