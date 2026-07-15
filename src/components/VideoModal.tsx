import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title: string;
  subtitle: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoSrc, title, subtitle }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full"
            style={{ aspectRatio: '16/9' }}
          >
            {/* Header Bar */}
            <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 to-transparent p-4 flex justify-between items-center flex-row">
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

            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                rotate: [-180, 0, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                times: [0, 0.6, 1],
                ease: "easeOut"
              }}
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            >
              <motion.img
                initial={{ filter: "brightness(1)" }}
                animate={{ 
                  filter: ["brightness(1)", "brightness(2)", "brightness(1)"]
                }}
                transition={{
                  duration: 2,
                  times: [0, 0.6, 1],
                  ease: "easeOut"
                }}
                src="/logos/malcolm-vl-logo.png"
                alt="Malcolm VL Logo"
                className="w-32 h-32 object-contain invert"
              />
            </motion.div>

            {/* Video */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="w-full h-full absolute top-0 left-0"
            >
              <video
                src={videoSrc}
                title={`${title} - ${subtitle}`}
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted
                playsInline
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
