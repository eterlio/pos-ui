import { motion } from 'framer-motion';
const Preloader = ({ text }: { text?: string }) => {
  return (
    <div
      id="preloader"
      className="fixed left-0 right-0 top-0 bottom-0 h-screen w-screen overflow-hidden z-[2000] bg-white"
    >
      <div
        id="ctn-preloader"
        className="ctn-preloader w-full h-full flex place-items-center flex-col items-center justify-center gap-10"
      >
        <h1 className="text-4xl">{text ? text : 'LOADING...'}</h1>
        <div className="w-[400px] h-[10px] flex items-center overflow-hidden">
          <motion.span
            className="block w-[50%] h-[6px] bg-gray-900"
            initial={{
              x: -200,
              opacity: 0
            }}
            animate={{
              opacity: 1,
              x: 500,
              speed: 3,
              transition: {
                duration: 0.7,
                repeat: Infinity,
                repeatType: 'loop'
              }
            }}
          ></motion.span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
