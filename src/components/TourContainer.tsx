import {motion} from 'framer-motion';

const TourContainer = () => {

    return(
    <>
         <div className="flex flex-col z-99 text-white p-24 bg-gray-900 justify-center items-center">

            <motion.div
            initial={{y:32, opacity: 0 }}
            whileInView={{y:0, opacity: 1}}
            transition={{duration: 0.6, ease: 'easeIn'}}
            viewport={{once:false, amount:0.3}}    
            id="musicas"
            className="pt-16 justify-center items-center">
                <h1 className='tracking-normal text-6xl font-helvetica font-[800] text-white pb-4'>AGENDA DE SHOWS</h1>
        </motion.div>	
</div>
    </>
)

}
export default TourContainer;