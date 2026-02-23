"use client";

import React, { useEffect, useState } from "react";
import { ContentWidth } from "@/components/ContentWidth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";

export default function ServiceClientLayout({
  frontmatter,
  content,
  allServices = [],
}: any) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const headings = document.querySelectorAll("main h2");
    headings.forEach((heading) => {
      const id = heading.textContent
        ?.toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      if (id) heading.id = id;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-100px 0% -70% 0%" }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [content]);

  const toc = [
    { id: "definicion", label: "Definición" },
    { id: "procedimiento", label: "Procedimiento" },
    { id: "especificaciones", label: "Especificaciones" },
    { id: "garantia", label: "Garantía" },
    { id: "limites", label: "Límites" },
    { id: "resultados", label: "Resultados" },
  ];

  const users = ["Juan", "María", "Carlos", "Ana"];
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen pt-32 pb-20 font-sans selection:bg-white/10">
      <ContentWidth>
        <div className="flex flex-col lg:flex-row gap-0">
          <aside className="hidden lg:block w-72 shrink-0 pr-8 border-r border-white/5 bg-white/1.5">
            <div className="sticky top-32 flex flex-col h-[calc(100vh-12rem)] py-4 pl-6">
              <div className="space-y-4">
                <CollapsibleSection
                  title="Otros servicios"
                  isOpenDefault={true}
                >
                  <nav className="flex flex-col gap-1 ml-2 border-l border-white/5 pl-4">
                    {allServices.slice(0, 10).map((item: any) => {
                      const isactive = frontmatter.slug === item.slug;
                      return (
                        <Link
                          key={item.slug}
                          href={`/servicios/${item.slug}`}
                          className={`text-[13px] px-3 py-2 rounded-md transition-all ${
                            isactive
                              ? "bg-white/10 text-white font-semibold"
                              : "text-white/40 hover:text-white/70 hover:bg-white/5"
                          }`}
                        >
                          {item.title}
                        </Link>
                      );
                    })}
                  </nav>
                </CollapsibleSection>
              </div>

              <div className="pt-12">
                <p className="text-white/40 mb-6">Clientes que confían</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                  <img
                    src="/assets/images/clients/entities/untels.png"
                    alt="untels"
                    className="h-10 w-auto object-contain"
                  />
                  <img
                    src="/assets/images/clients/entities/antenor-orrego.png"
                    alt="upao"
                    className="h-10 w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </aside>

          <main className="grow lg:px-16 py-4">
            <div className="max-w-3xl">
              <header className="mb-12 border-b border-white/5 pb-12">
                <p className="text-white/40 mb-4">{frontmatter.category}</p>
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">
                  {frontmatter.title}
                </h1>
                <p className="text-lg text-white/50 leading-relaxed font-normal">
                  {frontmatter.description}
                </p>
              </header>

              <div
                className="prose prose-invert max-w-none
                [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-8 [&_h2]:text-white [&_h2]:mt-24 [&_h2]:scroll-mt-32
                [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-4 [&_h3]:text-white/80 [&_h3]:mt-12
                [&_p]:text-white/60 [&_p]:leading-relaxed [&_p]:mb-8 [&_p]:text-[16px]
                [&_p_strong]:text-white [&_p_strong]:min-w-55 [&_p_strong]:font-bold
                [&_table]:w-full [&_table]:my-10 [&_table]:border-collapse [&_table]:text-sm
                [&_th]:bg-white/3 [&_th]:text-white/80 [&_th]:p-3 [&_th]:text-left [&_th]:border [&_th]:border-white/10
                [&_td]:p-3 [&_td]:border [&_td]:border-white/10 [&_td]:text-white/40
                [&_ul]:grid [&_ul]:grid-cols-1 [&_ul]:md:grid-cols-2 [&_ul]:gap-x-8 [&_ul]:gap-y-4 [&_ul]:mb-12 [&_ul]:list-none [&_ul]:p-0
                [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li]:text-sm [&_li]:text-white/50
                [&_li]:before:content-['○'] [&_li]:before:text-white/20 [&_li]:before:mt-0.5"
              >
                {content}
              </div>
            </div>
          </main>

          <aside className="hidden xl:block w-80 shrink-0 pl-8 border-l border-white/5 bg-white/1.5">
            <div className="sticky top-32 space-y-12 py-4">
              <div>
                <p className="text-white/40 mb-6">Guía de contenido</p>
                <nav className="flex flex-col gap-3">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-[13px] transition-all border-l-2 pl-4 -ml-0.5 ${
                        activeId === item.id
                          ? "text-white border-white font-bold"
                          : "text-white/20 border-transparent hover:text-white/50"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="p-6 border border-white/10 bg-white/2 rounded-sm space-y-6">
                <div className="flex flex-col items-center text-center">
                  <div className="flex -space-x-3 mb-4">
                    {users.map((name, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-full border-2 border-[#050505] flex items-center justify-center text-white font-semibold text-sm ${colors[i % colors.length]}`}
                      >
                        {name.charAt(0).toUpperCase()}
                      </div>
                    ))}

                    <div className="w-10 h-10 rounded-full border-2 border-[#050505] bg-neutral-900 flex items-center justify-center text-[10px] font-bold text-white/50">
                      +5k
                    </div>
                  </div>

                  <p className="text-[13px] font-bold text-white mb-1 text-balance">
                    Más de 5,000 clientes confían en nosotros
                  </p>

                  <p className="text-[11px] text-white/40 leading-relaxed mb-6">
                    Visita nuestra comunidad en facebook y conoce la experiencia
                    de otros usuarios.
                  </p>

                  <Button
                    size="lg"
                    className="w-full btn-primary bg-[#1877F2] hover:bg-[#166fe5] text-white"
                    asChild
                  >
                    <a
                      href="https://www.facebook.com/Servitec.chorrillos/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      Nuestra comunidad <ExternalLink size={14} />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </ContentWidth>
    </div>
  );
}

function CollapsibleSection({ title, children, isOpenDefault = false }: any) {
  const [isopen, setisopen] = useState(isOpenDefault);

  return (
    <div className="space-y-2">
      <button
        onClick={() => setisopen(!isopen)}
        className="flex items-center justify-between w-full group cursor-pointer"
      >
        <span className="text-white/40 group-hover:text-white/60 transition-colors">
          {title}
        </span>
        <ChevronRight
          size={12}
          className={`text-white/20 transition-transform duration-200 ${isopen ? "rotate-90" : ""}`}
        />
      </button>

      {isopen && (
        <div className="animate-in fade-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}
