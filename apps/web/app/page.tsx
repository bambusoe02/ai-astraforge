import { Navbar } from "../components/landing/navbar";
import { HeroSection } from "../components/landing/hero-section";
import { FeaturesGrid } from "../components/landing/features-grid";
import { HowItWorks } from "../components/landing/how-it-works";
import { DemoPreview } from "../components/landing/demo-preview";
import { TechStack } from "../components/landing/tech-stack";
import { CTASection } from "../components/landing/cta-section";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesGrid />
      <HowItWorks />
      <DemoPreview />
      <TechStack />
      <CTASection />
    </main>
  );
}
