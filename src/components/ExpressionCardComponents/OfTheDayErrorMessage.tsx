export const OfTheDayErrorMessage = ({ type }: { type: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-8 bg-gradient-to-b from-gray-50 to-gray-100 animate-in fade-in">
      <span className="text-5xl">🚫</span>
      <span className="text-xl font-bold text-gray-700 drop-shadow">
        Oops! Something went wrong
      </span>
      <span className="text-base text-gray-500 font-semibold">
        {`Couldn't fetch ${type} of the day.`}
      </span>
    </div>
  );
};