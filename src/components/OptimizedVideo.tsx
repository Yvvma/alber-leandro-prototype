import { useState, useEffect, useRef } from 'react';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  lazy?: boolean;
  threshold?: number;
  shouldPlay?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedVideo = ({
  src,
  poster,
  className = '',
  muted = true,
  loop = true,
  autoPlay = true,
  playsInline = true,
  controls = false,
  preload = 'metadata',
  threshold = 0.25,
  lazy= true,
  shouldPlay = true,
  onLoad,
  onError,
}: OptimizedVideoProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(!lazy);
  const [hasError, setHasError] = useState(false);

  // Intersection Observer: load video when visible
  useEffect(() => {
    if (!lazy || !videoRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [lazy, threshold]);

  // Handle video loading
  const handleLoadedData = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Autoplay trigger (mobile-safe)
  useEffect(() => {
    if (!shouldPlay || !isVisible) return;
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        // Some browsers block autoplay — ignore silently
      }
    };
    tryPlay();
  }, [shouldPlay, isVisible]);

  return (
    <>
      {!hasError ? (
        <video
          ref={videoRef}
          className={`${className} transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src={isVisible ? src : undefined}
          poster={poster}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          controls={controls}
          preload={isVisible ? preload : 'none'}
          autoPlay={autoPlay && isVisible}
          onLoadedData={handleLoadedData}
          onError={handleError}
        />
      ) : (
        poster && (
          <img
            src={poster}
            alt="Video failed to load"
            className={`${className} object-cover`}
          />
        )
      )}
    </>
  );
};

export default OptimizedVideo;
