import { createContext, useContext, useState, ReactNode } from "react";
import { Modal } from "../components/ui";

interface ModalProps {
  title?: string;
  width?: number | string;
  onRenderBody?: (dataSource?: any) => ReactNode;
}

interface ModalContextProps {
  onShowModal: (props?: ModalProps) => void;
  onCloseModal: () => void;
}

const ModalContext = createContext<ModalContextProps>({
  onShowModal: () => console.log(),
  onCloseModal: () => console.log(),
});

interface ModalProviderProps {
  children: ReactNode;
  dataSource?: any;
}

export const ModalProvider = ({ children, dataSource }: ModalProviderProps) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalProps, setModalProps] = useState<ModalProps | null>(null);

  const onShowModal = (props?: ModalProps) => {
    setVisibleModal(true);
    setModalProps(props || null);
  };

  const onCloseModal = () => {
    setVisibleModal(false);
    setModalProps(null);
  };

  return (
    <ModalContext.Provider value={{ onShowModal, onCloseModal }}>
      {children}
      <Modal
        open={visibleModal}
        onCancel={onCloseModal}
        title={modalProps?.title}
        closable
        width={modalProps?.width}
        centered={false}
        destroyOnClose
        footer={null}
      >
        {modalProps?.onRenderBody && modalProps.onRenderBody(dataSource)}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
