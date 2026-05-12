import Link from 'next/link';
import BackButton from '@/components/BackButton';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl w-full">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 mb-4">
            404
          </div>
          <div className="text-6xl mb-6">🔍</div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h1>

        {/* Bengali Heading */}
        <h2 className="text-2xl md:text-3xl font-bengali text-gray-700 mb-6">
          পৃষ্ঠা খুঁজে পাওয়া যায়নি
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-4 leading-relaxed">
          Sorry, the page you're looking for doesn't exist or has been moved. 
          Don't worry, we can help you find what you need.
        </p>

        <p className="text-lg text-gray-600 mb-12 leading-relaxed font-bengali">
          দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা বিদ্যমান নেই বা সরানো হয়েছে। 
          চিন্তা করবেন না, আমরা আপনাকে প্রয়োজনীয় কিছু খুঁজে পেতে সাহায্য করতে পারি।
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold text-lg min-h-[48px]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4 4m-4-4v4"
              />
            </svg>
            Go to Home
          </Link>

          <BackButton />
        </div>

        {/* Helpful Links Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Popular Pages
          </h3>
          <p className="text-gray-600 mb-6 font-bengali">জনপ্রিয় পৃষ্ঠা</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/doctors"
              className="p-4 border-2 border-blue-100 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-left"
            >
              <div className="text-3xl mb-2">👨‍⚕️</div>
              <h4 className="font-semibold text-gray-800">Our Doctors</h4>
              <p className="text-sm text-gray-600">আমাদের ডাক্তারগণ</p>
            </Link>

            <Link
              href="/services"
              className="p-4 border-2 border-blue-100 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-left"
            >
              <div className="text-3xl mb-2">🏥</div>
              <h4 className="font-semibold text-gray-800">Services</h4>
              <p className="text-sm text-gray-600">আমাদের সেবাসমূহ</p>
            </Link>

            <Link
              href="/gallery"
              className="p-4 border-2 border-blue-100 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-left"
            >
              <div className="text-3xl mb-2">🖼️</div>
              <h4 className="font-semibold text-gray-800">Gallery</h4>
              <p className="text-sm text-gray-600">আমাদের গ্যালারি</p>
            </Link>

            <Link
              href="/about"
              className="p-4 border-2 border-blue-100 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-left"
            >
              <div className="text-3xl mb-2">ℹ️</div>
              <h4 className="font-semibold text-gray-800">About Us</h4>
              <p className="text-sm text-gray-600">আমাদের সম্পর্কে</p>
            </Link>
          </div>
        </div>

        {/* Error Code */}
        <p className="text-gray-500 text-sm">
          Error Code: 404 | Page Not Found
        </p>
      </div>
    </div>
  );
}
