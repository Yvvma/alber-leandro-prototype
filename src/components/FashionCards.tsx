import {AnimatePresence, motion} from 'framer-motion';
import {useState, useEffect} from 'react';

type CardProps = {
    firstTitle: string;
    imgLink: string;
    platformIcon: string;
    singleTitle: string;
    isFocused?: boolean;
};

const FashionCard = ({firstTitle, imgLink, platformIcon, singleTitle, isFocused = false} : CardProps) => {


    return(
<>
  <motion.div 
    initial={{x: -64, opacity: 0}}
    whileInView={{x: 0, opacity: 1}}
    transition={{duration: 0.6, ease: 'easeIn'}}
    viewport={{once: false, amount: 0.3}}      
    className='p-4 md:p-8 lg:p-16 rounded-xl lg:items-center relative justify-center items-center'
  >
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      transition={{duration: 0.2}} 
      className={`relative w-full max-w-[280px] mx-auto h-auto aspect-[9/16] overflow-hidden rounded-2xl shadow-lg transition-all duration-300 ${
        isFocused ? 'border-2 border-[#8fd9fb]' : 'border-2 border-transparent'
      }`}
    >
      <img src={imgLink} className='w-full h-full object-cover' alt="Project preview"/>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 z-10"
      />
      
      <motion.img 
        initial={{x: -24, opacity: 0}}
        whileInView={{x: 0, opacity: 1}}
        transition={{duration: 0.6, ease: 'easeIn'}}
        viewport={{once: false, amount: 0.3}}  
        src={platformIcon} 
        className='max-w-[96px] md:max-w-[128px] absolute bottom-4 z-10 pl-4'
        alt="Platform icon"
      />

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/100 to-transparent"></div>
    </motion.div>
    
    <div className='inset-0 z-10 flex flex-col gap-2 pt-4 pl-2'>
      <h2 className='font-helvetica font-[200] text-sm md:text-base'>{singleTitle}</h2>
      <h1 className='text-white text-2xl md:text-3xl lg:text-4xl font-helvetica font-[800]'>{firstTitle}</h1>    
    </div>
  </motion.div>
</>

    ) 
}

export default FashionCard;