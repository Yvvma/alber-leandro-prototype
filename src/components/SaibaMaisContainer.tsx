import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const SaibaMaisContainer = () => {
  const {t} = useTranslation()
  return (
    <div id="saiba-mais" className="flex flex-col z-10 text-white p-4 sm:p-8 md:p-16 bg-gray-800 justify-center items-center min-h-[400px]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.3 }}
        className="border-2 border-white rounded-2xl p-8 md:p-12 cursor-pointer hover:bg-white/5 transition-colors duration-300 max-w-2xl w-full text-center"
      >
        <h1 className="tracking-normal uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-helvetica font-extrabold text-white pb-4">
          {t('saiba-mais.title')}
        </h1>
        
        <div className="relative mb-6">
          <div className="w-full h-0.5 sm:h-1 bg-gray-600 mx-auto"></div>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            viewport={{ once: false, amount: 0.3 }}
            className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-white origin-left"
          />
        </div>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-lg md:text-xl text-gray-300 leading-relaxed"
        >
          Descubra mais sobre a trajetória artística de Malcolm VL
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SaibaMaisContainer;
