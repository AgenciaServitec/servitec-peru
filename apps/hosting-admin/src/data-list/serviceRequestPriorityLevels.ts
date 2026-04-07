import {
  faArrowDown,
  faCircleExclamation,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export const PRIORITY_LEVELS = [
  {
    label: "Urgente",
    value: "high",
    icon: faTriangleExclamation,
    color: "error",
  },
  {
    label: "Normal",
    value: "medium",
    icon: faCircleExclamation,
    color: "gold",
  },
  {
    label: "Baja",
    value: "low",
    icon: faArrowDown,
    color: "success",
  },
];
