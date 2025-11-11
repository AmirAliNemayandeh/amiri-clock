import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FeaturedClocks } from "./components/FeaturedClocks";
import { VirtualShowroom } from "./components/VirtualShowroom";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { AppointmentBooking } from "./components/AppointmentBooking";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CartProvider } from "./components/CartContext";
import { ShoppingCart } from "./components/ShoppingCart";
// import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <Hero />
        <FeaturedClocks />
        <div id="showroom">
          <VirtualShowroom />
        </div>
        <About />
        <Services />
        <div id="appointment">
          <AppointmentBooking />
        </div>
        <Contact />
        <Footer />
        <ShoppingCart />
        {/* <Toaster position="top-right" /> */}
      </div>
    </CartProvider>
  );
}
