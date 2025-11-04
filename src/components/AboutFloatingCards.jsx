import { useState } from 'react';
import { motion } from 'framer-motion';

const Card = ({ title, desc, accent }) => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const ry = (px - 0.5) * 16; // left/right
    const rx = -(py - 0.5) * 16; // up/down
    setTilt({ rx, ry });
  };

  const onLeave = () => setTilt({ rx: 0, ry: 0 });

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className="relative rounded-2xl p-[1px]"
      style={{
        background:
          'linear-gradient(135deg, rgba(20,243,208,0.5), rgba(255,215,0,0.25))',
      }}
    >
      <div
        className="relative rounded-2xl bg-zinc-900/80 backdrop-blur-sm p-6 h-full"
        style={{
          transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent" />
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-full"
            style={{ background: accent }}
          />
          <h3 className="text-lg font-extrabold text-white tracking-wide">{title}</h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300">{desc}</p>
      </div>
    </motion.div>
  );
};

export default function AboutFloatingCards() {
  return (
    <section id="about" className="relative w-full bg-black py-24 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
            Tecnica + Arte. Caos calcolato.
          </h2>
          <p className="mt-3 text-zinc-300 max-w-2xl">
            Ingegno, estetica e sperimentazione. Progetto esperienze digitali
            tridimensionali che si sentono vive, fluide e memorabili.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="Design Spaziale"
            desc="Interfacce immersive con profondità, luci e materiali che reagiscono al tuo movimento."
            accent="linear-gradient(135deg,#14f3d0,#00d4ff)"
          />
          <Card
            title="Interazione Sensibile"
            desc="Parallax, micro-animazioni e feedback sottili: l’utente guida la scena."
            accent="linear-gradient(135deg,#b08968,#ffd700)"
          />
          <Card
            title="Performance & Codice"
            desc="Architetture snelle e ottimizzate. La potenza sotto il cofano, l’eleganza sul palco."
            accent="linear-gradient(135deg,#ffb86c,#ff9f43)"
          />
        </div>
      </div>
    </section>
  );
}
