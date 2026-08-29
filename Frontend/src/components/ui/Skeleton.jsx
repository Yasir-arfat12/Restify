import { cn } from '../../utils/cn';

export default function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('skeleton rounded-xl', className)}
      aria-hidden="true"
      {...props}
    />
  );
}

export function PodCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 lg:flex-row">
      <Skeleton className="h-64 w-full lg:h-auto lg:w-[40%] rounded-none" />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="mt-4 h-10 w-32" />
      </div>
    </div>
  );
}
