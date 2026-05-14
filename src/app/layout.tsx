import { Geist, Geist_Mono, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-noto-serif-bengali",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title:
    "Trishal Diagnostic and Eye Care Center | ত্রিশাল ডায়াগনস্টিক এন্ড আই কেয়ার সেন্টার",
  description:
    "Professional eye care and diagnostic services in Trishal. Expert ophthalmologists, advanced equipment, and comprehensive eye health solutions.",
  keywords:
    "eye, eye care, diagnostic center, Trishal, ophthalmology, eye hospital, eye clinic, diagnostic services, eye health, vision care, eye exams, eye treatments, eye surgery, eye specialists, trishal, mymensingh",
  icons: {
    icon: "/images/logo/tdecc_logo_withBG.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${notoSerifBengali.variable} ${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
