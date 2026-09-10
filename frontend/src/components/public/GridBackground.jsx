const GridBackground = () => {
  return (
    <div className="relative h-[200px]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,22,41,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(15,22,41,0.4)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-[#0a3d2e]/20 to-transparent" />
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#0a1535]/30 to-transparent" />
    </div>
  );
};

export default GridBackground;
