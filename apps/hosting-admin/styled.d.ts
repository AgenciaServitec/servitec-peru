import 'styled-components';
import type { theme } from './src/styles';

type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
