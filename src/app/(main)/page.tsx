import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Doctors from '@/components/Doctors';
import Contact from '@/components/Contact';
import Gallery from '@/components/Gallery';
import AdPopup from '@/components/AdPopup';
import ImageAdsCarousel from '@/components/ImageAdsCarousel';
import { DoctorModel, GalleryModel, ServiceModel } from '@/models';
import { Doctor, GalleryItem, Service } from '@/types';

export const dynamic = 'force-dynamic';

const toPlain = <T,>(data: T): T => JSON.parse(JSON.stringify(data));

async function getHomeSectionData(): Promise<{
  doctors: Doctor[];
  services: Service[];
  gallery: GalleryItem[];
}> {
  const [doctorsResult, servicesResult, galleryResult] = await Promise.allSettled([
    DoctorModel.findAll(),
    ServiceModel.findAll(),
    GalleryModel.findAll(),
  ]);

  if (doctorsResult.status === 'rejected') {
    console.error('Home doctors preload failed:', doctorsResult.reason);
  }

  if (servicesResult.status === 'rejected') {
    console.error('Home services preload failed:', servicesResult.reason);
  }

  if (galleryResult.status === 'rejected') {
    console.error('Home gallery preload failed:', galleryResult.reason);
  }

  return {
    doctors:
      doctorsResult.status === 'fulfilled' ? toPlain(doctorsResult.value) : [],
    services:
      servicesResult.status === 'fulfilled' ? toPlain(servicesResult.value) : [],
    gallery:
      galleryResult.status === 'fulfilled' ? toPlain(galleryResult.value) : [],
  };
}

export default async function Home() {
  const { doctors, services, gallery } = await getHomeSectionData();

  return (
    <main className="min-h-screen">
      <AdPopup />
      <Hero />
      <ImageAdsCarousel />
      <Services limit={4} initialData={services} />
      <Doctors limit={5} initialData={doctors} />
      <Gallery limit={4} initialData={gallery} />
      <About />
      <Contact />
    </main>
  );
}
