export default function Hero() {
  return (
    <section id="home" className="bg-[#f4fbff] py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 lg:flex-row">
        
        {/* Left Content */}
        <div className="flex-1">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Trusted Dental Clinic
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
            Modern Dental Care
            <br />
            For Your Family
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-600">
            We provide high-quality dental treatments with modern
            technology and experienced dentists in a comfortable
            environment.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
              Book Appointment
            </button>

            <button className="rounded-full border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop"
            alt="Dental Clinic"
            className="h-[500px] w-full rounded-3xl object-cover shadow-xl"
          />
        </div>
      </div>
    </section>
  )
}