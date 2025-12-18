import styled, { useTheme } from "styled-components";
import { useThemeContext } from "../../providers";

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.colors.bgSecondary};
  color: ${({ theme }) => theme.colors.fontPrimary};
  padding: ${({ theme }) => theme.paddings.large};
  border-radius: ${({ theme }) => theme.border_radius.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgHover};
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export const Examples = () => {
  const theme = useTheme();

  return (
    <StyledCard>
      <h2>¡Tema funcionando!</h2>
      <p style={{ color: theme.colors.fontSecondary }}>
        Color de fondo: {theme.colors.bgSecondary}
      </p>
      <p style={{ color: theme.colors.fontTertiary }}>
        Modo actual: {theme.mode}
      </p>
    </StyledCard>
  );
};

export const NormalComponent = () => {
  const theme = useTheme(); // ✅ Tema de styled-components
  const { mode, toggleTheme } = useThemeContext(); // ✅ CAMBIO 3: Context separado

  return (
    <div
      style={{
        backgroundColor: theme.colors.bgPrimary,
        padding: theme.paddings.x_large,
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: theme.colors.fontPrimary }}>
        Servitec - Tema {mode}
      </h1>

      <div
        style={{
          backgroundColor: theme.colors.bgSecondary,
          padding: theme.paddings.large,
          borderRadius: theme.border_radius.medium,
          marginTop: theme.paddings.large,
        }}
      >
        <p style={{ color: theme.colors.fontSecondary }}>
          Este texto usa el color secundario
        </p>
        <button
          onClick={toggleTheme}
          style={{
            backgroundColor: theme.colors.primary,
            color: theme.colors.black,
            padding: `${theme.paddings.small} ${theme.paddings.large}`,
            border: "none",
            borderRadius: theme.border_radius.small,
            cursor: "pointer",
            fontWeight: theme.font_weight.medium,
            transition: `all ${theme.transitions.fast}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.primaryDark;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.primary;
          }}
        >
          Cambiar a {mode === "dark" ? "Light" : "Dark"}
        </button>
      </div>
    </div>
  );
};

// ============================================
// 🎨 MEJOR PRÁCTICA: Botón con styled-components
// ============================================

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.black};
  padding: ${({ theme }) => theme.paddings.small}
    ${({ theme }) => theme.paddings.large};
  border: none;
  border-radius: ${({ theme }) => theme.border_radius.small};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.font_weight.medium};
  transition: all ${({ theme }) => theme.transitions.fast};
  font-size: ${({ theme }) => theme.font_sizes.small};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.fontDisabled};
    cursor: not-allowed;
  }
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  padding: ${({ theme }) => theme.paddings.x_large};
  min-height: 100vh;
`;

const Section = styled.div`
  background-color: ${({ theme }) => theme.colors.bgSecondary};
  padding: ${({ theme }) => theme.paddings.large};
  border-radius: ${({ theme }) => theme.border_radius.medium};
  margin-top: ${({ theme }) => theme.paddings.large};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.fontPrimary};
  margin-bottom: ${({ theme }) => theme.paddings.medium};
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.fontSecondary};
  margin-bottom: ${({ theme }) => theme.paddings.small};
`;

export const BetterComponent = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Container>
      <Title>Servitec - Tema {mode}</Title>

      <Section>
        <Text>Este texto usa el color secundario</Text>
        <StyledButton onClick={toggleTheme}>
          Cambiar a {mode === "dark" ? "Light" : "Dark"}
        </StyledButton>
      </Section>
    </Container>
  );
};
