import { clinicData } from "../data/clinicData";

export default function Services() {
  return (
    <section id="services" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Our Services
          </p>

          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Complete Dental Care Solutions
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            We provide a wide range of modern dental treatments
            to keep your smile healthy and confident.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {clinicData.services.map((service, index) => (
            <div
              key={index}
              className="rounded-3xl border border-gray-100 bg-[#f8fbff] p-8 transition hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Icon Circle */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
                🦷
              </div>

              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                {service.title}
              </h3>

              <p className="leading-relaxed text-gray-600">
                {service.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}