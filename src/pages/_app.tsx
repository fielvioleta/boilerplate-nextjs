import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { store } from '@/store/store';
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '@/context/ThemeContext'
import { Provider } from 'react-redux';
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}
