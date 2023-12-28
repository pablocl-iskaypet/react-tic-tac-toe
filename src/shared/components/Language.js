import {useTranslation} from "react-i18next";

export const LanguageSelector = () =>
{
    const [t, i18n] = useTranslation('common');
    return <header>
        <span>{t('language-selector.label')} </span>
        <button onClick={() => i18n.changeLanguage('es')}>{t('language-selector.languages.es')}</button>
        &nbsp;
        <button onClick={() => i18n.changeLanguage('en')}>{t('language-selector.languages.en')}</button>
    </header>
}