import { clinicData } from "../data/clinicData";

export default function Contact() {
  return (
    <section id="contact" className="bg-[#f8fbff] py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">

        {/* Left Side */}
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Contact Us
          </p>

          <h2 className="mb-6 text-4xl font-bold text-gray-900">
            Book Your Dental Visit Today
          </h2>

          <p className="mb-8 max-w-lg text-lg leading-relaxed text-gray-600">
            Our friendly team is ready to help you with appointments,
            consultations, and any dental questions you may have.
          </p>

          {/* Contact Info */}
          <div className="space-y-6">

            <div>
              <h3 className="mb-1 text-lg font-semibold text-gray-900">
                Phone
              </h3>

              <p className="text-gray-600">
                {clinicData.contact.phone}
              </p>
            </div>

            <div>
              <h3 className="mb-1 text-lg font-semibold text-gray-900">
                Email
              </h3>

              <p className="text-gray-600">
                {clinicData.contact.email}
              </p>
            </div>

            <div>
              <h3 className="mb-1 text-lg font-semibold text-gray-900">
                Address
              </h3>

              <p className="text-gray-600">
                {clinicData.contact.address}
              </p>
            </div>

          </div>
        </div>

        {/* Right Side Form */}
        <div className="rounded-3xl bg-white p-8 shadow-sm">

          <form className="space-y-6">

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Message
              </label>

              <textarea
                rows={5}
                placeholder="Write your message"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            <button
              className="w-full rounded-xl bg-blue-600 px-6 py-4 font-medium text-white transition hover:bg-blue-700"
            >
              Send Message
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}