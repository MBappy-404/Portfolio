const AnimatedIntro = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-white dark:bg-black text-black dark:text-white overflow-hidden space-y-10">
      
      <div className="w-16 text-[#6c2bd9]"><svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21" opacity="1"></path><path d="M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z" opacity="0.3"><animate attributeName="opacity" dur="1.5s" values="0.3;1;0.3" repeatCount="indefinite" begin="0.5s"></animate></path><path d="M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3" opacity="0.2"><animate attributeName="opacity" dur="1.5s" values="0.2;1;0.2" repeatCount="indefinite" begin="1s"></animate></path></svg></div>
    </div>
  );
};

export default AnimatedIntro;
