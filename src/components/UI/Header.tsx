import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const LANGUAGES = [
  { code: "PT", fullName: "Português" },
  { code: "EN", fullName: "English" },
];
const MENU_ITEMS = [
  { key: "pro skater", path: "#skater" },
  {key: "entrepeneur", path: "#entrepeneur"},
  {key: "contact", path: "#contact"},
];


const HeaderComponent = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [language, setLanguage] = useState(
    i18n.language.toUpperCase().includes("PT") ? "PT" : "EN"
  );
  const [isOpen, setIsOpen] = useState(false);

  const SECTION_ITEMS = [
    { key: "series", path: "#series", label: t('series.title', 'Séries') },
    { key: "music", path: "#musica", label: t('music.title', 'Música') },
    { key: "fashion", path: "#moda", label: t('fashion.title', 'Moda') },
    { key: "publicidade", path: "#publicidade", label: t('publicidade.title', 'Publicidade') },
    { key: "contato", path: "#contato", label: t('contact.title', 'Contato') },
  ];

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen((prev) => !prev);
  };

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode.toLowerCase());
    setLanguage(langCode);
    setIsLanguageMenuOpen(false);
  };

  const onLanguageMenuClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsLanguageMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 w-full z-[100000] bg-black backdrop-blur-md border-b border-1 border-white"
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <nav className="w-full flex justify-between items-center px-4 md:px-8 py-2">
    
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {SECTION_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.path}
                className="text-white/70 hover:text-white text-xs uppercase font-helvetica font-[700] tracking-widest transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={toggleLanguageMenu}
              className="text-white/70 hover:text-white text-xs font-helvetica font-[800] tracking-tight border border-white/30 px-3 py-1 rounded transition-colors"
            >
              {language}
            </button>
          </div>

          {/* Mobile controls */}
        <div className="flex md:hidden items-center justify-between w-full">
  <motion.button
    onClick={toggleLanguageMenu}
    className="uppercase text-xs text-white font-helvetica font-[800] tracking-tight p-2"
  >
    {language}
  </motion.button>

  <motion.button
    onClick={() => setIsOpen(!isOpen)}
    className="w-10 h-10 text-white flex items-center justify-center"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <span className="text-2xl">
      {isOpen ? "✕" : "☰"}
    </span>
  </motion.button>
</div>

        </nav>
      </motion.header>

      {/* Language Menu */}
      <AnimatePresence>
        {isLanguageMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full h-full bg-black/40 flex flex-col z-[100000] items-center justify-center gap-16"
            onClick={onLanguageMenuClick}
          >
            <div className="flex flex-col gap-8 text-center">
              <p className="text-white text-xs uppercase font-helvetica tracking-widest">
                {t('language.select', 'Selecionar Idioma')}
              </p>
              <div className="flex flex-row gap-8 justify-center">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`text-white uppercase font-helvetica font-[800] border px-6 py-3 tracking-wide transition ${
                      language === lang.code
                        ? "border-white"
                        : "border-transparent hover:border-white"
                    }`}
                  >
                    {lang.fullName}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
    <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ originX: 1, originY: 0 }}
            className="fixed top-14 right-14 z-50 flex flex-col items-start justify-center gap-4 bg-black/90 backdrop-blur-md px-16 w-full h-full"
          >
            {MENU_ITEMS.map((item) => (
              <a key={item.key} href={item.path} onClick={() => setIsOpen(false)}>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#ffffff22" }}
                  className="text-white uppercase px-8 py-4 text-xl  font-helvetica font-[800] tracking-base w-full text-center"
                >
                  {item.key.charAt(0).toUpperCase() + item.key.slice(1)}
                </motion.button>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderComponent;