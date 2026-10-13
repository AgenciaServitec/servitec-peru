import React from "react";
import { Title } from "../../components";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faIdCard,
  faM,
  faN,
  faP,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import type { User } from "../../providers";

interface ProfileInformationProps {
  user: User;
}

export const ProfileInformation: React.FC<ProfileInformationProps> = ({
  user,
}) => {
  return (
    <CardContainer>
      <Title level={4} style={{ marginBottom: "20px" }}>
        Información Personal
      </Title>

      <InfoList>
        <InfoItem>
          <InfoIcon>
            <FontAwesomeIcon icon={faN} />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>Nombres</InfoLabel>
            <InfoValue>{user?.firstName || "No registrado"}</InfoValue>
          </InfoContent>
        </InfoItem>

        <InfoItem>
          <InfoIcon>
            <FontAwesomeIcon icon={faP} />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>Apellido Paterno</InfoLabel>
            <InfoValue>{user?.paternalSurname || "No registrado"}</InfoValue>
          </InfoContent>
        </InfoItem>

        <InfoItem>
          <InfoIcon>
            <FontAwesomeIcon icon={faM} />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>Apellido Materno</InfoLabel>
            <InfoValue>{user?.maternalSurname || "No registrado"}</InfoValue>
          </InfoContent>
        </InfoItem>

        <InfoItem>
          <InfoIcon>
            <FontAwesomeIcon icon={faIdCard} />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>Documento de Identidad (DNI)</InfoLabel>
            <InfoValue>{user?.document?.number || "No registrado"}</InfoValue>
          </InfoContent>
        </InfoItem>

        <InfoItem>
          <InfoIcon>
            <FontAwesomeIcon icon={faEnvelope} />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>Correo Electrónico</InfoLabel>
            <InfoValue>{user?.email || "No registrado"}</InfoValue>
          </InfoContent>
        </InfoItem>

        <InfoItem>
          <InfoIcon>
            <FontAwesomeIcon icon={faPhone} />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>Teléfono Celular</InfoLabel>
            <InfoValue>{user?.phone?.number || "No registrado"}</InfoValue>
          </InfoContent>
        </InfoItem>
      </InfoList>
    </CardContainer>
  );
};

/* --- ESTILOS --- */

const CardContainer = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.bgSecondary};
    border-radius: ${theme.border_radius.lg};
    border: 1px solid ${theme.colors.border};
    padding: ${theme.spacing.lg};
    height: 100%;
  `}
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const InfoItem = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    padding-bottom: ${theme.spacing.sm};
    border-bottom: 1px dashed ${theme.colors.border};

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  `}
`;

const InfoIcon = styled.div`
  ${({ theme }) => css`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.bgTertiary};
    border-radius: ${theme.border_radius.sm};
    color: ${theme.colors.fontSecondary};
    font-size: ${theme.font_sizes.md};
    transition: ${theme.transitions.fast};

    /* Hover effect sobre el item para que el icono se pinte */
    ${InfoItem}:hover & {
      background: ${theme.colors.primaryAlpha};
      color: ${theme.colors.primary};
    }
  `}
`;

const InfoContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const InfoLabel = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.fontTertiary};
    font-size: 11px;
    margin-bottom: 2px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: ${theme.font_weight.medium};
  `}
`;

const InfoValue = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.fontPrimary};
    font-size: ${theme.font_sizes.sm};
    font-weight: ${theme.font_weight.medium};
    word-break: break-word;
  `}
`;
