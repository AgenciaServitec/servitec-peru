import React, { createContext, type ReactNode, useContext } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore, version } from "../firebase";
import { Button, Result, Spinner } from "../components";
import styled, { css } from "styled-components";

interface SettingDefault {
  version: string;
  [key: string]: any;
}

interface VersionContextValue {
  version: string;
}

interface VersionProviderProps {
  children: ReactNode;
}

const VersionContext = createContext<VersionContextValue>({
  version: "",
});

export const VersionProvider: React.FC<VersionProviderProps> = ({
  children,
}) => {
  const [settingDefault, settingDefaultLoading, settingDefaultError] =
    useDocumentData<SettingDefault>(
      firestore.collection("settings").doc("default")
    );

  const onClickRefresh = (): void => {
    document.location.reload();
  };

  if (settingDefaultLoading) {
    return <Spinner height="100vh" />;
  }

  if (settingDefaultError) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Perdón, algo salió mal."
        extra={
          <Button onClick={onClickRefresh} type="primary">
            Actualizar
          </Button>
        }
      />
    );
  }

  const isLastVersion = version === settingDefault?.version;

  return (
    <VersionContext.Provider
      value={{
        version,
      }}
    >
      {isLastVersion ? children : <Version />}
    </VersionContext.Provider>
  );
};

export const useVersion = (): VersionContextValue => {
  const context = useContext(VersionContext);

  if (!context) {
    throw new Error("useVersion must be used within a VersionProvider");
  }

  return context;
};

export const Version: React.FC = () => (
  <VersionContainer>
    <ContentWrapper>
      <IconWrapper>
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </IconWrapper>

      <Title>Nueva versión disponible</Title>

      <Description>
        Actualice para obtener la última versión de la aplicación con nuevas
        funciones y mejoras de seguridad.
      </Description>

      <Button
        type="primary"
        size="large"
        onClick={() => document.location.reload()}
      >
        Actualizar ahora
      </Button>

      <VersionInfo>
        Versión actual: <span>{version}</span>
      </VersionInfo>
    </ContentWrapper>
  </VersionContainer>
);

export const VersionContainer = styled.section`
  ${({ theme }) => css`
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: ${theme.colors.bgPrimary};
    padding: ${theme.spacing.lg};
  `}
`;

const ContentWrapper = styled.div`
  ${({ theme }) => css`
    max-width: 600px;
    width: 100%;
    padding: ${theme.spacing.xl};
    background: ${theme.colors.bgSecondary};
    border-radius: ${theme.border_radius.lg};
    border: 1px solid ${theme.colors.primaryAlpha};
    box-shadow: ${theme.shadows.lg};
    animation: fadeInUp 0.6s ease-out;

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}
`;

const IconWrapper = styled.div`
  ${({ theme }) => css`
    width: 80px;
    height: 80px;
    margin: 0 auto ${theme.spacing.lg};
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.primaryAlpha};
    border-radius: 50%;
    color: ${theme.colors.primary};
    animation: pulse 2s ease-in-out infinite;

    @keyframes pulse {
      0%,
      100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.05);
        opacity: 0.8;
      }
    }

    svg {
      width: 40px;
      height: 40px;
    }
  `}
`;

const Title = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.font_sizes.heading};
    font-weight: ${theme.font_weight.large};
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.md};
    line-height: 1.2;

    @media (max-width: 768px) {
      font-size: ${theme.font_sizes.xxl};
    }
  `}
`;

const Description = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font_sizes.md};
    color: ${theme.colors.fontSecondary};
    margin-bottom: ${theme.spacing.xl};
    line-height: 1.6;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 768px) {
      font-size: ${theme.font_sizes.sm};
    }
  `}
`;

const VersionInfo = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.spacing.lg};
    font-size: ${theme.font_sizes.xs};
    color: ${theme.colors.fontTertiary};

    span {
      color: ${theme.colors.primary};
      font-weight: ${theme.font_weight.medium};
      font-family: monospace;
      background: ${theme.colors.primaryAlpha};
      padding: ${theme.spacing.xs} ${theme.spacing.sm};
      border-radius: ${theme.border_radius.xs};
      margin-left: ${theme.spacing.xs};
    }
  `}
`;
