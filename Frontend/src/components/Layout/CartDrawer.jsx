import React from 'react';

const CartDrawer = ({ openDrawer, toggleCartDrawer }) => {
  if (!openDrawer) return null;

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Cart">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={toggleCartDrawer}
        aria-label="Close cart"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col glass shadow-2xl animate-fade-in">
        <div className="border-b border-white/10 px-5 py-4">
          <h2 className="text-lg font-semibold text-white">Your Bookings</h2>
          <p className="text-sm text-slate-400">Cart drawer — coming soon</p>
        </div>
        <div className="flex flex-1 items-center justify-center p-6 text-sm text-slate-500">
          No items yet
        </div>
      </aside>
    </div>
  );
};

export default CartDrawer;
