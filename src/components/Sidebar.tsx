
import { motion} from 'framer-motion';

const SidebarComponent = () => {

  return (
    <>
      <motion.aside
        key="sidebar"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 200, opacity: 0 }}
        transition={{ type: 'tween' }}
        className="fixed top-0 right-0 h-full lg:max-w-16 text-white flex flex-col gap-6 z-40  text-sm font-medium sm:max-w-6 p-3"
      >
        <nav className="flex flex-col gap-8">
    
          <h1
            className="font-helvetica text-lg tracking-wider cursor-pointer md:cursor-default md:pointer-events-none"
          
          >
            VL
          </h1>

          <div className="h-32 w-px bg-white mx-auto" />

          {/* Social Icons */}
          <motion.a target='_blank' whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} href="https://www.instagram.com/malcolmtado">
            <img src='/logos/iconmonstr-instagram-11_gxhzgf.svg' alt='Instagram-Icon' className='invert max-w-5 sm:max-w-6 ' />
          </motion.a>
          <motion.a target='_blank' whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} href="https://open.spotify.com/artist/6pJi8PaFlp6aNvOw3e0ONm?si=gheobpqZREahqCh1b2V48g&nd=1&dlsi=12781754727f4573">
            <img src='/logos/spotify-icon_jsnycn.svg' alt='Spotify-Icon' className='invert max-w-5 sm:max-w-6 ' />
          </motion.a>
          <motion.a target='_blank' whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} href="https://music.apple.com/br/artist/malcolm-vl">
            <img src='/logos/apple-music_pwqhxu.svg' alt='Apple-Music-Icon' className='invert max-w-5 sm:max-w-6 ' />
          </motion.a>
          <motion.a target='_blank' whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} href="https://dzr.page.link/Jvp1THbX8hvS87QS8">
            <img src='https://res.cloudinary.com/durf7jd0p/image/upload/v1745089618/deezer-logo_xkvan7.png' alt='Deezer-Icon' className='max-w-5 sm:max-w-6 ' />
          </motion.a>
          <motion.a target='_blank' whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} href="https://tidal.com/browse/artist/13382501?u">
            <img src='https://res.cloudinary.com/durf7jd0p/image/upload/v1745089883/tidal-svgrepo-com_irfilj.svg' alt='Tidal-Icon' className='invert max-w-5 sm:max-w-6 ' />
          </motion.a>
          <motion.a target='_blank' whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} href="https://www.youtube.com/MalcolmVL">
            <img src='/logos/youtube-svgrepo-com_obrra8.svg' alt='Youtube-Icon' className='invert max-w-5 sm:max-w-6 ' />
          </motion.a>
        </nav>
      </motion.aside>

      
    </>
  );
};

export default SidebarComponent;
