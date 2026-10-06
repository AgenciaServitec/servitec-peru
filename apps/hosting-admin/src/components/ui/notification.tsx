import type { ReactNode } from "react";
import { App } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import styled, { css } from "styled-components";

type NotificationType = "error" | "success" | "info" | "warning";

export interface NotificationProps {
  type: NotificationType;
  title?: string;
  description?: string;
  placement?: NotificationPlacement;
  duration?: number;
  key?: string;
  icon?: ReactNode;
}

const defaultMessages: Record<
  NotificationType,
  { title: string; description: string }
> = {
  error: {
    title: "¡Ocurrió un error!",
    description: "Por favor, inténtelo de nuevo más tarde.",
  },
  success: {
    title: "¡Operación exitosa!",
    description: "La acción se completó correctamente.",
  },
  info: {
    title: "Información",
    description: "",
  },
  warning: {
    title: "Advertencia",
    description: "Tenga en cuenta esta información.",
  },
};

export const useNotification = () => {
  const { notification: antNotification } = App.useApp();

  const notify = ({
    type,
    title,
    description,
    placement = "bottomLeft",
    duration = 4,
    key,
    icon,
    ...props
  }: NotificationProps) => {
    const defaultInfo = defaultMessages[type];

    // Íconos por defecto de Lucide según el tipo
    const defaultIcons: Record<NotificationType, ReactNode> = {
      success: (
        <IconWrapper $type="success">
          <CheckCircle2 size={20} />
        </IconWrapper>
      ),
      error: (
        <IconWrapper $type="error">
          <AlertCircle size={20} />
        </IconWrapper>
      ),
      warning: (
        <IconWrapper $type="warning">
          <AlertTriangle size={20} />
        </IconWrapper>
      ),
      info: (
        <IconWrapper $type="info">
          <Info size={20} />
        </IconWrapper>
      ),
    };

    return antNotification[type]({
      duration,
      placement,
      message: title || defaultInfo.title,
      description: description ?? defaultInfo.description,
      key,
      icon: icon ?? defaultIcons[type],
      className: "servitec-notification",
      ...props,
    });
  };

  return { notification: notify };
};

/* --- ESTILOS DE ÍCONO Y NOTIFICACIÓN ALINEADOS AL THEME --- */

const IconWrapper = styled.div<{ $type: NotificationType }>`
  ${({ theme, $type }) => {
    const colorMap = {
      success: theme.colors.success,
      error: theme.colors.error,
      warning: theme.colors.warning,
      info: theme.colors.info,
    };

    const color = colorMap[$type];

    return css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: ${color};
    `;
  }}
`;
