import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ROUTES from "@/constants/route";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";

const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer" asChild>
        <Image
          src="/icons/hamburger.svg"
          width={32}
          height={32}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none p-6"
      >
        <SheetTitle className="hidden">Navigation</SheetTitle>
        <Link href={"/"} className="flex items-center gap-1">
          <Image
            src={"/images/site-logo.svg"}
            width={23}
            height={23}
            alt="Logo"
          />

          <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
            Code<span className="text-primary-500">Overflow</span>
          </p>
        </Link>

        <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <section className="flex h-full flex-col gap-5 pt-16">
              <NavLinks isMobileNav />
            </section>
          </SheetClose>

          <div className="flex flex-col gap-3 pt-6 border-t">
            <SheetClose asChild>
              <Link href={ROUTES.SIGN_IN}>
                <Button className="small-medium btn-secondary w-full rounded-lg py-3">
                  <span className="primary-text-gradient">Log In</span>
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
                <Link href={ROUTES.SIGN_UP}>
                    <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 w-full rounded-lg border py-3 shadow-none">
                        Sign Up
                    </Button>
                </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
