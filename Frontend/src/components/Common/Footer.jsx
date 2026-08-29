import React from 'react';
import { Link } from 'react-router-dom';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import { FiPhoneCall, FiMail } from 'react-icons/fi';
import { BRAND } from '../../constants/theme';
import Button from '../ui/Button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/8 bg-surface-950/90">
      {/* CTA band */}
      <div className="border-b border-white/8 bg-gradient-to-r from-brand-600/10 via-transparent to-brand-600/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
          <div className="text-center sm:text-left">
            <h2 className="font-display text-xl text-white sm:text-2xl">
              Add Your Properties & Grow with Restify
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              List your pods and reach thousands of travelers seeking premium rest.
            </p>
          </div>
          <Button variant="primary" size="lg" className="shrink-0">
            Become a Partner
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="font-display text-2xl font-bold text-white">
              <span className="text-brand-400">R</span>ESTIFY
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              {BRAND.tagline.split('. ').map((part, i) => (
                <span key={i}>
                  {i > 0 && '. '}
                  <span className="text-brand-400">{part.charAt(0)}</span>
                  {part.slice(1)}
                </span>
              ))}
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/pods', label: 'Our Pods' },
                { to: '/searchpods', label: 'Find Pods' },
                { to: '/about', label: 'About Us' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-slate-400 transition-colors hover:text-brand-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#" className="transition-colors hover:text-brand-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-brand-400">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-brand-400">
                  Cancellation Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${BRAND.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-brand-400"
                >
                  <FiPhoneCall className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a
                  href="mailto:arfatandewal5@gmail.com"
                  className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-brand-400"
                >
                  <FiMail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  arfatandewal5@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              {[
                { Icon: IoLogoInstagram, label: 'Instagram' },
                { Icon: RiTwitterXLine, label: 'Twitter' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-brand-400/30 hover:text-brand-400"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {currentYear} Restify. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Premium sleep pods · Hourly stays from ₹{BRAND.startingPrice}/hr
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
