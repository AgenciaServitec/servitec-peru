"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ContentWidth } from "@/components/ContentWidth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import { ServicesData, SpecialtiesData } from "../../data-list";
import { ArrowRight, LocateFixed, Search } from "lucide-react";

type ServiceItem = {
  type: string;
  typeSpeciality: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  includes: string[];
};

type SpecialtyItem = {
  type: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  includes: string[];
  services?: any[];
};

const SPECIALTY_OPTIONS = [
  { value: "all", label: "Todas las especialidades" },
  ...(SpecialtiesData as any[])
    .filter((x) => !("typeSpeciality" in x))
    .map((s: SpecialtyItem) => ({ value: s.type, label: s.title }))
    .sort((a, b) => a.label.localeCompare(b.label, "es")),
];

const SERVICES = ServicesData as ServiceItem[];

// ✅ Ejemplo: reemplaza por tu data real
type Service = {
  id: string;
  title: string;
  specialtyType: string; // e.g. "projector-repair"
};

export default function Services() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlSpecialty = searchParams.get("type-specialty") ?? "all";

  // Catálogo
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState<string>(urlSpecialty);

  // Cotización
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isLocating, setIsLocating] = useState(false);

  const [form, setForm] = useState({
    device: "",
    issue: "",
    district: "",
    locationCoords: "",

    fullName: "", // Apellidos y nombres
    phone: "",
    email: "",
  });

  useEffect(() => {
    setSpecialty(urlSpecialty);
  }, [urlSpecialty]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return SERVICES.filter((s) => {
      const matchSpecialty =
        specialty === "all" || s.typeSpeciality === specialty;

      const haystack = [
        s.title,
        s.description,
        s.longDescription ?? "",
        ...(s.includes ?? []),
        s.type,
        s.typeSpeciality,
      ]
        .join(" ")
        .toLowerCase();

      const matchQuery = q.length === 0 || haystack.includes(q);

      return matchSpecialty && matchQuery;
    });
  }, [specialty, query]);

  const onChangeSpecialty = (value: string) => {
    setSpecialty(value);

    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value === "all") params.delete("type-specialty");
    else params.set("type-specialty", value);

    router.replace(`/services?${params.toString()}`, { scroll: false });
  };

  const canNext =
    (step === 1 && form.device.trim() && form.issue.trim()) ||
    (step === 2 &&
      form.fullName.trim() &&
      form.phone.trim() &&
      form.email.trim());

  const next = () => setStep((prev) => (prev === 1 ? 2 : 3));
  const back = () => setStep((prev) => (prev === 3 ? 2 : 1));

  const getLocation = () => {
    if (!navigator.geolocation) return;
    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setForm((p) => ({
          ...p,
          locationCoords: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
        }));
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  };

  const whatsappText = useMemo(() => {
    const lines = [
      "Hola, quiero una cotización.",
      `Equipo: ${form.device}`,
      `Problema: ${form.issue}`,
      `Distrito: ${form.district || "-"}`,
      `Ubicación (coords): ${form.locationCoords || "-"}`,
      `Apellidos y nombres: ${form.fullName}`,
      `Celular: ${form.phone}`,
      `Correo: ${form.email}`,
    ];
    return lines.join("\n");
  }, [form]);

  const stepsUi = (
    <div className="flex items-center justify-center gap-6 sm:gap-10">
      {(
        [
          { n: 1, label: "Equipo" },
          { n: 2, label: "Contacto" },
          { n: 3, label: "Confirmar" },
        ] as const
      ).map((s) => {
        const active = step === s.n;
        const done = step > s.n;

        return (
          <div key={s.n} className="flex items-center gap-2">
            <div
              className={[
                "h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold border",
                done
                  ? "bg-primary text-black border-primary"
                  : active
                    ? "bg-white/10 text-white border-white/25"
                    : "bg-white/5 text-white/60 border-white/10",
              ].join(" ")}
            >
              {s.n}
            </div>
            <span
              className={[
                "text-sm",
                active ? "text-white" : "text-white/60",
              ].join(" ")}
            >
              {s.label}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <section className="py-14">
      <ContentWidth>
        {/* Header */}
        <div className="flex flex-col gap-3">
          <p className="text-sm text-white/60">Servicios</p>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Todos los servicios
          </h1>
          <p className="text-white/70 max-w-2xl">
            Filtra por especialidad o busca el servicio que necesitas.
          </p>
        </div>

        {/* Cotización (arriba) */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-white/60">Cotización</p>
              <h2 className="text-xl sm:text-2xl font-semibold text-white">
                Solicitar cotización
              </h2>
              <p className="text-sm text-white/70 max-w-2xl">
                Completa estos pasos y te respondemos por WhatsApp.
              </p>
            </div>

            {/* Steps centered */}
            <div className="mt-6">{stepsUi}</div>

            {/* Step content */}
            <div className="mt-8 grid gap-4 md:grid-cols-12">
              {step === 1 && (
                <>
                  <div className="md:col-span-6">
                    <label className="text-sm text-white/70">Equipo</label>
                    <Input
                      value={form.device}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, device: e.target.value }))
                      }
                      placeholder="Ej: Laptop HP, Proyector Epson..."
                      className="mt-2 h-12 text-base bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    />
                  </div>

                  <div className="md:col-span-6">
                    <label className="text-sm text-white/70">Distrito</label>
                    <Input
                      value={form.district}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, district: e.target.value }))
                      }
                      placeholder="Ej: Chorrillos, Miraflores..."
                      className="mt-2 h-12 text-base bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    />
                  </div>

                  <div className="md:col-span-12">
                    <label className="text-sm text-white/70">Problema</label>
                    <Textarea
                      value={form.issue}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, issue: e.target.value }))
                      }
                      placeholder="Cuéntanos qué está pasando (breve)"
                      className="mt-2 min-h-[110px] text-base bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    />
                    <p className="mt-2 text-xs text-white/55">
                      Tip: si indicas modelo y síntomas, avanzamos más rápido.
                    </p>
                  </div>

                  <div className="md:col-span-12">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-white font-medium">
                          Ubicación (opcional)
                        </p>
                        <p className="text-xs text-white/60">
                          Puedes compartir tu ubicación para coordinar mejor.
                        </p>
                        {form.locationCoords && (
                          <p className="mt-2 text-xs text-white/80">
                            {form.locationCoords}
                          </p>
                        )}
                      </div>

                      <Button
                        variant="secondary"
                        className="border border-white/10 bg-white/10 text-white hover:bg-white/15"
                        onClick={getLocation}
                        disabled={isLocating}
                      >
                        <LocateFixed className="mr-2 h-4 w-4" />
                        {isLocating ? "Obteniendo..." : "Obtener ubicación"}
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="md:col-span-6">
                    <label className="text-sm text-white/70">
                      Apellidos y nombres
                    </label>
                    <Input
                      value={form.fullName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, fullName: e.target.value }))
                      }
                      placeholder="Ej: Gala Flores Angel Emilio"
                      className="mt-2 h-12 text-base bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    />
                  </div>

                  <div className="md:col-span-6">
                    <label className="text-sm text-white/70">Celular</label>
                    <Input
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="Ej: 941 801 827"
                      className="mt-2 h-12 text-base bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    />
                  </div>

                  <div className="md:col-span-12">
                    <label className="text-sm text-white/70">
                      Correo electrónico
                    </label>
                    <Input
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="Ej: tucorreo@gmail.com"
                      className="mt-2 h-12 text-base bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    />
                  </div>

                  <div className="md:col-span-12">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/70">
                      Al continuar, confirmas que podemos contactarte para
                      enviarte una propuesta por WhatsApp.
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <div className="md:col-span-12">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-sm text-white/60">Resumen</p>

                    <p className="mt-2 text-white font-semibold">
                      {form.device || "Equipo"} — {form.issue || "Problema"}
                    </p>

                    <p className="mt-2 text-sm text-white/70">
                      {form.fullName || "Cliente"} • {form.phone || "Celular"} •{" "}
                      {form.email || "Correo"}{" "}
                      {form.district ? `• ${form.district}` : ""}
                    </p>

                    {form.locationCoords && (
                      <p className="mt-2 text-xs text-white/70">
                        Ubicación: {form.locationCoords}
                      </p>
                    )}

                    <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-4">
                      <p className="text-xs text-white/60 mb-2">Mensaje:</p>
                      <pre className="whitespace-pre-wrap text-sm text-white/80">
                        {whatsappText}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Buttons below form */}
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button
                variant="secondary"
                className="border border-white/10 bg-white/10 text-white hover:bg-white/15"
                onClick={back}
                disabled={step === 1}
              >
                Atrás
              </Button>

              {step < 3 ? (
                <Button
                  className="bg-primary text-black hover:bg-primary/90"
                  onClick={next}
                  disabled={!canNext}
                >
                  Continuar <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    variant="secondary"
                    className="border border-white/10 bg-white/10 text-white hover:bg-white/15"
                    onClick={() => setStep(1)}
                  >
                    Editar
                  </Button>

                  <Button
                    className="bg-primary text-black hover:bg-primary/90"
                    asChild
                  >
                    <a
                      href={`https://wa.me/51941801827?text=${encodeURIComponent(
                        whatsappText
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Enviar por WhatsApp{" "}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="h-px w-full bg-white/10" />
        </div>

        {/* Catálogo */}
        <div className="mt-14 flex flex-col gap-2">
          <p className="text-sm text-white/60">Catálogo</p>
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            Buscar y filtrar servicios
          </h2>
        </div>

        {/* Toolbar: búsqueda + Select (shadcn) */}
        <div className="mt-6 grid gap-3 md:grid-cols-12 md:items-center">
          <div className="relative md:col-span-7">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar (ej: pantalla, lámpara, batería...)"
              className="pl-12 h-12 text-base bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>

          <div className="md:col-span-5">
            <Select
              value={specialty}
              onValueChange={(v) => onChangeSpecialty(v)}
            >
              <SelectTrigger className="h-12 text-base bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Seleccionar especialidad" />
              </SelectTrigger>

              <SelectContent className="bg-[#0b0f14] border-white/10 text-white">
                {SPECIALTY_OPTIONS.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="focus:bg-white/10 focus:text-white"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mt-10">
          <p className="text-sm text-white/60">
            Mostrando <span className="text-white">{filtered.length}</span>{" "}
            resultados
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((s) => (
              <Card
                key={s.slug}
                className="overflow-hidden border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                </div>

                <CardContent className="p-6">
                  <p className="text-white font-semibold text-lg">{s.title}</p>
                  <p className="mt-2 text-sm text-white/70 line-clamp-2">
                    {s.description}
                  </p>

                  {s.includes?.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm text-white/70">
                      {s.includes.slice(0, 3).map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                          <span className="line-clamp-1">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-5 flex gap-3">
                    <Button
                      className="bg-primary text-black hover:bg-primary/90"
                      asChild
                    >
                      <Link href={`/services/${s.slug}`}>
                        Ver detalle <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <Button
                      variant="secondary"
                      className="border border-white/10 bg-white/10 text-white hover:bg-white/15"
                      asChild
                    >
                      <Link href="/contact">Cotizar</Link>
                    </Button>
                  </div>

                  <p className="mt-3 text-xs text-white/50">
                    Categoría:{" "}
                    <span className="text-white/70">{s.typeSpeciality}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </ContentWidth>
    </section>
  );
}
