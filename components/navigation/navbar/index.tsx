import Image from "next/image";
import Link from "next/link";
import Theme from "./Theme";
import MobileNavigation from "./MobileNavigation";
import { auth } from "@/auth";
import UserAvatar from "@/components/UserAvatar";
import GlobalSearch from "@/components/search/GlobalSearch";
import { User } from "@/database";

const Navbar = async () => {
  const session = await auth();

  const dbUser = session?.user?.id ? await User.findById(session.user.id).select("name image").lean() : null;

  return (
    <nav className="flex-between background-light900_dark200 shadow-light-300 fixed z-50 w-full gap-5 p-6 sm:px-12 dark:shadow-none items-center flex">
      <Link href={"/"} className="flex items-center gap-1">
        <Image
          src="/images/site-logo.svg"
          width={23}
          height={23}
          alt="DevFlow Logo"
        />

        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Code<span className="text-primary-500">Overflow</span>
        </p>
      </Link>

      <GlobalSearch />

      <div className="flex-between gap-5">
        <Theme />

        {dbUser && <UserAvatar 
        id={dbUser._id.toString()}
        name={dbUser.name}
        imageUrl={dbUser.image} />}

        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
