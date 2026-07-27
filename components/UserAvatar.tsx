import ROUTES from "@/constants/route";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { cn, initials } from "@/lib/utils";

interface Props {
  id: string;
  name: string;
  imageUrl?: string;
  className?: string;
  fallbackClassname?: string;
}

const UserAvatar = ({
  id,
  name,
  imageUrl,
  className = "h-9 w-9 rounded-full overflow-hidden",
  fallbackClassname,
}: Props) => {
  return (
    <Link href={ROUTES.PROFILE(id)}>
      <Avatar className={cn('relative', className)}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            className="rounded-full object-cover"
            fill
            quality={100}
          />
        ) : (
          <AvatarFallback
            className={cn(
              "primary-gradient font-space-grotesk font-bold tracking-wider text-white",
              fallbackClassname
            )}
          >
            {initials(name)}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
