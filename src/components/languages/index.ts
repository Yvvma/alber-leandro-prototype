// src/languages/i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en-us.json'
import pt from './pt-br.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      'en-us': { translation: en },
      'pt-br': { translation: pt },
    },
    fallbackLng: 'pt-br',
    interpolation: { escapeValue: false },
  })

export default i18n