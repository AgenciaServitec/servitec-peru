"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  IdCard,
  Mail,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  User,
  Wrench,
} from "lucide-react";
import { ContentWidth } from "@/components/ContentWidth";
import { Button } from "@/components/ui/button";
import Ubicacion from "@/sections/Ubication";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormHelpers } from "@/lib/hooks/useFormHelpers";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const schema = z.object({
    fullName: z.string().min(3, "Mínimo 3 caracteres"),
    documentType: z.enum(["dni", "ruc", "pasaporte"]),
    documentNumber: z
      .string()
      .min(8, "Mínimo 8 dígitos")
      .max(11, "Máximo 11 dígitos"),
    phoneNumber: z.string().length(9, "Debe tener 9 dígitos"),
    email: z.string().email("Correo electrónico inválido"),
    serviceRequested: z.string().min(1, "Este campo es obligatorio"),
    technicalMessage: z.string().min(10, "Mínimo 10 caracteres").max(500),
  });

  type ContactFormData = z.infer<typeof schema>;

  const form = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      documentType: "",
      documentNumber: "",
      phoneNumber: "",
      email: "",
      serviceRequested: "",
      technicalMessage: "",
    },
  });

  const onSendContact = (formData: ContactFormData) => {
    try {
      console.log("formData: ", formData);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pt-20 font-sans relative overflow-hidden">
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <ContentWidth>
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-b from-white to-white/70"
            >
              Contacto
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-white text-base md:text-xl leading-relaxed max-w-2xl mx-auto opacity-70"
            >
              ¿Cómo podemos ayudarte hoy? Soporte técnico especializado para
              soluciones inmediatas en Lima.
            </motion.p>
          </div>
        </ContentWidth>
      </section>

      <section className="py-24 relative z-10">
        <ContentWidth>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {[
              {
                icon: <Phone className="w-5 h-5" />,
                title: "Llamada Directa",
                value: "+51 941 801 827",
                link: "tel:+51941801827",
              },
              {
                icon: <MessageSquare className="w-5 h-5" />,
                title: "WhatsApp Business",
                value: "Atención Inmediata",
                link: "https://wa.me/51941801827",
              },
              {
                icon: <Mail className="w-5 h-5" />,
                title: "Correo Electrónico",
                value: "contacto@servitec-peru.com",
                link: "mailto:contacto@servitec-peru.com",
              },
            ].map((item, idx) => (
              <a
                href={item.link}
                key={idx}
                className="p-8 rounded-sm border border-white/5"
              >
                <div className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-sm mb-6 text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-primary font-medium">{item.value}</p>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-2 space-y-10">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1]">
                  Soporte Especializado
                </h2>
                <p className="text-white/40 text-sm leading-relaxed">
                  Nuestro equipo procesará tu solicitud para brindarte una
                  solución técnica en menos de 30 minutos.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-2">
                  <div className="w-10 h-10 border border-white/10 rounded-sm flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Diagnóstico especializado
                    </h4>
                    <p className="text-xs text-white/30">
                      Respaldo técnico en cada trabajo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 p-8 md:p-12 rounded-sm border border-white/5 bg-neutral-900/40">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSendContact)}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-8"
                >
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormControl>
                          <Input
                            {...field}
                            {...useFormHelpers("fullName")}
                            label="Nombres y Apellidos"
                            icon={User}
                            required
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="documentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            {...field}
                            {...useFormHelpers("documentType")}
                            label="Tipo de Documento"
                            placeholder="Seleccionar"
                            icon={IdCard}
                            options={[
                              { value: "dni", label: "DNI" },
                              { value: "ruc", label: "RUC" },
                            ]}
                            required
                            onValueChange={field.onChange}
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
                            {...useFormHelpers("documentNumber")}
                            label="N° de Documento"
                            icon={FileText}
                            required
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            {...useFormHelpers("phoneNumber")}
                            label="Celular"
                            icon={Phone}
                            required
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
                            {...useFormHelpers("email")}
                            label="Correo"
                            icon={Mail}
                            required
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceRequested"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            {...useFormHelpers("serviceRequested")}
                            label="Servicio Requerido"
                            icon={Wrench}
                            required
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="technicalMessage"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormControl>
                          <Textarea
                            {...field}
                            label="Mensaje Técnico"
                            placeholder="Describa brevemente la falla de su equipo..."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="sm:col-span-2">
                    <Button
                      type="submit"
                      icon={Send}
                      className="w-full"
                      loading={form.formState.isSubmitting}
                    >
                      Enviar Solicitud
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </ContentWidth>
      </section>
      <Ubicacion />
    </div>
  );
}
