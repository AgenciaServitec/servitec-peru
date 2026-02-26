import {
  Cpu,
  Database,
  Laptop,
  Monitor,
  MonitorSmartphone,
  PhoneCall,
  Printer,
  Server,
  Smartphone,
  Tablet,
  Video,
} from "lucide-react";

export const SPECIALTIES_DATA = [
  {
    type: "projector-repair",
    slug: "reparacion-de-proyectores",
    title: "Reparación de proyectores",
    description:
      "Soporte técnico integral para proyectores multimedia de todas las marcas.",
    metaDescription:
      "Expertos en reparación de proyectores en Lima. Realizamos limpieza interna, cambio de lámparas y ajuste de enfoque para una imagen impecable.",
    image: "/specialties/projector-repair.png",
    ogImage: "/og-reparacion-de-proyectores.png",
    includes: [
      "Limpieza interna profunda",
      "Cambio de lámparas originales",
      "Calibración de imagen y enfoque",
    ],
    services: [],
    icon: Monitor,
  },
  {
    type: "laptop-repair",
    slug: "reparacion-de-laptops",
    title: "Reparación de laptops",
    description:
      "Servicio técnico especializado en hardware y software para laptops de alto rendimiento.",
    metaDescription:
      "Reparación de laptops en Lima. Solucionamos problemas de lentitud, cambio de pantallas, teclados y repotenciación con SSD o memoria RAM.",
    image: "/specialties/laptop-repair.png",
    ogImage: "/og-reparacion-de-laptops.png",
    includes: [
      "Optimización avanzada de sistema",
      "Upgrade de discos SSD y RAM",
      "Reparación de placas y pantallas",
    ],
    services: [],
    icon: Laptop,
  },
  {
    type: "servers-and-network-maintenance",
    slug: "mantenimiento-de-server-y-redes",
    title: "Mantenimiento de servidores y redes",
    description:
      "Soluciones de conectividad y estabilidad para la infraestructura tecnológica de tu empresa.",
    metaDescription:
      "Soporte técnico para servidores y redes. Mantenimiento preventivo, configuración de racks y optimización de conectividad para empresas.",
    image: "/specialties/servers-and-network-maintenance.png",
    ogImage: "/og-mantenimiento-de-server-y-redes.png",
    includes: [
      "Auditoría y revisión de red",
      "Mantenimiento de servidores",
      "Gestión de cableado estructurado",
    ],
    services: [],
    icon: Server,
  },
  {
    type: "printer-and-copier-repair",
    slug: "reparacion-de-fotocopiadora-e-impresora",
    title: "Reparación de fotocopiadoras e impresoras",
    description:
      "Mantenimiento especializado para equipos de impresión láser y tinta de oficina.",
    metaDescription:
      "Servicio técnico de impresoras y fotocopiadoras. Solución de atascos, cambio de rodillos y limpieza de cabezales con resultados garantizados.",
    image: "/specialties/printer-and-copier-repair.png",
    ogImage: "/og-reparacion-de-fotocopiadora-e-impresora.png",
    includes: [
      "Limpieza y lubricación interna",
      "Reemplazo de rodillos y fajas",
      "Ajuste de calidad de impresión",
    ],
    services: [],
    icon: Printer,
  },
  {
    type: "security-camera-installation",
    slug: "instalacion-de-camaras",
    title: "Instalación de cámaras de seguridad",
    description:
      "Sistemas de videovigilancia avanzados para el monitoreo residencial y empresarial.",
    metaDescription:
      "Instalación de cámaras de seguridad CCTV y WiFi. Configuración de visualización remota desde el celular para vigilancia en tiempo real.",
    image: "/specialties/security-camera-installation.png",
    ogImage: "/og-instalacion-de-camaras.png",
    includes: [
      "Montaje y cableado de cámaras",
      "Configuración de DVR y NVR",
      "Visualización móvil remota",
    ],
    services: [],
    icon: Video,
  },
  {
    type: "all-in-one-repair",
    slug: "reparacion-de-all-in-one",
    title: "Reparación de equipos All-in-One",
    description:
      "Soporte técnico profesional para computadoras integradas All-in-One.",
    metaDescription:
      "Reparación de computadoras All-in-One en Lima. Diagnóstico de hardware, cambio de discos duros y solución de fallas de encendido o video.",
    image: "/specialties/all-in-one-repair.png",
    ogImage: "/og-reparacion-de-all-in-one.png",
    includes: [
      "Diagnóstico electrónico integral",
      "Reparación de fuente y pantalla",
      "Mantenimiento térmico preventivo",
    ],
    services: [],
    icon: MonitorSmartphone,
  },
  {
    type: "intercom-installation",
    slug: "instalacion-de-intercomunicadores",
    title: "Instalación de intercomunicadores",
    description:
      "Implementación de sistemas de comunicación y control de acceso para edificios y casas.",
    metaDescription:
      "Instalación de intercomunicadores y videoporteros. Configuración de sistemas de audio y apertura de puertas para seguridad del hogar.",
    image: "/specialties/intercom-installation.png",
    ogImage: "/og-instalacion-de-intercomunicadores.png",
    includes: [
      "Instalación de centrales y anexos",
      "Cableado y configuración de red",
      "Soporte técnico post-instalación",
    ],
    services: [],
    icon: PhoneCall,
  },
  {
    type: "tablet-repair",
    slug: "reparacion-de-ipad-tablet",
    title: "Reparación de iPad y tablets",
    description:
      "Especialistas en microelectrónica para dispositivos iPad y tablets de diversas marcas.",
    metaDescription:
      "Reparación de iPad y tablets. Cambiamos pantallas táctiles, puertos de carga y baterías con repuestos certificados y atención profesional.",
    image: "/specialties/tablet-repair.png",
    ogImage: "/og-reparacion-de-ipad-tablet.png",
    includes: [
      "Cambio de digitalizador y LCD",
      "Reemplazo de batería interna",
      "Reparación de conector de carga",
    ],
    services: [],
    icon: Tablet,
  },
  {
    type: "smartphone-repair",
    slug: "reparacion-de-celulares",
    title: "Reparación de celulares",
    description:
      "Soporte técnico de alta precisión para smartphones Android y iPhone.",
    metaDescription:
      "Servicio técnico de celulares en Lima. Solucionamos pantallas rotas, equipos mojados y fallas de placa con tecnología de punta.",
    image: "/specialties/smartphone-repair.png",
    ogImage: "/og-reparacion-de-celulares.png",
    includes: [
      "Cambio de pantalla y visor",
      "Mantenimiento preventivo móvil",
      "Diagnóstico de fallas lógicas",
    ],
    services: [],
    icon: Smartphone,
  },
  {
    type: "data-recovery",
    slug: "recuperacion-de-datos",
    title: "Recuperación de datos",
    description:
      "Servicio especializado de rescate de información en soportes digitales dañados.",
    metaDescription:
      "Recuperación de datos de discos duros, SSD y memorias USB. Rescatamos tus archivos perdidos por fallas físicas o borrado accidental.",
    image: "/specialties/data-recovery.png",
    ogImage: "/og-recuperacion-de-datos.png",
    includes: [
      "Diagnóstico de unidades lógicas",
      "Recuperación de archivos críticos",
      "Soporte para discos dañados",
    ],
    services: [],
    icon: Database,
  },
  {
    type: "reballing",
    slug: "servicio-de-reballing",
    title: "Servicio de reballing",
    description:
      "Reparación avanzada de chips de video y procesadores mediante soldadura profesional.",
    metaDescription:
      "Servicio de Reballing profesional en Lima para laptops y consolas. Reparamos fallas de video y sobrecalentamiento de placa electrónica.",
    image: "/specialties/reballing.png",
    ogImage: "/og-servicio-de-reballing.png",
    includes: [
      "Extracción y limpieza de chip",
      "Soldadura con esferas de estaño",
      "Testeo de estrés y estabilidad",
    ],
    services: [],
    icon: Cpu,
  },
  {
    type: "custom-consultation",
    slug: "contacto",
    title: "¿No encuentras tu equipo?",
    description:
      "Atención personalizada para requerimientos técnicos especiales y proyectos a medida.",
    metaDescription:
      "Solicita soporte técnico para equipos especiales. Atención personalizada y presupuestos a medida para reparaciones electrónicas avanzadas.",
    image: "",
    ogImage: "/og-contacto.png",
    includes: [
      "Asesoría técnica personalizada",
      "Soporte para equipos especiales",
      "Presupuesto detallado sin compromiso",
    ],
    services: [],
    icon: PhoneCall,
    isCustom: true,
  },
];
