import React, { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  ExpressionCard,
  ExpressionCardSkeleton,
  MaxWidthWrapper,
  SearchErrorMessage,
} from "@/components";

interface SearchExpressionProps {
  searchParams: { query?: string };
}

const SearchExpression = async ({ searchParams }: SearchExpressionProps) => {
  const query = (await searchParams).query;
  const defaultQueryHref = `/search-expression?query=${encodeURIComponent(
    "welcome".toLowerCase().trim()
  )}`;

  return (
    <div className="flex-1 flex flex-col">
      <section className="bg-slate-100 py-12 flex-1 flex flex-col">
        <MaxWidthWrapper className="flex flex-col justify-center gap-12 flex-1">
          {!query && (
            <>
              <div className="text-center text-gray-500 h-full flex flex-col items-center">
                <p>Enter a word, phrasal verb, or idiom to search.</p>
                <div className="flex gap-1">
                  <span>Try</span>
                  <span>
                    <a
                      href={defaultQueryHref}
                      className="flex font-bold italic ml-1"
                    >
                      welcome
                      <ArrowUpRight />
                    </a>
                  </span>
                </div>
              </div>
            </>
          )}
          {query && (
            <Suspense fallback={<ExpressionCardSkeleton />}>
              <SearchResultSection query={query} />
            </Suspense>
          )}
        </MaxWidthWrapper>
      </section>
    </div>
  );
};

export default SearchExpression;
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.

const fetchExpressionByQuery = async (query: string) => {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/search-expression?query=${encodeURIComponent(query.toLowerCase().trim())}`
    // { cache: "no-store" }
  );
  if (!res.ok) {
    const data = await res.json();
    if (Array.isArray(data.suggestions) && typeof data.suggestions[0] === "string") {
      return data;
    }
    throw new Error("No Data Found");
  }
  return res.json();
};

const SearchResultSection = async ({ query }: { query: string }) => {
  try {
    const data = await fetchExpressionByQuery(query);
    if (Array.isArray(data.suggestions) && typeof data.suggestions[0] === "string") {
      return (
        <SearchErrorMessage
          message={"Couldn't find the data."}
          query={query}
          suggestions={data.suggestions}
        />
      );
    }
    if (!data || !data.data) {
      throw new Error("No data found");
    }
    return <ExpressionCard data={data.data} type={data.type} />;
  } catch (err) {
    console.log("No result Found", err);
    return <SearchErrorMessage message={"No result Found"} query={query} />;
  }
};
// import React, { Suspense } from "react";
// import { ArrowUpRight } from "lucide-react";
// import {
//   ExpressionCard,
//   ExpressionCardSkeleton,
//   MaxWidthWrapper,
//   SearchErrorMessage,
// } from "@/components";

// interface SearchExpressionProps {
//   searchParams: { query?: string };
// }

// const SearchExpression = async ({ searchParams }: SearchExpressionProps) => {
//   const query = (await searchParams).query;
//   const defaultQueryHref = `/search-expression?query=${encodeURIComponent(
//     "welcome".toLowerCase().trim()
//   )}`;

//   return (
//     <div className="flex-1 flex flex-col">
//       <section className="bg-slate-100 py-12 flex-1 flex flex-col">
//         <MaxWidthWrapper className="flex flex-col justify-center gap-12 flex-1">
//           {!query && (
//             <>
//               <div className="text-center text-gray-500 h-full flex flex-col items-center">
//                 <p>Enter a word, phrasal verb, or idiom to search.</p>
//                 <div className="flex gap-1">
//                   <span>Try</span>
//                   <span>
//                     <a
//                       href={defaultQueryHref}
//                       className="flex font-bold italic ml-1"
//                     >
//                       welcome
//                       <ArrowUpRight />
//                     </a>
//                   </span>
//                 </div>
//               </div>
//             </>
//           )}
//           {query && (
//             <Suspense fallback={<ExpressionCardSkeleton />}>
//               <SearchResultSection query={query} />
//             </Suspense>
//           )}
//         </MaxWidthWrapper>
//       </section>
//     </div>
//   );
// };

// export default SearchExpression;
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.

// const fetchExpressionByQuery = async (query: string) => {
//   const res = await fetch(
//     `${
//       process.env.NEXT_PUBLIC_API_URL
//     }/search-expression?query=${encodeURIComponent(query.toLowerCase().trim())}`
//     // { cache: "no-store" }
//   );
//   if (!res.ok) throw new Error("No result Found");
//   return res.json();
// };

// const SearchResultSection = async ({ query }: { query: string }) => {
//   try {
//     const data = await fetchExpressionByQuery(query);

//     if (Array.isArray(data.message) && typeof data.message[0] === "string") {
//       return <SearchErrorMessage message={"Couldn't find the data."} query={query} suggetion={data.message}/>
//     }
//     if (!data || !data.data) {
//       throw new Error("No data found");
//     }
//     return <ExpressionCard data={data.data} type={data.type} />;
//   } catch (err) {
//     const message = err instanceof Error ? err.message : "No result Found";
//     return <SearchErrorMessage message={message} query={query} />;
//   }
// };
