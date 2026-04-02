import {
  faBan,
  faCheckDouble,
  faCircleCheck,
  faClock,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

export const SERVICE_REQUEST_STATUS = [
  {
    label: "Pendiente",
    value: "pending",
    icon: faClock,
    color: "gold",
  },
  {
    label: "Aceptado",
    value: "accepted",
    icon: faCircleCheck,
    color: "blue",
  },
  {
    label: "En proceso",
    value: "in-progress",
    icon: faSpinner,
    color: "processing",
  },
  {
    label: "Terminado",
    value: "completed",
    icon: faCheckDouble,
    color: "success",
  },
  {
    label: "Cancelado",
    value: "cancelled",
    icon: faBan,
    color: "error",
  },
];
