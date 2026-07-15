import { useState } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

type AccordionProps = {
    children: ReactNode; 
};
  

const AccordionItem = ({ children }:AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="border-b border-white/20 py-4 ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center"
      >
      <AnimatePresence mode="wait">
        <motion.h3
          key={isOpen ? 'ver-menos' : 'ver-mais'} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-white text-lg font-light"
        >
          {isOpen ? t('navigation.verMenos') : t('navigation.verMais')}
        </motion.h3>
      </AnimatePresence>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="text-white text-2xl"
        >
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default AccordionItem;