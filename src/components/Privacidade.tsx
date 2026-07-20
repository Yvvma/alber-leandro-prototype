import { useTranslation } from "react-i18next";

export default function Privacidade() {
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto px-8 py-16 text-white/80">
      <h1 className="text-3xl font-[800] font-helvetica uppercase tracking-tight mb-4">
        {t('privacy.title')}
      </h1>
      <p className="text-sm text-white/50 mb-8">{t('privacy.lastUpdate')}</p>
      <p className="font-helvetica leading-relaxed">{t('privacy.text')}</p>
    </div>
  );
}
