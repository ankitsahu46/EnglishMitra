export const validateDayParam = (dayStr: string): number => {
  const day = parseInt(dayStr, 10);
  return (isNaN(day) || day < 1) ? 1 : day;
}