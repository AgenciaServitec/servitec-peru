"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  MapPin,
  CheckCircle2,
  Loader2,
  User,
  Settings,
  Truck,
  Search,
  Clock,
  Phone,
  Mail,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApiDataByDniOrRucGet } from "@/hooks";

export default function ServiceRequestForm({
  specialtyName,
}: {
  specialtyName: string;
}) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      documentType: "DNI",
      documentNumber: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      deviceCategory: specialtyName,
      deviceBrand: "",
      deviceModel: "",
      issueDescription: "",
      serviceMode: "store-visit",
      department: "Lima",
      province: "Lima",
      district: "",
      exactAddress: "",
    },
  });

  const serviceMode = watch("serviceMode");
  const docType = watch("documentType");
  const docNumber = watch("documentNumber");

  const { getDataByDniOrRuc, getDataByDniOrRucLoading } =
    useApiDataByDniOrRucGet(docType);

  useEffect(() => {
    const searchIdentity = async () => {
      const requiredLength = docType === "RUC" ? 11 : 8;
      if (docNumber.length === requiredLength) {
        const data = await getDataByDniOrRuc(docNumber);
        if (data) {
          const name =
            data.razonSocial ||
            data.fullName ||
            `${data.firstName || ""} ${data.paternalSurname || ""} ${data.maternalSurname || ""}`.trim();
          if (name) {
            setValue("fullName", name.toLowerCase());
            trigger("fullName");
          }
        }
      }
    };
    searchIdentity();
  }, [docNumber, docType, getDataByDniOrRuc, setValue, trigger]);

  const nextStep = async () => {
    const fieldsByStep: Record<number, any[]> = {
      1: ["documentNumber", "fullName", "email", "phoneNumber"],
      2: ["deviceBrand", "deviceModel", "issueDescription"],
      3: ["serviceMode"],
      4:
        serviceMode === "technical-visit"
          ? ["department", "province", "district", "exactAddress"]
          : ["department", "province", "district"],
    };
    const isValid = await trigger(fieldsByStep[step]);
    if (isValid) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://api-servitec-peru.web.app/web-services-requests",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) setStep(5);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-3xl mx-auto">
        {/* Stepper */}
        <div className="mb-12 pt-4 px-4">
          <div className="relative flex justify-between max-w-lg mx-auto">
            <div className="absolute top-5 left-0 w-full h-[2px] bg-white/5 z-0" />
            <div
              className="absolute top-5 left-0 h-[2px] bg-yellow-400 transition-all duration-500 z-0"
              style={{ width: `${((Math.min(step, 4) - 1) / 3) * 100}%` }}
            />
            {[
              { id: 1, label: "Cliente", icon: User },
              { id: 2, label: "Equipo", icon: Cpu },
              { id: 3, label: "Servicio", icon: Settings },
              { id: 4, label: "Ubicación", icon: MapPin },
            ].map((s) => (
              <div
                key={s.id}
                className="relative z-10 flex flex-col items-center gap-2"
              >
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center border transition-all ${
                    step >= s.id
                      ? "border-yellow-400 text-yellow-400 bg-black"
                      : "border-white/10 text-white/20 bg-black"
                  }`}
                >
                  {step > s.id ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <s.icon className="h-4 w-4" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0A0A0A] border border-white/10 rounded-sm p-8 md:p-14 shadow-2xl">
          {step < 5 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 flex items-center gap-2"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-yellow-400/80 font-bold">
                Solicitud para: {specialtyName}
              </span>
            </motion.div>
          )}

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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] text-white/30 uppercase">
                        Tipo Doc
                      </label>
                      <Select
                        onValueChange={(v) =>
                          setValue("documentType", v as any)
                        }
                        defaultValue="DNI"
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 h-12 text-sm focus:ring-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-white/10">
                          <SelectItem value="DNI">DNI</SelectItem>
                          <SelectItem value="RUC">RUC</SelectItem>
                          <SelectItem value="CE">CE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[11px] text-white/30 uppercase">
                        Nro Documento
                      </label>
                      <div className="relative">
                        <Input
                          {...register("documentNumber", { required: true })}
                          placeholder={
                            docType === "RUC" ? "11 dígitos" : "8 dígitos"
                          }
                          autoComplete="off"
                          className="bg-white/5 border-white/10 h-12 pr-10"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {getDataByDniOrRucLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin text-yellow-400" />
                          ) : (
                            <Search className="h-4 w-4 text-white/10" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] text-white/30 uppercase">
                      Nombre Completo / Razón Social
                    </label>
                    <Input
                      {...register("fullName", { required: true })}
                      className="bg-white/5 border-white/10 h-12 lowercase"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] text-white/30 uppercase">
                        Email
                      </label>
                      <Input
                        {...register("email", { required: true })}
                        type="email"
                        className="bg-white/5 border-white/10 h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] text-white/30 uppercase">
                        WhatsApp
                      </label>
                      <Input
                        {...register("phoneNumber", { required: true })}
                        className="bg-white/5 border-white/10 h-12"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-bold h-12"
                  >
                    Siguiente Paso
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] text-white/30 uppercase">
                        Marca
                      </label>
                      <Input
                        {...register("deviceBrand", { required: true })}
                        placeholder="HP, Apple, Epson..."
                        className="bg-white/5 border-white/10 h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] text-white/30 uppercase">
                        Modelo
                      </label>
                      <Input
                        {...register("deviceModel", { required: true })}
                        className="bg-white/5 border-white/10 h-12"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] text-white/30 uppercase">
                      Nro de Serie (Opcional)
                    </label>
                    <Input
                      {...register("serialNumber")}
                      className="bg-white/5 border-white/10 h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] text-white/30 uppercase">
                      Problema que presenta
                    </label>
                    <Textarea
                      {...register("issueDescription", { required: true })}
                      className="bg-white/5 border-white/10 min-h-[100px]"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="grow border-white/10 h-12 text-white/60"
                    >
                      Atrás
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="grow bg-yellow-400 text-black font-bold h-12"
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
                  className="space-y-8 text-center"
                >
                  <h3 className="text-xl font-bold text-white">
                    ¿Cómo deseas el servicio?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div
                      onClick={() => setValue("serviceMode", "store-visit")}
                      className={`p-6 border rounded-sm cursor-pointer transition-all ${serviceMode === "store-visit" ? "border-yellow-400 bg-yellow-400/5" : "border-white/10 hover:border-white/20"}`}
                    >
                      <Settings
                        className={`mx-auto mb-3 ${serviceMode === "store-visit" ? "text-yellow-400" : "text-white/20"}`}
                      />
                      <p className="text-sm font-bold">Vendré al taller</p>
                    </div>
                    <div
                      onClick={() => setValue("serviceMode", "technical-visit")}
                      className={`p-6 border rounded-sm cursor-pointer transition-all ${serviceMode === "technical-visit" ? "border-yellow-400 bg-yellow-400/5" : "border-white/10 hover:border-white/20"}`}
                    >
                      <Truck
                        className={`mx-auto mb-3 ${serviceMode === "technical-visit" ? "text-yellow-400" : "text-white/20"}`}
                      />
                      <p className="text-sm font-bold">Visita Técnica</p>
                    </div>
                  </div>

                  {serviceMode === "store-visit" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/[0.02] border border-white/5 rounded-sm p-6 text-left space-y-4"
                    >
                      <div className="flex items-center gap-2 text-yellow-400 text-[10px] uppercase font-bold">
                        <Clock className="h-3 w-3" /> Lun – Vie: 9am – 7pm
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <h4 className="text-white font-bold text-xs uppercase">
                            Sede Oficina
                          </h4>
                          <p className="text-white/40 text-[11px]">
                            Néstor Bermúdez 113, Lima
                          </p>
                          <a
                            href="https://www.google.com/maps/place/Servitec+Per%C3%BA+Group+EIRL+%E2%80%94+Oficina+Administrativa/@-12.1712063,-77.0188379,17z/data=!3m1!4b1!4m6!3m5!1s0x9105b7788f5f5189:0x70a366f7a0e80cd0!8m2!3d-12.1712063!4d-77.0188379!16s%2Fg%2F11f11pmm9d?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            className="text-yellow-400 text-[10px] flex items-center gap-1 hover:underline"
                          >
                            <Navigation className="h-3 w-3" /> Ver mapa
                          </a>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-white font-bold text-xs uppercase">
                            Sede Taller Kiwi
                          </h4>
                          <p className="text-white/40 text-[11px]">
                            Justo Pastor Davila 117, Lima
                          </p>
                          <a
                            href="https://www.google.com/maps/place/Servitec+Per%C3%BA+Group+EIRL+%E2%80%94+Taller+T%C3%A9cnico/@-12.175343,-77.0184858,17z/data=!3m1!4b1!4m6!3m5!1s0x9105b7788f078293:0xeec5e7a15ec3f73b!8m2!3d-12.175343!4d-77.0184858!16s%2Fg%2F11p5zxnckg?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            className="text-yellow-400 text-[10px] flex items-center gap-1 hover:underline"
                          >
                            <Navigation className="h-3 w-3" /> Ver mapa
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-4 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="grow border-white/10 h-12 text-white/60"
                    >
                      Atrás
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="grow bg-yellow-400 text-black font-bold h-12"
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] text-white/30 uppercase tracking-tighter">
                        Departamento
                      </label>
                      <Input
                        {...register("department", { required: true })}
                        placeholder="Lima"
                        className="bg-white/5 border-white/10 h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] text-white/30 uppercase tracking-tighter">
                        Provincia
                      </label>
                      <Input
                        {...register("province", { required: true })}
                        placeholder="Lima"
                        className="bg-white/5 border-white/10 h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] text-white/30 uppercase tracking-tighter">
                      Distrito
                    </label>
                    <Input
                      {...register("district", { required: true })}
                      placeholder="ej: Santiago de Surco"
                      className="bg-white/5 border-white/10 h-12"
                    />
                  </div>

                  {serviceMode === "technical-visit" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="space-y-4 overflow-hidden border-t border-white/5 pt-6"
                    >
                      <div className="space-y-2">
                        <label className="text-[11px] text-white/30 uppercase tracking-tighter">
                          Dirección Exacta
                        </label>
                        <Input
                          {...register("exactAddress", { required: true })}
                          placeholder="Av. Los Fresnos 123..."
                          className="bg-white/5 border-white/10 h-12"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          {...register("apartmentNumber")}
                          placeholder="Dpto/Of (Opt)"
                          className="bg-white/5 border-white/10 h-12"
                        />
                        <Input
                          {...register("reference")}
                          placeholder="Ref: Frente a..."
                          className="bg-white/5 border-white/10 h-12"
                        />
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="grow border-white/10 h-12 text-white/60"
                    >
                      Atrás
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="grow bg-yellow-400 text-black font-bold h-12"
                    >
                      {isSubmitting ? (
                        <Loader2 className="animate-spin h-4 w-4" />
                      ) : (
                        "Finalizar Registro"
                      )}
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
                  <div className="h-24 w-24 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-yellow-400/20">
                    <CheckCircle2
                      className="h-12 w-12 text-yellow-400"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 lowercase">
                    ¡solicitud enviada!
                  </h3>
                  <p className="text-white/40 text-sm max-w-sm mx-auto leading-relaxed lowercase mb-8">
                    tu requerimiento ha sido registrado. un especialista se
                    pondrá en contacto pronto vía whatsapp o email.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/5 pt-8 text-[10px] uppercase text-white/20 tracking-widest">
                    <div className="flex items-center justify-center gap-2">
                      <Phone className="h-3 w-3 text-yellow-400" /> 941 801 827
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Mail className="h-3 w-3 text-yellow-400" />{" "}
                      contacto@servitecperu.com
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="h-3 w-3 text-yellow-400" /> Lun-Vie
                      9am-7pm
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}
