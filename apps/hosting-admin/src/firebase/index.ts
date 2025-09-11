import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { currentConfig, currentEnvironment } from '../config';

const app = initializeApp(currentConfig.firebaseApp);

const auth = getAuth(app);

const { version, apiUrl } = currentConfig;

console.log(currentEnvironment, ':', version);

export { currentConfig, version, auth, apiUrl };