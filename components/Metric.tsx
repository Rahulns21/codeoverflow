import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  imgUrl: string;
  alt: string;
  value?: string | number;
  title: string;
  textStyles: string;
  href?: string;
  imgStyles?: string;
  isAuthor?: boolean;
  fallback?: string;
  titleStyles?: string;
}

const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  textStyles,
  href,
  imgStyles,
  fallback,
  titleStyles
}: Props) => {
  const metricContent = (
    <>
      {imgUrl ? (
        <Image
          src={imgUrl}
          alt={alt}
          width={16}
          height={16}
          className={`size-5 rounded-full object-contain ${imgStyles}`}
        />
      ) : (
        <div className="primary-gradient flex-center font-space-grotesk size-5 rounded-full font-bold tracking-wider text-white">
          <span className="text-light-900 text-xs font-bold">{fallback}</span>
        </div>
      )}

      <p className={`${textStyles} flex items-center gap-1`}>
        {value}

        {title ? (
          <span
            className={cn(`small-regular line-clamp-1`, titleStyles)}
          >
            {title}
          </span>
        ) : null}
      </p>
    </>
  );

  return href ? (
    <Link href={href} className="flex-center gap-1">
      {metricContent}
    </Link>
  ) : (
    <div className="flex-center gap-1">{metricContent}</div>
  );
};

export default Metric;