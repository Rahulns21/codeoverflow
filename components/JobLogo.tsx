"use client";

import Image from "next/image";
import { useState } from "react";
import JobIcon from "./icons/JobIcon";

interface Props {
  imageUrl?: string;
}

const JobLogo = ({ imageUrl }: Props) => {
  const [showImage, setShowImage] = useState(!!imageUrl);

  return (
    <div className="bg-light-800 dark:bg-dark-400 flex size-12 shrink-0 items-center justify-center rounded-md">
      {showImage && imageUrl ? (
        <Image
          src={imageUrl}
          alt="job-image"
          height={48}
          width={48}
          className="object-contain"
          onError={() => setShowImage(false)}
        />
      ) : (
        <JobIcon className="stroke-light-500 size-6" />
      )}
    </div>
  );
};

export default JobLogo;
