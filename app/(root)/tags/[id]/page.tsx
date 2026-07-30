import { RouteParams } from "@/app/types/global";
import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import CommonFilter from "@/components/filters/CommonFilter";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { TagQuestionFilters } from "@/constants/filters";
import ROUTES from "@/constants/route";
import { EMPTY_QUESTION } from "@/constants/states";
import { getTagQuestions } from "@/lib/actions/tag.action";
import { capitalize } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

const page = async ({ params, searchParams }: RouteParams) => {
  const { id } = await params;
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getTagQuestions({
    tagId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  const { tag, questions, isNext } = data || {};

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">
          {capitalize(tag?.name || "")}
        </h1>
      </section>

      <section className="mx-auto mt-11 flex max-w-4xl justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          icon={
            <SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          }
          route={ROUTES.TAG(id)}
          placeholder="Search questions..."
          otherClasses="flex-1"
        />

        <CommonFilter
          filters={TagQuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </section>

      <DataRenderer
        success={success}
        error={error}
        data={questions}
        empty={EMPTY_QUESTION}
        render={(questions) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
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

export default page;
