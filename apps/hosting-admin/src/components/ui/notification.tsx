import { notification } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import type { ReactNode } from "react";

type Type = "error" | "success" | "info" | "warning";

interface NotificationProps {
  type: Type;
  title?: string;
  description?: string;
  placement?: NotificationPlacement;
  duration?: number;
  key?: string;
  icon?: ReactNode;
}

const defaultTypes: Record<Type, { title: string; description: string }> = {
  error: {
    title: "Ocurrió un error!",
    description: "Por favor, inténtelo más tarde...",
  },
  success: {
    title: "Operación exitosa!",
    description: "",
  },
  info: {
    title: "",
    description: "",
  },
  warning: {
    title: "",
    description: "",
  },
};

export const useNotification = () => {
  const notify = ({
    type,
    title,
    description,
    placement = "bottomLeft",
    duration = 5,
    key,
    icon,
    ...props
  }: NotificationProps) => {
    const currentType = defaultTypes[type];

    return notification[type]({
      duration,
      placement,
      message: title || currentType.title,
      description: description ?? currentType.description,
      key,
      icon,
      ...props,
    });
  };

  return { notification: notify };
};
