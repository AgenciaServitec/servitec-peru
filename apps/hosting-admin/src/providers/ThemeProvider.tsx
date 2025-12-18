import { createContext, type ReactNode, useContext } from "react";
import { type ThemeMode } from "../styles";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeContextProviderProps {
  mode: ThemeMode;
  toggleTheme: () => void;
  children: ReactNode;
}

export const ThemeContextProvider = ({
  mode,
  toggleTheme,
  children,
}: ThemeContextProviderProps) => {
  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext debe usarse dentro de ThemeContextProvider"
    );
  }
  return context;
};

export { useTheme } from "styled-components";
