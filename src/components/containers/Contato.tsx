import {motion} from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ContactForm from '../UI/ContactForm';

const ContatoContainer = () => {
    const { t } = useTranslation();

    return(
    <>
    <div className="flex flex-col z-10 text-white p-4 gap-4 sm:p-8 md:p-16 bg-gray-900 items-center">

   <motion.div
  initial={{ y: 32, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6, ease: 'easeIn' }}
  viewport={{ once: true, amount: 0.3 }}    
  id="contato"
  className="flex flex-col pt-8 gap-4 sm:pt-12 md:pt-16 w-full max-w-4xl justify-center items-center"
>
  <h1 className="relative inline-block tracking-normal text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-helvetica font-[800] text-white pb-2 sm:pb-4">
    {t('contact.title', 'CONTATO')}
    {/* Dynamic underline */}
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
      viewport={{ once: true, amount: 0.3 }}
      className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-white origin-left"
    />
  </h1>
</motion.div>
	

        
        <ContactForm/>
        
    </div>
    </>
)

}
export default ContatoContainer;