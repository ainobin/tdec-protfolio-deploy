import React from "react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative bg-[url('/images/bg2.png')] bg-cover bg-center py-16 md:py-24 lg:py-32"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-900/40"></div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">

          {/* Main Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 leading-tight">
            Trishal Diagnostic and{" "}
            <span >Eye Care Center</span>
          </h1>

          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 font-bengali leading-tight">
            ত্রিশাল ডায়াগনস্টিক এন্ড আই কেয়ার সেন্টার
          </h2>

          {/* English Description */}
          <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed">
            Your trusted destination for comprehensive eye care and diagnostic
            services. Expert doctors, advanced technology, and compassionate
            care.
          </p>

          {/* Bengali Description */}
          <p className="text-sm md:text-base lg:text-lg mb-8 md:mb-10 font-bengali leading-relaxed">
            নির্ভুল রোগ নির্ণয় এবং বিশেষায়িত চক্ষু সেবার এক নির্ভরযোগ্য
            প্রতিষ্ঠান। আমাদের রয়েছে অত্যাধুনিক প্যাথলজি ল্যাবরেটরি এবং অভিজ্ঞ
            চক্ষু বিশেষজ্ঞ টিম। উন্নত প্রযুক্তি ও আন্তরিক সেবার সমন্বয়ে আপনার ও
            আপনার পরিবারের সুস্বাস্থ্য নিশ্চিত করাই আমাদের লক্ষ্য।
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <a
              href="tel:+8801700000000"
              className="bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
            >
              📞 অ্যাপয়েন্টমেন্ট
            </a>

            <a
              href="#services"
              className="bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-gray-100 transition shadow-lg border-2 border-blue-600"
            >
              আমাদের সেবা সমূহ
            </a>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;