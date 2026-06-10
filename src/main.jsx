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
  AppSearchDebounce, //! Пошук елементів + Debounce
  AppSearchDebounceTextBacklight, //! Пошук елементів + Debounce + Підсвічування тексту
  AppLoginForm, //! 4.4.1.Неконтрольовані елементи форм
} from '@/components/App';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/airplane-model-store3-state2-form1">
      <ThemeProvider theme={theme}>
        {/* <App /> */}
        {/* <AppColorBox />  */}
        {/* <AppSearchDebounce /> */}
        {/* <AppSearchDebounceTextBacklight /> */}
        <AppLoginForm onSubmit={values => console.log(values)} />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode >
);
