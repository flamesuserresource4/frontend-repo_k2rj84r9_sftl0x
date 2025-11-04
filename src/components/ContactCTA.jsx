import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function useParticles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame = 0;
    let raf;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const particles = Array.from({ length: 80 }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0008,
      vy: (Math.random() - 0.5) * 0.0008,
      r: 1 + Math.random() * 2,
    }));

    const resize = () => {
      const { clientWidth, clientHeight } = canvas.parentElement;
      canvas.width = clientWidth * DPR;
      canvas.height = clientHeight * DPR;
      canvas.style.width = clientWidth + 'px';
      canvas.style.height = clientHeight + 'px';
      ctx.scale(DPR, DPR);
    };
    resize();
    window.addEventListener('resize', resize);

    const tick = () => {
      frame++;
      const { clientWidth: w, clientHeight: h } = canvas.parentElement;
      ctx.clearRect(0, 0, w, h);

      // mild flow field
      const t = frame * 0.002;
      particles.forEach(p => {
        const ax = Math.sin((p.y + t) * 6.283) * 0.0006;
        const ay = Math.cos((p.x + t) * 6.283) * 0.0006;
        p.vx += ax;
        p.vy += ay;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;

        // draw
        const px = p.x * w;
        const py = p.y * h;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 40);
        grad.addColorStop(0, 'rgba(20,243,208,0.8)');
        grad.addColorStop(1, 'rgba(20,243,208,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);
  return canvasRef;
}

export default function ContactCTA() {
  const canvasRef = useParticles();

  return (
    <section id="contact" className="relative w-full bg-black py-28 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-70">
        <canvas ref={canvasRef} />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold"
        >
          Ogni clic è un viaggio.
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-amber-200">Pronto ad andare oltre?</span>
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-4 text-zinc-300"
        >
          Raccontami la tua idea: ti aiuto a trasformarla in un’esperienza interattiva che resta impressa.
        </motion.p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="mailto:hello@example.com"
            className="group relative inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-black"
            style={{ background: 'linear-gradient(135deg,#14f3d0,#00d4ff)' }}
          >
            <span className="relative z-10">Contattami</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
            <span className="pointer-events-none absolute inset-0 rounded-full bg-white/30 blur-md opacity-0 group-hover:opacity-100 transition" />
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            Vedi lavori
          </a>
        </div>
        <div className="mt-12 text-xs uppercase tracking-[0.3em] text-zinc-400">
          Grazie per essere arrivato fin qui.
        </div>
      </div>
    </section>
  );
}
