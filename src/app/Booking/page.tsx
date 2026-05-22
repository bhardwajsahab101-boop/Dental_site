import Booking from "../../sections/Booking";
import Navbar from "../../components/navbar";
import Footer from "../../sections/Footer";

export default function BookingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Booking />
      <Footer />
    </main>
  );
}