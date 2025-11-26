import styled, { css } from "styled-components";
import {
  FontAwesomeIcon,
  type FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../../styles";

interface SpinnerProps {
  height?: string;
  fullscreen?: boolean;
  size?: FontAwesomeIconProps["size"];
  message?: string | null;
}

interface ContainerProps {
  fullscreen: boolean;
  height?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  height,
  fullscreen = true,
  size = "5x",
  message = null,
}) => (
  <Container fullscreen={fullscreen} height={height}>
    <div className="item">
      <div>
        <IconStyled spin icon={faSpinner} size={size} />
      </div>
      {message && (
        <div className="message-item">
          <h3>{message}</h3>
        </div>
      )}
    </div>
  </Container>
);

const Container = styled.section<ContainerProps>`
  ${({ fullscreen, height }) => css`
    width: 100vw;
    height: ${height || (fullscreen ? "100%" : "calc(100% - 90px)")};
    display: grid;
    place-items: center;
    background: ${fullscreen ? theme.colors.dark : "transparent"};

    .item {
      width: auto;
      height: auto;
      padding: ${theme.paddings.x_large};
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: ${theme.paddings.large};
    }
  `}
`;

const IconStyled = styled(FontAwesomeIcon)`
  ${() => css`
    color: ${theme.colors.primary};
  `}
`;
