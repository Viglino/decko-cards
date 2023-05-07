import { i18n } from './i18n.js'
import txt_en from './i18n.en.js'
import txt_fr from './i18n.fr.js'

// Internationalisation
i18n.set('en', txt_en);
i18n.set('fr', txt_fr);

i18n.setLanguage(navigator.language.split('-')[0] || 'en');