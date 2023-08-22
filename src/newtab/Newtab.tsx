const Newtab = () => {
  return (
    <div className="flex h-screen flex-1 flex-col justify-center bg-[#673ab8] p-8 text-center text-lg">
      <p className="text-white">Hello Vite + React!</p>
      <p data-testid="newtab_text" className="p-6 text-3xl text-purple-400">
        New tab page
      </p>
    </div>
  );
};

export default Newtab;
