import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type YoutubeProps = {
  youtubeLink: string;
  onClose: () => void;
}

const YoutubeContent = ({ youtubeLink, onClose }: YoutubeProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const [showLogo, setShowLogo] = useState(true);


  // Start video after logo animation finishes (about 2.3s total)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
      setShowLogo(false);
    }, 2300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="modal-overlay bg-black/60 flex items-center justify-center"
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
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1],
            delay: 0.1
          }}
          className='flex flex-col w-full max-w-4xl'
        >
          {/* Header */}
          <div className="relative bg-black/100 p-2 rounded-t-xl flex justify-between items-center flex-row">
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
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors text-2xl w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full"
            >
              ×
            </button>
          </div>

          {/* Video Container */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-gradient-to-br from-gray-900 to-black z-20 rounded-b-2xl shadow-2xl overflow-hidden w-full"
            style={{ aspectRatio: '16/9' }}
          >
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

            {/* YouTube iframe */}
            <AnimatePresence>
              {showVideo && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full absolute top-0 left-0"
                >
                  <iframe
                    src={youtubeLink + "?autoplay=1"} // autoplay once shown
                    title="YouTube video"
                    allowFullScreen
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default YoutubeContent;
