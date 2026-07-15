import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const PrivacidadeContainer = () => {
  return (
    <div className="flex flex-col z-10 text-white p-4 sm:p-8 md:pl-32">
      <motion.div
        initial={{ x: -32, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeIn' }}
        viewport={{ once: false, amount: 0.3 }}
        id="moda"
        className="pt-6 sm:pt-12 md:pt-16 text-center  flex flex-col justify-center items-center sm:pl-4"
      >
        <h1 className="tracking-tight uppercase text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-helvetica font-extrabold text-white pb-2 sm:pb-4">
          Política de Privacidade
        </h1>
        <hr className="w-80 sm:w-184 h-0.5 sm:h-1 border-0 bg-gray-300 mx-auto sm:mx-0" />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="flex flex-col gap-6 w-full max-w-3xl mx-auto py-8 px-4 sm:px-0 text-center"
      >
        <p className="font-helvetica uppercase font-[150] text-base sm:text-lg leading-relaxed text-white">
          Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais ao interagir com nosso site e serviços.
        </p>

        <p className="font-helvetica uppercase font-[150] text-base sm:text-lg leading-relaxed text-white">
          Podemos coletar dados como seu nome, endereço de e-mail e outras informações ao se inscrever em newsletters, baixar materiais ou entrar em contato conosco. Esses dados são utilizados exclusivamente para melhorar sua experiência e atender aos serviços solicitados.
        </p>

        <p className="font-helvetica uppercase font-[150] text-base sm:text-lg leading-relaxed text-white">
          Suas informações nunca são vendidas ou compartilhadas com terceiros, exceto quando exigido por lei.
        </p>

        <p className="font-helvetica uppercase font-[150] text-base sm:text-lg leading-relaxed text-white">
          Caso tenha dúvidas ou deseje mais informações sobre esta política, entre em contato com nossa equipe através do e-mail{" "}
          <a
            href="mailto:contato@malcolmvl.com.br"
            className="underline hover:text-gray-300"
          >
            contato@malcolmvl.com.br
          </a>.
        </p>
      </motion.div>
    </div>
  );
};

export default PrivacidadeContainer;
