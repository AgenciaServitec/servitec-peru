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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PermissionsProvider } from "./providers/PermissionsProvider.tsx";

const queryClient = new QueryClient();

function App() {
  const [mode, setMode] = useState<ThemeMode>("dark");

  const theme = useMemo(() => getTheme(mode), [mode]);
  const antdTheme = useMemo(() => getAntDesignTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider mode={mode} toggleTheme={toggleTheme}>
        <ConfigProvider theme={antdTheme}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <AntdAppContainer>
              <BrowserRouter>
                <VersionProvider>
                  <ConfigsInitializer>
                    <AuthenticationProvider>
                      <PermissionsProvider>
                        <GlobalDataProvider>
                          <Router />
                        </GlobalDataProvider>
                      </PermissionsProvider>
                    </AuthenticationProvider>
                  </ConfigsInitializer>
                </VersionProvider>
              </BrowserRouter>
            </AntdAppContainer>
          </ThemeProvider>
        </ConfigProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  );
}

export default App;
