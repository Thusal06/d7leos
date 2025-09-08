"use client";
import { motion } from 'framer-motion';

interface Member { id: string; name: string; role: string; email: string; photo: string; }
const members: Member[] = [
  { id: '1', name: 'Jane Doe', role: 'District President', email: 'jane@example.com', photo: '/images/leader1.jpg' },
  { id: '2', name: 'John Smith', role: 'Vice District President', email: 'john@example.com', photo: '/images/leader2.jpg' }
];

export default function CouncilPage() {
  return (
    <div className="space-y-6">
      <h1 className="heading-serif text-3xl font-bold">District Council</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {members.map((m) => (
          <motion.div key={m.id} className="glass rounded-xl overflow-hidden group" whileHover={{ y: -6 }}>
            <img src={m.photo} alt={m.name} className="h-44 w-full object-cover" />
            <div className="p-4">
              <div className="font-semibold">{m.name}</div>
              <div className="text-sm opacity-70">{m.role}</div>
              <div className="mt-3 text-sm opacity-80">{m.email}</div>
              <div className="mt-3 h-0 overflow-hidden group-hover:h-16 transition-[height] duration-300 text-sm opacity-80">
                Passionate about youth development and community service.
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}