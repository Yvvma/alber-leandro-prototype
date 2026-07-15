const HeroSlideshow = () => {
  return (
    <div className="w-full  flex flex-col md:flex-row items-center justify-center md:justify-between 
    bg-gradient-to-br from-black via-[#131313] to-[#141414]">
      <div className="flex-1 flex justify-center items-center ">
        <div className=" aspect-[1/1] p-8">
          <img
            src="/photos/alber-leandro-frame.png"
            alt="Alber Leandro"
            className="w-full h-full object-cover object-[55%_center]  shadow-2xl shadow-white/10"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSlideshow;