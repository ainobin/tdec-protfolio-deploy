import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Doctors from '@/components/Doctors';
import Contact from '@/components/Contact';
import Gallery from '@/components/Gallery';
import AdPopup from '@/components/AdPopup';
import ImageAdsCarousel from '@/components/ImageAdsCarousel';

export default function Home() {
  return (
    <main className="min-h-screen">
      <AdPopup />
      <Hero />
      <ImageAdsCarousel />
      <Services limit={4} />
      <Doctors limit={5} />
      <Gallery limit={4} />
      <About />
      <Contact />
    </main>
  );
}
