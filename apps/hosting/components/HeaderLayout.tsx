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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowRight, ChevronRight, Menu } from "lucide-react";

import { SPECIALTIES_DATA } from "@/data-list/specialties";
import { SERVICES_DATA } from "@/data-list/services";
import { ButtonLink } from "@/components/ui/button-link";

export const HeaderLayout = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted) return null;

  return (
    <header
      className={cn(
        "sticky left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 top-4"
      )}
    >
      <ContentWidth
        className={cn(
          "transition-all duration-500 ease-in-out border border-white/10 rounded-md shadow-2xl",
          {
            "bg-[#0a0a0a]/90 backdrop-blur-xl py-3": scrolled,
            "bg-[#0a0a0a]/80 backdrop-blur-md py-4": !scrolled,
          }
        )}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="group flex flex-col leading-none pointer-events-auto"
          >
            <img
              className={cn("transition-all duration-500", {
                "w-24 md:w-26": scrolled,
                "w-26 md:w-28": !scrolled,
              })}
              src="/logo-servitec.png"
              alt="Logo de Servitec Perú"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-4 pointer-events-auto">
            <NavigationMenu className="static max-w-full">
              <NavigationMenuList className="static">
                <NavigationMenuItem className="static">
                  <NavigationMenuTrigger className="bg-transparent text-white/80 hover:text-white transition-colors">
                    Especialidades
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="fixed left-0! right-0! w-screen border-none bg-transparent shadow-none flex justify-center pt-6">
                    <div className="w-full max-w-350 bg-[#0a0a0a] backdrop-blur-2xl border border-white/10 rounded-md flex justify-center shadow-2xl overflow-hidden">
                      <ContentWidth className="py-12">
                        <div className="w-full flex gap-12">
                          <ul className="w-2/3 grid grid-cols-3 gap-x-6 gap-y-0 divide-y divide-dashed divide-white/5">
                            {SPECIALTIES_DATA.slice(0, 9).map((spec) => (
                              <ListItem
                                key={spec.slug}
                                title={spec.title}
                                href={`/especialidades/${spec.slug}`}
                                icon={
                                  spec.icon && <spec.icon className="w-6 h-6" />
                                }
                                className="py-6"
                              >
                                {spec.description}
                              </ListItem>
                            ))}
                          </ul>

                          <div className="w-px border-l border-dashed border-white/10 self-stretch" />

                          <div className="w-1/3 flex flex-col gap-6">
                            <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-white/10 bg-white/5">
                              <img
                                src="/assets/images/about/preventive-maintenance.jpeg"
                                alt="Especialidades"
                                className="object-cover w-full h-full opacity-80"
                              />
                            </div>
                            <div className="flex flex-col">
                              <h3 className="text-2xl font-bold text-white mb-3">
                                Especialidades
                              </h3>
                              <p className="text-[14px] text-white/50 leading-relaxed mb-6">
                                Soluciones integrales en tecnología para
                                potenciar el rendimiento de tu infraestructura.
                              </p>
                              <ButtonLink
                                href="/especialidades"
                                variant="outline"
                                icon={ArrowRight}
                              >
                                Ver todas las especialidades
                              </ButtonLink>
                            </div>
                          </div>
                        </div>
                      </ContentWidth>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem className="static">
                  <NavigationMenuTrigger className="bg-transparent text-primary hover:text-primary/80 transition-colors font-bold">
                    Servicios
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="fixed left-0! right-0! w-screen border-none bg-transparent shadow-none flex justify-center pt-6">
                    <div className="w-full max-w-350 bg-[#0a0a0a] backdrop-blur-2xl border border-white/10 rounded-md flex justify-center shadow-2xl overflow-hidden">
                      <ContentWidth className="py-12">
                        <div className="w-full flex gap-12">
                          <ul className="w-2/3 grid grid-cols-3 gap-x-6 gap-y-0 divide-y divide-dashed divide-white/5">
                            {SERVICES_DATA.slice(0, 9).map((service) => (
                              <ListItem
                                key={service.slug}
                                title={service.title}
                                href={`/servicios/${service.slug}`}
                                icon={
                                  service.icon && (
                                    <service.icon className="w-6 h-6" />
                                  )
                                }
                                className="py-6"
                              >
                                {service.description}
                              </ListItem>
                            ))}
                          </ul>

                          <div className="w-px border-l border-dashed border-white/10 self-stretch" />

                          <div className="w-1/3 flex flex-col gap-6">
                            <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-white/10 bg-white/5">
                              <img
                                src="/assets/images/about/preventive-maintenance-2.jpeg"
                                alt="Servicios"
                                className="object-cover w-full h-full opacity-80"
                              />
                            </div>
                            <div className="flex flex-col">
                              <h3 className="text-2xl font-bold text-white mb-3 text-balance capitalize">
                                Nuestros servicios
                              </h3>
                              <p className="text-[14px] text-white/50 leading-relaxed mb-6">
                                Soporte técnico de alto nivel y mantenimiento
                                preventivo para equipos corporativos.
                              </p>
                              <ButtonLink
                                href="/servicios"
                                variant="outline"
                                icon={ArrowRight}
                              >
                                Ver todos los servicios
                              </ButtonLink>
                            </div>
                          </div>
                        </div>
                      </ContentWidth>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent hover:bg-transparent text-white/80 hover:text-white"
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
                      "bg-transparent hover:bg-transparent text-white/80 hover:text-white"
                    )}
                  >
                    <Link href="/contacto">Contacto</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="lg:hidden pointer-events-auto">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-white/70 hover:text-primary transition-colors">
                  <Menu className="w-7 h-7" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-[#050505]/95 backdrop-blur-xl border-white/10 text-white w-full sm:max-w-md p-0 flex flex-col"
              >
                <SheetHeader className="p-6 border-b border-white/5">
                  <SheetTitle className="text-left">
                    <img
                      src="/logo-servitec.png"
                      className="w-24"
                      alt="Logo de Servitec"
                    />
                  </SheetTitle>
                </SheetHeader>
                <div className="grow overflow-y-auto p-6 flex flex-col gap-4">
                  <MobileNavItem
                    href="/"
                    label="Inicio"
                    onClick={() => setOpen(false)}
                  />
                  <MobileNavItem
                    href="/nosotros"
                    label="Nosotros"
                    onClick={() => setOpen(false)}
                  />
                  <MobileNavItem
                    href="/contacto"
                    label="Contacto"
                    onClick={() => setOpen(false)}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
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
    <li className={className}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "group block select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-all hover:bg-white/4 border border-transparent hover:border-white/10"
          )}
          {...props}
        >
          <div className="flex items-start gap-4">
            <div className="mt-1 text-white/30 group-hover:text-primary transition-colors shrink-0">
              {icon}
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="text-[14px] font-bold leading-none text-white group-hover:text-primary transition-colors tracking-tight">
                {title}
              </div>
              <p className="line-clamp-2 text-[12px] text-white/40 group-hover:text-white/70 transition-colors leading-snug">
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

const MobileNavItem = ({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="flex items-center justify-between p-3 rounded-sm hover:bg-white/5 transition-all group"
  >
    <span className="text-white/90 group-hover:text-primary">{label}</span>
    <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-primary" />
  </Link>
);
