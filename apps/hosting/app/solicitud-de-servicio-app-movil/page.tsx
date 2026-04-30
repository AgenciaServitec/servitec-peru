"use client";

import ServiceRequestForm from "@/components/ServiceRequestForm";
import React from "react";
import { CaptchaProvider } from "@/providers/CaptchaProvider";

export default function ServiceRequestAppMovil({}) {
  return (
    <CaptchaProvider>
      <ServiceRequestForm specialtyName="Tú dispositivo electrónico" />
    </CaptchaProvider>
  );
}
