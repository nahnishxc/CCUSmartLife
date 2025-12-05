import Link from "next/link";
import EventsSection from "./components/EventsSection";
import LivingGuideSection, {
  HomeLivingIcons,
} from "./components/LivingGuideSection";
import CampusShowcase from "./components/CampusShowcase";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <main>
      <section className="home-hero-layout">
        <div className="home-hero-left wide">
          <h1 className="home-hero-title">CCU SmartLife</h1>
          <p className="home-hero-subtitle">
            An AI-powered guide to help international students live and study at
            National Chung Cheng University.
          </p>
          <Link href="/chat">
            <button className="home-hero-button">chat with AI</button>
          </Link>
          <p className="home-hero-explore">Explore all services →</p>
        </div>

        <div className="home-hero-right narrow">
          <HomeLivingIcons />
        </div>
      </section>
      <EventsSection />
      <CampusShowcase />
      <ContactSection />
      <Footer />
    </main>
  );
}
