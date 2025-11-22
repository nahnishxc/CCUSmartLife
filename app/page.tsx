import Hero from './components/Hero';
import EventsSection from './components/EventsSection';
import LivingGuideSection from './components/LivingGuideSection';
import CampusShowcase from './components/CampusShowcase';

export default function Page() {
  return (
    <div>
      <Hero />
      <EventsSection />
      <LivingGuideSection />
      <CampusShowcase /> 
    </div>
  );
}
