"use client";

import * as React from "react";
import { ContentWidth } from "@/components/ContentWidth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, Clock, FileText, MapPin, PhoneCall } from "lucide-react";

type FormState = {
  name: string;
  phone: string;
  service: string;
  brandModel: string;
  issue: string;
  preferred: "whatsapp" | "call";
};

const SERVICES = [
  "Reparación de proyectores",
  "Reparación de laptops",
  "Reparación de celulares",
  "Redes y servidores",
  "Cámaras de seguridad",
  "Desarrollo web / sistemas",
  "Otro",
];

export default function Contact() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<FormState>({
    name: "",
    phone: "",
    service: SERVICES[0],
    brandModel: "",
    issue: "",
    preferred: "whatsapp",
  });

  const address = "Néstor Bermúdez 113, Chorrillos, Lima, Perú";
  const schedule = "Lun–Vie: 9:00 a.m. – 7:00 p.m.";

  const whatsappUrl = React.useMemo(() => {
    const msg = [
      "Hola, quiero una cotización.",
      `Nombre: ${data.name || "-"}`,
      `Celular: ${data.phone || "-"}`,
      `Servicio: ${data.service || "-"}`,
      `Marca/Modelo: ${data.brandModel || "-"}`,
      `Problema: ${data.issue || "-"}`,
      `Preferencia: ${data.preferred === "whatsapp" ? "WhatsApp" : "Llamada"}`,
    ].join("\n");

    return `https://wa.me/51941801827?text=${encodeURIComponent(msg)}`;
  }, [data]);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setData((prev) => ({ ...prev, [key]: e.target.value }));
    };

  function setPreferred(pref: FormState["preferred"]) {
    setData((prev) => ({ ...prev, preferred: pref }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Para no inventar backend: enviamos por WhatsApp (rápido y real para Servitec)
    setLoading(true);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setLoading(false);
  }

  return (
    <section className="py-14">
      <ContentWidth>
        <div className="max-w-2xl">
          <p className="text-sm text-muted-foreground">Cotización</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Solicitar cotización
          </h1>
          <p className="mt-3 text-muted-foreground">
            Completa los datos y envíanos el modelo + una breve descripción del
            problema. Te respondemos con una propuesta clara.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-start">
          {/* Form */}
          <Card className="border-white/10 bg-white/[0.04]">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-primary/15 p-2 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Formulario rápido
                  </p>
                  <p className="text-sm text-white/70">
                    Se abrirá WhatsApp con el mensaje listo para enviar.
                  </p>
                </div>
              </div>

              <form onSubmit={onSubmit} className="mt-6 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-white/80">Nombre</Label>
                    <Input
                      value={data.name}
                      onChange={onChange("name")}
                      placeholder="Tu nombre"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/80">Celular</Label>
                    <Input
                      value={data.phone}
                      onChange={onChange("phone")}
                      placeholder="Ej: 941801827"
                      inputMode="tel"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">Servicio</Label>
                  <select
                    value={data.service}
                    onChange={(e) =>
                      setData((p) => ({ ...p, service: e.target.value }))
                    }
                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {SERVICES.map((s) => (
                      <option key={s} value={s} className="bg-black">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">Marca / modelo</Label>
                  <Input
                    value={data.brandModel}
                    onChange={onChange("brandModel")}
                    placeholder="Ej: Epson X41 / Dell Inspiron / iPhone 11"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">Describe el problema</Label>
                  <Textarea
                    value={data.issue}
                    onChange={onChange("issue")}
                    placeholder="Ej: No enciende / se apaga / imagen borrosa / puerto dañado…"
                    className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">
                    Preferencia de contacto
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      className={[
                        "bg-white/10 text-white hover:bg-white/15",
                        data.preferred === "whatsapp"
                          ? "ring-2 ring-primary/40"
                          : "",
                      ].join(" ")}
                      onClick={() => setPreferred("whatsapp")}
                    >
                      WhatsApp
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      className={[
                        "bg-white/10 text-white hover:bg-white/15",
                        data.preferred === "call"
                          ? "ring-2 ring-primary/40"
                          : "",
                      ].join(" ")}
                      onClick={() => setPreferred("call")}
                    >
                      Llamada
                    </Button>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-primary text-black hover:bg-primary/90"
                    disabled={loading}
                  >
                    Enviar por WhatsApp <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <Button
                    type="button"
                    size="lg"
                    variant="secondary"
                    className="bg-white/10 text-white hover:bg-white/15"
                    asChild
                  >
                    <a href="tel:+51941801827">
                      <PhoneCall className="mr-2 h-4 w-4" />
                      Llamar
                    </a>
                  </Button>
                </div>

                <p className="text-xs text-white/60">
                  Tip: si adjuntas una foto o video del problema, el diagnóstico
                  es más rápido.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-white/10 bg-white/[0.04]">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-xl bg-primary/15 p-2 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Dirección</p>
                    <p className="mt-1 text-sm text-white/70">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-xl bg-primary/15 p-2 text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Horario</p>
                    <p className="mt-1 text-sm text-white/70">{schedule}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary text-black hover:bg-primary/90">
                    Chorrillos
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-white/10 text-white hover:bg-white/15"
                  >
                    Lima Metropolitana
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-white/10 text-white hover:bg-white/15"
                  >
                    Empresas y hogares
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/[0.04]">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-white">
                  Qué enviar para cotizar rápido
                </p>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    Marca y modelo del equipo
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    Foto o video del problema
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    Si ya fue revisado: qué le hicieron y qué pasó después
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </ContentWidth>
    </section>
  );
}
