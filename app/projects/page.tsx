"use client";
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project { id: string; title: string; category: 'service'|'environment'|'youth'|'joint'; description: string; image: string; date: string; venue: string; impact: string; }

const allProjects: Project[] = [
  { id: 'p1', title: 'Tree Planting', category: 'environment', description: 'Community reforestation drive.', image: '/images/p1.jpg', date: '2024-09-10', venue: 'Colombo', impact: '500+ trees planted' },
  { id: 'p2', title: 'Youth Leadership Workshop', category: 'youth', description: 'Skill-building sessions.', image: '/images/p2.jpg', date: '2024-08-20', venue: 'Galle', impact: '120 participants' },
  { id: 'p3', title: 'Health Camp', category: 'service', description: 'Free medical checkups.', image: '/images/p3.jpg', date: '2024-07-15', venue: 'Matara', impact: '300+ beneficiaries' }
];

const categories = [
  { key: 'all', label: 'All' },
  { key: 'service', label: 'Service' },
  { key: 'environment', label: 'Environment' },
  { key: 'youth', label: 'Youth' },
  { key: 'joint', label: 'Joint Initiatives' }
] as const;

type CatKey = typeof categories[number]['key'];

export default function ProjectsPage() {
  const [active, setActive] = useState<CatKey>('all');
  const [open, setOpen] = useState<Project | null>(null);

  const projects = useMemo(() => (
    active === 'all' ? allProjects : allProjects.filter(p => p.category === active)
  ), [active]);

  return (
    <div className="space-y-6">
      <h1 className="heading-serif text-3xl font-bold">Projects</h1>

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button key={c.key} onClick={() => setActive(c.key)} className={`px-4 py-2 rounded-lg border ${active===c.key? 'bg-gold text-black border-gold' : 'border-white/20 hover:bg-white/10'}`}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {projects.map((p) => (
            <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="glass rounded-xl overflow-hidden">
              <img src={p.image} alt={p.title} className="h-44 w-full object-cover" />
              <div className="p-4">
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm opacity-70">{p.description}</div>
                <button onClick={() => setOpen(p)} className="mt-3 px-3 py-1 rounded-md bg-maroon text-white hover:bg-maroon-700">Read More</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 10 }} onClick={(e) => e.stopPropagation()} className="glass rounded-2xl max-w-xl w-full overflow-hidden">
              <img src={open.image} alt={open.title} className="h-48 w-full object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-semibold">{open.title}</h3>
                <div className="mt-2 text-sm opacity-80">{open.description}</div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div><span className="opacity-70">Date: </span>{open.date}</div>
                  <div><span className="opacity-70">Venue: </span>{open.venue}</div>
                  <div className="col-span-2"><span className="opacity-70">Impact: </span>{open.impact}</div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button onClick={() => setOpen(null)} className="px-4 py-2 rounded-lg bg-gold text-black">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}