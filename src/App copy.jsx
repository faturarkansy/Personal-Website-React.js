import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Aurora from './Aurora';

const App = () => {
  // Mengambil progres scroll dari halaman
  const { scrollYProgress } = useScroll();

  // Konfigurasi Animasi Parallax & Opacity
  // Teks Besar: Bergerak ke atas dan mengecil
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -200]);
  const textScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Foto: Bergerak ke atas lebih lambat (Parallax)
  const imageY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  // Teks Kecil di Sudut: Menghilang ke samping
  const leftItemsX = useTransform(scrollYProgress, [0, 0.1], [0, -100]);
  const rightItemsX = useTransform(scrollYProgress, [0, 0.1], [0, 100]);
  const cornerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden m-0 p-0">
      {/* Navbar Minimalis */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-10 py-8 z-50 bg-white/80 backdrop-blur-md">
        <h1 className="text-2xl font-black tracking-tighter uppercase">Milar.</h1>
        <button className="border border-slate-300 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-600 rounded-full"></span> Change the mode
        </button>
        <div className="space-y-1.5 cursor-pointer group">
          <div className="w-8 h-0.5 bg-black transition-all group-hover:w-6"></div>
          <div className="w-8 h-0.5 bg-black"></div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-screen h-screen flex items-center justify-center overflow-hidden bg-white">

        {/* Layer 1: Tulisan Latar Belakang */}
        <motion.div
          style={{ y: textY, scale: textScale, opacity: textOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none z-0"
        >
          <div className="relative">
            <h2 className="text-[100px] md:text-[180px] font-serif italic leading-none text-black absolute -top-20 md:-top-32 -left-20 md:-left-40">
              I'm
            </h2>
            <div className="flex flex-col items-center">
              <h3 className="text-[120px] md:text-[240px] font-black text-blue-600 leading-[0.75] tracking-tighter uppercase">
                Software
              </h3>
              <h3 className="text-[120px] md:text-[240px] font-black text-blue-600 leading-[0.75] tracking-tighter uppercase">
                Engineer
              </h3>
            </div>
          </div>
        </motion.div>

        {/* Layer 2: Foto Anda */}
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="absolute bottom-0 w-full max-w-5xl z-10 flex justify-center items-end h-[90vh]"
        >
          <img
            src="/images/foto.png"
            alt="Profile"
            className="h-full w-auto object-contain grayscale contrast-125 brightness-110 drop-shadow-2xl"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="absolute bottom-16 bg-blue-600 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest shadow-[0_10px_30px_rgba(37,99,235,0.5)] z-20"
          >
            Let's Chat
          </motion.button>
        </motion.div>

        {/* Layer 3: Teks Kecil Dekoratif */}
        <div className="absolute inset-0 p-10 md:p-20 flex flex-col justify-between pointer-events-none z-20">
          <div className="flex justify-between items-start pt-20">
            <motion.div style={{ x: leftItemsX, opacity: cornerOpacity }} className="max-w-[200px]">
              <div className="w-10 h-[2px] bg-black mb-4"></div>
              <p className="text-[10px] font-bold uppercase leading-tight tracking-wider">
                Specialized in react, <br /> typescript, and modern <br /> web architecture.
              </p>
            </motion.div>
            <motion.div style={{ x: rightItemsX, opacity: cornerOpacity }} className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest">
                Available for <br /> new opportunities 2026
              </p>
            </motion.div>
          </div>

          <div className="flex justify-between items-end">
            <motion.div style={{ x: leftItemsX, opacity: cornerOpacity }}>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                Based in Lampung, ID
              </p>
            </motion.div>
            <motion.div style={{ x: rightItemsX, opacity: cornerOpacity }} className="max-w-[220px] text-right">
              <p className="text-[10px] font-medium leading-relaxed text-slate-400">
                Building robust and scalable <br /> digital solutions for <br /> global clients.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Hitam Berikutnya */}
      <section className="relative w-screen min-h-screen bg-black overflow-hidden flex items-center justify-center">
        {/* BACKGROUND AURORA */}
        <Aurora
          colorStops={['#3A1078', '#4E31AA', '#3795BD']} // Sesuaikan warna aurora Anda
          amplitude={1.2}
          speed={0.5}
        />

        {/* Konten di atas Aurora */}
        <div className="relative z-10 text-center px-10">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-white text-6xl md:text-8xl font-black italic tracking-tighter uppercase"
          >
            Digital Experience
          </motion.h2>
          <p className="text-blue-300 mt-6 text-lg tracking-widest uppercase font-light">
            Bringing code to life with fluid motion
          </p>
        </div>
      </section>
    </div>
  );
};

export default App;