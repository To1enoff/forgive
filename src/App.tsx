/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface ButtonPosition {
  x: number;
  y: number;
}

export default function App() {
  const [isForgiven, setIsForgiven] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState<ButtonPosition>({ x: 70, y: 50 });

  const moveButton = useCallback(() => {
    setNoButtonPos({
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    });
  }, []);

  if (isForgiven) {
    return (
      <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4 text-center overflow-hidden">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12, stiffness: 100 }}
          className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full border-4 border-pink-300"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex justify-center mb-6"
          >
            <Heart className="w-24 h-24 text-red-500 fill-red-500" />
          </motion.div>
          <h2 className="text-4xl font-bold text-pink-600 mb-4 leading-tight">
            Ура! ❤️ Я знал(а), что ты меня простишь!
          </h2>
          <p className="text-6xl">🥰🌹✨</p>
        </motion.div>
        
        {/* Decorative hearts floating in background */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '100vh', x: Math.random() * 100 + 'vw', opacity: 0 }}
            animate={{ y: '-10vh', opacity: [0, 1, 0] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute pointer-events-none text-red-400"
          >
            <Heart size={Math.random() * 20 + 10} fill="currentColor" />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-rose-50 flex flex-col items-center justify-center overflow-hidden p-4">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-6xl md:text-8xl font-black text-rose-500 mb-12 text-center drop-shadow-sm select-none z-10"
      >
        прости меня
      </motion.h1>

      <div className="relative w-full max-w-4xl h-[60vh] flex items-center justify-center">
        {/* The Big YES Button */}
        <motion.button
          id="btnYes"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsForgiven(true)}
          className="px-12 py-6 bg-emerald-500 hover:bg-emerald-600 text-white text-4xl font-bold rounded-full shadow-xl transition-colors z-50 cursor-pointer border-b-8 border-emerald-700 active:border-b-0 active:translate-y-2"
        >
          ДА
        </motion.button>

        {/* The Elusive NO Button */}
        <AnimatePresence>
          <motion.button
            layout
            initial={false}
            animate={{
              left: `${noButtonPos.x}%`,
              top: `${noButtonPos.y}%`,
            }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 300,
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              moveButton();
            }}
            onClick={(e) => {
              e.preventDefault();
              moveButton();
            }}
            className="absolute px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white text-xl font-bold rounded-full shadow-lg z-20 cursor-pointer whitespace-nowrap select-none border-b-4 border-rose-700 active:border-b-0 active:translate-y-1 transition-colors"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            НЕТ
          </motion.button>
        </AnimatePresence>
      </div>

      <p className="mt-8 text-rose-400 font-medium animate-pulse select-none z-10">
        Пожалуйста... 🥺
      </p>
    </div>
  );
}
