import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'antd/dist/reset.css';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle, theme } from './styles';
import { ConfigProvider } from 'antd';
import { ThemeProvider } from 'styled-components';
import { darken, lighten } from 'polished';
import '@ant-design/v5-patch-for-react-19';

const config = {
  components: {
    Button: {
      colorPrimary: theme.colors.primary,
      colorPrimaryHover: theme.colors.secondary,
      colorPrimaryActive: theme.colors.secondary,
    },
    Drawer: {
      colorBgElevated: darken(0.1, theme.colors.secondary),
      colorIcon: '#fff',
      colorIconHover: 'rgba(255,255,255,0.69)',
      algorithm: true,
    },
    Menu: {
      colorPrimary: theme.colors.secondary,
      colorPrimaryHover: lighten(0.05, theme.colors.secondary),
      itemHoverBg: lighten(0.02, theme.colors.secondary),
      colorBgElevated: darken(0.1, theme.colors.secondary),
      itemBg: darken(0.1, theme.colors.secondary),
      subMenuItemBg: darken(0.14, theme.colors.secondary),
      colorText: theme.colors.white,
      itemColor: theme.colors.white,
      itemSelectedBg: darken(0.12, theme.colors.secondary),
      itemSelectedColor: 'rgb(255,255,255)',
      colorTextDescription: 'rgba(253,253,253,0.45)',
      itemActiveBg: 'rgb(233,252,224)',
      horizontalItemSelectedColor: lighten(0.02, theme.colors.primary),
      horizontalItemHoverColor: lighten(0.05, theme.colors.primary),
      colorPrimaryBorder: lighten(0.02, theme.colors.primary),
      algorithm: true,
    },
    Tabs: {
      colorPrimary: theme.colors.primary,
      colorPrimaryHover: theme.colors.secondary,
      colorPrimaryActive: theme.colors.secondary,
    },
    Card: {
      colorFillAlter: theme.colors.secondary,
      colorTextHeading: 'white',
    },
    Steps: {
      colorPrimary: theme.colors.primary,
    },
  },
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ConfigProvider theme={config}>
        <GlobalStyle />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </ThemeProvider>
  </StrictMode>
);
