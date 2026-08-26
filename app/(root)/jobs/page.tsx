import JobCard from "@/components/cards/JobCard";
import DataRenderer from "@/components/DataRenderer";
import CommonFilter from "@/components/filters/CommonFilter";
import SearchIcon from "@/components/icons/SearchIcon";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { LocationFilters } from "@/constants/filters";
import ROUTES from "@/constants/route";
import { EMPTY_JOBS } from "@/constants/states";
import { getJobs } from "@/lib/actions/job.action";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

export const dynamic = "force-dynamic";

const FindJobs = async ({ searchParams }: SearchParams) => {
  const { query, location, page } = await searchParams;

  const { success, data, error } = await getJobs({
    query: query || "Next.js Developer",
    location: location || "",
    page: Number(page) || 1,
  });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={ROUTES.JOBS}
          icon={
            <SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          }
          placeholder="Job Title, Company, or Keywords"
        />

        <CommonFilter
          filters={LocationFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <DataRenderer
        success={success}
        error={error}
        data={data?.jobs}
        empty={EMPTY_JOBS}
        render={(jobs) => (
          <div className="mt-10 flex flex-col gap-10">
            {jobs.map((job) => (
              <JobCard key={job.jobId} {...job} />
            ))}
          </div>
        )}
      />

      <Pagination
        page={Number(page) || 1}
        isNext={data?.isNext || false}
        containerClasses="mt-10"
      />
    </div>
  );
};

export default FindJobs;
