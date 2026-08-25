import ROUTES from "@/constants/route";
import { formatSalary } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import JobIcon from "../icons/JobIcon";
import LocationIcon from "../icons/LocationIcon";

interface Props {
  imageUrl?: string;
  jobTitle?: string;
  jobDescription?: string;
  jobLocation?: string;
  jobType?: string;
  actionLink?: string;
  salary?: string | number | null;
}

const JobCard = ({
  imageUrl,
  jobTitle,
  jobDescription,
  jobLocation,
  jobType,
  actionLink,
  salary,
}: Props) => {
  return (
    <div className="card-wrapper rounded-xl border-[0.5px] p-8 sm:px-11">
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-10">
        <div className="flex shrink-0 max-sm:flex-row max-sm:items-center max-sm:justify-between sm:mt-1">
          {/* LOGO or JOB ICON */}
          <div className="bg-light-800 dark:bg-dark-400 flex size-12 shrink-0 items-center justify-center rounded-md">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="job-image"
                height={48}
                width={48}
                className="object-contain"
              />
            ) : (
              <JobIcon className="stroke-light-500 size-6" />
            )}
          </div>

          {/* LOCATION PILL - SMALL SCREENS */}
          <div className="background-light800_dark400 flex w-fit items-center gap-2 rounded-full px-2 py-2 sm:hidden sm:px-4 sm:py-1.5 xl:px-3 xl:py-1">
            <LocationIcon className="stroke-light-500 size-4" />
            <span className="body-medium truncate">{jobLocation}</span>
          </div>
        </div>

        <div className="flex w-full flex-col max-sm:mt-4">
          <div className="flex items-start justify-between gap-4 sm:items-center">
            <div className="min-w-0 flex-1">
              <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-2 w-full wrap-break-word">
                {jobTitle}
              </h3>
            </div>

            {/* LOCATION PILL */}
            <div className="background-light800_dark400 flex w-fit items-center gap-2 rounded-full px-2 py-2 max-sm:hidden sm:px-4 sm:py-1.5 xl:px-3 xl:py-1">
              <LocationIcon className="stroke-light-500 size-4" />
              <span className="body-medium truncate">{jobLocation}</span>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-4">
            {/* DESCRIPTION */}
            <p className="text-dark500_light700 line-clamp-2 w-full text-sm">
              {jobDescription}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex justify-start gap-5 sm:justify-between">
                {jobType && (
                  <div className="flex items-center gap-2">
                    <span>
                      <Image
                        src={"/icons/clock-2.svg"}
                        alt="clock"
                        height={18}
                        width={18}
                      />
                    </span>
                    <p className="text-light-500 text-sm font-medium">
                      {jobType}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-1">
                  <span>
                    <Image
                      src={"/icons/currency-dollar-circle.svg"}
                      alt="dollar"
                      height={18}
                      width={18}
                    />
                  </span>
                  <p className="text-light-500 text-sm font-medium">
                    {formatSalary(salary)}
                  </p>
                </div>
              </div>
              <div className="primary-text-gradient flex cursor-pointer items-center gap-2">
                <Link
                  href={actionLink ?? `${ROUTES.HOME}`}
                  className="body-semibold relative z-10"
                >
                  <p>View job</p>
                </Link>
                <span>
                  <Image
                    src={"icons/arrow-up-right.svg"}
                    alt="arrow-up-right"
                    height={18}
                    width={18}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
