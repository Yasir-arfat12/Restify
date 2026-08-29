import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import { BRAND } from '../../constants/theme';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1200&auto=format&fit=crop';

const Hero = () => {
  const navigate = useNavigate();
  const { setSearchCriteria } = useSearch();

  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [errors, setErrors] = useState({});

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const nextErrors = {};
    if (!stateName.trim()) nextErrors.state = 'State is required';
    if (!cityName.trim()) nextErrors.city = 'City is required';
    if (!date) nextErrors.date = 'Date is required';
    if (!time) nextErrors.time = 'Time is required';

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSearchCriteria({
      state: stateName.trim().toLowerCase(),
      city: cityName.trim().toLowerCase(),
      date,
      time,
    });

    navigate('/searchpods');
  };

  return (
    <section className="relative min-h-[calc(100vh-8rem)] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-900 via-surface-800 to-surface-700" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59,130,246,0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(16,185,129,0.1) 0%, transparent 40%)`,
        }}
      />
      <div className="absolute -right-20 top-20 hidden h-[500px] w-[500px] rounded-full bg-brand-500/10 blur-3xl xl:block" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div className="animate-fade-in-up space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/25 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-400">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Premium Sleep Pods
            </div>
            <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl xl:text-[3.25rem]">
              Rest in luxury.
              <br />
              <span className="bg-gradient-to-r from-brand-400 to-emerald-400 bg-clip-text text-transparent">
                From ₹{BRAND.startingPrice}/hr
              </span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg">
              Private, climate-controlled sleeping pods designed for travelers,
              professionals, and anyone who needs quality rest — without hotel prices.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              {['Hourly booking', '24/7 access', 'Secure lockers'].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Hero image — desktop */}
          <div className="relative hidden animate-fade-in animate-stagger-2 lg:block">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-brand-500/20 to-emerald-500/10 blur-2xl" />
            <img
              src={HERO_IMAGE}
              alt="Luxury sleep pod interior"
              className="relative aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl ring-1 ring-white/10"
              loading="eager"
            />
          </div>
        </div>

        {/* Search card — Airbnb-style */}
        <form
          onSubmit={handleSearchSubmit}
          className="animate-fade-in-up animate-stagger-3 mt-10 sm:mt-14"
          aria-label="Search for sleep pods"
        >
          <Card variant="default" className="!p-0 overflow-hidden">
            <div className="border-b border-white/10 px-5 py-4 sm:px-6">
              <h2 className="text-lg font-semibold text-white">Find your perfect pod</h2>
              <p className="text-sm text-slate-400">Enter location and schedule to search availability</p>
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
              <Input
                label="State"
                name="state"
                placeholder="e.g. Karnataka"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                error={errors.state}
                icon={MapPin}
                required
              />
              <Input
                label="City"
                name="city"
                placeholder="e.g. Bangalore"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                error={errors.city}
                icon={MapPin}
                required
              />
              <Input
                label="Date"
                name="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                error={errors.date}
                icon={Calendar}
                required
              />
              <Input
                label="Time"
                name="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                error={errors.time}
                icon={Clock}
                required
              />
            </div>
            <div className="border-t border-white/10 px-5 py-4 sm:px-6">
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Search Pods
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </section>
  );
};

export default Hero;
