import { FileText, Fingerprint, ShieldCheck } from "lucide-react";
import { ContentWidth } from "@/components/ContentWidth";

export default function TaxData() {
  return (
    <section className="py-20 bg-[#050505] border-t border-white/5">
      <ContentWidth>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h3 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
              Datos Legales
            </h3>
            <p className="text-white/40 text-sm leading-relaxed max-w-md">
              Como empresa constituida, garantizamos seguridad jurídica en cada
              transacción. Emitimos comprobantes de pago electrónicos conforme a
              la normativa vigente en Perú.
            </p>
          </div>

          <div className="relative group">
            <div className="relative bg-[#0A0A0A] border border-white/10 rounded-sm p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white/30">
                  <FileText className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase">
                    Razón Social
                  </span>
                </div>
                <p className="text-sm font-bold text-white">
                  Servitec Perú Group E.I.R.L.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white/30">
                  <Fingerprint className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase">
                    Número de RUC
                  </span>
                </div>
                <p className="text-sm font-bold text-primary">20604113241</p>
              </div>

              <div className="sm:col-span-2 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-500/80">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase">
                    Contribuyente Activo y Habido
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentWidth>
    </section>
  );
}
