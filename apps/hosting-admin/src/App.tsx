import { useState } from "react";
import {
  AuthenticationProvider,
  ConfigsInitializer,
  GlobalDataProvider,
  ThemeContextProvider,
  VersionProvider,
} from "./providers";
import { Router } from "./router";
import { App as AppAntd, ConfigProvider } from "antd";
import {
  getAntDesignTheme,
  getTheme,
  GlobalStyle,
  type ThemeMode,
} from "./styles";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [mode, setMode] = useState<ThemeMode>("dark");
  const theme = getTheme(mode);
  const antdTheme = getAntDesignTheme(mode);

  const toggleTheme = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContextProvider mode={mode} toggleTheme={toggleTheme}>
      <ThemeProvider theme={theme}>
        <ConfigProvider theme={antdTheme}>
          <GlobalStyle />
          <BrowserRouter>
            <VersionProvider>
              <ConfigsInitializer>
                <AuthenticationProvider>
                  <GlobalDataProvider>
                    <AppAntd>
                      <Router />
                    </AppAntd>
                  </GlobalDataProvider>
                </AuthenticationProvider>
              </ConfigsInitializer>
            </VersionProvider>
          </BrowserRouter>
        </ConfigProvider>
      </ThemeProvider>
    </ThemeContextProvider>
  );
}

export default App;
