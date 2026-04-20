const LeftFooter = () => {
  return (
    <div className="absolute bottom-0 left-0 z-10 flex flex-col rounded-tr-xl bg-[#fafddb] px-2 py-0.5 text-xs text-[#d87278] italic">
      <span>
        Código hecho por{' '}
        <a
          href="https://github.com/Tryncha"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all hover:font-semibold hover:text-[#be363f]"
        >
          Tryncha
        </a>
      </span>
      <span>
        Diseño y modelados hechos por{' '}
        <a
          href="https://www.instagram.com/stephaniaayalag"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all hover:font-semibold hover:text-[#be363f]"
        >
          stephaniaayalag
        </a>
      </span>
    </div>
  );
};

export default LeftFooter;
