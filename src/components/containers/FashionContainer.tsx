import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import FashionCard from '../FashionCards';
import { useTranslation } from 'react-i18next';

const FashionContainer = () => {
  const { t } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center', skipSnaps: false, loop: false, containScroll: 'keepSnaps', startIndex: 0,
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const fashionData = [
    { platformIcon: "https://res.cloudinary.com/durf7jd0p/image/upload/v1745080084/SPFW_logo_hmzctt.png", firstTitle: "SPFW 52", imgLink: "https://res.cloudinary.com/durf7jd0p/image/upload/v1745078842/SPFW_52_for_mile.lab_spfw_It_doesn_t_even_seem_like_this_tape_was_real_a_dream_come_true_for_me_anyone_who_knows_me_closely_knows_I_just_have_to_say_thank_you_to_those_who_believe_we_continue_like_this._mvwxxb.jpg", singleTitle: "Mile Lab" },
    { platformIcon: "https://res.cloudinary.com/durf7jd0p/image/upload/v1745080080/Casa_de_Criadores_ukjz8i.png", firstTitle: "CDC 50", imgLink: "https://res.cloudinary.com/durf7jd0p/image/upload/v1745078780/Eu_t%C3%B4_pelas_passarelas_da_vida_esbanjando_melanina_casadecriadores_VL_presente_CDC50_lma8xz.jpg", singleTitle: "Casa dos Criadores" },
    { platformIcon: "https://res.cloudinary.com/durf7jd0p/image/upload/v1745078798/Fila_logo_yo6ig3.png", firstTitle: "CAMPANHA FILA", imgLink: "https://res.cloudinary.com/durf7jd0p/image/upload/v1745078783/Acordei_com_um_banner_numalinha_de_trem_ali_do_outro_lado_uthsma.jpg", singleTitle: "FILA" },
  ];

  const progressWidth = fashionData.length > 0 ? ((focusedIndex + 1) / fashionData.length) * 100 : 0;
  const currentItem = fashionData[focusedIndex];

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
  const scrollRight = () => scrollToIndex(Math.min(focusedIndex + 1, fashionData.length - 1));

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setFocusedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);
  const scrollToEmbla = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (isMobile) scrollToEmbla(focusedIndex);
  }, [isMobile, focusedIndex, scrollToEmbla]);

  useEffect(() => {
    if (!emblaApi || !isMobile) return;
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
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
  }, [fashionData.length, isMobile]);

  return (
    <div id="moda" className="relative flex flex-col text-white px-4 md:px-16 py-8 md:py-16 gap-6 md:gap-10 overflow-hidden">
      <motion.div key={focusedIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }} className="absolute inset-0" style={{ zIndex: 1 }}>
        <div className="w-full h-full" style={{
          backgroundImage: `url(${currentItem?.imgLink})`, backgroundSize: 'cover',
          backgroundPosition: 'center', filter: 'blur(15px) brightness(0.4)', transform: 'scale(1.05)',
        }} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" style={{ zIndex: 2 }} />
      <div className="relative" style={{ zIndex: 10 }}>
        <motion.div initial={{ x: -32, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeIn' }} viewport={{ once: false, amount: 0.3 }} className="text-left mb-6">
          <h1 className="relative inline-block tracking-normal text-4xl md:text-5xl lg:text-6xl font-helvetica font-extrabold text-white pb-2 leading-tight">
            {t('fashion.title')}
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }} viewport={{ once: false, amount: 0.3 }}
              className="absolute bottom-0 left-0 w-full h-0.5 bg-white origin-left" />
          </h1>
        </motion.div>
        <div className="w-full">
          {isMobile ? (
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-8 py-4 mb-8 px-[6vw]">
                {fashionData.map((item, index) => (
                  <motion.div key={index} className="flex-shrink-0 flex flex-col min-w-0 w-[80vw] sm:w-[60vw] md:w-[50vw]"
                    animate={{ scale: focusedIndex === index ? 1 : 0.9, opacity: focusedIndex === index ? 1 : 0.7 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}>
                    <FashionCard platformIcon={item.platformIcon} firstTitle={item.firstTitle}
                      imgLink={item.imgLink} singleTitle={item.singleTitle} isFocused={focusedIndex === index} />
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scroll-smooth py-4 mb-6 scrollbar-hidden snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {fashionData.map((item, index) => (
                <motion.div key={index} className="flex-shrink-0 snap-center"
                  animate={{ scale: focusedIndex === index ? 1 : 0.85, opacity: focusedIndex === index ? 1 : 0.6 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}>
                  <FashionCard platformIcon={item.platformIcon} firstTitle={item.firstTitle}
                    imgLink={item.imgLink} singleTitle={item.singleTitle} isFocused={focusedIndex === index} />
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

export default FashionContainer;
