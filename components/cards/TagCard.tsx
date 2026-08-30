import ROUTES from "@/constants/route";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import {
  capitalize,
  cn,
  getDeviconClassName,
  getTechDescription,
} from "@/lib/utils";
import Image from "next/image";

interface Props {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const handleClick = (e: React.MouseEvent) => {
  e.preventDefault();
};

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  compact,
  remove,
  isButton,
  handleRemove,
}: Props) => {
  const iconClass = getDeviconClassName(name);
  const iconDescription = getTechDescription(name);

  const Content = (
    <>
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 flex flex-row gap-2 rounded-md border-none p-3 uppercase">
        <div className="flex-center space-x-2">
          <i className={`${iconClass} text-sm`}></i>
          <span>{name}</span>
        </div>

        {remove && (
          <Image
            src={"/icons/close.svg"}
            width={12}
            height={12}
            alt="close icon"
            className="cursor-pointer object-contain invert-0 dark:invert"
            onClick={handleRemove}
          />
        )}
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">{questions}</p>
      )}
    </>
  );

  if (compact) {
    return isButton ? (
      <button onClick={handleClick} className="flex justify-between gap-2">
        {Content}
      </button>
    ) : (
      <Link href={ROUTES.TAG(_id)} className="flex justify-between gap-2">
        {Content}
      </Link>
    );
  }

  return (
    <Link
      href={ROUTES.TAG(_id)}
      className="shadow-light100_darknone block min-w-0"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-4 py-5 sm:px-6 sm:py-8 xl:px-3 xl:py-4">
        <div className="flex items-center justify-between gap-2 xl:gap-1.5">
          <i
            className={cn(iconClass, "shrink-0 text-2xl xl:text-xl")}
            aria-hidden="true"
          />
          <div className="bg-light-800 dark:bg-dark-800 w-fit overflow-hidden rounded-sm px-2 py-1.5 sm:px-4 sm:py-1.5 xl:px-3 xl:py-1">
            <p className="paragraph-semibold text-dark300_light900 truncate xl:text-sm">
              {name}
            </p>
          </div>
        </div>

        <p className="small-regular text-dark500_light700 mt-4 line-clamp-2 w-full sm:mt-5 xl:text-xs">
          {capitalize(iconDescription)}
        </p>

        <p className="small-medium text-dark400_light500 mt-3.5">
            <span className="body-semibold primary-text-gradient mr-2.5">
                {questions}+
            </span>
            Questions
        </p>
      </article>
    </Link>
  );
};

export default TagCard;
