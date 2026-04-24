import type { ModalFuncProps } from "antd";
import { App } from "antd";

export const useModalConfirm = () => {
  const { modal } = App.useApp();

  const modalConfirm = (props: ModalFuncProps) => {
    return modal.confirm({
      centered: true,
      title: "¿Estás seguro de que quieres eliminar?",
      okText: "SÍ",
      cancelText: "NO",
      okButtonProps: {
        type: "primary",
        danger: true,
      },
      ...props,
    });
  };

  return { modalConfirm };
};
