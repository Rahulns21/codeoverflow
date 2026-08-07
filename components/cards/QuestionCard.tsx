import ROUTES from "@/constants/route";
import { getTimeStamp, initials } from "@/lib/utils";
import Link from "next/link";
import TagCard from "./TagCard";
import Metric from "../Metric";
import { Question, Tag } from "@/app/types/global";

interface Props {
  question: Question;
}

const QuestionCard = ({
  question: { _id, title, tags, author, createdAt, upvotes, answers, views },
}: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col items-start justify-between gap-2 sm:gap-5 sm:flex-row">
        <div className="w-full">
          <Link href={ROUTES.QUESTION(_id)}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-2 wrap-break-word w-full">
              {title}
            </h3>
          </Link>
        </div>
      </div>

      <div className="mt-3.5 flex w-full flex-wrap gap-2">
        {tags.map((tag: Tag) => (
          <TagCard 
          key={tag._id}
          _id={tag._id}
          name={tag.name}
          compact />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.image}
          alt={author.name} 
          value={author.name}
          title={`• asked ${getTimeStamp(createdAt)}`}
          href={ROUTES.PROFILE(author._id)}
          textStyles="body-medium text-dark400_light700 break-words" 
          isAuthor
          fallback={initials(author.name)}
          titleStyles="xl:flex-nowrap flex-wrap"
        />

        <div className="flex items-center gap-3 
        max-sm:flex-nowrap">
          <Metric 
          imgUrl="/icons/like.svg"
          alt="like"
          value={upvotes}
          title=""
          textStyles="small-medium
          text-dark400_light800" 
        />
        <Metric 
          imgUrl="/icons/message.svg"
          alt="answers"
          value={answers}
          title=""
          textStyles="small-medium
          text-dark400_light800" 
        />
        <Metric 
          imgUrl="/icons/eye.svg"
          alt="views"
          value={views}
          title=""
          textStyles="small-medium
          text-dark400_light800" 
        />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
