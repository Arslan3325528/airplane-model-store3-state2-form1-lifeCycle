import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react'; //! Emotion Theme
import { theme } from '@/constants'; //! Emotion Theme

import './index.css';

//! Aбсолютний шлях + Реекспорт
import {
  App,
  AppColorBox,
  AppLoginForm
} from '@/components/App';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/airplane-model-store3-state2-form1">
      <ThemeProvider theme={theme}>
        <App />
        {/* <AppColorBox />  */}
        {/* <AppLoginForm onSubmit={values => console.log(values)} /> */}
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode >
);
