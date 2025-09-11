import { Router } from './router';
import { ConfigsInitializer } from './providers';

function App() {
  return (
    <ConfigsInitializer>
      <Router />
    </ConfigsInitializer>
  );
}

export default App;
