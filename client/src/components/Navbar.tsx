/*
 * DESIGN: "Open Water" — Bold Coastal Modern
 * Navbar: Transparent on hero, solid on scroll. Bold Oswald uppercase links.
 * Single-page anchor navigation with smooth scrolling.
 */
import { useState, useEffect } from "react";
import { Menu, X, Anchor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#trips", label: "Trips" },
  { href: "#gallery", label: "Gallery" },
  { href: "#book", label: "Book Now" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section based on scroll position
      const sections = navLinks.map((l) => l.href.slice(1));
      let current = "#hero";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = `#${id}`;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (hash: string) => {
    setMobileOpen(false);
    const id = hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ocean/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <button onClick={() => scrollTo("#hero")} className="flex items-center gap-2 group">
          <Anchor className="w-7 h-7 text-teal transition-transform group-hover:rotate-12" />
          <span className="font-display text-xl md:text-2xl font-bold uppercase tracking-wider text-white">
            Island Girl<span className="text-gold"> Charters</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            const isBookNow = link.href === "#book";
            return isBookNow ? (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="ml-4 px-6 py-2.5 bg-gold hover:bg-gold-bright text-ocean font-display font-bold uppercase text-sm tracking-wider rounded transition-all hover:shadow-lg hover:shadow-gold/20"
              >
                {link.label}
              </button>
            ) : (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`px-4 py-2 font-display font-medium uppercase text-sm tracking-wider transition-colors relative ${
                  isActive
                    ? "text-teal"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-teal"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-ocean/98 backdrop-blur-lg border-t border-white/10 overflow-hidden"
          >
            <div className="container py-6 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                const isBookNow = link.href === "#book";
                return isBookNow ? (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="mt-4 px-6 py-3 bg-gold text-ocean font-display font-bold uppercase text-center tracking-wider rounded"
                  >
                    {link.label}
                  </button>
                ) : (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className={`px-4 py-3 font-display font-medium uppercase tracking-wider text-lg text-left ${
                      isActive ? "text-teal" : "text-white/80"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
