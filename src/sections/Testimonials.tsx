import { clinicData } from "../data/clinicData";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Testimonials
          </p>

          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            What Our Patients Say
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            We are trusted by hundreds of patients for modern,
            comfortable, and professional dental care.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {clinicData.testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-3xl border border-gray-100 bg-[#f8fbff] p-8 transition hover:-translate-y-2 hover:shadow-xl"
            >

              {/* Stars */}
              <div className="mb-5 text-yellow-400">
                ★★★★★
              </div>

              {/* Review */}
              <p className="mb-6 leading-relaxed text-gray-600">
                "{testimonial.review}"
              </p>

              {/* User */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {testimonial.name}
                </h3>

                <p className="text-sm text-gray-500">
                  Patient
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}