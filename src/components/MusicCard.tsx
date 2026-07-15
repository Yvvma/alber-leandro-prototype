import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
import AlbumOverlay from './AlbumOverlay';

type PlatformLink = { icon: string; url: string };

type CardProps = {
  firstTitle: string;
  platformIcons: string[] | PlatformLink[];
  singleTitle: string;
  video?: string;
  img: string;
  type?: 'album' | 'video';
  isFocused?: boolean;
};

const MusicCard = ({
  firstTitle,
  platformIcons,
  singleTitle,
  img,
  video,
  type = 'video',
  isFocused = false,
}: CardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [videoAspect, setVideoAspect] = useState(16 / 9);
  const [mounted, setMounted] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const { t } = useTranslation();

  // Enable portal after mount
  useEffect(() => setMounted(true), []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (!isModalOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Logo animation timing (only for video type)
  useEffect(() => {
    if (!isModalOpen || type === 'album') {
      setShowLogo(true);
      setShowVideo(false);
      return;
    }
    const timer = setTimeout(() => {
      setShowVideo(true);
      setShowLogo(false);
    }, 2300);
    return () => clearTimeout(timer);
  }, [isModalOpen, type]);

  // Get video aspect ratio (only for video type)
  useEffect(() => {
    if (type === 'video' && video) {
      const vid = document.createElement('video');
      vid.src = video;
      vid.onloadedmetadata = () => setVideoAspect(vid.videoWidth / vid.videoHeight);
    }
  }, [video, type]);

  // Play/pause based on focus (only for video type)
  useEffect(() => {
    if (type === 'video' && videoRef.current) {
      if (isFocused) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isFocused, type]);

  // Card content based on type
  const cardContent = type === 'video' && video ? (
    <video
      ref={videoRef}
      src={video}
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
    />
  ) : (
    <img src={img} className="w-full h-full object-cover" />
  );

  // Card
  const card = (
    <motion.div
      onClick={() => setIsModalOpen(true)}
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
        {cardContent}
        
        <motion.div
          initial={{ opacity: 0, x: 64 }}
          whileInView={{ opacity: isFocused ? 1 : 0, x: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute top-2 right-2 flex flex-row items-center justify-center"
        >
          <div className="flex flex-row items-center justify-center gap-2">
            <img
              src="/logos/play-circle_yvrfk5.svg"
              alt="Play Icon"
              className="w-4"
            />
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
                    className={`h-8 object-contain ${type === 'album' ? '' : 'sm:h-12'}`}
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
  );

  // Modal overlay based on type
  const modalOverlay = isModalOpen && (
    type === 'album' ? (
      <AlbumOverlay
        coverImage={img}
        title={firstTitle}
        artist={singleTitle}
        platforms={platformIcons as PlatformLink[]}
        onClose={() => setIsModalOpen(false)}
      />
    ) : (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="modal-overlay bg-black/60 flex items-center justify-center "
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          margin: 0,
          padding: '1rem',
        }}
        onClick={() => setIsModalOpen(false)}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-black flex flex-col rounded-2xl shadow-2xl overflow-hidden w-full max-w-lg"
          style={{ aspectRatio: videoAspect }}
        >
          {/* Header */}
          <div className="flex flex-row items-center justify-between w-full p-2 bg-black/80 z-50">
             <div className="flex gap-2">
               <motion.img
                      src="/logos/malcolm-vl-logo.png"
                      alt="Malcolm VL Logo"
                      className="w-4 h-4 object-contain invert ml-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                    />
              </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-white/80 hover:text-white transition-colors text-2xl w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full"
            >
              ×
            </button>
          </div>

          {/* Logo Animation */}
          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
              >
               <motion.img
                      src="/logos/vl-logo-v2.gif"
                      alt="Malcolm VL Logo"
                      className="max-w-24 object-contain"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                    />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Video */}
          <div className="flex items-center justify-center w-full h-full bg-black relative">
            <AnimatePresence>
              {showVideo && video && (
                <motion.video
                  src={video}
                  className="max-w-full max-h-full object-contain"
                  autoPlay
                  playsInline
                  loop
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    )
  );

  return (
    <>
      {card}
      {mounted && createPortal(<AnimatePresence>{modalOverlay}</AnimatePresence>, document.body)}
    </>
  );
};

export default MusicCard;
