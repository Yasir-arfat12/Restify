import { cn } from '../../utils/cn';
import Button from './Button';
import { AlertCircle } from 'lucide-react';

export default function ErrorState({
  title = 'Something went wrong',
  description,
  onRetry,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-12 text-center',
        className
      )}
      role="alert"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15 text-red-400">
        <AlertCircle className="h-7 w-7" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-slate-400">{description}</p>
      )}
      {onRetry && (
        <Button variant="outline" size="md" className="mt-6" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
