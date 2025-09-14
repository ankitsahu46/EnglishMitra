export const secondsUntilMidnight = () => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setHours(24, 0, 0, 0); // midnight of next day
  
  return Math.floor((tomorrow.getTime() - now.getTime()) / 1000);
};
