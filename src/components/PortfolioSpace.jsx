import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ProjectCard = ({ title, tag, color }) => {
  return (
    <motion.a
      href="#contact"
      className="group relative flex h-64 w-full items-end overflow-hidden rounded-2xl bg-zinc-900/80 p-6 ring-1 ring-white/5"
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{
        backgroundImage: `radial-gradient(1200px 400px at 0% 0%, ${color}1A, transparent), radial-gradient(800px 300px at 100% 100%, rgba(255,215,0,0.08), transparent)`,
      }}
    >
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
      <div className="relative z-10">
        <span className="inline-flex items-center rounded-full border border-white/20 px-2.5 py-1 text-[10px] uppercase tracking-widest text-zinc-200/90">
          {tag}
        </span>
        <h3 className="mt-2 text-xl font-extrabold text-white">{title}</h3>
        <p className="text-xs text-zinc-300/80">Apri la porta — entra nel progetto</p>
      </div>
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full blur-2xl"
           style={{ background: color }} />
    </motion.a>
  );
};

export default function PortfolioSpace() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const zShift = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -8]);

  return (
    <section id="portfolio" ref={ref} className="relative w-full bg-gradient-to-b from-black to-zinc-950 py-28 text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-0 h-96 w-[60rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(20,243,208,0.15),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">Galleria nello spazio</h2>
            <p className="mt-3 max-w-xl text-zinc-300">
              Le carte fluttuano, scorrono in profondità. Clicca e attraversa.
            </p>
          </div>
          <div className="hidden sm:block text-right text-xs text-zinc-400">
            Scroll per cambiare prospettiva
          </div>
        </div>

        <motion.div
          style={{ perspective: 1200, translateZ: zShift, rotateX: rotate }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <ProjectCard title="Nebula UI" tag="Web • 3D" color="#14f3d0" />
          <ProjectCard title="Saturn Lab" tag="Brand • Motion" color="#ffd700" />
          <ProjectCard title="Quantum Room" tag="Installazione" color="#00d4ff" />
          <ProjectCard title="Aurora Engine" tag="Sperimentazione" color="#d4af37" />
          <ProjectCard title="Copper Grid" tag="Dev • R&D" color="#b87333" />
          <ProjectCard title="Iridescent Flow" tag="AR • Visual" color="#7df9ff" />
        </motion.div>
      </div>
    </section>
  );
}
