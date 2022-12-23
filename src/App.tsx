// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import ScrollToTop from './components/shared/ScrollToTop';
import { ProgressBarStyle } from './components/shared/ProgressBar';
import NotistackProvider from './components/shared/NotistackProvider';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ThemeSettings>
        <NotistackProvider>
          <ProgressBarStyle />

          <ScrollToTop />
          <Router />
        </NotistackProvider>
      </ThemeSettings>
    </ThemeProvider>
  );
}
