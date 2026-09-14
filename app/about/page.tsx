import Navbar from "../components/Navbar";
import AboutHero from "../components/About/AboutHero";
import VisionMission from "../components/About/VisionMission";
import ServiceCoverage from "../components/About/ServiceCoverage";
import Footer from "../components/Footer";


export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutHero />
      <VisionMission />
      <ServiceCoverage />
      <Footer />
    </main>
  );
}