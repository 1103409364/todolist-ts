export const timeFilter = (timestamp: number): string => {
  const DATE: Date = new Date(timestamp);

  const Y: string = DATE.getFullYear() + '';
  const M: string =
    DATE.getMonth() < 10
      ? '0' + (DATE.getMonth() + 1)
      : DATE.getMonth() + 1 + '';
  const D: string =
    DATE.getDate() < 10 ? '0' + DATE.getDate() : DATE.getDate() + '';
  const HH: string =
    DATE.getHours() < 10 ? '0' + DATE.getHours() : DATE.getHours() + '';
  const MM: string =
    DATE.getMinutes() < 10 ? '0' + DATE.getMinutes() : DATE.getMinutes() + '';
  const SS: string =
    DATE.getSeconds() < 10 ? '0' + DATE.getSeconds() : DATE.getSeconds() + '';
  return `${Y}-${M}-${D} ${HH}:${MM}:${SS}`;
};
