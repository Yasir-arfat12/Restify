import { cn } from '../../utils/cn';

export default function Input({
  label,
  error,
  hint,
  icon: Icon,
  className,
  wrapperClassName,
  id,
  ...props
}) {
  const inputId = id || props.name;

  return (
    <div className={cn('w-full', wrapperClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-slate-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
        )}
        <input
          id={inputId}
          className={cn(
            'block w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white',
            'placeholder:text-slate-500 transition-all duration-200',
            'border-white/10 focus:border-brand-400/60 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-brand-400/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            Icon && 'pl-10',
            error && 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
      </div>
      {hint && !error && (
        <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${inputId}-error`} className="mt-1.5 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
