import { cn } from '../../utils/cn';

const variants = {
  default: 'bg-white/10 text-slate-200 border-white/10',
  brand: 'bg-brand-500/15 text-brand-400 border-brand-400/25',
  success: 'bg-emerald-500/15 text-emerald-400 border-emerald-400/25',
  warning: 'bg-amber-500/15 text-amber-400 border-amber-400/25',
  rating: 'bg-emerald-600 text-white border-transparent',
};

export default function Badge({ children, variant = 'default', className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
