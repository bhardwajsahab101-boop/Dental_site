import Hero from "../sections/Hero";
import Navbar from "../components/navbar"; 
import Services from "../sections/Services";
import Doctors from "../sections/Doctors";
import Testimonials from "../sections/Testimonials";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";
import Booking from "../sections/Booking";

export default function Home() {
  return (
    <div >
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Doctors />
        <Testimonials />
         <Contact />
         <Footer />
         
      </main>
    </div>
  );
}

