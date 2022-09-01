import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { AppInitialProps } from 'next/app';

import { GlobalStyles } from '../styles/global-styles';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

MyApp.propTypes = AppInitialProps;
