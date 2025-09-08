"use client";
import React, { useEffect, useState } from 'react';
import { RoleGuard } from '../../../components/role-guard';
import { db, storage } from '../../../lib/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AdminLmsPage() {
  return (
    <RoleGuard role={['admin','trainer']}>
      <LmsManager />
    </RoleGuard>
  );
}

function LmsManager() {
  const [modules, setModules] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const load = async () => {
    const snap = await getDocs(collection(db, 'modules'));
    setModules(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!title.trim()) return;
    let url: string | null = null;
    if (file) {
      const r = ref(storage, `modules/${Date.now()}-${file.name}`);
      await uploadBytes(r, file);
      url = await getDownloadURL(r);
    }
    await addDoc(collection(db, 'modules'), { title, assetUrl: url, createdAt: serverTimestamp() });
    setTitle('');
    setFile(null);
    await load();
  };

  const del = async (id: string) => {
    await deleteDoc(doc(db, 'modules', id));
    await load();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Training Modules</h1>
      <div className="flex flex-col sm:flex-row gap-2">
        <input className="border rounded px-2 py-1 flex-1 bg-transparent" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Module title" />
        <input className="border rounded px-2 py-1 bg-transparent" type="file" onChange={(e)=>setFile(e.target.files?.[0] || null)} />
        <button onClick={add} className="px-3 py-1 rounded bg-blue-600 text-white w-full sm:w-auto">Add Module</button>
      </div>
      <ul className="space-y-2">
        {modules.map(m => (
          <li key={m.id} className="flex items-center justify-between border rounded px-3 py-2">
            <span>{m.title}</span>
            <button onClick={()=>del(m.id)} className="text-sm text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}