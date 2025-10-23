"use client";

import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/services/marketing", label: "Marketing" },
  { href: "/services/it-solutions", label: "Technology" },
  { href: "/recruitment", label: "Recruitment" },
  // { href: "/about", label: "About Us" },
  // { href: "/blog", label: "Blog" },
  // { href: "/careers", label: "Careers" },
];


const Header: React.FC = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
        <header className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-2xl shadow-lg border border-gray-100 w-[90%] max-w-4xl transform-gpu">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between h-10">
              <div className="flex justify-start">
                <Link href="/" className="flex items-center">
                  <Image
                      src="/home/WWA - Black 1.png"
                      alt="WWA Logo"
                      width={100}
                      height={32}
                      priority
                      className="h-8 w-auto"
                  />
                </Link>
              </div>
              <div className="flex-1 flex justify-center hidden md:flex">
                <div className="flex items-center space-x-6">
                  {navLinks.map((link) => (
                      <Link
                          key={link.label}
                          href={link.href}
                          className="text-black hover:text-gray-600 font-medium transition-colors"
                      >
                        {link.label}
                      </Link>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <div className="hidden md:block">
                  <Link href="/contact">
                    <Button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium">
                      Contact us
                    </Button>
                  </Link>
                </div>
                <div className="md:hidden">
                  <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>
    );
  }

  return (
      <header className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-2xl shadow-lg border border-gray-100 w-[90%] max-w-4xl transform-gpu">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between h-10">
            {/* Logo */}
            <div className="flex justify-start">
              <Link href="/" className="flex items-center">
                <Image
                    src="/home/WWA - Black 1.png"
                    alt="WWA Logo"
                    width={100}
                    height={32}
                    priority
                    className="h-8 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation (Centered) */}
            <nav className="flex-1 justify-center hidden md:flex">
              <div className="flex items-center space-x-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className="text-black hover:text-gray-600 font-medium transition-colors"
                    >
                      {link.label}
                    </Link>
                ))}
              </div>
            </nav>

            {/* Contact Us Button and Mobile Menu Trigger (Right Aligned) */}
            <div className="flex justify-end">
              <div className="hidden md:block">
                <Link href="/contact">
                  <Button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium">
                    Contact us
                  </Button>
                </Link>
              </div>
              <div className="md:hidden">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80 p-0 bg-white border border-gray-300">
                    <VisuallyHidden>
                      <SheetTitle>Mobile Menu</SheetTitle>
                    </VisuallyHidden>
                    <div className="h-full flex flex-col">
                      <div className="flex items-center p-6 border-b border-gray-200">
                        <Link href="/" onClick={() => setIsSheetOpen(false)}>
                          <Image
                              src="/home/WWA - Black 1.png"
                              alt="WWA Logo"
                              width={100}
                              height={32}
                              priority
                              className="h-8 w-auto"
                          />
                        </Link>
                      </div>
                      <div className="flex-1 px-6 py-6">
                        <div className="space-y-0">
                          {navLinks.map((link, index) => (
                            <div key={link.label}>
                              <Link
                                href={link.href}
                                onClick={() => setIsSheetOpen(false)}
                                className="block text-lg font-medium text-black py-4 hover:text-gray-600 transition-colors"
                              >
                                {link.label}
                              </Link>
                              {index < navLinks.length - 1 && (
                                <div className="border-t border-gray-200"></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 pt-0">
                        <Link
                          href="/contact"
                          onClick={() => setIsSheetOpen(false)}
                          className="block w-full bg-black hover:bg-gray-800 text-white text-center font-medium py-3 px-6 rounded-lg transition-colors"
                        >
                          Contact us
                        </Link>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>
  );
};

export default Header;
