"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const MESSAGES = [
  "¿Necesitas soporte técnico? 🛠️",
  "¿Instalación de cámaras? 🛡️",
  "¿Reparación de laptops? 💻",
  "¡Cotiza con nosotros ahora! 🚀",
];

export const WhatsAppButton = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [step, setStep] = useState<"idle" | "typing" | "message" | "closed">(
    "idle"
  );
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(true);

  const phoneNumber = "51941801827";
  const message =
    "Hola Servitec, deseo realizar una consulta sobre sus servicios.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    setIsMounted(true);

    const typingTimer = setTimeout(() => setStep("typing"), 2000);
    const messageTimer = setTimeout(() => setStep("message"), 3500);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(messageTimer);
    };
  }, []);

  useEffect(() => {
    if (step === "message") {
      const interval = setInterval(() => {
        setCurrentMsgIndex((prev) => {
          if (prev < MESSAGES.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => setStep("closed"), 5000);
            return prev;
          }
        });
      }, 4500);

      return () => clearInterval(interval);
    }
  }, [step]);

  if (!isMounted) return null;

  return (
    <div className="fixed bottom-16 right-8 z-50 flex flex-col items-end gap-3">
      <AnimatePresence mode="wait">
        {(step === "typing" || step === "message") && (
          <motion.div
            key={step === "typing" ? "typing" : `msg-${currentMsgIndex}`}
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="relative mr-2"
          >
            <div className="bg-white text-slate-800 px-4 py-3 rounded-2xl rounded-br-none shadow-2xl border border-gray-100">
              {step === "typing" ? (
                <div className="flex gap-1 justify-center items-center h-5 w-12">
                  {[0, 0.2, 0.4].map((d) => (
                    <motion.span
                      key={d}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: d }}
                      className="w-1.5 h-1.5 bg-[#25D366] rounded-full"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm font-bold flex items-center gap-2 whitespace-nowrap">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  {MESSAGES[currentMsgIndex]}
                </p>
              )}
            </div>
            <div className="absolute -bottom-2 right-0 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-100"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence>
          {showNotification && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -left-1 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-[11px] font-black text-white shadow-lg border-2 border-white"
            >
              1
            </motion.span>
          )}
        </AnimatePresence>

        <motion.a
          href={whatsappUrl}
          onClick={() => {
            setShowNotification(false);
            setStep("closed");
          }}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.5)] overflow-hidden"
        >
          <motion.div
            animate={{ x: ["-150%", "150%"] }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
              repeatDelay: 4,
            }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-30deg]"
          />
          <svg
            className="w-9 h-9 z-10 drop-shadow-md"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </motion.a>
      </div>
    </div>
  );
};
