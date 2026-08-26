import { ActionResponse, ErrorResponse } from "@/app/types/global";
import handleError from "../handlers/error";

interface Job {
    jobId?: string;
    imageUrl?: string;
    jobTitle?: string;
    jobDescription?: string;
    jobLocation?: string;
    jobType?: string;
    actionLink?: string;
    salary?: string | number | null;
}

interface JobAPIResponse {
  job_id?: string;
  employer_logo?: string;
  job_title?: string;
  job_description?: string;
  job_location?: string;
  job_employment_type?: string;
  job_apply_link?: string;
  job_salary_string?: string | number | null;
}

interface JobParams {
    query?: string;
    location?: string;
    page?: number;
}

const BASE_URL: string = "jsearch.p.rapidapi.com";

export const getJobs = async ({
    query = "Next.js Developer",
    location = "",
    page = 1,
}: JobParams): Promise<ActionResponse<{
    jobs: Job[];
    isNext: boolean;
}>> => {
    try {
        const apiUrl = new URL("https://jsearch.p.rapidapi.com/search");

        if (location) {
            apiUrl.searchParams.set("query", `${query} in ${location}`);
        } else {
            apiUrl.searchParams.set("query", query);
        }
        apiUrl.searchParams.set("num_pages", "10");

        const response = await fetch(apiUrl, {
            next: { revalidate: 3600 },
            headers: {
                "x-rapidapi-key": process.env.JSEARCH_API_KEY as string,
                "x-rapidapi-host": BASE_URL,
            },
        });

        if (!response.ok) throw new Error("Failed to fetch jobs");

        const data = await response.json();

        return {
            success: true,
            data: {
                jobs: data.data.jobs.map((job: JobAPIResponse) => ({
                    jobId: job.job_id,
                    imageUrl: job.employer_logo,
                    jobTitle: job.job_title,
                    jobDescription: job.job_description,
                    jobLocation: job.job_location,
                    jobType: job.job_employment_type,
                    actionLink: job.job_apply_link,
                    salary: job.job_salary_string,
                })),
                isNext: data.status === "OK" && page < 10,
            },
        }
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};