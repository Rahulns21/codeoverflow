import { auth } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import CommonFilter from "@/components/filters/CommonFilter";
import SearchIcon from "@/components/icons/SearchIcon";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { CollectionFilters } from "@/constants/filters";
import ROUTES from "@/constants/route";
import { EMPTY_QUESTION } from "@/constants/states";
import { getSavedQuestions } from "@/lib/actions/collection.action";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Collections = async ({ searchParams }: SearchParams) => {
  const session = await auth();

  console.log(`Session: ${session}`);

  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getSavedQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",
  });

  const { collection, isNext } = data || {};

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mx-auto mt-11 flex max-w-4xl justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          icon={
            <SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          }
          route={ROUTES.COLLECTION}
        />

        <CommonFilter
          filters={CollectionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <DataRenderer
        success={success}
        error={error}
        data={collection}
        empty={EMPTY_QUESTION}
        render={(collection) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {collection.map((item) => (
              <QuestionCard key={item._id} question={item.question} />
            ))}
          </div>
        )}
      />

      <Pagination
        page={page}
        isNext={isNext || false}
        containerClasses="mt-5"
      />
    </>
  );
};

export default Collections;
