const ProContainer = () => {
  return (
    <div className="w-full bg-black">
      {/* Bio text */}
      <div className="max-w-4xl mx-auto flex flex-col items-center text-white text-center gap-4 p-8 md:py-16">
        <p className="font-helvetica font-[400] text-xs max-w-2xl text-base leading-relaxed">
          Alber Leandro é skatista profissional e empresário brasileiro, com carreira construída entre o Brasil e os Estados Unidos. Natural de Brasília, consolidou sua trajetória no skate por meio de competições, projetos internacionais e iniciativas voltadas ao desenvolvimento da cultura urbana, unindo esporte, empreendedorismo e lifestyle.
        </p>
      </div>

      {/* ─── Mobile layout (unchanged) ─── */}
      <div className="md:hidden">
        <div className="bg-white">
          
          <div className="p-8 relative">
            <h2 className="text-xl z-40 rotate-0 text-black absolute right-6 
            top-20 font-[800] rotate-90 font-helvetica tracking-tight uppercase max-w-max">
              Pro Skater
            </h2>

            <div id="skater" className="flex flex-col">
              <img src="/photos/alber-qix-03.webp" alt="alber-qix" className="max-w-max" />
              <img src="/photos/alber-11.webp" alt="alber-stevie-williams" className="max-w-max" />
            </div>
            
          </div>

          <div className="relative">
            <div className="flex flex-col z-[50] justify-center items-center">
              <div className="absolute bg-black w-full right-8 top-0 h-40 -z-0" />
              <div className="w-[240px] z-20 pt-16">
                <img
                  src="/photos/alber-01.jpg"
                  alt="Alber Stevie Williams"
                  className="w-full h-full object-cover object-[20%_40%] z-20"
                />
              </div>
              <div className="flex flex">
                <img
                  src="/photos/skater-alber.jpg"
                  alt="alber-qix"
                  className="max-w-max z-10 object-cover object-center -translate-y-24"
                />
                <div className="absolute bottom-0 left-0 z-20">
                  <div className="flex flex-col">
                    <img
                      src="/photos/alber-usa-04.jpg"
                      alt="alber-qix"
                      className="max-w-[164px] aspect-[1/1] h-full z-10 object-cover object-center"
                    />
                    <div className="flex flex-row">
                      <img
                        src="/photos/alber-usa-02.jpg"
                        alt="alber-qix"
                        className="max-w-[164px] aspect-[1/1] z-10 object-cover object-center"
                      />
                      <img
                        src="/photos/alber-usa-03.jpg"
                        alt="alber-qix"
                        className="max-w-[164px] aspect-[1/1] z-10 object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="entrepeneur" className="relative">
            <div className="flex flex-col z-[50] justify-end items-end bg-gradient-to-br from-black via-[#131313] to-[#141414]">
              <h2 className="text-xl text-white absolute right-4 top-4 font-[800] font-helvetica tracking-tight uppercase z-20">
                Entrepeneur
              </h2>
              <div className="absolute bg-white w-full left-24 top-16 h-40 -z-0" />
              <div className="w-[280px] z-20 pt-16">
                <img
                  src="/photos/alber-03.jpg"
                  alt="Alber Leandro"
                  className="w-full h-full object-cover object-[20%_40%] z-20"
                />
              </div>
              <div className="w-full z-20 pt-16">
                <img
                  src="/photos/alber-02.jpg"
                  alt="Alber Leandro"
                  className="w-full h-full object-cover object-[20%_40%] z-20"
                />
               
              </div>
              <div className="p-4 flex flex-col gap-2 text-sm">
                <p className="font-helvetica font-[500] uppercase text-white tracking-tight">Além do skate, Alber Leandro atua como empresário entre o Brasil e os Estados Unidos.</p>
                <p className="font-helvetica font-[500] uppercase text-white tracking-tight">É fundador da Line Embroidery, marca sediada em Los Angeles voltada à cultura urbana e ao streetwear.</p>
                <p className="font-helvetica font-[500] uppercase text-white tracking-tight">Também desenvolve projetos e negócios que conectam criatividade, empreendedorismo e o mercado internacional.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Desktop layout ─── */}
      <div className="hidden md:block">
        {/* Pro Skater section */}
        <section className="max-w-7xl mx-auto px-8 py-16">
          <h2 className="text-6xl font-[800] font-helvetica tracking-tight uppercase text-white/90 mb-12">
            Pro Skater
          </h2>
          <div className="grid grid-cols-3 gap-4 auto-rows-[180px]">
            <div className="col-span-2 row-span-2">
              <img src="/photos/alber-qix-03.webp" alt="alber-qix" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="row-span-2">
              <img src="/photos/alber-01.jpg" alt="Alber" className="w-full h-full object-cover rounded-lg object-[20%_40%]" />
            </div>
            <div>
              <img src="/photos/alber-11.webp" alt="alber-stevie-williams" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <img src="/photos/skater-alber.jpg" alt="skater" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <img src="/photos/alber-usa-04.jpg" alt="usa" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <img src="/photos/alber-usa-02.jpg" alt="usa" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <img src="/photos/alber-usa-03.jpg" alt="usa" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
        </section>

        {/* Entrepreneur section */}
        <section id="entrepeneur" className="bg-gradient-to-br from-black via-[#131313] to-[#141414]">
          <div className="max-w-7xl mx-auto items-end justify-end py-16">
            <h2 className="text-6xl font-[800] font-helvetica tracking-tight uppercase text-white/90 mb-12 text-right">
              Entrepreneur
            </h2>
            <div className="grid grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <img src="/photos/alber-03.jpg" alt="Alber" className="w-full h-[400px] object-cover rounded-lg object-[20%_40%]" />
                <img src="/photos/alber-02.jpg" alt="Alber" className="w-full h-[300px] object-cover rounded-lg object-[20%_40%]" />
              </div>
              <div className="flex flex-col gap-6 text-white/80">
                <p className="font-helvetica font-[500] uppercase tracking-tight text-lg">Além do skate, Alber Leandro atua como empresário entre o Brasil e os Estados Unidos.</p>
                <p className="font-helvetica font-[500] uppercase tracking-tight text-lg">É fundador da Line Embroidery, marca sediada em Los Angeles voltada à cultura urbana e ao streetwear.</p>
                <p className="font-helvetica font-[500] uppercase tracking-tight text-lg">Também desenvolve projetos e negócios que conectam criatividade, empreendedorismo e o mercado internacional.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProContainer;
