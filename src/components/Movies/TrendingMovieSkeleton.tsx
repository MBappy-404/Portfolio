const AnimatedIntro = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-white dark:bg-black text-black dark:text-white overflow-hidden space-y-10">
      
      {/* Spinner */}
      <div className="relative w-28 h-28">
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-l-purple-600 border-r-transparent border-b-purple-500 animate-spin shadow-[0_0_25px_#a855f7]" />
        
        {/* Blurred pulse */}
        <div className="absolute inset-6 rounded-full bg-purple-500/20 blur-2xl animate-ping" />
        
        {/* Central orb */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 shadow-[0_0_20px_#c084fc]" />
        </div>
      </div>

      {/* Animated Text */}
      <h1 className="like-no-other-text text-4xl md:text-6xl font-extrabold uppercase tracking-widest dark:text-white text-black">
        Like No Other
      </h1>
    </div>
  );
};

export default AnimatedIntro;
