/*
 * DESIGN: "Open Water" — Bold Coastal Modern
 * Footer: Deep ocean background, teal accents, gold CTA. Single-page anchor links.
 */
import { Anchor, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-navy text-white/80">
      {/* CTA Band */}
      <div className="bg-teal py-12 md:py-16">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white mb-4 tracking-wide">
            Ready to Get on the Water?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            Book your charter today and experience the best fishing the North Shore has to offer.
          </p>
          <button
            onClick={() => scrollTo("book")}
            className="inline-block px-10 py-4 bg-gold hover:bg-gold-bright text-ocean font-display font-bold uppercase text-lg tracking-wider rounded transition-all hover:shadow-lg hover:shadow-gold/30"
          >
            Book Your Trip
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Anchor className="w-6 h-6 text-teal" />
              <span className="font-display text-xl font-bold uppercase tracking-wider text-white">
                Island Girl<span className="text-gold"> Charters</span>
              </span>
            </div>
            <p className="text-white/60 leading-relaxed">
              Premium fishing charters departing from Essex, Massachusetts.
              Explore the rich waters of Cape Ann and beyond.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { id: "hero", label: "Home" },
                { id: "about", label: "About" },
                { id: "trips", label: "Trips" },
                { id: "gallery", label: "Gallery" },
                { id: "book", label: "Book Now" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-white/60 hover:text-teal transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white mb-4">
              Contact
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-teal shrink-0" />
                <span className="text-white/60">Essex, Massachusetts</span>
              </div>
              <a href="tel:+19785551234" className="flex items-center gap-3 text-white/60 hover:text-teal transition-colors">
                <Phone className="w-5 h-5 text-teal shrink-0" />
                <span>(978) 555-1234</span>
              </a>
              <a href="mailto:info@islandgirlcharters.com" className="flex items-center gap-3 text-white/60 hover:text-teal transition-colors">
                <Mail className="w-5 h-5 text-teal shrink-0" />
                <span>info@islandgirlcharters.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Island Girl Charters. All rights reserved.
          </p>
          <p className="text-white/40 text-sm">
            Essex, MA &middot; Cape Ann &middot; North Shore
          </p>
        </div>
      </div>
    </footer>
  );
}
