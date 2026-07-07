"use client";

import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
// import Barcode from "react-barcode";
import {
  Download,
  Link2,
  Mail,
  MessageSquare,
  Phone,
  Type,
} from "lucide-react";

export default function GeneradorQR() {
  const [url, setUrl] = useState("https://servitecperu.com");
  const [activeTab, setActiveTab] = useState("enlace");
  const qrRef = useRef<HTMLDivElement>(null);

  const qrTypes = [
    { id: "enlace", label: "Enlace", icon: Link2 },
    { id: "texto", label: "Texto", icon: Type },
    { id: "email", label: "E-mail", icon: Mail },
    { id: "llamada", label: "Llamada", icon: Phone },
    { id: "sms", label: "SMS", icon: MessageSquare },
  ];

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "servitec-qr.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="min-h-screen relative py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Generador de <span className="text-primary">Códigos QR</span>
          </h1>
          <p className="text-muted-foreground">
            Crea códigos QR personalizados para tus enlaces y proyectos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="card-surface p-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                {qrTypes.map((type) => {
                  const Icon = type.icon;
                  const isActive = activeTab === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setActiveTab(type.id)}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ui-radius-md ${
                        isActive
                          ? "bg-primary/10 text-primary border border-primary/50"
                          : "ui-surface ui-surface-hover text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="card-surface p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  1
                </span>
                <h2 className="text-lg font-semibold text-foreground">
                  Completa el contenido
                </h2>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Introduce tu sitio web
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://tudominio.com"
                  className="w-full bg-input border border-border text-foreground ui-radius-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50"
                />
              </div>
            </div>

            <div className="card-surface p-6 space-y-4 opacity-50 pointer-events-none">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  2
                </span>
                <h2 className="text-lg font-semibold text-foreground">
                  Diseña tu código QR (Próximamente)
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Las opciones de marcos, formas y logos personalizados se
                habilitarán en la siguiente fase.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card-surface p-6 sticky top-8 flex flex-col items-center justify-center space-y-6">
              <div className="flex items-center gap-2 w-full justify-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  3
                </span>
                <h2 className="text-lg font-semibold text-foreground">
                  Descargar código QR
                </h2>
              </div>

              <div
                className="bg-white p-4 rounded-xl shadow-lg ring-1 ring-white/10"
                ref={qrRef}
              >
                <QRCodeCanvas
                  value={url || "https://servitecperu.com"}
                  size={200}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"H"}
                  includeMargin={false}
                />
              </div>

              <button
                onClick={handleDownload}
                disabled={!url}
                className="w-full ui-cta justify-center bg-primary text-primary-foreground hover:bg-primary/90 ui-radius-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                Descargar PNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
