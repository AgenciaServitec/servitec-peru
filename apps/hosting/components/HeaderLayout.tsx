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
import { Button } from "@/components/ui/button";

export const HeaderLayout = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      // Aparece solo después de hacer scroll 100px hacia abajo
      setScrolled(window.scrollY > 100);
    };

    handleScroll(); // Revisar posición inicial
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted) return null;

  // @ts-ignore
  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        "py-6",
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-2"
          : "bg-transparent py-6"
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent border-b border-transparent"
      )}
    >
      <ContentWidth>
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="group flex flex-col leading-none pointer-events-auto"
          >
            <img
              className="w-28 md:w-32"
              src="/logo-servitec.png"
              alt="Logo de Servitec Perú"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-4 pointer-events-auto">
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
                              Ver todas las especialidades
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
                              Ver todos los servicios
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
                      "bg-transparent text-white/80 hover:text-white"
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
                      "bg-transparent text-white/80 hover:text-white"
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

                <div className="flex-grow overflow-y-auto custom-scrollbar">
                  <div className="flex flex-col gap-2 p-6">
                    <span className="text-white/50 px-2 mb-2">Páginas</span>
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

                    <span className="text-white/50 px-2 mt-8 mb-2">
                      Especialidades
                    </span>
                    <div className="grid grid-cols-1 gap-1">
                      {SPECIALTIES_DATA.slice(0, 5).map((spec) => (
                        <Link
                          key={spec.slug}
                          href={`/especialidades/${spec.slug}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 p-3 rounded-sm hover:bg-white/5 transition-colors group"
                        >
                          <div className="text-white/20 group-hover:text-primary transition-colors">
                            {spec.icon && <spec.icon className="w-4 h-4" />}
                          </div>
                          <span className="text-sm font-medium text-white/80 group-hover:text-white">
                            {spec.title}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <span className="text-white/50 px-2 mt-8 mb-2">
                      Servicios Populares
                    </span>
                    <div className="grid grid-cols-1 gap-1">
                      {SERVICES_DATA.slice(0, 5).map((service) => (
                        <Link
                          key={service.slug}
                          href={`/servicios/${service.slug}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 p-3 rounded-sm hover:bg-white/5 transition-colors group"
                        >
                          <div className="text-white/20 group-hover:text-primary transition-colors">
                            {service.icon && (
                              <service.icon className="w-4 h-4" />
                            )}
                          </div>
                          <span className="text-sm font-medium text-white/80 group-hover:text-white">
                            {service.title}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <span className="text-white/50 px-2 mt-10 mb-4">
                      Clientes que confían en nosotros
                    </span>
                    <div className="grid grid-cols-2 gap-3 px-2 hover:grayscale-0 transition-all duration-500">
                      <div className="flex flex-col gap-2 items-center justify-center p-4 border border-white/5 rounded-sm bg-white/[0.02]">
                        <img
                          src="/assets/images/clients/entities/untels.png"
                          alt="Cliente 1"
                          className="h-6 w-auto object-contain"
                        />
                        <span className="text-[10px] text-center">
                          Universidad Nacional Tecnológica Lima Sur
                        </span>
                      </div>
                      <div className="flex flex-col gap-2 items-center justify-center p-4 border border-white/5 rounded-sm bg-white/[0.02]">
                        <img
                          src="/assets/images/clients/entities/antenor-orrego.png"
                          alt="Cliente 2"
                          className="h-6 w-auto object-contain"
                        />
                        <span className="text-[10px] text-center">
                          ISTP Antenor Orrego Espinoza
                        </span>
                      </div>
                      <div className="flex flex-col gap-2 items-center justify-center p-4 border border-white/5 rounded-sm bg-white/[0.02]">
                        <img
                          src="/assets/images/clients/entities/gilda.png"
                          alt="Cliente 3"
                          className="h-6 w-auto object-contain"
                        />
                        <span className="text-[10px] text-center">
                          IESTP Gilda Ballivian Rosado
                        </span>
                      </div>
                      <div className="flex flex-col gap-2 items-center justify-center p-4 border border-white/5 rounded-sm bg-white/[0.02]">
                        <img
                          src="/assets/images/clients/entities/libertador.png"
                          alt="Cliente 4"
                          className="h-6 w-auto object-contain"
                        />
                        <span className="text-[10px] text-center">
                          Grupo Educativo Libertador
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-white/5 bg-black/50 flex flex-col gap-3">
                  <Button variant="outline" className="btn-ghost-dark" asChild>
                    <Link href="/especialidades" onClick={() => setOpen(false)}>
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M14 15h-4v-2H2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6h-8zm6-9h-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v4h20V8a2 2 0 0 0-2-2m-4 0H8V4h8z"
                        />
                      </svg>
                      <span>Ver todas las especialidades</span>
                    </Link>
                  </Button>

                  <Button variant="outline" className="btn-ghost-dark" asChild>
                    <Link href="/servicios" onClick={() => setOpen(false)}>
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                      >
                        <path
                          fill="currentColor"
                          d="M541.4 162.6C549 155 561.7 156.9 565.5 166.9C572.3 184.6 576 203.9 576 224C576 312.4 504.4 384 416 384C398.5 384 381.6 381.2 365.8 376L178.9 562.9C150.8 591 105.2 591 77.1 562.9C49 534.8 49 489.2 77.1 461.1L264 274.2C258.8 258.4 256 241.6 256 224C256 135.6 327.6 64 416 64C436.1 64 455.4 67.7 473.1 74.5C483.1 78.3 484.9 91 477.4 98.6L388.7 187.3C385.7 190.3 384 194.4 384 198.6L384 240C384 248.8 391.2 256 400 256L441.4 256C445.6 256 449.7 254.3 452.7 251.3L541.4 162.6z"
                        />
                      </svg>
                      <span>Ver todos los servicios</span>
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </ContentWidth>
    </header>
  );
};

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
