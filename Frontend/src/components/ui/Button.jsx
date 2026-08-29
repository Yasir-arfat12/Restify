import { cn } from '../../utils/cn';

const variants = {
  primary:
    'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-600/25 hover:shadow-brand-500/40 hover:brightness-110',
  secondary:
    'bg-white/10 text-white border border-white/15 hover:bg-white/15 backdrop-blur-sm',
  outline:
    'border-2 border-white/20 text-white hover:border-brand-400/60 hover:bg-white/5',
  ghost: 'text-slate-300 hover:text-white hover:bg-white/10',
  danger: 'bg-red-600 text-white hover:bg-red-500',
  success:
    'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-400',
  light:
    'bg-white text-slate-900 hover:bg-slate-50 shadow-md',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3.5 text-base rounded-xl',
  xl: 'px-8 py-4 text-lg rounded-2xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  loading = false,
  disabled,
  type = 'button',
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        'active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}
