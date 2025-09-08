'use client';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <section className="glass rounded-2xl p-6">
        <h1 className="heading-serif text-3xl font-bold">About Leo District 306 D7</h1>
        <p className="mt-3 opacity-90">Our district fosters leadership through impactful service. Founded to empower youth, we champion community development, environmental sustainability, and personal growth.</p>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h2 className="heading-serif text-2xl font-semibold">Mission</h2>
          <p className="mt-2 opacity-90">To develop leadership in youth through service, fellowship, and community engagement.</p>
        </div>
        <div className="glass rounded-2xl p-6">
          <h2 className="heading-serif text-2xl font-semibold">Vision</h2>
          <p className="mt-2 opacity-90">A generation of responsible leaders creating positive change across Sri Lanka and beyond.</p>
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="heading-serif text-2xl font-semibold">Leadership</h2>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[{name:'District President', role:'DG', img:'/images/leader1.jpg'}, {name:'Vice District President', role:'VDG', img:'/images/leader2.jpg'}].map((p) => (
            <motion.div whileHover={{ y: -6 }} key={p.name} className="rounded-xl p-4 glass">
              <img src={p.img} alt={p.name} className="w-full h-40 object-cover rounded-lg" />
              <div className="mt-3">
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm opacity-70">{p.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="heading-serif text-2xl font-semibold">Milestones</h2>
        <div className="mt-4 space-y-4">
          {[
            { year: '2015', detail: 'District reorganization and growth.' },
            { year: '2019', detail: '100th environmental project.' },
            { year: '2023', detail: 'Regional youth leadership summit.' }
          ].map((m) => (
            <motion.div key={m.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-4">
              <div className="text-gold font-bold text-xl w-16">{m.year}</div>
              <div className="opacity-90">{m.detail}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}