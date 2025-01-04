import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from '@clerk/nextjs';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <img src="/logo.png" alt="logo" className="h-10 w-12 mr-2" />
          <span className="text-xl font-bold font-poppins">Dosnine</span>
        </div>
        <div className="flex items-center space-x-4">
          {/* Show dashboard link and user button if the user is signed in */}
          <SignedIn>
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
            <UserButton />
          </SignedIn>

          {/* Show signup and signin links if the user is signed out */}
          <SignedOut>
          <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
            {/* <Link href="/signin" className="text-sm font-medium">
              Sign In
            </Link>
            <Link href="/signup" className="text-sm font-medium">
              Sign Up
            </Link> */}
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;