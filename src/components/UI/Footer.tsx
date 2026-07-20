import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-[#0a0a0a] text-white py-8 font-sans w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12">

        {/* Transparency */}
        <div className="flex flex-col gap-2">
          <p className="font-helvetica font-[800] tracking-tight uppercase text-sm mb-1">{t('footer.transparency')}</p>
          <a
            href="/privacidade"
            className="text-sm text-white/70 font-helvetica font-[400] uppercase tracking-tight hover:text-white transition-colors"
          >
            {t('footer.privacyPolicy')}
          </a>
          <a
            href="#"
            className="text-sm text-white/70 font-helvetica font-[400] uppercase tracking-tight hover:text-white transition-colors"
          >
            {t('footer.termsOfUse')}
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col gap-3">
          <p className="font-helvetica font-[800] tracking-tight uppercase text-sm mb-1">{t('footer.social')}</p>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/officialber/" aria-label="Facebook" className="text-white hover:text-white/70 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="text-white hover:text-white/70 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="https://www.instagram.com/alber_leandr0/" aria-label="Instagram" className="text-white hover:text-white/70 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Email */}
        <div id='contact' className="flex flex-col gap-2">
        
          <p className="text-sm font-helvetica font-[800] uppercase tracking-tight text-white">contact@alberleandro.com</p>
        </div>

        {/* Legal */}
       
        <div className="flex flex-col gap-1 md:text-right">
           <div className="bg-white/10 w-full h-0.5"/>
          <p className="text-white/30 text-xs font-helvetica font-[300]">© Alber Leandro</p>
          <p className="text-white/30 text-xs font-helvetica font-[300]">Los Angeles, California</p>
        </div>
      </div>
    </footer>
  );
}