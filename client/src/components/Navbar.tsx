/*
 * DESIGN: "Open Water" — Bold Coastal Modern
 * Navbar: Transparent on hero, solid on scroll. Bold Oswald uppercase links.
 * Teal accent on hover. Gold CTA button.
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Anchor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/trips", label: "Trips" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Book Now" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isHome = location === "/";
  const showSolid = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolid
          ? "bg-ocean/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Anchor className="w-7 h-7 text-teal transition-transform group-hover:rotate-12" />
          <span className="font-display text-xl md:text-2xl font-bold uppercase tracking-wider text-white">
            Island Girl<span className="text-gold"> Charters</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location === link.href;
            const isBookNow = link.href === "/contact";
            return isBookNow ? (
              <Link
                key={link.href}
                href={link.href}
                className="ml-4 px-6 py-2.5 bg-gold hover:bg-gold-bright text-ocean font-display font-bold uppercase text-sm tracking-wider rounded transition-all hover:shadow-lg hover:shadow-gold/20"
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.href}
                href={link.href}
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
              </Link>
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
                const isActive = location === link.href;
                const isBookNow = link.href === "/contact";
                return isBookNow ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="mt-4 px-6 py-3 bg-gold text-ocean font-display font-bold uppercase text-center tracking-wider rounded"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 font-display font-medium uppercase tracking-wider text-lg ${
                      isActive ? "text-teal" : "text-white/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
