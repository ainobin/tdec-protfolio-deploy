import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AdProvider } from "@/context/AdContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdProvider>
      <TopBar />
      <Navbar />
      {children}
      <Footer />
    </AdProvider>
  );
}
