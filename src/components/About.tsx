import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
            About Us
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl font-bengali text-gray-700 mb-3 md:mb-4">
            আমাদের সম্পর্কে
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-green-50 rounded-3xl p-8 md:p-10 lg:p-14 shadow-xl">
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl">
                <div className="text-center">
                  <div className="text-5xl md:text-6xl lg:text-7xl mb-4 md:mb-6">
                    🏥
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 md:mb-4 wrap-break-word">
                    আধুনিক সুবিধা
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed wrap-break-word">
                    State-of-the-art diagnostic center equipped with the latest
                    technology
                  </p>
                </div>
              </div>
            </div>
            {/* Floating Cards */}
            <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 bg-blue-600 text-white rounded-2xl p-4 md:p-6 shadow-2xl">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold">
                ১৫+
              </div>
              <div className="text-xs md:text-sm font-bengali">
                বছরের অভিজ্ঞতা
              </div>
            </div>
            <div className="absolute -top-4 -right-4 md:-top-8 md:-right-8 bg-green-500 text-white rounded-2xl p-4 md:p-6 shadow-2xl">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold">
                ৫০K+
              </div>
              <div className="text-xs md:text-sm font-bengali">
                সন্তুষ্ট রোগী
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">

            <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-5 md:mb-6 leading-relaxed wrap-break-word">
              Trishal Diagnostic and Eye Care Center has been serving the
              community for over 15 years with dedication and excellence. We are
              committed to providing world-class eye care services with
              compassion and expertise.
            </p>

            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 font-bengali leading-relaxed wrap-break-word">
              ত্রিশাল ডায়াগনস্টিক এন্ড আই কেয়ার সেন্টার ১৫ বছরেরও বেশি সময়
              ধরে নিবেদন এবং উৎকর্ষতার সাথে সম্প্রদায়ের সেবা করে আসছে। আমরা
              সহানুভূতি এবং দক্ষতার সাথে বিশ্বমানের চক্ষু পরিচর্যা সেবা প্রদানে
              প্রতিশ্রুতিবদ্ধ।
            </p>

            {/* Mission & Vision */}
            <div className="space-y-4 md:space-y-5 mb-8 md:mb-10">
              <div className="border-l-4 border-blue-600 pl-4 md:pl-5 py-2">
                <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2 wrap-break-word">
                  Our Mission
                </h4>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed wrap-break-word">
                  To provide accessible, affordable, and advanced eye care
                  services to every individual in our community with compassion
                  and professionalism.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4 md:pl-5 py-2">
                <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2 wrap-break-word">
                  Our Vision
                </h4>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed wrap-break-word">
                  To be the most trusted and preferred eye care center in
                  Bangladesh, known for excellence in treatment and patient
                  satisfaction.
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-xl md:text-2xl lg:text-3xl text-blue-600">
                  ✓
                </span>
                <span className="text-sm md:text-base text-gray-700">
                  Advanced Equipment
                </span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-xl md:text-2xl lg:text-3xl text-blue-600">
                  ✓
                </span>
                <span className="text-sm md:text-base text-gray-700">
                  Expert Doctors
                </span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-xl md:text-2xl lg:text-3xl text-blue-600">
                  ✓
                </span>
                <span className="text-sm md:text-base text-gray-700">
                  Affordable Prices
                </span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-xl md:text-2xl lg:text-3xl text-blue-600">
                  ✓
                </span>
                <span className="text-sm md:text-base text-gray-700">
                  24/7 Emergency
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10 md:mt-14">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-xl hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl font-semibold text-base md:text-lg min-h-[52px] group"
          >
            <span className="font-bengali">আরও দেখুন</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
