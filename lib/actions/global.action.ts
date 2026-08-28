"use server";

import { GlobalSearchParams, GlobalSearchResult } from "@/app/types/action";
import { ActionResponse, ErrorResponse } from "@/app/types/global";
import { Answer, Question, Tag, User } from "@/database";
import action from "../handlers/action";
import { GlobalSearchSchema } from "../validations";
import handleError from "../handlers/error";

const modelsAndTypes = [
  { model: Question, searchField: "title", type: "question" },
  { model: User, searchField: "name", type: "user" },
  { model: Answer, searchField: "content", type: "answer" },
  { model: Tag, searchField: "name", type: "tag" },
];

export const globalSearch = async (
  params: GlobalSearchParams
): Promise<ActionResponse<GlobalSearchResult[]>> => {
  const validationResult = await action({
    params,
    schema: GlobalSearchSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { query, type } = validationResult.params!;
  const regexQuery = { $regex: query, $options: "i" };

  const results: GlobalSearchResult[] = [];

  for (const { model, searchField, type: modelType } of modelsAndTypes) {
    if (type && type !== "all" && type !== modelType) continue;

    const queryResults = await model
      .find({ [searchField]: regexQuery })
      .limit(2);

    results.push(
      ...queryResults.map((item) => ({
        title:
          modelType === "answer"
            ? `Answers containing ${query}`
            : item[searchField],
        type: modelType,
        id: modelType === "answer" ? item.question : item._id,
      }))
    );
  }

  return {
    success: true,
    data: JSON.parse(JSON.stringify(results)),
  }
};
