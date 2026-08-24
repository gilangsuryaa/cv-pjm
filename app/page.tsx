import Navbar from "./components/Navbar";
import Hero from "./components/Home/Hero";
import WhyChoose from "./components/Home/WhyChoose";
import Services from "./components/Home/Services";
import Pricing from "./components/Home/Pricing";
import Portofolio from "./components/Home/Portofolio";
import Testimonials from "./components/Home/Testimonials";
import CTA from "./components/Home/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhyChoose />
      <Services />
      <Pricing />
      <Portofolio />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}