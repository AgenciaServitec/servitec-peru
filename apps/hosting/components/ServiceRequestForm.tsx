"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import {
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
  Navigation,
  Phone,
  Settings,
  Tag,
  Truck,
  User,
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

export default function ServiceRequestForm({
  specialtyName,
}: {
  specialtyName: string;
}) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ServiceRequestFormData>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      client: {
        fullName: "",
        email: "",
        document: {
          type: "dni",
          number: "",
        },
        phone: {
          prefix: "",
          number: "",
        },
      },
      device: {
        category: specialtyName,
        brand: "",
        model: "",
        serialNumber: "",
      },
      issueDescription: "",
      serviceMode: "store-visit",
      department: "Lima",
      province: "Lima",
      district: "",
      exactAddress: "",
    },
  });

  const { handleSubmit, setValue, watch, trigger, control } = form;

  const serviceMode = watch("serviceMode");
  const docType = watch("client.document.type");
  const docNumber = watch("client.document.number");

  const { getDataByDniOrRuc, getDataByDniOrRucLoading } =
    useApiDataByDniOrRucGet(docType);

  useEffect(() => {
    const searchIdentity = async () => {
      const requiredLength = docType === "ruc" ? 11 : 8;
      if (docNumber?.length === requiredLength) {
        const data = await getDataByDniOrRuc(docNumber);
        if (data) {
          const name =
            data.razonSocial ||
            data.fullName ||
            `${data.firstName || ""} ${data.paternalSurname || ""} ${data.maternalSurname || ""}`.trim();
          if (name) {
            setValue("client.fullName", name.toLowerCase());
            trigger("client.fullName");
          }
        }
      }
    };
    searchIdentity();
  }, [docNumber, docType, getDataByDniOrRuc, setValue, trigger]);

  const nextStep = async () => {
    const fieldsByStep: Record<number, any[]> = {
      1: [
        "client.document.number",
        "client.fullName",
        "client.email",
        "client.phone.number",
      ],
      2: ["device.brand", "device.model", "issueDescription"],
      3: ["serviceMode"],
      4: ["department", "province", "district"],
    };

    if (step === 4 && serviceMode === "technical-visit") {
      fieldsByStep[4].push("exactAddress");
    }

    const isValid = await trigger(fieldsByStep[step] as any);
    if (isValid) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = async (data: ServiceRequestFormData) => {
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
        <div className="mb-12 pt-4 px-4">
          <div className="relative flex justify-between max-w-lg mx-auto">
            <div className="absolute top-5 left-2 w-full h-0.5 bg-white/5 z-0" />
            <div
              className="absolute top-5 left-2 h-0.5 bg-success transition-all duration-500 z-0"
              style={{ width: `${((Math.min(step, 4) - 1) / 3) * 100}%` }}
            />
            {[
              { id: 1, label: "Cliente", icon: User },
              { id: 2, label: "Equipo", icon: Cpu },
              { id: 3, label: "Servicio", icon: Settings },
              { id: 4, label: "Ubicación", icon: MapPin },
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
            {step < 5 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8 flex items-center gap-2"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] uppercase text-primary/80 font-bold">
                  Solicitud para: {specialtyName}
                </span>
              </motion.div>
            )}

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
                                    { value: "ce", label: "CE" },
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
                                        : docType === "ce"
                                          ? "001234567"
                                          : "45678912"
                                    }
                                    icon={FileText}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="md:col-span-4">
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
                                    label="Nombre Completo / Razón Social"
                                    placeholder="Ej: Juan Perez o Servitec S.A.C."
                                    icon={User}
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
                      </div>
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="w-full"
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
                      <div className="flex gap-6">
                        <Button
                          variant="outline"
                          onClick={prevStep}
                          className="flex-1"
                        >
                          Atrás
                        </Button>
                        <Button onClick={nextStep} className="flex-1">
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card
                          onClick={() => setValue("serviceMode", "store-visit")}
                          className={`cursor-pointer transition-all ${serviceMode === "store-visit" ? "border-primary bg-primary/5" : "border-white/10 hover:border-white/20"}`}
                        >
                          <CardContent className="p-6 text-center">
                            <Settings
                              className={`mx-auto mb-3 ${serviceMode === "store-visit" ? "text-primary" : "text-white/20"}`}
                            />
                            <p className="text-sm font-bold">
                              Vendré al taller
                            </p>
                          </CardContent>
                        </Card>
                        <Card
                          onClick={() =>
                            setValue("serviceMode", "technical-visit")
                          }
                          className={`cursor-pointer transition-all ${serviceMode === "technical-visit" ? "border-primary bg-primary/5" : "border-white/10 hover:border-white/20"}`}
                        >
                          <CardContent className="p-6 text-center">
                            <Truck
                              className={`mx-auto mb-3 ${serviceMode === "technical-visit" ? "text-primary" : "text-white/20"}`}
                            />
                            <p className="text-sm font-bold">Visita Técnica</p>
                          </CardContent>
                        </Card>
                      </div>

                      {serviceMode === "store-visit" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <Card className="border-white/5 bg-white/2 text-left">
                            <CardContent className="p-6 space-y-4">
                              <div className="flex items-center gap-2 text-primary text-[10px] uppercase font-bold">
                                <Clock className="h-3 w-3" /> Lun – Vie: 9am –
                                7pm
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
                                    href="#"
                                    className="text-primary text-[10px] flex items-center gap-1 hover:underline"
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
                                    href="#"
                                    className="text-primary text-[10px] flex items-center gap-1 hover:underline"
                                  >
                                    <Navigation className="h-3 w-3" /> Ver mapa
                                  </a>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )}

                      <div className="flex gap-6 mt-6">
                        <Button
                          variant="outline"
                          onClick={prevStep}
                          className="flex-1"
                        >
                          Atrás
                        </Button>
                        <Button onClick={nextStep} className="flex-1">
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={control}
                          name="department"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
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
                          name="province"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  label="Provincia"
                                  placeholder="Ej: Lima"
                                  icon={MapPin}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <div className="md:col-span-2">
                          <FormField
                            control={control}
                            name="district"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    {...useFormHelpers(
                                      "district",
                                      serviceRequestSchema
                                    )}
                                    label="Distrito"
                                    placeholder="Ej: Santiago de Surco"
                                    icon={Locate}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {serviceMode === "technical-visit" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          className="space-y-4 overflow-hidden border-t border-white/5 pt-6"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                              <FormField
                                control={control}
                                name="exactAddress"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        {...useFormHelpers(
                                          "exactAddress",
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
                            <Input
                              label="Interior"
                              placeholder="Dpto, Of, Bloque"
                              icon={DoorOpen}
                            />
                            <Input
                              label="Referencia"
                              placeholder="Ej: Frente al parque..."
                              icon={Info}
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
                      <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/20">
                        <CheckCircle2
                          className="h-12 w-12 text-primary"
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
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
