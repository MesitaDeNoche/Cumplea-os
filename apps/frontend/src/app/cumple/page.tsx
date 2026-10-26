'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Navigation from '@/components/layout/Navigation';
import Lockscreen from '@/components/birthday/Lockscreen';
import Particles from '@/components/birthday/Particles';
import Hero from '@/components/birthday/Hero';
import Carousel from '@/components/birthday/Carousel';
import SongSection from '@/components/birthday/SongSection';
import Reminders from '@/components/birthday/Reminders';
import Constellation from '@/components/birthday/Constellation';
import DayCounter from '@/components/birthday/DayCounter';
import Closing from '@/components/birthday/Closing';
import ScrollReveal from '@/components/birthday/ScrollReveal';
import '@/app/birthday.css';

export default function CumplePage() {
  return (
    <ProtectedRoute>
      <Navigation />
      <div className="birthday-page">
        <Lockscreen />
        <Particles />
        <Hero />
        <Carousel />
        <SongSection />
        <Reminders />
        <Constellation />
        <DayCounter />
        <Closing />
        <ScrollReveal />
      </div>
    </ProtectedRoute>
  );
}
