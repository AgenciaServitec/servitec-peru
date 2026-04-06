import { useMemo, useState } from "react";
import {
  AuthenticationProvider,
  ConfigsInitializer,
  GlobalDataProvider,
  ThemeContextProvider,
  VersionProvider,
} from "./providers";
import { Router } from "./router";
import { App as AntdAppContainer, ConfigProvider } from "antd";
import {
  getAntDesignTheme,
  getTheme,
  GlobalStyle,
  type ThemeMode,
} from "./styles";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [mode, setMode] = useState<ThemeMode>("light");

  const theme = useMemo(() => getTheme(mode), [mode]);
  const antdTheme = useMemo(() => getAntDesignTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContextProvider mode={mode} toggleTheme={toggleTheme}>
      <ConfigProvider theme={antdTheme}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AntdAppContainer>
            <BrowserRouter>
              <VersionProvider>
                <ConfigsInitializer>
                  <AuthenticationProvider>
                    <GlobalDataProvider>
                      <Router />
                    </GlobalDataProvider>
                  </AuthenticationProvider>
                </ConfigsInitializer>
              </VersionProvider>
            </BrowserRouter>
          </AntdAppContainer>
        </ThemeProvider>
      </ConfigProvider>
    </ThemeContextProvider>
  );
}

export default App;
