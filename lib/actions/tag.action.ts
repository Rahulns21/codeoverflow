import { GetTagQuestionsParams } from "@/app/types/action";
import {
  ActionResponse,
  ErrorResponse,
  PaginatedSearchParams,
  Question,
  Tag as TagParams,
} from "@/app/types/global";
import { Question as QuestionModel, Tag, Tag as TagModel } from "@/database";
import { QueryFilter } from "mongoose";
import action from "../handlers/action";
import handleError from "../handlers/error";
import {
  GetTagQuestionsSchema,
  PaginatedSearchParamsSchema,
} from "../validations";
import dbConnect from "../mongoose";
import { cache } from "react";

export const getTags = cache(async (
  params: PaginatedSearchParams
): Promise<ActionResponse<{ tags: TagParams[]; isNext: boolean }>> => {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter } = params;
  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);
  const filterQuery: QueryFilter<typeof TagModel> = {};

  if (query) {
    filterQuery.$or = [{ name: { $regex: query, $options: "i" } }];
  }

  let sortCriteria = {};

  switch (filter) {
    case "popular":
      sortCriteria = { questions: -1 };
      break;
    case "recent":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "name":
      sortCriteria = { name: 1 };
      break;
    default:
      sortCriteria = { questions: -1 };
      break;
  }

  try {
    const totalTags = await TagModel.countDocuments(filterQuery);

    const tags = await TagModel.find(filterQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalTags > skip + tags.length;

    return {
      success: true,
      data: {
        tags: JSON.parse(JSON.stringify(tags)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
});

export const getTagQuestions = cache(async (
  params: GetTagQuestionsParams
): Promise<
  ActionResponse<{ tag: TagParams; questions: Question[]; isNext: boolean }>
> => {
  const validationResult = await action({
    params,
    schema: GetTagQuestionsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, tagId, filter } = params;

  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  try {
    const tag = await TagModel.findById(tagId);
    if (!tag) throw new Error("Tag not found");

    const filterQuery: QueryFilter<typeof QuestionModel> = {
      tags: { $in: [tagId] },
    };

    if (query) {
      filterQuery.title = { $regex: query, $options: "i" };
    }

    let sortCriteria: Record<string, 1 | -1> = {};

    switch (filter) {
      case "newest":
        sortCriteria = { createdAt: -1 };
        break;
      case "oldest":
        sortCriteria = { createdAt: 1 };
        break;
      case "mostvoted":
        sortCriteria = { upvotes: -1 };
        break;
      case "mostviewed":
        sortCriteria = { views: -1 };
        break;
      case "mostanswered":
        sortCriteria = { answers: -1 };
        break;
      case "trending":
        sortCriteria = { views: -1, upvotes: -1 };
        break;
      default:
        sortCriteria = { createdAt: -1 };
    }

    const totalQuestions = await QuestionModel.countDocuments(filterQuery);

    const questions = await QuestionModel.find(filterQuery)
      .select("_id title views answers upvotes downvotes author createdAt")
      .populate([
        { path: "author", select: "name image" },
        { path: "tags", select: "name" },
      ])
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalQuestions > skip + questions.length;

    return {
      success: true,
      data: {
        tag: JSON.parse(JSON.stringify(tag)),
        questions: JSON.parse(JSON.stringify(questions)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
});

export const getTopTags = cache(async (): Promise<ActionResponse<TagParams[]>> => {
  try {
    await dbConnect();

    const tags = await Tag.find().sort({ questions: -1 }).limit(5).lean();

    return {
      success: true,
      data: tags,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
});
