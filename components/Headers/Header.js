import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { MdOutlineVerified } from "react-icons/md";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className=" sticky top-0 z-50 w-full  text-white bg-secondary-color bg-background/95  backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex items-center justify-between p-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <span
            className="text-xl font-medium font-poppins text-inherit	"
          >
            <Link href="/" >
            Dosnine

            </Link>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link href="/dashboard" className="text-inherit	  text-sm font-medium">
              Dashboard
            </Link>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <Link href="/dashboard" className=" text-inherit	 text-sm font-medium">
              Dashboard
            </Link>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;
