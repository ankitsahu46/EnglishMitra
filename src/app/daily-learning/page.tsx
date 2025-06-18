import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { fetchData } from "@/utils";
import OfTheDayComponent from "@/components/OfTheDayComponents/OfTheDayCmpt";


const Page = async () => {
  const day = 19;
  const wordOfTheDayData = await fetchData(
    `${process.env.NEXT_PUBLIC_API_URL}/word-of-the-day/${day}`
  );
  const pVOfTheDayData = await fetchData(
    `${process.env.NEXT_PUBLIC_API_URL}/phrasalVerb-of-the-day/${day}`
  );
  const idiomOfTheDayData = await fetchData(
    `${process.env.NEXT_PUBLIC_API_URL}/idiom-of-the-day/${day}`
  );

  return (
    <div>
      <section className="bg-slate-100 py-12">
        <MaxWidthWrapper className="flex flex-col gap-12">
          {wordOfTheDayData && (
            <OfTheDayComponent data={wordOfTheDayData} type={"word"} />
          )}
          {pVOfTheDayData && (
            <OfTheDayComponent data={pVOfTheDayData} type={"phrasalVerb"} />
          )}
          {idiomOfTheDayData && (
            <OfTheDayComponent data={idiomOfTheDayData} type={"idiom"} />
          )}

          {!wordOfTheDayData 
          && !pVOfTheDayData 
          && !idiomOfTheDayData && (
            <div className="text-center text-gray-600">
              <p className="text-lg font-semibold">
                {" "}
                No data available for today.
              </p>
              <p className="text-sm">Please check back later.</p>
            </div>
          )}
        </MaxWidthWrapper>
      </section>
    </div>
  );
};

export default Page;
