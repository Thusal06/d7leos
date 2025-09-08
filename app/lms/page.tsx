"use client";
import { useEffect, useMemo, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { trackEvent } from '@/lib/analytics';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

interface ModuleItem {
  id: string;
  type: 'video' | 'pdf' | 'quiz';
  title: string;
  url: string;
}

export default function LMSPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false); });
  }, []);

  if (loading) return <div className="glass rounded-2xl p-6">Loading...</div>;
  if (!user) return <AuthCard isLogin={isLogin} setIsLogin={setIsLogin} />;

  return <Dashboard />;
}

function AuthCard({ isLogin, setIsLogin }: { isLogin: boolean; setIsLogin: (v: boolean) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [myLCI, setMyLCI] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        trackEvent('login', { method: 'password' });
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        trackEvent('signup', { method: 'password' });
        await setDoc(doc(db, 'users', cred.user.uid), {
          firstName,
          surname,
          email,
          myLCI,
          role: 'member',
          createdAt: serverTimestamp(),
          progress: {}
        });
      }
    } catch (e: any) {
      setError(e.message || 'Error');
    }
  };

  return (
    <div className="max-w-md mx-auto glass rounded-2xl p-6">
      <h1 className="heading-serif text-2xl font-semibold">{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submit} className="mt-4 space-y-3">
        {!isLogin && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} required placeholder="First Name" className="px-4 py-2 rounded-lg bg-white/70 dark:bg-white/10 border" />
              <input value={surname} onChange={(e)=>setSurname(e.target.value)} required placeholder="Surname" className="px-4 py-2 rounded-lg bg-white/70 dark:bg-white/10 border" />
            </div>
            <input value={myLCI} onChange={(e)=>setMyLCI(e.target.value)} required placeholder="MyLCI Number" className="w-full px-4 py-2 rounded-lg bg-white/70 dark:bg-white/10 border" />
          </>
        )}
        <input value={email} onChange={(e)=>setEmail(e.target.value)} required type="email" placeholder="Email" className="w-full px-4 py-2 rounded-lg bg-white/70 dark:bg-white/10 border" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} required type="password" placeholder="Password" className="w-full px-4 py-2 rounded-lg bg-white/70 dark:bg-white/10 border" />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button className="w-full px-4 py-2 rounded-lg bg-maroon text-white hover:bg-maroon-700">{isLogin ? 'Login' : 'Create Account'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} className="mt-3 text-sm opacity-80 underline">
        {isLogin ? 'Need an account? Sign up' : 'Have an account? Login'}
      </button>
    </div>
  );
}

function Dashboard() {
  const [modules, setModules] = useState<ModuleItem[]>([
    { id: 'm1', type: 'video', title: 'District Orientation', url: 'https://example.com/video.mp4' },
    { id: 'm2', type: 'pdf', title: 'Club Officer Handbook', url: 'https://example.com/handbook.pdf' },
    { id: 'm3', type: 'quiz', title: 'Orientation Quiz', url: '#' }
  ]);

  const [badges] = useState([
    { id: 'b1', title: 'Completed Orientation' },
    { id: 'b2', title: 'Club Officer Certified' }
  ]);

  const progress = useMemo(() => 65, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="heading-serif text-3xl font-bold">LMS Dashboard</h1>
        <button onClick={() => signOut(auth)} className="px-3 py-1 rounded-md border border-white/20 hover:bg-white/10">Sign out</button>
      </div>

      <div className="glass p-5 rounded-2xl">
        <div className="text-sm opacity-80">Progress</div>
        <div className="mt-2 h-3 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gold" style={{ width: progress + '%' }} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          {modules.map((m) => (
            <div key={m.id} className="glass rounded-xl p-4">
              <div className="font-semibold">{m.title}</div>
              <div className="text-sm opacity-70">Type: {m.type.toUpperCase()}</div>
              <a href={m.url} target="_blank" className="mt-2 inline-block px-3 py-1 rounded-md bg-maroon text-white">Open</a>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="glass rounded-xl p-4">
            <div className="font-semibold mb-2">Badges</div>
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span key={b.id} className="px-3 py-1 rounded-full bg-gold text-black text-xs">{b.title}</span>
              ))}
            </div>
          </div>

          <AdminPanel />
        </div>
      </div>
    </div>
  );
}

function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Placeholder: Implement admin check from Firestore user doc (role === 'admin')
    // setIsAdmin(true);
  }, []);

  if (!isAdmin) return null;
  return (
    <div className="glass rounded-xl p-4">
      <div className="font-semibold mb-2">Admin Panel</div>
      <p className="text-sm opacity-80">Upload modules, manage users, and track completions (to be implemented).</p>
    </div>
  );
}