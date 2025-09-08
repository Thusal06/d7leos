"use client";
import Link from 'next/link';
import { IOSToggle } from './ios-toggle';
import { useState } from 'react';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const NavLinks = () => (
    <>
      <Link href="/about" onClick={()=>setOpen(false)}>About</Link>
      <Link href="/council" onClick={()=>setOpen(false)}>Council</Link>
      <Link href="/projects" onClick={()=>setOpen(false)}>Projects</Link>
      <Link href="/lms" onClick={()=>setOpen(false)}>LMS</Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:glass/0">
      <div className="container mx-auto px-4 py-3 glass rounded-b-2xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logos/dp.png" alt="D7" className="h-8 w-8 object-contain" />
            <span className="font-semibold tracking-wide hidden sm:block">Leo District 306 D7</span>
          </Link>
          <div className="hidden md:flex items-center gap-5 text-sm">
            <NavLinks />
            <IOSToggle />
          </div>
          <button aria-label="Menu" className="md:hidden p-2 rounded border border-white/20" onClick={()=>setOpen(v=>!v)}>
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
        </div>
        {open && (
          <div className="md:hidden mt-3 flex flex-col gap-3 text-sm">
            <NavLinks />
            <div className="pt-2"><IOSToggle /></div>
          </div>
        )}
      </div>
    </header>
  );
}