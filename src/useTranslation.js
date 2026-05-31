import { useLocation, useNavigate } from 'react-router-dom';
import { translations } from './translations';

export function useTranslation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  
  const lang = pathname.startsWith('/zh') ? 'zh' : pathname.startsWith('/ko') ? 'ko' : 'en';
  
  const t = (key) => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  const changeLanguage = (newLang) => {
    let base = pathname;
    if (base.startsWith('/zh')) base = base.substring(3);
    else if (base.startsWith('/ko')) base = base.substring(3);
    if (!base.startsWith('/')) base = '/' + base;

    if (newLang === 'en') {
      navigate(base === '/' ? '/' : base);
    } else {
      navigate('/' + newLang + (base === '/' ? '' : base));
    }
  };

  const getLocalizedLink = (path) => {
    const cleanPath = path.startsWith('/') ? path : '/' + path;
    if (lang === 'en') return cleanPath;
    return '/' + lang + (cleanPath === '/' ? '' : cleanPath);
  };

  return { lang, t, changeLanguage, getLocalizedLink };
}
