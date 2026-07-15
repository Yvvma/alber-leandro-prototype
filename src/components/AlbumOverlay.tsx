import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

type PlatformLink = {
  icon: string;
  url: string;
};

type AlbumOverlayProps = {
  coverImage: string;
  title: string;
  artist: string;
  platforms: PlatformLink[];
  onClose: () => void;
};

const AlbumOverlay = ({
  coverImage,
  title,
  artist,
  platforms,
  onClose,
}: AlbumOverlayProps) => {
  const {t} = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="modal-overlay bg-black/70 backdrop-blur-sm flex items-center justify-center overflow-auto"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl overflow-hidden max-w-md h-full w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
        style={{ aspectRatio: "4/3" }}
      >
        {/* Blurred Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${coverImage})`,
            filter: "blur(20px) brightness(0.3)",
            transform: "scale(1.1)",
          }}
        />

        {/* Header Bar */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-20 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors text-2xl w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center overflow-hidden">
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            src={coverImage}
            alt={title}
            className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-xl border-2 border-black shadow-2xl mb-4 sm:mb-6"
          />

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2"
          >
            {title}
          </motion.h1>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-sm sm:text-lg text-gray-300 mb-2 sm:mb-4"
          >
            {artist}
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="uppercase text-gray-400 tracking-widest mb-4 text-xs sm:text-sm"
          >
            {t('actions.listen_now')}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="flex gap-4 sm:gap-6 flex-wrap justify-center"
          >
            {platforms.map((p, i) => (
              <motion.a
                key={i}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110 p-2 rounded-full hover:bg-white/10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={p.icon} alt="Platform" className="w-12 h-12 object-contain" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AlbumOverlay;
