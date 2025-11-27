import {
  AuthenticationProvider,
  ConfigsInitializer,
  GlobalDataProvider,
  VersionProvider,
} from "./providers";
import { Router } from "./router";
import { App as AppAntd } from "antd";

function App() {
  return (
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
  );
}

export default App;
