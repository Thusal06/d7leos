"use client";
import React, { useState } from 'react';
import { loginWithEmail, loginWithGoogle, loginWithMicrosoft, registerWithEmail } from '../../../lib/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [mylci, setMylci] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true); setError(null);
    try {
      await loginWithEmail(email, password);
      router.push('/');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async () => {
    setLoading(true); setError(null);
    try {
      await registerWithEmail({ email, password, displayName, mylci });
      router.push('/');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">{tab === 'login' ? 'Sign in' : 'Create account'}</h1>
      <div className="flex gap-3 text-sm">
        <button className={`px-3 py-1 rounded ${tab==='login'?'bg-zinc-200 dark:bg-zinc-800':''}`} onClick={()=>setTab('login')}>Login</button>
        <button className={`px-3 py-1 rounded ${tab==='register'?'bg-zinc-200 dark:bg-zinc-800':''}`} onClick={()=>setTab('register')}>Register</button>
      </div>

      {tab === 'register' && (
        <>
          <label className="block text-sm">Display name</label>
          <input className="w-full p-2 rounded bg-transparent border" value={displayName} onChange={(e)=>setDisplayName(e.target.value)} />
          <label className="block text-sm mt-3">MyLCI number</label>
          <input className="w-full p-2 rounded bg-transparent border" value={mylci} onChange={(e)=>setMylci(e.target.value)} placeholder="Unique membership ID" />
        </>
      )}

      <label className="block text-sm mt-3">Email</label>
      <input className="w-full p-2 rounded bg-transparent border" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <label className="block text-sm mt-3">Password</label>
      <input type="password" className="w-full p-2 rounded bg-transparent border" value={password} onChange={(e)=>setPassword(e.target.value)} />

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        {tab === 'login' ? (
          <button disabled={loading} onClick={onLogin} className="px-4 py-2 rounded bg-blue-600 text-white">Sign in</button>
        ) : (
          <button disabled={loading} onClick={onRegister} className="px-4 py-2 rounded bg-green-600 text-white">Create account</button>
        )}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button disabled={loading} onClick={async()=>{ await loginWithGoogle(); router.push('/'); }} className="px-4 py-2 rounded border">Google</button>
          <button disabled={loading} onClick={async()=>{ await loginWithMicrosoft(); router.push('/'); }} className="px-4 py-2 rounded border">Microsoft</button>
        </div>
      </div>
    </div>
  );
}