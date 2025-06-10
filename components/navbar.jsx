"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
} from "lucide-react";
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
  const [topBarVisible, setTopBarVisible] = useState(true);

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Services",
      href: "/services",
      submenu: [
        {
          title: "Quality Assurance & Controls",
          href: "/quality-assurance/",
        },
        {
          title: "Field/Industrial Inspection",
          href: "/field-industrial/",
        },
        {
          title: "Specialized Services",
          href: "/specialized-services/",
        },
        {
          title: "Standard NDT Services",
          href: "/standard-ndt/",
        },
        {
          title: "Capacity Building Training",
          href: "/capacity-building/",
        },
      ],
    },
    { name: "Clients", href: "/clients" },
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

  // Handle scroll effect for main navigation
  useEffect(() => {
    const handleResize = () => {
      // Fix any mobile menu issues on resize
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  const handleServiceLinkClick = (e, href) => {
    if (currentPath === "/services") {
      e.preventDefault();
      window.location.hash = href;
      window.dispatchEvent(new HashChangeEvent("hashchange"));
      document.activeElement.blur();
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white"
      }`}
    >
      {/* Top bar with social media links - always visible */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-1.5">
          <div className="flex justify-between items-center">
            {/* Contact info - hidden on small screens, flex on medium and up */}
            <div className="text-xs hidden sm:flex items-center space-x-4">
              <a
                href="tel:+20222879691"
                className="flex items-center hover:text-blue-200 transition-all duration-300 group"
              >
                <div className="bg-blue-700/30 rounded-full p-1 mr-2 group-hover:bg-blue-600/50 transition-all duration-300">
                  <Phone className="h-3 w-3" />
                </div>
                <span className="whitespace-nowrap">(02) 22-8-79-691</span>
              </a>
              <a
                href="mailto:az.qualitycontrol@gmail.com"
                className="hidden md:flex items-center hover:text-blue-200 transition-all duration-300 group"
              >
                <div className="bg-blue-700/30 rounded-full p-1 mr-2 group-hover:bg-blue-600/50 transition-all duration-300">
                  <Mail className="h-3 w-3" />
                </div>
                <span className="whitespace-nowrap">
                  az.qualitycontrol@gmail.com
                </span>
              </a>
            </div>{" "}
            {/* Social icons - centered on mobile, right-aligned on desktop */}
            <div className="flex space-x-3 mx-auto sm:mx-0">
              <a
                href="https://www.facebook.com/share/191aoswa1U/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group p-1 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 rounded-full scale-0 group-hover:scale-100 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-full scale-0 group-hover:scale-100 transition-all duration-300 group-hover:animate-ping-once"></div>
                <Facebook className="h-4 w-4 group-hover:text-blue-200 transition-all duration-300 relative z-10" />
              </a>
              <a
                href="https://www.instagram.com/az.qualitycontrol/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group p-1 relative"
              >
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 rounded-full scale-0 group-hover:scale-100 transition-all duration-300"></div>
                <Instagram className="h-4 w-4 group-hover:text-blue-200 transition-all duration-300 relative z-10" />
              </a>
              <a
                href="https://www.linkedin.com/in/az-engineering-3721b718b/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group p-1 relative"
              >
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 rounded-full scale-0 group-hover:scale-100 transition-all duration-300"></div>
                <Linkedin className="h-4 w-4 group-hover:text-blue-200 transition-all duration-300 relative z-10" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between relative">
          {/* Decorative element - hidden on small screens */}
          <div className="absolute right-0 bottom-0 w-64 h-16 bg-gradient-to-l from-blue-100/10 to-transparent rounded-tl-full pointer-events-none opacity-60 hidden md:block"></div>

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group relative">
              <div className="relative flex items-center">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-500"></div>
                <div
                  className="relative bg-white rounded-full p-1 ring-1 ring-gray-200 overflow-hidden"
                  style={{
                    height: "52px",
                    width: "52px",
                  }}
                >
                  <Image
                    src="/images/az-logo.png"
                    alt="AZ International Logo"
                    width={50}
                    height={50}
                    className="transition-all duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="flex flex-col ml-3">
                <span className="text-base md:text-lg font-bold tracking-tight bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent transition-all duration-500 group-hover:from-blue-600 group-hover:to-sky-400">
                  AZ International
                </span>
                <span className="text-xs text-gray-500 transition-all duration-500 group-hover:text-blue-600">
                  Engineering & Inspection
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    {link.submenu ? (
                      <>
                        <NavigationMenuTrigger className="text-sm font-medium hover:text-blue-600 data-[state=open]:text-blue-600">
                          <Link
                            href={link.href}
                            className="text-sm font-medium hover:text-blue-600"
                          >
                            {link.name}
                          </Link>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="p-4 min-w-[300px] bg-white border rounded-xl shadow-2xl">
                          <div className="space-y-2">
                            <Link
                              href="/services"
                              className="block px-4 py-3 text-sm font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 border-b border-gray-200 mb-2"
                            >
                              View All Services
                            </Link>
                            {link.submenu.map((section) => (
                              <Link
                                key={section.title}
                                href={`/services${section.href}`}
                                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                onClick={(e) =>
                                  handleServiceLinkClick(e, section.href)
                                }
                              >
                                {section.title}
                              </Link>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        className={`text-sm font-medium hover:text-blue-600 px-3 py-2 rounded-md ${
                          currentPath === link.href
                            ? "text-blue-600"
                            : "text-gray-700"
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <div key={link.name} className="px-3 py-2">
                {" "}
                {link.submenu ? (
                  <div>
                    <div className="space-y-1">
                      <Link
                        href="/services"
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full flex items-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-bold"
                      >
                        {link.name} - View All
                      </Link>
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full flex justify-between items-center text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-3 py-1 rounded-md text-xs font-medium"
                      >
                        Individual Services
                        <svg
                          className={`ml-2 h-4 w-4 transform transition-transform ${
                            dropdownOpen ? "rotate-180" : ""
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    {dropdownOpen && (
                      <div className="mt-2 pl-4 space-y-2">
                        {link.submenu.map((section) => (
                          <button
                            key={section.title}
                            onClick={() => {
                              router.push(`/services${section.href}`);
                              setIsMenuOpen(false);
                            }}
                            className="block w-full text-left text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium"
                          >
                            {section.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-sm font-medium ${
                      currentPath === link.href
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
