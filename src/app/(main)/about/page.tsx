import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-full mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6">About Us</h1>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bengali mb-4 md:mb-6">আমাদের সম্পর্কে</p>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-3">
              Serving our community with dedication, excellence, and compassion
              for over 15 years.
            </p>
            <p className="text-base md:text-lg font-bengali text-blue-200 leading-relaxed">
              ১৫ বছরেরও বেশি সময় ধরে নিবেদন, উৎকর্ষতা এবং সহানুভূতির সাথে আমাদের
              সম্প্রদায়ের সেবা করছি।
            </p>
          </div>
        </div>
      </section>

      {/* About Diagnostic Center Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-full mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-10 md:mb-14">
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                আমাদের পরিচয়
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Trishal Diagnostic & Eye Care Center
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl font-bengali text-blue-600">
                ত্রিশাল ডায়াগনস্টিক এন্ড আই কেয়ার সেন্টার
              </p>
            </div>

            {/* Content */}
            <div className="space-y-6 md:space-y-8">
              <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed md:leading-loose">
                ত্রিশাল ডায়াগনস্টিক এন্ড আই কেয়ার সেন্টার ২০০৯ সালে ত্রিশালবাসীর স্বাস্থ্য সেবায় 
                নিবেদিত প্রাণ হিসেবে যাত্রা শুরু করেছিল। আমাদের এই যাত্রা শুরু হয়েছিল একটি ছোট ক্লিনিক 
                হিসেবে, কিন্তু আজ আমরা পুরো সিলেট বিভাগের অন্যতম সেরা চক্ষু ও ডায়াগনস্টিক সেবা কেন্দ্রে 
                পরিণত হয়েছি।
              </p>

              <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed md:leading-loose font-bengali">
                আমরা বিশ্বাস করি যে প্রতিটি রোগীর সাথে সদয় আচরণ এবং মানসম্মত চিকিৎসা প্রদান করা 
                আমাদের দায়িত্ব। আমাদের উদ্দেশ্য শুধুমাত্র চিকিৎসা প্রদান নয়, বরং রোগীদের সুস্থ জীবন 
                ফিরিয়ে দেওয়া। আমরা সর্বদা আধুনিক প্রযুক্তি এবং অভিজ্ঞ চিকিৎসকদের মাধ্যমে সর্বোত্তম 
                সেবা নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ।
              </p>

              <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed md:leading-loose">
                আমাদের কেন্দ্রে সর্বাধুনিক ডায়াগনস্টিক যন্ত্রপাতি রয়েছে যা সঠিক রোগ নির্ণয়ে সহায়তা 
                করে। অভিজ্ঞ চক্ষু বিশেষজ্ঞ এবং চিকিৎসা পেশাদারদের দল প্রতিটি রোগীকে ব্যক্তিগত মনোযোগ 
                এবং যত্নের সাথে সেবা প্রদান করেন। আমাদের সাফল্যের মাপকাঠি হলো হাজার হাজার রোগীর 
                সুস্থতা এবং তাদের আস্থা।
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-12">
                <div className="bg-linear-to-br from-blue-50 to-white rounded-2xl p-4 md:p-6 text-center shadow-lg">
                  <div className="text-2xl md:text-4xl font-bold text-blue-600 mb-1">১৫+</div>
                  <div className="text-xs md:text-sm text-gray-600 font-bengali">বছরের অভিজ্ঞতা</div>
                </div>
                <div className="bg-linear-to-br from-green-50 to-white rounded-2xl p-4 md:p-6 text-center shadow-lg">
                  <div className="text-2xl md:text-4xl font-bold text-green-600 mb-1">৫০,০০০+</div>
                  <div className="text-xs md:text-sm text-gray-600 font-bengali">সন্তুষ্ট রোগী</div>
                </div>
                <div className="bg-linear-to-br from-purple-50 to-white rounded-2xl p-4 md:p-6 text-center shadow-lg">
                  <div className="text-2xl md:text-4xl font-bold text-purple-600 mb-1">২০+</div>
                  <div className="text-xs md:text-sm text-gray-600 font-bengali">বিশেষজ্ঞ ডাক্তার</div>
                </div>
                <div className="bg-linear-to-br from-orange-50 to-white rounded-2xl p-4 md:p-6 text-center shadow-lg">
                  <div className="text-2xl md:text-4xl font-bold text-orange-600 mb-1">২৪/৭</div>
                  <div className="text-xs md:text-sm text-gray-600 font-bengali">জরুরি সেবা</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-full mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border-t-4 border-blue-600">
              <div className="text-4xl md:text-5xl mb-4">🎯</div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                Our Mission
              </h3>
              <p className="text-lg md:text-xl font-bengali text-blue-600 mb-4">
                আমাদের লক্ষ্য
              </p>
              <p className="text-gray-600 leading-relaxed mb-3 wrap-break-word">
                To provide accessible, affordable, and advanced eye care services
                to every individual in our community with compassion and
                professionalism.
              </p>
              <p className="text-gray-600 font-bengali leading-relaxed wrap-break-word">
                সহানুভূতি এবং পেশাদারিত্বের সাথে আমাদের সম্প্রদায়ের প্রতিটি
                ব্যক্তিকে সহজলভ্য, সাশ্রয়ী এবং উন্নত চক্ষু পরিচর্যা সেবা প্রদান
                করা।
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border-t-4 border-green-500">
              <div className="text-4xl md:text-5xl mb-4">🔭</div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                Our Vision
              </h3>
              <p className="text-lg md:text-xl font-bengali text-green-600 mb-4">
                আমাদের দৃষ্টিভঙ্গি
              </p>
              <p className="text-gray-600 leading-relaxed mb-3 wrap-break-word">
                To be the most trusted and preferred eye care center in
                Bangladesh, known for excellence in treatment and patient
                satisfaction.
              </p>
              <p className="text-gray-600 font-bengali leading-relaxed wrap-break-word">
                চিকিৎসায় উৎকর্ষতা এবং রোগী সন্তুষ্টির জন্য পরিচিত, বাংলাদেশে
                সবচেয়ে বিশ্বস্ত এবং পছন্দের চক্ষু পরিচর্যা কেন্দ্র হওয়া।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Director's Speech Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-full mx-auto">
            {/* Section Header */}
            <div className="text-center mb-10 md:mb-14">
              {/* <div className="inline-block bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                নেতৃত্ব
              </div> */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
                Director&apos;s Message
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl font-bengali text-blue-600 mt-2">
                পরিচালকের বক্তব্য
              </p>
            </div>

            {/* Content Card */}
            <div className="bg-linear-to-br from-green-50 via-white to-white rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-start">
                {/* Image */}
                <div className="lg:col-span-2 flex justify-center">
                  <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/logo/director.jpg"
                      alt="Director"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100%, 40%"
                    />
                  </div>
                </div>

                {/* Speech */}
                <div className="lg:col-span-3">
                  <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed md:leading-loose mb-4">
                    প্রিয় রোগী ও অভিভাবকগণ,
                  </p>
                  
                  <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed md:leading-loose mb-4 font-bengali">
                    স্বাগতম ত্রিশাল ডায়াগনস্টিক এন্ড আই কেয়ার সেন্টারে। আমি এবং 
                    আমার টিম প্রতিদিন আপনাদের চক্ষু স্বাস্থ্য রক্ষায় নিবেদিত প্রাণ। 
                    আমাদের কেন্দ্রে আমরা শুধু চিকিৎসা প্রদান করি না, বরং প্রতিটি 
                    রোগীর সাথে একটি দীর্ঘস্থায়ী সম্পর্ক তৈরি করি।
                  </p>

                  <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed md:leading-loose mb-4 font-bengali">
                    আমাদের লক্ষ্য হলো সর্বোত্তম চিকিৎসা সেবা প্রদান করা যা প্রতিটি 
                    মানুষের কাছে সহজলভ্য। আমরা সর্বদা আধুনিক প্রযুক্তি এবং 
                    সর্বশেষ চিকিৎসা পদ্ধতি অনুসরণ করি। আমার টিমের প্রতিটি সদস্য 
                    অভিজ্ঞ এবং প্রশিক্ষিত যাতে আপনি সর্বোত্তম যত্ন পান।
                  </p>

                  <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed md:leading-loose mb-6 font-bengali">
                    আমি আপনাদের আশ্বাস দিচ্ছি যে আমরা আপনাদের চক্ষু স্বাস্থ্যের 
                    জন্য সর্বোচ্চ চেষ্টা করব। আমাদের সাথে যুক্ত থাকুন এবং 
                    আমাদের সেবা গ্রহণ করুন।
                  </p>

                  <div className="border-t pt-4">
                    <p className="text-lg md:text-xl font-bold text-gray-800">Dr. [Name]</p>
                    <p className="text-base font-bengali text-blue-600">পরিচালক</p>
                    <p className="text-sm text-gray-500">Trishal Diagnostic & Eye Care Center</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Managing Director's Speech Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-full mx-auto">
            {/* Section Header */}
            <div className="text-center mb-10 md:mb-14">
              {/* <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                ব্যবস্থাপনা
              </div> */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
                Managing Director&apos;s Message
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl font-bengali text-blue-600 mt-2">
                ব্যবস্থাপনা পরিচালকের বক্তব্য
              </p>
            </div>

            {/* Content Card - Alternate Layout */}
            <div className="bg-linear-to-br from-blue-50 via-white to-white rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-start">
                {/* Speech - First on desktop */}
                <div className="lg:col-span-3 order-2 lg:order-1">
                  <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed md:leading-loose mb-4">
                    Dear Valued Patients & Guardians,
                  </p>
                  
                  <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed md:leading-loose mb-4 font-bengali">
                    ত্রিশাল ডায়াগনস্টিক এন্ড আই কেয়ার সেন্টারের পক্ষ থেকে 
                    আপনাদের স্বাগতম। আমি এই প্রতিষ্ঠানের ব্যবস্থাপনা পরিচালক হিসেবে 
                    আপনাদের জানাই আন্তরিক অভিনন্দন। গত ১৫ বছরে আমরা ত্রিশাল ও এর 
                    পার্শ্ববর্তী এলাকায় স্বাস্থ্য সেবার একটি নির্ভরযোগ্য নাম হয়ে 
                    উঠেছি।
                  </p>

                  <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed md:leading-loose mb-4 font-bengali">
                    আমাদের প্রতিষ্ঠানে সর্বাধুনিক ডায়াগনস্টিক যন্ত্র রয়েছে যা 
                    নির্ভুল রোগ নির্ণয়ে সহায়তা করে। আমরা সবসময় রোগীর সন্তুষ্টিকে 
                    প্রাধান্য দিই। আমাদের লক্ষ্য শুধু চিকিৎসা প্রদান নয়, বরং 
                    সাশ্রয়ী মূল্যে মানসম্মত সেবা প্রদান করা যা প্রতিটি পরিবারের 
                    কাছে সহজলভ্য।
                  </p>

                  <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed md:leading-loose mb-6 font-bengali">
                    আমরা প্রতিজ্ঞাবদ্ধ যে আমরা ভবিষ্যতেও আপনাদের সর্বোত্তম সেবা 
                    প্রদান অব্যাহত রাখব। আমাদের প্রতি আস্থা রাখার জন্য আপনাদের 
                    ধন্যবাদ।
                  </p>

                  <div className="border-t pt-4">
                    <p className="text-lg md:text-xl font-bold text-gray-800">Md. [Name]</p>
                    <p className="text-base font-bengali text-blue-600">ব্যবস্থাপনা পরিচালক</p>
                    <p className="text-sm text-gray-500">Trishal Diagnostic & Eye Care Center</p>
                  </div>
                </div>

                {/* Image - Second on desktop */}
                <div className="lg:col-span-2 flex justify-center order-1 lg:order-2">
                  <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/logo/managing_director.jpg"
                      alt="Managing Director"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100%, 40%"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-full mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
              Our Core Values
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl font-bengali text-gray-600 mb-12 text-center">
              আমাদের মূল মূল্যবোধ
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl md:text-4xl">💙</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                  Compassion
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  We care deeply about our patients&apos; wellbeing
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl md:text-4xl">🏆</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                  Excellence
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  We strive for the highest quality in everything
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl md:text-4xl">🤝</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                  Integrity
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  We maintain honesty and ethical practices
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl md:text-4xl">🔬</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                  Innovation
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  We embrace cutting-edge technology
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-linear-to-br from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Experience the Difference
          </h3>
          <p className="text-lg md:text-xl font-bengali text-blue-200 mb-8">
            আজই আমাদের সাথে যুক্ত হন
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+8801700000000"
              className="flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl font-semibold text-lg"
            >
              <span className="text-2xl">📞</span>
              <span>
                Call for Appointment
                <span className="block text-sm font-bengali font-normal">
                  অ্যাপয়েন্টমেন্টের জন্য কল করুন
                </span>
              </span>
            </a>

            <Link
              href="/services"
              className="bg-green-500 text-white px-8 py-4 rounded-xl hover:bg-green-600 transition-all shadow-lg hover:shadow-xl font-semibold text-lg flex items-center justify-center"
            >
              <span>
                Our Services
                <span className="block text-sm font-bengali font-normal">
                  আমাদের সেবা সমূহ
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
