import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function Hero3D() {
  const overlayRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      const el = overlayRef.current;
      if (!el) return;
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5) * 20; // -10..10
      const y = (e.clientY / h - 0.5) * 20;
      el.style.transform = `translate3d(${x * 0.8}px, ${y * 0.8}px, 0)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section className="relative h-screen w-full bg-black text-white overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Glow gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-cyan-500/20 blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-amber-300/10 blur-[120px]" />
      </div>

      {/* Overlay content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center px-6"
        >
          <motion.h1
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
            style={{
              WebkitTextStroke: '1px rgba(255,255,255,0.08)'
            }}
          >
            Entra. Muoviti. Scopri.
          </motion.h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-zinc-200/90">
            Non stai solo visitando un sito — stai vivendo un’idea.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="#portfolio"
              className="group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide text-black"
              style={{
                background:
                  'linear-gradient(135deg, rgba(20,243,208,1) 0%, rgba(0,212,255,1) 100%)'
              }}
            >
              <span className="relative z-10">Esplora</span>
              <span className="relative z-10 inline-block transform transition-transform group-hover:translate-x-1">→</span>
              <span className="pointer-events-none absolute inset-0 rounded-full bg-white/30 blur-md opacity-0 group-hover:opacity-100 transition" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Chi sono
            </a>
          </div>
          <div className="mt-10 text-xs uppercase tracking-[0.3em] text-zinc-400">
            Tecnico • Creativo • Forward-thinking
          </div>
        </motion.div>
      </div>
    </section>
  );
}
