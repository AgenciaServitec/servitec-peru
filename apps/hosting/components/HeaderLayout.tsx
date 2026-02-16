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
import { ArrowRight, HardHat, Menu, ShoppingCart } from "lucide-react";

// Importamos la data maestra actualizada
import { SPECIALTIES_DATA } from "@/data-list/specialties";
import { SERVICES_DATA } from "@/data-list/services";

export const HeaderLayout = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              className="w-32" // Ajusté un poco el tamaño
              src="/logo-servitec.png"
              alt="Logo de Servitec Perú"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {/* Especialidades Dinámicas */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white/80 hover:text-white transition-colors">
                    Especialidades
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="border-none shadow-2xl">
                    <div className="bg-neutral-950/95 backdrop-blur-md p-2 rounded-sm w-[600px]">
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
                            <span className="text-[11px] font-black uppercase tracking-widest text-white/70 group-hover:text-primary">
                              Explorar todas las especialidades
                            </span>
                            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Servicios Dinámicos (Actualizado) */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-primary hover:text-primary/80 transition-colors font-bold">
                    Servicios
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="border-none shadow-2xl">
                    <div className="bg-neutral-950/95 backdrop-blur-md p-2 rounded-sm w-[650px]">
                      <ul className="grid gap-1 md:grid-cols-2 mb-2">
                        {/* Tomamos los servicios más relevantes o los primeros 8 */}
                        {SERVICES_DATA.slice(0, 8).map((service) => (
                          <ListItem
                            key={service.slug}
                            title={service.title}
                            href={`/servicios/${service.slug}`}
                            // Aquí usamos el icono directo del objeto
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
                            <span className="text-[11px] font-black uppercase tracking-widest text-white/70 group-hover:text-primary">
                              Ver catálogo completo de servicios
                            </span>
                            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Enlaces Simples */}
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

            <div className="flex items-center gap-3 ml-4">
              <Link
                href="https://servitecwork.servitecperu.com"
                className="btn-ghost-dark px-4 py-2 text-[12px] font-bold flex items-center gap-2 transition-all"
              >
                <HardHat className="w-3.5 h-3.5 text-primary" />
                Servitec Work
              </Link>
              <Link
                href="https://tienda.servitecperu.com"
                className="btn-primary px-4 py-2 text-[12px] font-bold flex items-center gap-2"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Tienda
              </Link>
            </div>
          </nav>

          <button className="lg:hidden p-2 text-white/70">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </ContentWidth>
    </header>
  );
};

// Componente ListItem (Sin cambios en estructura, pero optimizado)
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
              <div className="text-[11px] font-bold leading-none text-white/90 group-hover:text-primary uppercase tracking-tight">
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
