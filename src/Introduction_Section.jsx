import React from 'react';
import Lanyard from './Lanyard'; // Pastikan path sesuai
import { motion } from 'framer-motion';

const Introduction_Section = ({ isDarkMode }) => {
    return (
        <section className={`relative w-full min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-16 overflow-hidden ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>

            {/* Sisi Kiri: Teks Perkenalan */}
            <div className="z-10 w-full md:w-1/2 flex flex-col gap-4">
                <motion.h1
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-6xl font-bold font-['Poppins']"
                >
                    Hi, I'm <span className="text-[#4F75B0]">Fatur</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl opacity-70 max-w-lg"
                >
                    A passionate Developer who loves building interactive 3D experiences
                    and clean user interfaces. Drag my ID card to see the physics!
                </motion.p>
            </div>

            {/* Sisi Kanan: Lanyard Area */}
            <div className="relative w-full md:w-1/2 h-[600px] md:h-screen">
                <Lanyard
                    position={[0, 0, 20]}
                    gravity={[0, -40, 0]}
                    transparent={true}
                />
            </div>

            {/* Background Decor (Opsional) */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4F75B0]/10 blur-[120px] rounded-full -mr-48 -mt-48" />
        </section>
    );
};

export default Introduction_Section;