import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
import YoutubeContent from './youtubeWindow';
import AlbumOverlay from './AlbumOverlay';

type PlatformLink = { icon: string; url: string };

type CardProps = {
  firstTitle: string;
  imgLink: string;
  platformIcons: string[] | PlatformLink[];
  singleTitle: string;
  youtubeLink?: string;
  type?: 'album' | 'video';
  isFocused?: boolean;
};

const SampleCard = ({
  firstTitle,
  imgLink,
  platformIcons,
  singleTitle,
  youtubeLink,
  type = 'video',
  isFocused = false,
}: CardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  // Ensure portal rendering after mount (for SSR safety)
  useEffect(() => setMounted(true), []);

  // Prevent background scroll when overlay is open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const overlay = type === 'album' ? (
    <AlbumOverlay
      coverImage={imgLink}
      title={firstTitle}
      artist={singleTitle}
      platforms={platformIcons as PlatformLink[]}
      onClose={() => setIsOpen(false)}
    />
  ) : (
    <YoutubeContent youtubeLink={youtubeLink!} onClose={() => setIsOpen(false)} />
  );

  return (
    <>
      <motion.div
        onClick={() => setIsOpen(true)}
        initial={{ x: -64, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeIn' }}
        viewport={{ once: false, amount: 0.3 }}
        className="max-w-xs rounded-xl relative cursor-pointer"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className={`relative aspect-[3/2] overflow-hidden rounded-2xl shadow-lg transition-all duration-300 ${
            isFocused ? 'border-2 border-[#8fd9fb]' : 'border-2 border-transparent'
          }`}
        >
          <img src={imgLink} className="w-full h-full object-cover" />

          <motion.div
            initial={{ opacity: 0, x: 64 }}
            whileInView={{ opacity: isFocused ? 1 : 0, x: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute top-2 right-2 flex flex-row items-center justify-center"
          >
            <div className="flex flex-row items-center justify-center gap-2">
              <img src="/logos/play-circle_yvrfk5.svg" alt="Icon" className="h-15" />
              <h6 className="text-white font-helvetica text-xs tracking-tight font-200">
                {type === 'video'
                  ? t('actions.watch_now', 'Assista Agora')
                  : t('actions.listen_now', 'Ouça Agora')}
              </h6>
            </div>
          </motion.div>

          {/* Platform icons */}
          {Array.isArray(platformIcons) && (
            <div
              className={`absolute bottom-4 left-4 z-10 flex items-center gap-2 ${
                type === 'album' ? 'max-w-24 justify-center w-full' : 'max-w-24'
              }`}
            >
              {platformIcons.map((icon, idx) => {
                const src = typeof icon === 'string' ? icon : icon.icon;
                return (
                  <motion.img
                    key={idx}
                    src={src}
                    className={`w-8 h-8 object-contain ${type === 'album' ? '' : 'lg:w-14 lg:h-14'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  />
                );
              })}
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/100 to-transparent" />
        </motion.div>

        <div className="z-10 flex flex-col gap-1 pt-2">
          <h2 className="text-sm font-helvetica font-[200] tracking-tight uppercase">{singleTitle}</h2>
          <h1 className="text-white text-xl uppercase md:text-3xl lg:text-4xl font-helvetica font-[800]">
            {firstTitle}
          </h1>
        </div>
      </motion.div>

      {/* Portal overlay */}
      {mounted &&
        createPortal(
          <AnimatePresence>{isOpen && overlay}</AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default SampleCard;
