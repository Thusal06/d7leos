"use client";
import React from 'react';
import { RoleGuard } from '../../components/role-guard';
import Link from 'next/link';

export default function AdminHome() {
  return (
    <RoleGuard role={['admin','trainer']}>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <ul className="list-disc pl-6 space-y-2">
          <li><Link className="underline" href="/admin/projects">Manage Projects</Link></li>
          <li><Link className="underline" href="/admin/council">Manage Council Members</Link></li>
          <li><Link className="underline" href="/admin/lms">Manage Training Modules</Link></li>
          <li><Link className="underline" href="/analytics">User Analytics</Link></li>
        </ul>
      </div>
    </RoleGuard>
  );
}