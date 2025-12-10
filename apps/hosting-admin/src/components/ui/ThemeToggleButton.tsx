import { Button } from "../ui";
import { useThemeContext } from "../../providers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export const ThemeToggleButton = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Button
      type="text"
      icon={
        mode === "dark" ? (
          <FontAwesomeIcon icon={faSun} />
        ) : (
          <FontAwesomeIcon icon={faMoon} />
        )
      }
      onClick={toggleTheme}
    >
      {mode === "dark" ? "Modo Claro" : "Modo Oscuro"}
    </Button>
  );
};
