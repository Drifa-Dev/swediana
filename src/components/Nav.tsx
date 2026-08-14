"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Menu, 
  ChevronDown, 
  Truck, 
  Sparkles, 
  Building2, 
  HardHat, 
  Droplet,
  Phone,
  X
} from "lucide-react";
import { usePathname } from "next/navigation";
import Container from "@/components/Container";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PhoneLink } from "@/components/PhoneLink";

// Service items with icons
const services = [
  {
    href: "/flytthjalpinfo",
    label: "Flytthjälp",
    icon: Truck,
    description: "Professionell hjälp med er flytt"
  },
  {
    href: "/flyttstadinfo",
    label: "Flyttstädning",
    icon: Sparkles,
    description: "Totalstädning efter flytt"
  },
  {
    href: "/foretagstad",
    label: "Företagstädning",
    icon: Building2,
    description: "Regelbunden städning för företag"
  },
  {
    href: "/byggstadinfo",
    label: "Byggstädning",
    icon: HardHat,
    description: "Efterstädning av byggprojekt"
  },
  {
    href: "/fonsterputs",
    label: "Fönsterputs",
    icon: Droplet,
    description: "Kristallklara fönster"
  }
];

const MobileNav = () => {
  const pathname = usePathname();
  const [openServices, setOpenServices] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-white/10 text-white"
          aria-label="Öppna meny"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:w-[400px] p-0 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-900 border-l border-white/10"
      >
        {/* Header with logo and close */}
        <SheetHeader className="px-6 py-6 border-b border-white/10 flex flex-row items-center justify-between">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image
              src="/logo.svg"
              alt="Swediana"
              width={150}
              height={75}
              className="h-8 w-auto"
            />
          </Link>
        </SheetHeader>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-1">
            {/* Services Accordion */}
            <div className="mb-2">
              <button
                type="button"
                onClick={() => setOpenServices(!openServices)}
                className={`
                  w-full flex items-center justify-between 
                  px-4 py-3 rounded-xl
                  text-white font-medium
                  transition-all duration-200
                  ${openServices ? 'bg-white/10' : 'hover:bg-white/5'}
                `}
              >
                <span className="text-base">Våra Tjänster</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-300 ${
                    openServices ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              {/* Services submenu with animation */}
              <div
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${openServices ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="space-y-1 pl-2">
                  {services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <SheetClose asChild key={service.href}>
                        <Link
                          href={service.href}
                          className={`
                            flex items-center gap-3 px-4 py-3 rounded-lg
                            transition-all duration-200
                            ${
                              isActive(service.href)
                                ? "bg-teal-500/20 text-teal-300 ring-1 ring-teal-500/30"
                                : "text-white/80 hover:text-white hover:bg-white/5"
                            }
                          `}
                        >
                          <Icon className="h-5 w-5 flex-shrink-0" />
                          <div className="flex-1 text-left">
                            <div className="font-medium text-sm">{service.label}</div>
                            <div className="text-xs text-white/60 mt-0.5">
                              {service.description}
                            </div>
                          </div>
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Other menu items */}
            <SheetClose asChild>
              <Link
                href="/omOss"
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl
                  font-medium transition-all duration-200
                  ${
                    isActive("/omOss")
                      ? "bg-white/10 text-white"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                Om Oss
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                href="/faq"
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl
                  font-medium transition-all duration-200
                  ${
                    isActive("/faq")
                      ? "bg-white/10 text-white"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                Vanliga Frågor
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                href="/kontakt"
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl
                  font-medium transition-all duration-200
                  ${
                    isActive("/kontakt")
                      ? "bg-white/10 text-white"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                Kontakt
              </Link>
            </SheetClose>
          </div>

          {/* CTA Section */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <SheetClose asChild>
              <Link 
                href="/#tjanster"
                className="block"
                onClick={(e) => {
                  // Om vi redan är på startsidan, scrolla smooth
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    setIsOpen(false);
                    setTimeout(() => {
                      document.getElementById('tjanster')?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }, 300); // Vänta på att menyn ska stängas
                  }
                }}
              >
                <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-6 rounded-xl shadow-lg shadow-teal-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/30">
                  <Phone className="mr-2 h-5 w-5" />
                  Boka Nu
                </Button>
              </Link>
            </SheetClose>
            
            <div className="mt-4 text-center">
              <PhoneLink
                location="nav_mobile"
                className="text-teal-300 hover:text-teal-200 font-medium text-sm transition-colors"
              >
                Ring oss: 10-808 5625
              </PhoneLink>
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const Nav = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={`
        w-full fixed top-0 z-50 
        transition-all duration-300 ease-in-out
        ${
          scrolled
            ? "bg-gradient-to-r from-[#007a7b]/90 to-teal-600/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }
      `}
    >
      <Container>
        <div className="h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex-shrink-0 transition-transform duration-200 hover:scale-105" 
            aria-label="Swediana – Hem"
          >
            <Image
              src="/logo.svg"
              alt="Swediana"
              width={200}
              height={100}
              className="h-8 md:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-2">
                {/* Services Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className="
                      bg-transparent text-white/90 hover:text-white hover:bg-white/10
                      data-[state=open]:bg-white/10 data-[state=open]:text-white
                      font-medium px-4 py-2 rounded-lg
                      transition-all duration-200
                    "
                  >
                    Tjänster
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!w-[500px] p-4 bg-white/95 backdrop-blur-md">
                    <div className="grid grid-cols-1 gap-2">
                      {services.map((service) => {
                        const Icon = service.icon;
                        return (
                          <NavigationMenuLink asChild key={service.href}>
                            <Link
                              href={service.href}
                              className="
                                group flex items-start gap-4 p-4 rounded-xl
                                transition-all duration-200
                                hover:bg-teal-50 hover:shadow-md
                                border border-transparent hover:border-teal-100
                              "
                            >
                              <div className="mt-1 p-2 rounded-lg bg-teal-100 text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-all duration-200">
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-slate-900 group-hover:text-teal-600 transition-colors">
                                  {service.label}
                                </div>
                                <div className="text-sm text-slate-600 mt-1">
                                  {service.description}
                                </div>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        );
                      })}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Other Navigation Items */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/omOss"
                      className={`
                        px-4 py-2 rounded-lg font-medium
                        transition-all duration-200
                        ${
                          isActive("/omOss")
                            ? "bg-white/10 text-white"
                            : "text-white/90 hover:text-white hover:bg-white/10"
                        }
                      `}
                    >
                      Om Oss
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/faq"
                      className={`
                        px-4 py-2 rounded-lg font-medium
                        transition-all duration-200
                        ${
                          isActive("/faq")
                            ? "bg-white/10 text-white"
                            : "text-white/90 hover:text-white hover:bg-white/10"
                        }
                      `}
                    >
                      FAQ
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/kontakt"
                      className={`
                        px-4 py-2 rounded-lg font-medium
                        transition-all duration-200
                        ${
                          isActive("/kontakt")
                            ? "bg-white/10 text-white"
                            : "text-white/90 hover:text-white hover:bg-white/10"
                        }
                      `}
                    >
                      Kontakt
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* CTA Button (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 font-medium"
              asChild
            >
              <PhoneLink location="nav_desktop">
                <Phone className="mr-2 h-4 w-4" />
                Ring Oss
              </PhoneLink>
            </Button>
            <Button
              className="
                bg-white text-teal-600 hover:bg-teal-50
                font-semibold px-6 py-2 rounded-full
                shadow-lg shadow-black/10
                transition-all duration-200
                hover:shadow-xl hover:scale-105
              "
              asChild
            >
              <Link 
                href="/#tjanster"
                onClick={(e) => {
                  // Om vi redan är på startsidan, scrolla smooth
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('tjanster')?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
              >
                Boka Nu
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Nav;