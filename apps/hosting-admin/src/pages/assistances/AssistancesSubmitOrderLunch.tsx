import { useDefaultFirestoreProps, useFormUtils } from "../../hooks";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { updateAssistance } from "../../firebase/collections";
import { Col, notification, Row, Button, Form } from "../../components";
import styled from "styled-components";
import type { Assistance } from "../../globalTypes.ts";

interface Props {
  assistance: Assistance;
  onCloseModal: () => void;
}

interface FormValues {
  orderLunch: boolean | null;
}

export const AssistancesSubmitOrderLunch = ({
  assistance,
  onCloseModal,
}: Props) => {
  const { assignUpdateProps } = useDefaultFirestoreProps();

  const schema = yup.object({
    orderLunch: yup.boolean().nullable().required("Selecciona una opción"),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      orderLunch: assistance?.orderLunch,
    },
  });

  const { error } = useFormUtils({ errors, schema });

  useEffect(() => {
    reset({
      orderLunch: assistance?.orderLunch ?? null,
    });
  }, [assistance, reset]);

  const onSubmit = async (formData: FormValues) => {
    const updatedAssistance: Assistance = {
      ...assistance,
      orderLunch: formData.orderLunch,
    };

    try {
      await updateAssistance(
        assistance.id,
        assignUpdateProps(updatedAssistance)
      );
      notification({ type: "success", message: "Asistencia actualizada" });
    } catch (err) {
      console.error(err);
      notification({ type: "error", message: "Hubo un error al actualizar" });
    }

    onCloseModal();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Controller
              control={control}
              name="orderLunch"
              render={({ field: { onChange, value, name } }) => (
                <>
                  <ToggleContainer>
                    <ToggleButton
                      active={value === true}
                      onClick={() => onChange(true)}
                    >
                      Sí
                    </ToggleButton>

                    <ToggleButton
                      active={value === false}
                      onClick={() => onChange(false)}
                    >
                      No
                    </ToggleButton>
                  </ToggleContainer>

                  <div style={{ marginTop: 8 }}>{error(name)}</div>
                </>
              )}
            />
          </Col>
        </Row>
      </Card>
    </Form>
  );
};
const Card = styled.div`
  padding: 20px;
  border-radius: 10px;
  background: transparent;
  margin-bottom: 20px;
`;

const ToggleContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const ToggleButton = styled.button<{ active?: boolean }>`
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  background: ${({ active }) =>
    active ? "rgba(22, 119, 255, 0.12)" : "transparent"};
  cursor: pointer;
  font-size: 16px;
  font-weight: ${({ active }) => (active ? "600" : "500")};
  transition: all 0.2s ease;

  border: ${({ active }) =>
    active ? "2px solid #1677ff" : "1px solid #d9d9d9"};
  color: ${({ active }) => (active ? "#1677ff" : "#666")};

  box-shadow: ${({ active }) =>
    active ? "0 0 8px rgba(22, 119, 255, 0.35)" : "none"};

  &:hover {
    border-color: ${({ active }) => (active ? "#1677ff" : "#999")};
    background: ${({ active }) =>
      active ? "rgba(22, 119, 255, 0.15)" : "rgba(0,0,0,0.03)"};
  }

  &:active {
    transform: scale(0.97);
  }
`;
