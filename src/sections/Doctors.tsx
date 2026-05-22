import { clinicData } from "../data/clinicData";

export default function Doctors() {
  return (
    <section id="doctors" className="bg-[#f8fbff] py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Our Doctors
          </p>

          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Meet Our Experienced Dentists
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Our professional dental team is dedicated to providing
            safe, modern, and comfortable treatments.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {clinicData.doctors.map((doctor, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >

              {/* Doctor Image */}
              <img
                src={doctor.image}
                alt={doctor.name}
                className="h-80 w-full object-cover"
              />

              {/* Doctor Info */}
              <div className="p-6">
                <h3 className="mb-2 text-2xl font-semibold text-gray-900">
                  {doctor.name}
                </h3>

                <p className="text-blue-600">
                  {doctor.role}
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}