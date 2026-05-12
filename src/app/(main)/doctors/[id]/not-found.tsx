import Link from 'next/link';

export default function DoctorNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-12 max-w-md w-full mx-4 text-center">
        <div className="text-8xl mb-6">👨‍⚕️</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Doctor Not Found</h1>
        <p className="text-gray-600 mb-6">
          The doctor profile you're looking for doesn't exist or may have been removed.
        </p>
        <div className="space-y-3">
          <Link 
            href="/doctors"
            className="block w-full cursor-pointer bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            View All Doctors
          </Link>
          <Link 
            href="/"
            className="block w-full cursor-pointer bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition font-medium"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}