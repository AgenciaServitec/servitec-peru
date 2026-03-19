"use client";

import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ContentWidth } from "@/components/ContentWidth";
import {
  CreditCard,
  FileText,
  Hash,
  Info,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useFormHelpers } from "@/lib/hooks/useFormHelpers";
import {
  type ReclamacionesFormData,
  reclamacionesSchema,
} from "@/lib/validations/complaints";

export default function ReclamacionesPage() {
  const router = useRouter();

  const form = useForm<ReclamacionesFormData>({
    resolver: zodResolver(reclamacionesSchema),
    defaultValues: {
      fullName: "",
      documentNumber: "",
      email: "",
      phone: "",
      address: "",
      guardian: "",
      branch: "",
      orderNumber: "",
      amount: "",
      type: "RECLAMO",
      description: "",
      solution: "",
    },
  });

  const onSendReclamacion = async (formData: ReclamacionesFormData) => {
    try {
      const response = await fetch("/api/reclamaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error en el servidor");

      form.reset();
      router.push("/gracias");
    } catch (e) {
      console.error(e);
      alert("No se pudo registrar. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-20 font-sans selection:bg-primary selection:text-black">
      <ContentWidth>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none mb-6">
            Libro de <br />
            <span className="opacity-90">Reclamaciones</span>
          </h1>
          <p className="text-white/40 text-base md:text-lg max-w-xl leading-relaxed">
            Tu opinión nos ayuda a mejorar. Registra cualquier inconveniente y
            te daremos respuesta en un plazo máximo de 15 días hábiles.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSendReclamacion)}
              className="space-y-12 bg-neutral-900/20 border border-white/5 p-6 md:p-14 rounded-sm"
            >
              <div className="space-y-8">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <User size={16} className="text-primary" />
                  <h2 className="text-xs font-bold text-white/50 uppercase tracking-[0.2em]">
                    01. Identificación del Cliente
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            {...useFormHelpers("fullName", reclamacionesSchema)}
                            label="Nombres y Apellidos"
                            placeholder="Ej. Juan Pérez García"
                            icon={User}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="documentNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            {...useFormHelpers(
                              "documentNumber",
                              reclamacionesSchema
                            )}
                            label="DNI / Carnet de Extranjería"
                            placeholder="87654321"
                            icon={CreditCard}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            {...useFormHelpers("email", reclamacionesSchema)}
                            label="Correo Electrónico"
                            placeholder="correo@ejemplo.com"
                            icon={Mail}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            {...useFormHelpers("phone", reclamacionesSchema)}
                            label="Teléfono / WhatsApp"
                            placeholder="999 999 999"
                            icon={Phone}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              {...useFormHelpers(
                                "address",
                                reclamacionesSchema
                              )}
                              label="Dirección de Domicilio"
                              placeholder="Av. Las Camelias 123, Lince"
                              icon={MapPin}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <FileText size={16} className="text-primary" />
                  <h2 className="text-xs font-bold text-white/50 uppercase tracking-[0.2em]">
                    02. Detalles del Servicio
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <FormField
                    control={form.control}
                    name="branch"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            {...field}
                            {...useFormHelpers("branch", reclamacionesSchema)}
                            label="Sede donde fue atendido"
                            placeholder="Seleccione una opción"
                            onValueChange={field.onChange}
                            options={[
                              { value: "nestor", label: "Sede Néstor Bermejo" },
                              { value: "kiwi", label: "Sede Taller Kiwi" },
                              {
                                value: "online",
                                label: "Atención Online / Delivery",
                              },
                            ]}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="orderNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              {...useFormHelpers(
                                "orderNumber",
                                reclamacionesSchema
                              )}
                              label="N° de Orden / OS"
                              placeholder="OS-2024"
                              icon={Hash}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              {...useFormHelpers("amount", reclamacionesSchema)}
                              label="Monto Total"
                              placeholder="0.00"
                              type="number"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <MessageSquare size={16} className="text-primary" />
                  <h2 className="text-xs font-bold text-white/50 uppercase tracking-[0.2em]">
                    03. Detalle de la Insatisfacción
                  </h2>
                </div>

                <div className="flex gap-3 p-1 bg-white/5 rounded-sm">
                  {(["RECLAMO", "QUEJA"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => form.setValue("type", type)}
                      className={cn(
                        "flex-1 py-3 px-4 rounded-sm transition-all duration-200 text-center",
                        form.watch("type") === type
                          ? "bg-primary text-black font-bold shadow-lg"
                          : "text-white/40 hover:text-white/70"
                      )}
                    >
                      <span className="text-xs tracking-widest uppercase">
                        {type}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            {...field}
                            {...useFormHelpers(
                              "description",
                              reclamacionesSchema
                            )}
                            label="¿Qué sucedió?"
                            placeholder="Describa los hechos de la manera más detallada posible..."
                            className="min-h-[120px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="solution"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            {...field}
                            {...useFormHelpers("solution", reclamacionesSchema)}
                            label="¿Qué solución esperas?"
                            placeholder="Cuéntanos cómo podemos resolver este inconveniente para ti..."
                            className="min-h-[100px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-8 pt-6">
                <div className="flex gap-4 p-5 bg-white/[0.03] border border-white/5 rounded-sm">
                  <Info size={18} className="text-primary shrink-0 mt-0.5" />
                  <p className="text-[11px] text-white/30 leading-relaxed uppercase tracking-wider">
                    Nota: La formulación del reclamo no impide acudir a otras
                    vías de solución de controversias ni es requisito previo
                    para interponer una denuncia ante el INDECOPI.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  loading={form.formState.isSubmitting}
                  icon={Send}
                >
                  Enviar Reclamación
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </ContentWidth>
    </div>
  );
}
