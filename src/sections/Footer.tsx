import { clinicData } from "../data/clinicData";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">

        {/* Clinic Info */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">
            {clinicData.clinicName}
          </h2>

          <p className="leading-relaxed text-gray-400">
            Providing trusted and modern dental care with experienced
            professionals and advanced technology.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li>
              <a href="#" className="transition hover:text-white">
                Home
              </a>
            </li>

            <li>
              <a href="#" className="transition hover:text-white">
                Services
              </a>
            </li>

            <li>
              <a href="#" className="transition hover:text-white">
                Doctors
              </a>
            </li>

            <li>
              <a href="#" className="transition hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Services
          </h3>

          <ul className="space-y-3 text-gray-400">

            {clinicData.services.map((service, index) => (
              <li key={index}>
                {service.title}
              </li>
            ))}

          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Contact
          </h3>

          <div className="space-y-4 text-gray-400">
            <p>{clinicData.contact.phone}</p>

            <p>{clinicData.contact.email}</p>

            <p>{clinicData.contact.address}</p>
          </div>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-gray-500 md:flex-row">

          <p>
            © 2026 {clinicData.clinicName}. All rights reserved.
          </p>

          <p>
            Designed with care for modern dental clinics.
          </p>

        </div>
      </div>
    </footer>
  );
}