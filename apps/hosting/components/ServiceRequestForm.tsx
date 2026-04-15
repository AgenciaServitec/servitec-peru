"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building,
  CheckCircle2,
  Clock,
  Cpu,
  DoorOpen,
  FileText,
  Hash,
  Home,
  IdCard,
  Info,
  Locate,
  Mail,
  MapPin,
  Phone,
  Settings,
  Store,
  Tag,
  Truck,
  User,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useApiDataByDniOrRucGet } from "@/hooks";
import { useFormHelpers } from "@/lib/hooks/useFormHelpers";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ServiceRequestFormData,
  serviceRequestSchema,
} from "@/lib/validations/service-request";
import { cn } from "@/lib/utils";
import { DISTRICTS } from "@/data-list/districts";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ServiceRequestForm({
  specialtyName,
}: {
  specialtyName: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Tu navegador no soporta geolocalización.");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
          );
          const data = await response.json();

          if (data.status === "OK") {
            const address = data.results[0].formatted_address;
            setValue("location.exactAddress", address);
            setValue("location.lat", latitude);
            setValue("location.lng", longitude);

            toast.success("Ubicación detectada correctamente.");
            trigger("location.exactAddress");
          } else {
            toast.error("No se pudo obtener la dirección exacta.");
          }
        } catch (error) {
          toast.error("Error al conectar con Google Maps.");
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        toast.error("Permiso de ubicación denegado.");
      },
      { enableHighAccuracy: true }
    );
  };

  const form = useForm<ServiceRequestFormData>({
    resolver: zodResolver(serviceRequestSchema) as any,
    defaultValues: (() => {
      const baseDefaults = {
        client: {
          names: "",
          paternalSurname: "",
          maternalSurname: "",
          fullName: "",
          companyName: "",
          email: "",
          document: { type: "dni", number: "" },
          phone: { prefix: "+51", number: "" },
        },
        device: {
          category: specialtyName || "General",
          brand: "",
          model: "",
          serialNumber: "",
        },
        serviceMode: "store-visit",
        location: {
          department: "lima",
          province: "lima",
          district: "",
          exactAddress: "",
          interior: "",
          reference: "",
          lat: null,
          lng: null,
        },
        status: "pending",
        priority: "medium",
        issueDescription: "",
      };
      if (typeof window !== "undefined") {
        const saved = sessionStorage.getItem("service_request_draft");
        if (saved) return JSON.parse(saved);
      }
      return baseDefaults;
    })(),
  });

  const { handleSubmit, setValue, watch, trigger, control } = form;

  const serviceMode = watch("serviceMode");
  const docType = watch("client.document.type");
  const docNumber = watch("client.document.number");
  const allFields = watch();

  useEffect(() => {
    if (step < 5) {
      sessionStorage.setItem(
        "service_request_draft",
        JSON.stringify(allFields)
      );
    }
  }, [allFields, step]);

  const { getDataByDniOrRuc, getDataByDniOrRucLoading } =
    useApiDataByDniOrRucGet(docType);

  useEffect(() => {
    const searchIdentity = async () => {
      const requiredLength = docType === "ruc" ? 11 : 8;

      if ((docNumber?.length || 0) < requiredLength) {
        setIsManualEntry(false);
        return;
      }

      if (docNumber?.length === requiredLength) {
        const data = await getDataByDniOrRuc(docNumber);

        if (data) {
          setIsManualEntry(false);

          if (docType === "dni") {
            setValue("client.names", data.firstName || "");
            setValue("client.paternalSurname", data.paternalSurname || "");
            setValue("client.maternalSurname", data.maternalSurname || "");

            const full =
              `${data.firstName || ""} ${data.paternalSurname || ""} ${data.maternalSurname || ""}`
                .trim()
                .toLowerCase();
            setValue("client.fullName", full);
            trigger("client.fullName");
          } else {
            setValue(
              "client.companyName",
              (data.companyName || "").toLowerCase()
            );
            trigger("client.companyName");
          }
        } else {
          if (docType === "dni") {
            setIsManualEntry(true);
            setValue("client.fullName", "");
          }
          toast.info(
            "No se encontraron datos. Por favor, ingrese sus nombres manualmente."
          );
        }
      }
    };
    searchIdentity();
  }, [docNumber, docType, getDataByDniOrRuc, setValue, trigger]);

  const nextStep = async () => {
    const fieldsByStep: Record<number, string[]> = {
      1: ["device.brand", "device.model", "issueDescription", "priority"],
      2: ["serviceMode"],
      3: ["location.district"],
      4: [
        "client.document.type",
        "client.document.number",
        "client.fullName",
        "client.email",
        "client.phone.number",
      ],
    };

    if (step === 3 && serviceMode === "home-service") {
      fieldsByStep[3].push("location.exactAddress", "location.reference");
    }

    if (step === 4 && docType === "ruc") {
      fieldsByStep[4].push("client.companyName");
    }

    const isValid = await trigger(fieldsByStep[step] as any);
    if (isValid) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = async (data: ServiceRequestFormData) => {
    if (!executeRecaptcha) return;

    setIsSubmitting(true);
    try {
      const token = await executeRecaptcha("service_request");
      const payload = { ...data, captchaToken: token };

      const response = await fetch(
        "https://api-servitec-peru.web.app/web-services-requests",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        sessionStorage.removeItem("service_request_draft");
        form.reset({
          client: {
            document: { type: "dni", number: "" },
            fullName: "",
            email: "",
            phone: { prefix: "+51", number: "" },
          },
          device: { brand: "", model: "" },
          issueDescription: "",
        });

        setStep(5);

        toast.success("Envío exitoso", {
          description: "Tu registro se completó correctamente.",
          duration: 3000,
        });

        router.push("/gracias");
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error("Error en el envío", {
          description:
            errorData.error || "Revisa los datos e intenta de nuevo.",
        });
      }
    } catch (e) {
      toast.error("Error de conexión", {
        description: "No se pudo conectar con el servidor de Servitec.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 relative z-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-center text-2xl md:text-3xl font-bold text-white tracking-tight">
          Solicitud de Servicio para {specialtyName}
        </h3>

        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] md:text-[11px] text-info bg-info/10 py-1.5 px-4 rounded-full w-fit mx-auto border border-info/20 shadow-[0_0_15px_rgba(var(--info-rgb),0.1)]">
          <span className="font-medium tracking-wide">
            Progreso guardado: tus datos se mantendrán en esta pestaña.
          </span>
        </div>

        <div className="mb-12 pt-4 px-4">
          <div className="relative flex justify-between max-w-lg mx-auto">
            <div className="absolute top-5 left-0 right-0 px-5 z-0">
              <div className="w-full h-0.5 bg-white/5 relative">
                <div
                  className="absolute top-0 left-0 h-0.5 bg-success transition-all duration-500"
                  style={{ width: `${((Math.min(step, 4) - 1) / 3) * 100}%` }}
                />
              </div>
            </div>

            {[
              { id: 1, label: "Equipo", icon: Cpu },
              { id: 2, label: "Servicio", icon: Settings },
              { id: 3, label: "Ubicación", icon: MapPin },
              { id: 4, label: "Cliente", icon: User },
            ].map((s) => {
              const isCompleted = step > s.id;
              const isActive = step === s.id;

              return (
                <div
                  key={s.id}
                  className="relative z-10 flex flex-col items-center gap-2"
                >
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isCompleted
                        ? "border-success text-success bg-black"
                        : isActive
                          ? "border-white text-white bg-black"
                          : "border-white/10 text-white/20 bg-black"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 animate-in zoom-in duration-300" />
                    ) : (
                      <s.icon className="h-4 w-4" />
                    )}
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold transition-colors ${
                      isCompleted
                        ? "text-success/70"
                        : isActive
                          ? "text-white"
                          : "text-white/20"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <Card className="bg-transparent">
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="s1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="text-center space-y-2">
                        <h3 className="text-xl font-semibold text-white">
                          Información del Equipo
                        </h3>
                        <p className="text-sm text-white/50">
                          Cuéntanos sobre el dispositivo que deseas reparar.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <FormField
                            control={control}
                            name="device.brand"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    {...useFormHelpers(
                                      "device.brand",
                                      serviceRequestSchema
                                    )}
                                    label="Marca"
                                    placeholder="Ej: HP, Apple, Epson..."
                                    icon={Tag}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={control}
                          name="device.model"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  {...useFormHelpers(
                                    "device.model",
                                    serviceRequestSchema
                                  )}
                                  label="Modelo"
                                  placeholder="Ej: LaserJet Pro M404dn"
                                  icon={Cpu}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="device.serialNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  {...useFormHelpers(
                                    "device.serialNumber",
                                    serviceRequestSchema
                                  )}
                                  label="Nro de Serie (Opcional)"
                                  placeholder="SN: ABC123456789"
                                  icon={Hash}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <div className="md:col-span-2">
                          <FormField
                            control={control}
                            name="priority"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Select
                                    {...field}
                                    {...useFormHelpers(
                                      "priority",
                                      serviceRequestSchema
                                    )}
                                    label="Prioridad del servicio"
                                    icon={Zap}
                                    options={[
                                      { value: "low", label: "Baja" },
                                      { value: "medium", label: "Normal" },
                                      { value: "high", label: "Urgente" },
                                    ]}
                                    onValueChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <FormField
                            control={control}
                            name="issueDescription"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    {...useFormHelpers(
                                      "issueDescription",
                                      serviceRequestSchema
                                    )}
                                    label="Problema que presenta"
                                    placeholder="Describa detalladamente la falla o los síntomas de su equipo..."
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="w-full"
                      >
                        Siguiente
                      </Button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="s2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="text-center space-y-2">
                        <h3 className="text-xl font-semibold text-white">
                          ¿Cómo prefieres el servicio?
                        </h3>
                        <p className="text-sm text-white/50">
                          Selecciona la modalidad que mejor se te acomode.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                          onClick={() => setValue("serviceMode", "store-visit")}
                          className={cn(
                            "relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 group",
                            serviceMode === "store-visit"
                              ? "border-success bg-success/10"
                              : "border-white/5 bg-white/5 hover:border-white/20"
                          )}
                        >
                          <div className="flex flex-col items-center text-center gap-3">
                            <div
                              className={cn(
                                "p-3 rounded-full transition-colors",
                                serviceMode === "store-visit"
                                  ? "bg-success/20 text-success"
                                  : "bg-white/5 text-white/20 group-hover:text-white/40"
                              )}
                            >
                              <Store className="h-6 w-6" />
                            </div>
                            <div>
                              <p className="font-semibold text-white">
                                Dejar en taller
                              </p>
                              <p className="text-xs text-white/40 mt-1">
                                Visítanos en nuestras sedes
                              </p>
                            </div>
                          </div>
                        </div>

                        <div
                          onClick={() =>
                            setValue("serviceMode", "home-service")
                          }
                          className={cn(
                            "relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 group",
                            serviceMode === "home-service"
                              ? "border-success bg-success/10"
                              : "border-white/5 bg-white/5 hover:border-white/20"
                          )}
                        >
                          <div className="flex flex-col items-center text-center gap-3">
                            <div
                              className={cn(
                                "p-3 rounded-full transition-colors",
                                serviceMode === "home-service"
                                  ? "bg-success/20 text-success"
                                  : "bg-white/5 text-white/20 group-hover:text-white/40"
                              )}
                            >
                              <Truck className="h-6 w-6" />
                            </div>
                            <div>
                              <p className="font-semibold text-white">
                                Servicio a domicilio
                              </p>
                              <p className="text-xs text-white/40 mt-1">
                                Técnico especializado a tu casa
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {serviceMode === "store-visit" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-white/5 rounded-xl border border-white/10 p-5 space-y-4">
                              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                <span className="text-xs font-medium text-white/60">
                                  Sedes disponibles en Chorrillos
                                </span>
                                <div className="flex items-center gap-1.5 text-[11px] text-info">
                                  <Clock className="h-3.5 w-3.5" />
                                  <span>Lun – Vie: 9am – 7pm</span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="group/loc relative bg-white/[0.02] p-3 rounded-lg border border-white/5 hover:bg-white/[0.05] transition-colors">
                                  <div className="flex justify-between items-start mb-1">
                                    <h4 className="text-sm font-medium text-white">
                                      Sede Oficina
                                    </h4>
                                    <span className="text-[9px] bg-info/10 text-info px-1.5 py-0.5 rounded border border-info/20">
                                      CHORRILLOS
                                    </span>
                                  </div>
                                  <p className="text-xs text-white/40 leading-relaxed mb-3">
                                    Néstor Bermúdez 113, Lima
                                  </p>
                                  <div className="flex items-center gap-3">
                                    <a
                                      href="https://www.google.com/maps/dir/?api=1&destination=Servitec+Per%C3%BA+Group+EIRL+Oficina+Administrativa+-12.1712089,-77.0188392"
                                      target="_blank"
                                      className="inline-flex items-center gap-1 text-[11px] text-info hover:underline"
                                    >
                                      <MapPin className="h-3 w-3" /> Cómo llegar
                                    </a>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        navigator.clipboard.writeText(
                                          "Calle Néstor Bermúdez 113, Chorrillos"
                                        )
                                      }
                                      className="text-[10px] text-white/30 hover:text-white transition-colors"
                                    >
                                      Copiar
                                    </button>
                                  </div>
                                </div>

                                <div className="group/loc relative bg-white/[0.02] p-3 rounded-lg border border-white/5 hover:bg-white/[0.05] transition-colors">
                                  <div className="flex justify-between items-start mb-1">
                                    <h4 className="text-sm font-medium text-white">
                                      Sede Taller Kiwi
                                    </h4>
                                    <span className="text-[9px] bg-info/10 text-info px-1.5 py-0.5 rounded border border-info/20">
                                      CHORRILLOS
                                    </span>
                                  </div>
                                  <p className="text-xs text-white/40 leading-relaxed mb-3">
                                    Justo Pastor Dávila 117, Lima
                                  </p>
                                  <div className="flex items-center gap-3">
                                    <a
                                      href="https://www.google.com/maps/dir/?api=1&origin=current+location&destination=-12.175343,-77.0184858"
                                      target="_blank"
                                      className="inline-flex items-center gap-1 text-[11px] text-info hover:underline"
                                    >
                                      <MapPin className="h-3 w-3" /> Cómo llegar
                                    </a>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        navigator.clipboard.writeText(
                                          "Justo Pastor Dávila 117, Chorrillos"
                                        )
                                      }
                                      className="text-[10px] text-white/30 hover:text-white transition-colors"
                                    >
                                      Copiar
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {serviceMode === "home-service" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-4 bg-info/5 border border-info/20 rounded-xl flex gap-3 items-start"
                          >
                            <Info className="h-5 w-5 text-info shrink-0 mt-0.5" />
                            <p className="text-xs text-white/70 leading-relaxed">
                              Un técnico se pondrá en contacto contigo para
                              coordinar el horario.
                              <span className="text-info font-medium">
                                {" "}
                                El costo de movilidad se calcula según tu
                                distrito en el siguiente paso.
                              </span>
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="flex flex-col md:flex-row gap-6">
                        <Button
                          variant="outline"
                          onClick={prevStep}
                          className="flex-1"
                        >
                          Atrás
                        </Button>
                        <Button
                          type="button"
                          onClick={nextStep}
                          disabled={!serviceMode}
                          className="flex-1"
                        >
                          Siguiente
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="s3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="text-center space-y-2">
                        <h3 className="text-xl font-semibold text-white">
                          {serviceMode === "home-service"
                            ? "Ubicación del Servicio"
                            : "Punto de Origen"}
                        </h3>
                        <p className="text-sm text-white/50">
                          {serviceMode === "home-service"
                            ? "Ayúdanos a saber dónde se realizará la atención."
                            : "¿Desde qué distrito nos estarías visitando?"}
                        </p>
                      </div>
                      {serviceMode === "home-service" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={control}
                            name="location.department"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    {...useFormHelpers(
                                      "location.department",
                                      serviceRequestSchema
                                    )}
                                    label="Departamento"
                                    placeholder="Ej: Lima"
                                    icon={MapPin}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={control}
                            name="location.province"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    {...useFormHelpers(
                                      "location.province",
                                      serviceRequestSchema
                                    )}
                                    label="Provincia"
                                    placeholder="Ej: Lima"
                                    icon={MapPin}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <FormField
                            control={control}
                            name="location.district"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Select
                                    {...field}
                                    {...useFormHelpers(
                                      "location.district",
                                      serviceRequestSchema
                                    )}
                                    label="Distrito"
                                    placeholder="Seleccionar"
                                    icon={Locate}
                                    options={DISTRICTS}
                                    onValueChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {serviceMode === "home-service" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          className="space-y-4 overflow-hidden border-t border-white/5 pt-6"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                              <FormField
                                control={control}
                                name="location.exactAddress"
                                render={({ field }) => (
                                  <FormItem>
                                    <div className="flex items-center gap-2 mb-2 justify-center">
                                      <Button
                                        type="button"
                                        onClick={handleGetCurrentLocation}
                                        loading={isLocating}
                                        className={cn(
                                          "h-7 text-[10px] px-3 rounded-md transition-all duration-200",
                                          "bg-info text-zinc-950 hover:bg-info/90 border-none",
                                          "flex items-center gap-1.5 font-bold uppercase tracking-wider"
                                        )}
                                      >
                                        <Locate
                                          className={cn(
                                            "h-3.5 w-3.5",
                                            isLocating
                                              ? "animate-spin"
                                              : "animate-pulse"
                                          )}
                                        />
                                        Usar mi ubicación actual
                                      </Button>
                                    </div>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        {...useFormHelpers(
                                          "location.exactAddress",
                                          serviceRequestSchema
                                        )}
                                        label="Dirección Exacta"
                                        placeholder="Calle / Av / Jr. y número"
                                        icon={Home}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>

                            <FormField
                              control={control}
                              name="location.interior"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      {...useFormHelpers(
                                        "location.interior",
                                        serviceRequestSchema
                                      )}
                                      label="Interior"
                                      placeholder="Dpto, Of, Bloque"
                                      icon={DoorOpen}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={control}
                              name="location.reference"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      {...useFormHelpers(
                                        "location.reference",
                                        serviceRequestSchema
                                      )}
                                      label="Referencia"
                                      placeholder="Ej: Frente al parque..."
                                      icon={Info}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </motion.div>
                      )}

                      <div className="flex flex-col md:flex-row gap-6">
                        <Button
                          variant="outline"
                          onClick={prevStep}
                          className="flex-1"
                        >
                          Atrás
                        </Button>
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="flex-1"
                        >
                          Siguiente
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="s4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="text-center space-y-2">
                        <h3 className="text-xl font-semibold text-white">
                          Datos de Contacto
                        </h3>
                        <p className="text-sm text-white/50">
                          Completa tu información para comunicarnos contigo.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <FormField
                          control={control}
                          name="client.document.type"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Select
                                  {...field}
                                  {...useFormHelpers(
                                    "client.document.type",
                                    serviceRequestSchema
                                  )}
                                  label="Tipo de Documento"
                                  placeholder="Seleccionar"
                                  icon={IdCard}
                                  options={[
                                    { value: "dni", label: "DNI" },
                                    { value: "ruc", label: "RUC" },
                                  ]}
                                  onValueChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <div className="md:col-span-3">
                          <FormField
                            control={control}
                            name="client.document.number"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    {...useFormHelpers(
                                      "client.document.number",
                                      serviceRequestSchema
                                    )}
                                    label="N° Documento"
                                    loading={getDataByDniOrRucLoading}
                                    placeholder={
                                      docType === "ruc"
                                        ? "20123456789"
                                        : "45678912"
                                    }
                                    icon={FileText}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        {docType === "dni" ? (
                          <div className="md:col-span-4">
                            {!isManualEntry ? (
                              <FormField
                                control={control}
                                name="client.fullName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        {...useFormHelpers(
                                          "client.fullName",
                                          serviceRequestSchema
                                        )}
                                        label="Nombre Completo"
                                        icon={User}
                                        disabled={true}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            ) : (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                              >
                                <FormField
                                  control={control}
                                  name="client.names"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          label="Nombres"
                                          icon={User}
                                          placeholder="Ej: Juan"
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={control}
                                  name="client.paternalSurname"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          label="Apellido Paterno"
                                          icon={User}
                                          placeholder="Ej: Perez"
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={control}
                                  name="client.maternalSurname"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          label="Apellido Materno"
                                          icon={User}
                                          placeholder="Ej: Soto"
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </motion.div>
                            )}
                          </div>
                        ) : (
                          <div className="md:col-span-4">
                            <FormField
                              control={control}
                              name="client.companyName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      {...useFormHelpers(
                                        "client.companyName",
                                        serviceRequestSchema
                                      )}
                                      label="Razón Social"
                                      icon={Building}
                                      disabled={true}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        )}
                        <div className="md:col-span-2">
                          <FormField
                            control={control}
                            name="client.phone.number"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    {...useFormHelpers(
                                      "client.phone.number",
                                      serviceRequestSchema
                                    )}
                                    label="WhatsApp"
                                    placeholder="987 654 321"
                                    icon={Phone}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <FormField
                            control={control}
                            name="client.email"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    {...useFormHelpers(
                                      "client.email",
                                      serviceRequestSchema
                                    )}
                                    label="Correo"
                                    type="email"
                                    placeholder="ejemplo@servitecperu.com"
                                    icon={Mail}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-6">
                        <Button
                          variant="outline"
                          onClick={prevStep}
                          className="flex-1"
                        >
                          Atrás
                        </Button>
                        <Button
                          type="submit"
                          loading={isSubmitting}
                          className="flex-1"
                        >
                          Finalizar Registro
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div
                      key="s5"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="h-24 w-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-success/20">
                        <CheckCircle2
                          className="h-12 w-12 text-success"
                          strokeWidth={1.5}
                        />
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-4">
                        ¡Solicitud enviada!
                      </h3>
                      <p className="text-white/40 text-sm max-w-sm mx-auto leading-relaxed mb-8">
                        Tu requerimiento ha sido registrado. Un especialista se
                        pondrá en contacto pronto vía whatsapp o email.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/5 pt-8 text-[10px] uppercase text-white/20 tracking-widest">
                        <div className="flex items-center justify-center gap-2">
                          <Phone className="h-3 w-3 text-primary" /> 941 801 827
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <Mail className="h-3 w-3 text-primary" />{" "}
                          contacto@servitecperu.com
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <Clock className="h-3 w-3 text-primary" /> Lun-Vie
                          9am-7pm
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <p className="text-center mt-4 text-[10px] text-white/30 leading-tight">
                  Este sitio está protegido por reCAPTCHA y se aplican la{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-info transition-colors"
                  >
                    Política de privacidad
                  </a>{" "}
                  y los{" "}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-info transition-colors"
                  >
                    Términos de servicio
                  </a>{" "}
                  de Google.
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
