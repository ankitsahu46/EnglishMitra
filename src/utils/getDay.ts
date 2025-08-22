export function getDay() {
  const today = new Date();
  const targetDate = new Date("2025-07-01");

  const diffMs = today.getTime() - targetDate.getTime();

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays + 1;
}
