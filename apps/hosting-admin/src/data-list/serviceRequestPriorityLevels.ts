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
    color: "#ff4d4f",
  },
  {
    label: "Normal",
    value: "medium",
    icon: faCircleExclamation,
    color: "#faad14",
  },
  {
    label: "Baja",
    value: "low",
    icon: faArrowDown,
    color: "#52c41a",
  },
];
