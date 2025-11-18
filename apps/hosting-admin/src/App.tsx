import {
  AuthenticationProvider,
  ConfigsInitializer,
  GlobalDataProvider,
  VersionProvider,
} from "./providers";
import { Router } from "./router";

import dayjs from "dayjs";
import weekDay from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(weekDay);
dayjs.extend(localeData);
dayjs.extend(updateLocale);

dayjs.updateLocale("es", { weekStart: 0 });

function App() {
  return (
    <VersionProvider>
      <ConfigsInitializer>
        <AuthenticationProvider>
          <GlobalDataProvider>
            <Router />
          </GlobalDataProvider>
        </AuthenticationProvider>
      </ConfigsInitializer>
    </VersionProvider>
  );
}

export default App;
