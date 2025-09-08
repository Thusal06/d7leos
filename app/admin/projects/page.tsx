"use client";
import React, { useEffect, useState } from 'react';
import { RoleGuard } from '../../../components/role-guard';
import { db } from '../../../lib/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';

export default function AdminProjectsPage() {
  return (
    <RoleGuard role={['admin','trainer']}>
      <ProjectsManager />
    </RoleGuard>
  );
}

function ProjectsManager() {
  const [items, setItems] = useState<any[]>([]);
  const [title, setTitle] = useState('');

  const load = async () => {
    const snap = await getDocs(collection(db, 'projects'));
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!title.trim()) return;
    await addDoc(collection(db, 'projects'), { title, createdAt: serverTimestamp() });
    setTitle('');
    await load();
  };

  const del = async (id: string) => {
    await deleteDoc(doc(db, 'projects', id));
    await load();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Projects</h1>
      <div className="flex flex-col sm:flex-row gap-2">
        <input className="border rounded px-2 py-1 flex-1 bg-transparent" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="New project title" />
        <button onClick={add} className="px-3 py-1 rounded bg-blue-600 text-white">Add</button>
      </div>
      <ul className="space-y-2">
        {items.map(p => (
          <li key={p.id} className="flex items-center justify-between border rounded px-3 py-2">
            <span>{p.title}</span>
            <button onClick={()=>del(p.id)} className="text-sm text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}