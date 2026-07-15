import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import MusicCard from '../MusicCard';
import { useTranslation } from 'react-i18next';

const MusicContainer = () => {
  const { t } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    skipSnaps: false,
    loop: false,
    containScroll: 'keepSnaps',
    startIndex: 0,
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const musicData = [
     {
      type: 'video' as const,
      platformIcons: ['/logos/logo-youtube_yetwrm.png'],
      firstTitle: 'Som no Sebo',
      img: '/songs/som-no-sebo-malcolm-vl.jpg',
      singleTitle: 'Malcolm VL',
      video: '/songs/malcolm-vl-som-no-sebo.mp4',
    },
    {
      type: 'video' as const,
      platformIcons: ['/logos/logo-youtube_yetwrm.png'],
      firstTitle: '#Perfil124 - Billboard',
      img: '/music-videos/pineapple-malcolm.jpg',
      singleTitle: 'El Coffee, Malcolm VL',
      video: '/songs/pineapple-malcolm.mp4',
    },
    {
      type: 'video' as const,
      platformIcons: ['/logos/marvel-kondzilla_yrkebi.png'],
      firstTitle: 'O PODER É NOSSO',
      img: '/music-videos/malcolm-marvel_pqkchb.png',
      singleTitle: 'MC Luanna, Jovem MK e Malcolm VL',
      video: '/songs/malcolm-vl-marvel.mp4',
    },
    {
      type: 'video' as const,
      platformIcons: ['/logos/logo-youtube_yetwrm.png'],
      firstTitle: 'AFRICAN BOYZ',
      img: '/music-videos/african-boyz-malcolm-vl.jpg',
      singleTitle: 'El Coffee, Malcolm VL',
      video: '/songs/malcolm-vl-african-boys.mp4',
    },
  ];

  const progressWidth = musicData.length > 0 ? ((focusedIndex + 1) / musicData.length) * 100 : 0;
  const currentItem = musicData[focusedIndex];

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
  const scrollRight = () => scrollToIndex(Math.min(focusedIndex + 1, musicData.length - 1));

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setFocusedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);
  const scrollToEmbla = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (isMobile) {
      scrollToEmbla(focusedIndex);
    }
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
  }, [musicData.length, isMobile]);

  return (
    <div id="musicas" className="relative flex flex-col text-white px-4 md:px-16 py-8 md:py-16 gap-6 md:gap-10 overflow-hidden">
      <motion.div
        key={focusedIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
        style={{ zIndex: 1 }}
      >
        {currentItem?.video ? (
          <video autoPlay muted loop playsInline className="w-full h-full object-cover"
            style={{ filter: 'blur(5px) brightness(0.8)', transform: 'scale(1.05)' }}>
            <source src={currentItem.video} type="video/mp4" />
          </video>
        ) : (
          <div className="w-full h-full"
            style={{
              backgroundImage: `url(${currentItem?.img})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              filter: 'blur(5px) brightness(0.8)', transform: 'scale(1.05)',
            }}
          />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" style={{ zIndex: 2 }} />
      <div className="relative" style={{ zIndex: 10 }}>
        <motion.div initial={{ x: -32, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeIn' }} viewport={{ once: false, amount: 0.3 }} className="text-left mb-6">
          <h1 className="relative inline-block tracking-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-helvetica font-extrabold text-white pb-2 leading-tight">
            {t('music.title')}
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }} viewport={{ once: false, amount: 0.3 }}
              className="absolute bottom-0 left-0 h-0.5 w-full bg-white origin-left" />
          </h1>
        </motion.div>
        <div className="w-full">
          {isMobile ? (
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-8 py-4 mb-8 px-[4vw]">
                {musicData.map((item, index) => (
                  <motion.div key={index} className="flex-shrink-0 flex flex-col min-w-0 w-[80vw] sm:w-[60vw] md:w-[50vw]"
                    animate={{ scale: focusedIndex === index ? 1 : 0.9, opacity: focusedIndex === index ? 1 : 0.7 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}>
                    <MusicCard firstTitle={item.firstTitle} img={item.img} singleTitle={item.singleTitle}
                      video={item.video} platformIcons={item.platformIcons} type="video" isFocused={focusedIndex === index} />
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scroll-smooth py-4 mb-6 scrollbar-hidden snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {musicData.map((item, index) => (
                <motion.div key={index} className="flex-shrink-0 snap-center pb-24"
                  animate={{ scale: focusedIndex === index ? 1 : 0.85, opacity: focusedIndex === index ? 1 : 0.6 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}>
                  <MusicCard firstTitle={item.firstTitle} img={item.img} singleTitle={item.singleTitle}
                    video={item.video} platformIcons={item.platformIcons} type="video" isFocused={focusedIndex === index} />
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

export default MusicContainer;
