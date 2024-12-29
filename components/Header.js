import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:space-x-6">
          <Link
            href="/dashboard"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Dashboard
          </Link>
          <Link
            href="/onboard"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Onboard
          </Link>
        </nav>

        {/* User Button */}
        <div className="hidden md:flex items-center space-x-4">
          <SignedIn>
            <UserButton/>  
          </SignedIn>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="text-base hover:bg-transparent focus-visible:ring-0"
            onClick={toggleMenu}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </section>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white bg-opacity-90 p-4 z-50">
          <MobileNav toggleMenu={toggleMenu} />
        </div>
      )}
    </header>
  );
};

const MobileNav = ({ toggleMenu }) => {
  return (
    <div className="flex flex-col space-y-4">
      <Link
        href="/"
        className="text-foreground/60 transition-colors hover:text-foreground/80"
        onClick={toggleMenu}
      >
        Home
      </Link>
      <Link
        href="/jets-converter"
        className="text-foreground/60 transition-colors hover:text-foreground/80"
        onClick={toggleMenu}
      >
        Jets Converter
      </Link>
    </div>
  );
};

// Component for Button
const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Header;
