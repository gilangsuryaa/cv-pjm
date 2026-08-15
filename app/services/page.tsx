import Navbar from "../components/Navbar";
import ServicesHero from "../components/Services/ServicesHero";
import CoreServices from "../components/Services/CoreServices";
import WhyChooseServices from "../components/Services/WhyChooseServices";
import Footer from "../components/Footer";

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <ServicesHero />
      <CoreServices />
      <WhyChooseServices />
      <Footer />
    </main>
  );
}