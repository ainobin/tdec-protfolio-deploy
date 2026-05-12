const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-2xl font-bengali text-gray-700 mb-4">
            যোগাযোগ করুন
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto wrap-break-word leading-relaxed">
            Get in touch with us for appointments, inquiries, or any assistance
            you need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Get In Touch
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl text-blue-600">📍</div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Address</h4>
                    <p className="text-gray-600 wrap-break-word">Trishal Sadar, Mymensingh</p>
                    <p className="text-gray-600 font-bengali wrap-break-word">
                      ত্রিশাল সদর, ময়মনসিংহ
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-3xl text-blue-600">📞</div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Phone</h4>
                    <p className="text-gray-600">
                      <a
                        href="tel:+8801700000000"
                        className="hover:text-blue-600 transition"
                      >
                        +880 1700-000000
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <a
                        href="tel:+8801800000000"
                        className="hover:text-blue-600 transition"
                      >
                        +880 1800-000000
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-3xl text-blue-600">📧</div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Email</h4>
                    <p className="text-gray-600">info@trishaldecc.com</p>
                    <p className="text-gray-600">appointment@trishaldecc.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-3xl text-blue-600">⏰</div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">
                      Working Hours
                    </h4>
                    <p className="text-gray-600 wrap-break-word">
                      Saturday - Thursday: 9:00 AM - 9:00 PM
                    </p>
                    <p className="text-gray-600 wrap-break-word">Friday: Closed</p>
                    <p className="text-gray-600 font-bengali wrap-break-word">
                      শনি - বৃহস্পতিবার: সকাল ৯টা - রাত ৯টা
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="tel:+8801700000000"
                  className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg w-full justify-center"
                >
                  <span className="text-2xl">📞</span>
                  <span>
                    Call for Appointment
                    <span className="block text-sm font-bengali font-normal">
                      অ্যাপয়েন্টমেন্টের জন্য কল করুন
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-2xl overflow-hidden shadow-lg h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.0!2d90.3890563!3d24.5802562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDM0JzQ5LjAiTiA5MMKwMjMnMjAuNiJF!5e0!3m2!1sen!2sbd!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;