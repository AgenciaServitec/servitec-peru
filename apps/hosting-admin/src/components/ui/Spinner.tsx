import styled, { css } from "styled-components";
import {
  FontAwesomeIcon,
  type FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface SpinnerProps {
  height?: string;
  fullscreen?: boolean;
  size?: FontAwesomeIconProps["size"];
  message?: string | null;
}

interface ContainerProps {
  $fullscreen: boolean; // Usamos $ para props transitorias (buena práctica en Styled Components)
  $height?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  height,
  fullscreen = true,
  size = "3x", // Cambié 5x a 3x para un look más "SaaS profesional" y menos tosco
  message = null,
}) => (
  <Container $fullscreen={fullscreen} $height={height}>
    <div className="item">
      <div className="icon-wrapper">
        <IconStyled spin icon={faSpinner} size={size} />
      </div>
      {message && (
        <div className="message-item">
          <MessageText>{message}</MessageText>
        </div>
      )}
    </div>
  </Container>
);

const Container = styled.section<ContainerProps>`
  ${({ theme, $fullscreen, $height }) => css`
    width: 100%;
    /* Si es fullscreen ocupa toda la pantalla, si no, se ajusta al padre o al height prop */
    height: ${$height || ($fullscreen ? "100vh" : "100%")};
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${$fullscreen ? theme.colors.bgPrimary : "transparent"};

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: ${theme.spacing.md}; /* Reemplazado paddings.large */
    }

    .icon-wrapper {
      opacity: 0.8;
    }
  `}
`;

const MessageText = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.fontSecondary};
    font-size: ${theme.font_sizes.md};
    font-weight: ${theme.font_weight.medium};
    margin-top: ${theme.spacing.sm};
  `}
`;

const IconStyled = styled(FontAwesomeIcon)`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    /* Añadimos un filtro de resplandor sutil muy leve para el modo oscuro */
    filter: drop-shadow(0 0 8px ${theme.colors.primaryAlpha});
  `}
`;
