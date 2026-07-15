import {motion} from 'framer-motion';

const BioContainer = () => {

    return(
    <>
        <div className="flex flex-col z-10 text-white p-4 sm:p-8 md:p-16 bg-gray-900 items-center">

            <motion.div
                initial={{y: 32, opacity: 0}}
                whileInView={{y: 0, opacity: 1}}
                transition={{duration: 0.6, ease: 'easeIn'}}
                viewport={{once: false, amount: 0.3}}    
                id="contato"
                className="flex flex-col pt-8 sm:pt-12 md:pt-16 w-full max-w-4xl"
            >
                <h1 className='tracking-normal text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-helvetica font-[800] text-white'>BIOGRAFIA</h1>
            </motion.div>	

            <motion.div
            initial={{ x: -32, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeIn' }}
            viewport={{ once: false, amount: 0.3 }}
            className='gap-8 w-full max-w-6xl p-4 sm:p-8 md:p-16 mb-8'>   
                <p className='font-helvetica font-[200]'>
                Malcolm, um multifacetado artista de 23 anos, nasceu e cresceu no vibrante cenário da Vila Rio em Guarulhos. Sua trajetória transcende as fronteiras convencionais da arte, abraçando papéis como modelo, rapper, ator e compositor.<br/><br/>

                Desde jovem, Malcolm se destacou por sua habilidade de fundir diversos aspectos artísticos e pela maneira como moldou sua arte para impactar positivamente os futuros talentos das favelas. Sua autenticidade e representatividade servem como farol para muitos jovens que buscam expressar sua criatividade em meio a desafios.<br/><br/>

                Um marco crucial em sua carreira foi o lançamento do seu primeiro EP, intitulado "Sobre Nós", em 2019. Produzido em colaboração com Nagalli, esse projeto não apenas estabeleceu Malcolm como um nome promissor, mas também o impulsionou para palcos importantes, incluindo o Festival Sons das Ruas e o prestigiado Festival Cena 2k22.<br/><br/>

                Em 2022, deu vida ao seu talento de ator, estreando na série "Rota 66" do Globo Play. Ainda no mesmo ano, ele brilhou como parte do elenco do filme "Escola de Quebrada", e a série “Anderson Spider Silva” exibido pela Paramount.

                Malcolm não é apenas um nome, é um movimento cultural, um testemunho vivo da capacidade de superar barreiras e uma inspiração para aqueles que buscam deixar sua marca no mundo da arte e da expressão.
                </p>

            </motion.div>
            
        </div>
    </>
)

}
export default BioContainer;