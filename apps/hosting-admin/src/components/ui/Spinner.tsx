import React from "react";
import styled, { css, keyframes } from "styled-components";
import { Loader2 } from "lucide-react";
import {
  FontAwesomeIcon,
  type FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface SpinnerProps {
  height?: string;
  fullscreen?: boolean;
  size?: number | FontAwesomeIconProps["size"];
  message?: string | null;
  useLucide?: boolean;
}

interface ContainerProps {
  $fullscreen: boolean;
  $height?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  height,
  fullscreen = true,
  size = 32,
  message = null,
  useLucide = true,
}) => (
  <Container $fullscreen={fullscreen} $height={height}>
    <div className="spinner-item">
      <div className="icon-wrapper">
        {useLucide ? (
          <LucideSpinnerWrapper $size={typeof size === "number" ? size : 32}>
            <Loader2 size={typeof size === "number" ? size : 32} />
          </LucideSpinnerWrapper>
        ) : (
          <IconStyled
            spin
            icon={faSpinner}
            size={typeof size === "string" ? size : "2x"}
          />
        )}
      </div>
      {message && (
        <div className="message-item">
          <MessageText>{message}</MessageText>
        </div>
      )}
    </div>
  </Container>
);

/* --- ANIMACIONES Y ESTILOS CORREGIDOS --- */

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.section<ContainerProps>`
  ${({ theme, $fullscreen, $height }) => {
    // Calculamos el valor exacto de la altura antes de inyectarlo en el CSS
    const calculatedHeight = $height ? $height : $fullscreen ? "100vh" : "100%";

    return css`
      width: 100%;
      height: ${calculatedHeight};
      min-height: ${$fullscreen ? "100vh" : "120px"};
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${$fullscreen ? theme.colors.bgPrimary : "transparent"};

      .spinner-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: ${theme.spacing.sm};
      }

      .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
  }}
`;

const LucideSpinnerWrapper = styled.div<{ $size: number }>`
  ${({ theme }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.primary};
    animation: ${spinAnimation} 1s linear infinite;
    filter: drop-shadow(0 0 8px ${theme.colors.primaryAlpha});
  `}
`;

const IconStyled = styled(FontAwesomeIcon)`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    filter: drop-shadow(0 0 8px ${theme.colors.primaryAlpha});
  `}
`;

const MessageText = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.fontSecondary};
    font-size: ${theme.font_sizes.sm};
    font-weight: ${theme.font_weight.medium};
    margin: 0;
    text-align: center;
    letter-spacing: -0.01em;
  `}
`;
