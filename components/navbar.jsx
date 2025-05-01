"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const currentPath = usePathname();
  const navMenuRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Certificates", href: "/certificates" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div
                className="relative h-18 w-18"
                style={{
                  height: "72px",
                  width: "72px",
                  minWidth: "72px",
                  minHeight: "72px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src="/images/az-logo.png"
                  alt="AZ International Logo"
                  width={72}
                  height={72}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="hidden md:inline-block font-semibold text-lg text-blue-700 tracking-widest">
                AZ <span className="text-gray-800">INTERNATIONAL</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="flex-1 flex justify-center">
            <NavigationMenu
              ref={navMenuRef}
              onValueChange={() => setDropdownOpen(false)}
            >
              <NavigationMenuList className="items-center space-x-6">
                {navLinks.map((link) =>
                  link.name === "Services" ? (
                    <NavigationMenuItem key={link.name}>
                      <NavigationMenuTrigger
                        className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 relative px-0 ${
                          currentPath === link.href
                            ? "text-blue-600"
                            : "text-gray-600"
                        }`}
                      >
                        {link.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="p-6 min-w-[500px] bg-white border rounded-xl shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Link
                              href="/services#quality"
                              className="font-bold text-blue-800 mb-2 hover:underline block"
                              onClick={(e) => {
                                if (currentPath === "/services") {
                                  e.preventDefault();
                                  const hash = "#quality";
                                  window.location.hash = hash;
                                  window.dispatchEvent(
                                    new HashChangeEvent("hashchange")
                                  );
                                  document.activeElement.blur();
                                  window.scrollTo({ top: 0, behavior: "auto" });
                                }
                              }}
                            >
                              Quality Assurance & Controls
                            </Link>
                            <ul className="space-y-1 text-sm text-gray-700 list-disc pl-5">
                              <li>Ultrasonic Testing (UT)</li>
                              <li>Magnetic Particle Testing (MT)</li>
                              <li>Dye Penetrant Testing (PT)</li>
                              <li>Visual Inspection (VT)</li>
                              <li>Welders' inspection & qualification</li>
                            </ul>
                          </div>
                          <div>
                            <Link
                              href="/services#training"
                              className="font-bold text-blue-800 mb-2 hover:underline block"
                              onClick={(e) => {
                                if (currentPath === "/services") {
                                  e.preventDefault();
                                  const hash = "#training";
                                  window.location.hash = hash;
                                  window.dispatchEvent(
                                    new HashChangeEvent("hashchange")
                                  );
                                  document.activeElement.blur();
                                  window.scrollTo({ top: 0, behavior: "auto" });
                                }
                              }}
                            >
                              Technical Training Services
                            </Link>
                            <ul className="space-y-1 text-sm text-gray-700 list-disc pl-5">
                              <li>Customized technical training</li>
                              <li>Lectures & group discussions</li>
                              <li>Practical exercises</li>
                              <li>Requalification in NDT</li>
                            </ul>
                          </div>
                          <div>
                            <Link
                              href="/services#field"
                              className="font-bold text-blue-800 mb-2 hover:underline block"
                              onClick={(e) => {
                                if (currentPath === "/services") {
                                  e.preventDefault();
                                  const hash = "#field";
                                  window.location.hash = hash;
                                  window.dispatchEvent(
                                    new HashChangeEvent("hashchange")
                                  );
                                  document.activeElement.blur();
                                  window.scrollTo({ top: 0, behavior: "auto" });
                                }
                              }}
                            >
                              Field/Industrial Inspection
                            </Link>
                            <ul className="space-y-1 text-sm text-gray-700 list-disc pl-5">
                              <li>Pipeline welding inspection</li>
                              <li>Wall thickness measurement</li>
                              <li>Equipment inspection</li>
                              <li>Pipe mill surveillance</li>
                            </ul>
                          </div>
                          <div>
                            <Link
                              href="/services#specialized"
                              className="font-bold text-blue-800 mb-2 hover:underline block"
                              onClick={(e) => {
                                if (currentPath === "/services") {
                                  e.preventDefault();
                                  const hash = "#specialized";
                                  window.location.hash = hash;
                                  window.dispatchEvent(
                                    new HashChangeEvent("hashchange")
                                  );
                                  document.activeElement.blur();
                                  window.scrollTo({ top: 0, behavior: "auto" });
                                }
                              }}
                            >
                              Specialized Services
                            </Link>
                            <ul className="space-y-1 text-sm text-gray-700 list-disc pl-5">
                              <li>Rope Access Inspection</li>
                              <li>Tank integrity inspections</li>
                              <li>Mechanical testing</li>
                              <li>Vendor inspection</li>
                            </ul>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={link.name}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={link.href}
                          className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 relative ${
                            currentPath === link.href
                              ? "text-blue-600"
                              : "text-gray-600"
                          }`}
                        >
                          {link.name}
                          {currentPath === link.href && (
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                          )}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Balancer for centering */}
          <div className="hidden md:block" style={{ width: "120px" }}></div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`py-2 text-sm font-medium transition-colors hover:text-blue-600 ${
                    currentPath === link.href
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    opacity: 1,
                    transform: "translateY(0)",
                    transition: "opacity 300ms, transform 300ms",
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
