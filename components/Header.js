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
      <section className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            Dosnine
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
        <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className="text-sm font-medium">
              Sign In
            </Link>
            <Link href="/sign-up" className="text-sm font-medium">
              Sign Up
            </Link>
            
          </SignedOut>
       

        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </section>
      {isOpen && (
        <section className="md:hidden container flex flex-col items-center space-y-4 py-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className="text-sm font-medium">
              Sign In
            </Link>
            <Link href="/sign-up" className="text-sm font-medium">
              Sign Up
            </Link>
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
          </SignedOut>
        </section>
      )}
    </header>
  );
};

export default Header;