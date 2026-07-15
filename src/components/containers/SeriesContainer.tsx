import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import SeriesCard from '../SeriesCard';
import { useTranslation } from 'react-i18next';

const SeriesContainer = () => {
  const { t } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center', skipSnaps: false, loop: false, containScroll: 'trimSnaps',
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const seriesData = [
    { platformIcon: '/logos/globoplay-logo_ddmdhv.png', 
      firstTitle: 'ROTA 66', 
      img: '/series/rota-66_k9pifz.jpg', singleTitle: 'Tic Tac', 
      video: '/series/tic-tac-malcolm-vl-01.mp4' },
    { platformIcon: '/logos/Paramount_logo_a6oqpq.png', 
      firstTitle: 'SPIDER ANDERSON SILVA', img: '/series/spider-serie_vma134.jpg', 
      singleTitle: 'Cleber', video: '/series/anderson-silva-spider-malcolm-01.mp4' },
    { platformIcon: '/logos/Paramount_logo_a6oqpq.png', firstTitle: 'ESCOLA DE QUEBRADA', 
      img: '/series/escola-da-quebrada-1iykhxuyiqwxf.PNG_whvv8a.webp', 
      singleTitle: 'BRYAN', video: '/series/malcolm-escola-de-quebrada-01.mp4' },
    { platformIcon: '/logos/cdnlogo.com_sony-music_xyx2g3.svg',
       firstTitle: 'CACIFE CLANDESTINO', 
       img: '/series/bb1739b87b287ded7c36278763f311d074dcec77429b4b8f72e2a4ed112c844a_auhgyd.jpg',
        singleTitle: 'MENTE', video: '/series/malcolm-vl-cacife-01.mp4' },
  ];

  const progressWidth = seriesData.length > 0 ? ((focusedIndex + 1) / seriesData.length) * 100 : 0;
  const currentItem = seriesData[focusedIndex];

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement;
    if (!card) return;
    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const scrollLeft = container.scrollLeft + (cardRect.left - containerRect.left) - (containerRect.width - cardRect.width) / 2;
    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    setFocusedIndex(index);
  };

  const scrollLeft = () => scrollToIndex(Math.max(focusedIndex - 1, 0));
  const scrollRight = () => scrollToIndex(Math.min(focusedIndex + 1, seriesData.length - 1));

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setFocusedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);
  const focusCard = useCallback((index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index, true);
    setFocusedIndex(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !isMobile) return;
    emblaApi.on('select', onSelect);
    onSelect();
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const handleWheel = (e: WheelEvent) => {
      const container = scrollContainerRef.current;
      if (!container) return;
      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (!isHorizontalScroll) return;
      e.preventDefault();
      if (e.deltaY > 0 || e.deltaX > 0) scrollRight(); else scrollLeft();
    };
    const container = scrollContainerRef.current;
    container?.addEventListener('wheel', handleWheel, { passive: false });
    return () => container?.removeEventListener('wheel', handleWheel);
  }, [focusedIndex, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;
      const cards = Array.from(container.children) as HTMLElement[];
      const containerCenter = container.offsetWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft - container.scrollLeft + card.offsetWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        if (distance < closestDistance) { closestDistance = distance; closestIndex = i; }
      });
      setFocusedIndex(closestIndex);
    };
    const container = scrollContainerRef.current;
    container?.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [seriesData.length, isMobile]);

  return (
    <div id="series" className="relative flex flex-col text-white px-4 md:px-16 py-8 md:py-16 gap-6 md:gap-10 overflow-hidden">
      <motion.div key={focusedIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }} className="absolute inset-0" style={{ zIndex: 1 }}>
        {currentItem?.video ? (
          <video autoPlay muted loop playsInline className="w-full h-full object-cover"
            style={{ filter: 'blur(5px) brightness(0.8)', transform: 'scale(1.05)' }}>
            <source src={currentItem.video} type="video/mp4" />
          </video>
        ) : (
          <div className="w-full h-full" style={{
            backgroundImage: `url(${currentItem?.img})`, backgroundSize: 'cover',
            backgroundPosition: 'center', filter: 'blur(5px) brightness(0.8)', transform: 'scale(1.05)',
          }} />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" style={{ zIndex: 2 }} />
      <div className="relative" style={{ zIndex: 10 }}>
        <motion.div initial={{ x: -32, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeIn' }} viewport={{ once: false, amount: 0.3 }} className="text-left mb-6">
          <h1 className="relative inline-block tracking-normal text-4xl md:text-5xl lg:text-6xl font-helvetica font-extrabold text-white pb-2 leading-tight">
            {t('series.title')}
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }} viewport={{ once: false, amount: 0.3 }}
              className="absolute bottom-0 left-0 w-full h-0.5 bg-white origin-left" />
          </h1>
        </motion.div>
        <div className="w-full">
          {isMobile ? (
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-8 py-4 mb-8 px-[4vw]" 
              >
                {seriesData.map((item, index) => (
                  <motion.div key={index} className="flex-shrink-0 flex flex-col 
                  min-w-0 w-[80vw] sm:w-[60vw] md:w-[50vw]"
                    animate={{ scale: focusedIndex === index ? 1 : 0.9, 
                      opacity: focusedIndex === index ? 1 : 0.7 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }} 
                    onClick={() => focusCard(index)}>
                    <SeriesCard platformIcon={item.platformIcon}
                     firstTitle={item.firstTitle} img={item.img}
                      singleTitle={item.singleTitle} video={item.video} 
                      isFocused={focusedIndex === index} />
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scroll-smooth py-4 mb-6 
              scrollbar-hidden snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {seriesData.map((item, index) => (
                <motion.div key={index} className="flex-shrink-0 snap-center pb-24"
                  animate={{ scale: focusedIndex === index ? 1 : 0.85, opacity: focusedIndex === index ? 1 : 0.6 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}>
                  <SeriesCard platformIcon={item.platformIcon} firstTitle={item.firstTitle} img={item.img}
                    singleTitle={item.singleTitle} video={item.video} isFocused={focusedIndex === index} />
                </motion.div>
              ))}
            </div>
          )}
          <div className="flex items-center justify-center gap-4">
            <button onClick={isMobile ? scrollPrev : scrollLeft}
              className="p-2 text-white hover:text-gray-300 transition-colors z-10">←</button>
            <div className="relative w-32 h-1 bg-gray-600 rounded-full overflow-hidden">
              <motion.div className="absolute top-0 left-0 h-full bg-white origin-left rounded-full"
                animate={{ width: `${progressWidth}%` }} transition={{ duration: 0.3, ease: 'easeOut' }} />
            </div>
            <button onClick={isMobile ? scrollNext : scrollRight}
              className="p-2 text-white hover:text-gray-300 transition-colors z-10">→</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesContainer;
