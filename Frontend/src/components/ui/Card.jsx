import { cn } from '../../utils/cn';

export default function Card({
  children,
  className,
  variant = 'default',
  hover = false,
  padding = true,
  ...props
}) {
  const variants = {
    default: 'glass-card rounded-2xl',
    solid: 'bg-surface-800/80 border border-white/8 rounded-2xl',
    light: 'bg-white rounded-2xl shadow-card border border-gray-100',
    feature: 'glass-light rounded-2xl hover:border-brand-400/30 transition-all duration-300',
  };

  return (
    <div
      className={cn(
        variants[variant],
        padding && 'p-5 sm:p-6',
        hover && 'hover:-translate-y-0.5 hover:shadow-glow transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
