import { ActionResponse, Answer } from "@/app/types/global";
import DataRenderer from "../DataRenderer";
import { EMPTY_ANSWERS } from "@/constants/states";
import AnswerCard from "../cards/AnswerCard";
import CommonFilter from "../filters/CommonFilter";
import { AnswerFilters } from "@/constants/filters";
import Pagination from "../Pagination";

interface Props extends ActionResponse<Answer[]> {
  page: number;
  isNext: boolean;
  totalAnswers: number;
}

const AllAnswers = ({
  page,
  isNext,
  data,
  success,
  error,
  totalAnswers,
}: Props) => {
  return (
    <div className="mt-11">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="primary-text-gradient text-base font-semibold sm:text-lg">
          {totalAnswers} {totalAnswers === 1 ? "Answer" : "Answers"}
        </h3>
        <CommonFilter
          filters={AnswerFilters}
          otherClasses="min-h-[48px] w-full sm:w-auto sm:min-w-32"
          containerClasses="w-full sm:w-auto"
        />
      </div>
      <DataRenderer
        data={data}
        error={error}
        success={success}
        empty={EMPTY_ANSWERS}
        render={(answers) =>
          answers.map((answer) => <AnswerCard key={answer._id} {...answer} />)
        }
      />

      <Pagination page={page} isNext={isNext} containerClasses="mt-5" />
    </div>
  );
};

export default AllAnswers;
