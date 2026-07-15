import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const TitleComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const MENU_ITEMS = [
    { key: "pro skater", path: "#skater" },
    { key: "entrepeneur", path: "#entrepeneur" },
    { key: "contact", path: "#contact" },
  ];

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-0 right-0 z-50 w-14 h-14 bg-black text-white flex items-center justify-center shadow-lg z-[9999]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-2xl font-bold">
          {isOpen ? "✕" : "☰"}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ originX: 1, originY: 1 }}
            className="fixed bottom-14 right-14 z-50 flex flex-col items-start justify-center gap-4 bg-black/90 backdrop-blur-md px-16 w-full h-full"
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

export default TitleComponent;
