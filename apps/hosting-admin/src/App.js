import { jsx as _jsx } from "react/jsx-runtime";
import { Router } from './router';
import { ConfigsInitializer } from './providers';
function App() {
    return (_jsx(ConfigsInitializer, { children: _jsx(Router, {}) }));
}
export default App;
