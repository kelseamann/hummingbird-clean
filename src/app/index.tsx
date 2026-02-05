import * as React from 'react';
import '@patternfly/patternfly/patternfly.css';
import '@patternfly/chatbot/dist/css/main.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { AppRoutes } from '@app/routes';
import { ThemeProvider } from '@app/utils/ThemeContext';
import '@app/app.css';

// Get basename for GitHub Pages compatibility
// In production on GitHub Pages, we need '/hummingbird-clean'
// In development, we use '' (empty string)
const basename = typeof window !== 'undefined' && window.location.hostname.includes('github.io') 
  ? '/hummingbird-clean' 
  : '';

// Handle GitHub Pages 404 redirect
// The 404.html redirects /?/path to the index, we need to restore the proper path
if (typeof window !== 'undefined') {
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect !== window.location.href) {
    window.history.replaceState(null, '', redirect);
  } else {
    // Handle the /?/ redirect format
    const location = window.location;
    if (location.search.startsWith('?/')) {
      const path = location.search.slice(2).split('&')[0].replace(/~and~/g, '&');
      const search = location.search.slice(2).split('&').slice(1).join('&').replace(/~and~/g, '&');
      window.history.replaceState(
        null,
        '',
        basename + '/' + path + (search ? '?' + search : '') + location.hash
      );
    }
  }
}

const App: React.FunctionComponent = () => {
  React.useEffect(() => {
    document.documentElement.classList.add('pf-v6-theme-glass');
    return () => {
      document.documentElement.classList.remove('pf-v6-theme-glass');
    };
  }, []);

  return (
    <ThemeProvider>
      <Router basename={basename}>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
