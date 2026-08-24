import Navbar from "../components/Navbar";
import AboutHero from "../components/About/AboutHero";
import AboutCompany from "../components/About/AboutCompany";
import VisionMission from "../components/About/VisionMission";
import Team from "../components/About/Team";
import ServiceCoverage from "../components/About/ServiceCoverage";
import Footer from "../components/Footer";


export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutHero />
      <AboutCompany />
      <VisionMission />
      <Team />
      <ServiceCoverage />
      <Footer />
    </main>
  );
}