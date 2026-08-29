import { cn } from '../../utils/cn';

export default function Section({
  children,
  title,
  subtitle,
  badge,
  className,
  centered = false,
  id,
}) {
  return (
    <section id={id} className={cn('py-12 sm:py-16 lg:py-20', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle || badge) && (
          <div
            className={cn(
              'mb-8 sm:mb-12',
              centered && 'text-center mx-auto max-w-3xl'
            )}
          >
            {badge && (
              <span className="mb-3 inline-block rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand-400">
                {badge}
              </span>
            )}
            {title && (
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base lg:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
