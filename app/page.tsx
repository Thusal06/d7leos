"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const partnerLogos = [
  { src: '/logos/dp.png', alt: 'D7 District' },
  { src: '/logos/leo.png', alt: 'LEO' },
  { src: '/logos/lion.png', alt: 'Lions' },
  { src: '/logos/mdp.png', alt: 'Multiple District' },
  { src: '/logos/srilanka.png', alt: 'Sri Lanka and Maldives' },
];

const slides = [
  '/images/dphero.jpeg',
  '/images/mdphero.jpeg'
];

export default function HomePage() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-10">
      {/* Hero with background slideshow */}
      <div className="relative h-[55vh] md:h-[70vh] w-full overflow-hidden rounded-3xl glass">
        {slides.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 1.2 }}
          >
            <Image src={src} alt="District event" fill className="object-cover" />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="heading-serif text-4xl md:text-6xl font-bold text-white">Leo District 306 D7</h1>
          <p className="mt-4 text-white/90 max-w-2xl">Fostering leadership through service — empowering youth, building communities, and creating impact.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="#projects" className="px-5 py-2 rounded-lg bg-gold text-black font-semibold hover:bg-gold-600 transition">Explore Projects</a>
            <a href="/lms" className="px-5 py-2 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 transition">Login to LMS</a>
            <a href="#join" className="px-5 py-2 rounded-lg bg-maroon text-white hover:bg-maroon-700 transition">Join Us</a>
          </div>
        </div>
      </div>

      {/* Seamless looping carousel of partner logos (dual tracks to avoid gap) */}
      <div className="glass rounded-2xl p-4 overflow-hidden">
        <div className="relative w-full" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
          <div className="flex gap-20 whitespace-nowrap">
            <div className="flex gap-20 marquee-track hover:[animation-play-state:paused]">
              {partnerLogos.map((logo) => (
                <img key={`a-${logo.alt}`} src={logo.src} alt={logo.alt} className="h-14 md:h-16 w-auto opacity-95 hover:opacity-100 transition flex-shrink-0" />
              ))}
            </div>
            <div className="flex gap-20 marquee-track2 hover:[animation-play-state:paused]">
              {partnerLogos.map((logo) => (
                <img key={`b-${logo.alt}`} src={logo.src} alt={logo.alt} className="h-14 md:h-16 w-auto opacity-95 hover:opacity-100 transition flex-shrink-0" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key numbers with animated counters */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" id="stats">
        {[
          { label: 'Clubs', value: 45 },
          { label: 'Members', value: 1200 },
          { label: 'Projects', value: 380 },
          { label: 'Districts Served', value: 1 }
        ].map((item) => (
          <CounterCard key={item.label} {...item} />
        ))}
      </section>

      {/* Newsletter signup */}
      <NewsletterCard />
    </div>
  );
}

function CounterCard({ label, value }: { label: string; value: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setCount(Math.floor(value * p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return (
    <div className="glass rounded-2xl p-6 text-center">
      <div className="text-3xl md:text-4xl font-bold text-gold">{count.toLocaleString()}</div>
      <div className="mt-1 text-sm opacity-80">{label}</div>
    </div>
  );
}

function NewsletterCard() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) });
      setStatus('done');
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="heading-serif text-2xl font-semibold">Stay Updated</h3>
      <p className="opacity-80 text-sm mt-1">Subscribe to our newsletter for district updates and opportunities.</p>
      <form onSubmit={submit} className="mt-4 flex flex-col sm:flex-row gap-2">
        <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="you@example.com" className="w-full sm:flex-1 px-4 py-2 rounded-lg bg-white/70 dark:bg-white/10 border border-white/30 outline-none focus:ring-2 focus:ring-gold" />
        <button disabled={status==='loading'} className="w-full sm:w-auto px-4 py-2 rounded-lg bg-maroon text-white hover:bg-maroon-700 disabled:opacity-60">Subscribe</button>
      </form>
      {status === 'done' && <p className="text-green-500 mt-2">Subscribed!</p>}
      {status === 'error' && <p className="text-red-500 mt-2">Error. Try again.</p>}
    </div>
  );
}