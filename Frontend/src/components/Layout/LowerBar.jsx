import React from 'react';
import { Sparkles } from 'lucide-react';

const LowerBar = () => {
  return (
    <div
      className="relative overflow-hidden border-y border-white/5 bg-gradient-to-r from-surface-900 via-surface-800 to-surface-700"
      role="region"
      aria-label="Promotional offer"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2.5">
        <Sparkles className="h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
        <p className="text-center text-xs font-medium text-slate-300 sm:text-sm">
          Diwali Offers — up to{' '}
          <span className="font-semibold text-amber-400">25% off</span> on every pod
        </p>
      </div>
    </div>
  );
};

export default LowerBar;
