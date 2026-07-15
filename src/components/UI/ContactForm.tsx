import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import clsx from 'clsx';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    marketingConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | 'consent_error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const { name, email, phone, marketingConsent } = formData;

    if (!name || !email) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    if (!marketingConsent) {
      setSubmitStatus("consent_error");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", marketingConsent: false });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-sm flex flex-col gap-4 text-white font-helvetica font-[150] py-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={fadeInUp}
    >
      <label className="flex flex-col gap-1 text-xs tracking-wide font-helvetica font-[350]">
        Nome
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Digite seu nome"
          className="bg-transparent border-b border-white/40 text-white px-4 py-2 focus:outline-none focus:border-white transition-all"
        />
      </label>

      <label className="flex flex-col gap-1 text-xs tracking-wide font-helvetica font-[350]">
        E-mail
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Digite seu e-mail"
          className="bg-transparent border-b border-white/40 text-white px-4 py-2 focus:outline-none focus:border-white transition-all"
        />
      </label>

      <label className="flex flex-col gap-1 text-xs tracking-wide font-helvetica font-[350]">
        Telefone
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Digite seu telefone"
          className="bg-transparent border-b border-white/40 text-white px-4 py-2 focus:outline-none focus:border-white transition-all"
        />
      </label>

      <label className="flex items-start gap-2 text-xs tracking-wide font-helvetica font-[350] mt-1 cursor-pointer select-none">
        <input
          type="checkbox"
          name="marketingConsent"
          checked={formData.marketingConsent}
          onChange={handleChange}
          className="w-5 h-5 mt-0.5 appearance-none border-2 border-white bg-transparent px-2 checked:bg-white checked:border-white transition"
        />
        <span>
          Eu concordo que Malcolm VL use meus dados pessoais para me contatar. Entendo que posso cancelar a inscrição a qualquer momento. Por favor, leia nossa{" "}
          <a
            href="/privacidade"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-300"
          >
            Política de Privacidade
          </a>{" "}
          para detalhes sobre o uso de dados.
        </span>
      </label>

      <div className="w-full flex justify-center items-center">
        <div className="max-w-sm flex flex-col items-center w-full">
          <motion.button
            type="submit"
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            className={clsx(
              "bg-white text-black px-4 py-2 rounded-sm font-medium hover:bg-gray-200 transition text-xs  mt-4",
              isSubmitting && "opacity-60 cursor-not-allowed"
            )}
            disabled={isSubmitting}
          >
            <p className="font-helvetica font-[350] ">
              {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
            </p>
          </motion.button>

          <AnimatePresence>
            {submitStatus && (
              <motion.div
                key="status"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className={clsx(
                  "text-xs text-center font-helvetica font-[350] px-3 py-1 rounded mt-3",
                  submitStatus === 'success'
                    ? "bg-green-600/20 text-green-400 border border-green-500"
                    : "bg-red-600/20 text-red-400 border border-red-500"
                )}
              >
                {submitStatus === 'success'
                  ? "Mensagem enviada com sucesso!"
                  : submitStatus === 'consent_error'
                    ? "Você precisa aceitar os termos para enviar a mensagem."
                    : "Falha ao enviar mensagem. Por favor, verifique sua entrada."}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.form>

    <div className="w-full  bg-black/50 border border-white  p-4  justify-center items-center max-w-max">
     
      <div className="flex flex-col gap-1.5 justify-center items-center font-[800] uppercase max-w-max">
        <a href="mailto:malcolmvlrio@gmail.com" className="text-white text-sm font-helvetica  hover:text-gray-300 transition">
          malcolmvlrio@gmail.com
        </a>
        <a 
        target="_blank"
        href='http://wa.me/5511970908992'
        className="text-white text-sm font-helvetica ">
          +55 11 97090-8992
        </a>
      </div>
    </div>
    </div>
  );
};

export default ContactForm;
