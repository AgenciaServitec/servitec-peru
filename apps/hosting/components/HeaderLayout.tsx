"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ContentWidth } from "@/components/ContentWidth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ArrowRight, Menu } from "lucide-react";

import { SPECIALTIES_DATA } from "@/data-list/specialties";
import { SERVICES_DATA } from "@/data-list/services";

export const HeaderLayout = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted) return null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-2"
          : "bg-transparent py-6"
      )}
    >
      <ContentWidth>
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex flex-col leading-none">
            <img
              className="w-32"
              src="/logo-servitec.png"
              alt="Logo de Servitec Perú"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white/80 hover:text-white transition-colors">
                    Especialidades
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="bg-neutral-950/95 backdrop-blur-md p-2 rounded-sm w-[600px] shadow-2xl border border-white/5">
                      <ul className="grid gap-1 md:grid-cols-2 mb-2">
                        {SPECIALTIES_DATA.slice(0, 10).map((spec) => (
                          <ListItem
                            key={spec.slug}
                            title={spec.title}
                            href={`/especialidades/${spec.slug}`}
                            icon={
                              spec.icon && <spec.icon className="w-4 h-4" />
                            }
                          >
                            {spec.description}
                          </ListItem>
                        ))}
                      </ul>
                      <div className="p-1 border-t border-white/5 mt-1">
                        <NavigationMenuLink asChild>
                          <Link
                            href="/especialidades"
                            className="flex items-center justify-between w-full p-3 rounded-sm bg-white/[0.03] hover:bg-primary/10 group transition-all"
                          >
                            <span className="text-[11px] font-black text-white/70 group-hover:text-primary">
                              Explorar todas las especialidades
                            </span>
                            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-primary hover:text-primary/80 transition-colors font-bold">
                    Servicios
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="bg-neutral-950/95 backdrop-blur-md p-2 rounded-sm w-[650px] shadow-2xl border border-white/5">
                      <ul className="grid gap-1 md:grid-cols-2 mb-2">
                        {SERVICES_DATA.slice(0, 8).map((service) => (
                          <ListItem
                            key={service.slug}
                            title={service.title}
                            href={`/servicios/${service.slug}`}
                            icon={
                              service.icon && (
                                <service.icon className="w-4 h-4" />
                              )
                            }
                          >
                            {service.description}
                          </ListItem>
                        ))}
                      </ul>
                      <div className="p-1 border-t border-white/5 mt-1">
                        <NavigationMenuLink asChild>
                          <Link
                            href="/servicios"
                            className="flex items-center justify-between w-full p-3 rounded-sm bg-white/[0.03] hover:bg-primary/10 group transition-all"
                          >
                            <span className="text-[11px] font-black text-white/70 group-hover:text-primary">
                              Ver catálogo completo de servicios
                            </span>
                            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-white/80"
                    )}
                  >
                    <Link href="/nosotros">Nosotros</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-white/80"
                    )}
                  >
                    <Link href="/contacto">Contacto</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <button className="lg:hidden p-2 text-white/70">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </ContentWidth>
    </header>
  );
};

const ListItem = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    icon?: React.ReactNode;
    title: string;
    href: string;
  }
>(({ className, title, children, icon, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "group block select-none space-y-1 rounded-sm p-3 leading-none no-underline outline-none transition-all hover:bg-white/5",
            className
          )}
          {...props}
        >
          <div className="flex items-start gap-3">
            <div className="mt-1 text-white/20 group-hover:text-primary transition-colors shrink-0">
              {icon}
            </div>
            <div>
              <div className="text-[11px] font-bold leading-none text-white/90 group-hover:text-primary">
                {title}
              </div>
              <p className="line-clamp-1 text-[10px] leading-snug text-muted-foreground mt-1.5 group-hover:text-white/60">
                {children}
              </p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
