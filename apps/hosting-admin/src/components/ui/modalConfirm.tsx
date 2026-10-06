import type { ModalFuncProps } from "antd";
import { App } from "antd";
import { AlertTriangle } from "lucide-react";
import styled, { createGlobalStyle, css } from "styled-components";

export interface ModalConfirmProps extends ModalFuncProps {
  /** Indica si la acción es destructiva para aplicar estilos de peligro (rojo) */
  isDanger?: boolean;
}

export const useModalConfirm = () => {
  const { modal } = App.useApp();

  const modalConfirm = ({
    title = "¿Estás seguro de continuar?",
    content = "Esta acción no se podrá deshacer fácilmente.",
    okText = "Confirmar",
    cancelText = "Cancelar",
    isDanger = true,
    okButtonProps,
    cancelButtonProps,
    icon,
    ...restProps
  }: ModalConfirmProps = {}) => {
    return modal.confirm({
      centered: true,
      title,
      content,
      okText,
      cancelText,
      icon: icon ?? (
        <IconWrapper $isDanger={isDanger}>
          <AlertTriangle size={20} />
        </IconWrapper>
      ),
      okButtonProps: {
        type: "primary",
        danger: isDanger,
        size: "large",
        ...okButtonProps,
      },
      cancelButtonProps: {
        type: "text",
        size: "large",
        ...cancelButtonProps,
      },
      className: "servitec-modal-confirm",
      ...restProps,
    });
  };

  return { modalConfirm };
};

/* --- ESTILOS COMPLEMENTARIOS PARA EL MODAL DE CONFIRMACIÓN --- */

const IconWrapper = styled.div<{ $isDanger: boolean }>`
  ${({ theme, $isDanger }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: ${theme.border_radius.full};
    background-color: ${$isDanger
      ? `${theme.colors.error}1A`
      : theme.colors.primaryAlpha};
    color: ${$isDanger ? theme.colors.error : theme.colors.primary};
    margin-right: ${theme.spacing.sm};
  `}
`;

export const ModalConfirmGlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
    .servitec-modal-confirm {
      .ant-modal-content {
        border: 1px solid ${theme.colors.border};
        box-shadow: ${theme.shadows.lg};
      }

      .ant-modal-confirm-title {
        color: ${theme.colors.fontPrimary};
        font-weight: ${theme.font_weight.semibold};
        font-size: ${theme.font_sizes.md};
      }

      .ant-modal-confirm-content {
        color: ${theme.colors.fontSecondary};
        font-size: ${theme.font_sizes.sm};
        margin-top: ${theme.spacing.xs};
      }

      .ant-modal-confirm-btns {
        margin-top: ${theme.spacing.lg};
        display: flex;
        justify-content: flex-end;
        gap: ${theme.spacing.xs};
      }
    }
  `}
`;
