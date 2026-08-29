import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiOutlineShoppingBag, HiBars3BottomRight } from 'react-icons/hi2';
import { FaUser } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { Search } from 'lucide-react';
import CartDrawer from '../Layout/CartDrawer';
import { cn } from '../../utils/cn';
import Button from '../ui/Button';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/pods', label: 'Pods' },
  { to: '/profile', label: 'Profile' },
];

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [navDrawer, setNavDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = navDrawer ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [navDrawer]);

  const toggleNavDrawer = () => setNavDrawer((v) => !v);
  const toggleCartDrawer = () => setOpenDrawer((v) => !v);

  const navLinkClass = ({ isActive }) =>
    cn(
      'relative text-sm font-medium transition-colors duration-200',
      isActive ? 'text-brand-400' : 'text-slate-300 hover:text-white'
    );

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Left: menu + logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleNavDrawer}
              className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-label="Open menu"
              aria-expanded={navDrawer}
            >
              <HiBars3BottomRight className="h-6 w-6" />
            </button>
            <Link
              to="/"
              className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              <span className="text-brand-400">R</span>estify
            </Link>
          </div>

          {/* Center: desktop nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right: search + actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative hidden md:block">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search pods..."
                aria-label="Search pods"
                className="h-10 w-36 rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 transition-all focus:w-44 focus:border-brand-400/40 focus:outline-none focus:ring-2 focus:ring-brand-400/20 lg:w-44 lg:focus:w-52"
              />
            </div>
            <Link
              to="/login"
              className="hidden rounded-xl p-2.5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white sm:block"
              aria-label="Login"
            >
              <FaUser className="h-4 w-4" />
            </Link>
            <Link
              to="/profileUser"
              className="rounded-xl p-2.5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Profile and bookings"
            >
              <HiOutlineShoppingBag className="h-5 w-5" />
            </Link>
            <Link to="/searchpods" className="hidden sm:block">
              <Button size="sm" variant="primary">
                Book Now
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <CartDrawer openDrawer={openDrawer} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile drawer overlay */}
      {navDrawer && (
        <button
          type="button"
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={toggleNavDrawer}
          aria-label="Close menu overlay"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-[70] flex h-full w-[min(85vw,320px)] flex-col glass shadow-2xl transition-transform duration-300 ease-out lg:hidden',
          navDrawer ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-hidden={!navDrawer}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <span className="font-display text-xl text-white">
            <span className="text-brand-400">R</span>estify
          </span>
          <button
            type="button"
            onClick={toggleNavDrawer}
            className="rounded-lg p-2 text-white hover:bg-white/10"
            aria-label="Close menu"
          >
            <IoMdClose className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-4" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={toggleNavDrawer}
              className={({ isActive }) =>
                cn(
                  'rounded-xl px-4 py-3 text-base font-medium transition-colors',
                  isActive
                    ? 'bg-brand-500/15 text-brand-400'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/login"
            onClick={toggleNavDrawer}
            className="mt-4 rounded-xl px-4 py-3 text-base font-medium text-slate-300 hover:bg-white/5"
          >
            Login / Register
          </Link>
          <Link to="/searchpods" onClick={toggleNavDrawer} className="mt-2">
            <Button variant="primary" size="md" className="w-full">
              Book a Pod
            </Button>
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
