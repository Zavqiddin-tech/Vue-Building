const addZero = (val) => (val > 9 ? val : `0${val}`);

export const convertDate = (date, type = 0) => {
  let d = new Date(date);

  if (d && d instanceof Date && !isNaN(d) && date.length > 10) {
    return type == 0
      ? `${addZero(d.getHours())}:${addZero(d.getMinutes())} | ${addZero(
          d.getDate()
        )}.${addZero(d.getMonth() + 1)}.${d.getFullYear()}`
      : type == 1
      ? `${addZero(d.getDate())}.${addZero(
          d.getMonth() + 1
        )}.${d.getFullYear()}`
      : `${addZero(d.getHours())}:${addZero(d.getMinutes())}`;
  }
};
