import { cn } from '../../utils/cn';

export default function Loader({ size = 'md', className, label = 'Loading...' }) {
  const sizes = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-[3px]',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)} role="status">
      <div
        className={cn(
          'animate-spin rounded-full border-brand-400 border-t-transparent',
          sizes[size]
        )}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Loader size="lg" />
    </div>
  );
}
