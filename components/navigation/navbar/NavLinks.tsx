"use client";
import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const pathname = usePathname();
  const userId = 1;

  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        const route =
          item.route === "/profile"
            ? userId
              ? `${item.route}/${userId}`
              : null
            : item.route;

        if (!route) return null;

        const LinkComponent = (
          <Link
            href={route}
            key={item.label}
            className={cn(
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300_light900",
              "flex items-center gap-4 p-4"
            )}
          >

            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn(
                { "invert-colors": !isActive },
              )}
            />

            <p
              className={cn(
                isActive ? "base-bold" : "base-medium",
                !isMobileNav && "max-lg:hidden"
              )}
            >
              {item.label}
            </p>
          </Link>
        );

        return isMobileNav ? (
          <SheetClose asChild key={route}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={route}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
};

export default NavLinks;