import styled, { css } from "styled-components";

export const FooterLayout = () => {
  return (
    <StyledFooter>
      <div className="left">
        <span>
          © {new Date().getFullYear()} <strong>Servitec</strong>
        </span>
        <span className="separator">|</span>
        <span className="version">Build v1.0.42</span>
      </div>

      <div className="right">
        <StatusIndicator>
          <span className="dot" />
          Servidores Operativos
        </StatusIndicator>
      </div>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${theme.spacing.sm} 0;
    margin-top: ${theme.spacing.md};
    color: ${theme.colors.fontTertiary};
    font-size: 11px; /* Muy pequeño y discreto */
    border-top: 1px solid ${theme.colors.divider};
    text-transform: uppercase;
    letter-spacing: 0.5px;

    .left {
      display: flex;
      align-items: center;
      gap: ${theme.spacing.sm};

      strong {
        color: ${theme.colors.fontSecondary};
      }
    }

    .separator {
      color: ${theme.colors.border};
    }

    .version {
      font-family: monospace; /* Le da el look técnico */
    }
  `}
`;

const StatusIndicator = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 6px;

    .dot {
      width: 6px;
      height: 6px;
      background-color: ${theme.colors.success};
      border-radius: 50%;
      box-shadow: 0 0 6px ${theme.colors.success}60;
    }
  `}
`;
