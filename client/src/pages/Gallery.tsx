/*
 * DESIGN: "Open Water" — Bold Coastal Modern
 * Gallery: Masonry-style photo grid with hover effects and lightbox feel.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412394151/LvipCT3cV29uQwUZyYLG6Z/hero-fishing-boat-Z4zYzWbntbjekYNyrGoyEb.webp";
const ACTION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412394151/LvipCT3cV29uQwUZyYLG6Z/fishing-action-EuNQnpJnTvFkixN4EQ5X2x.webp";
const HARBOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412394151/LvipCT3cV29uQwUZyYLG6Z/essex-harbor-SNsCNuiLiTvJmvexmoWuFj.webp";
const AERIAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412394151/LvipCT3cV29uQwUZyYLG6Z/ocean-aerial-L6p54BqUzxKYovpoZJeyVZ.webp";
const CAPTAIN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412394151/LvipCT3cV29uQwUZyYLG6Z/captain-portrait-nDVhTBmg4XwctZrguHPe37.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as const } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const photos = [
  { src: HERO_IMG, alt: "Island Girl cutting through waves at sunrise", span: "col-span-2 row-span-2" },
  { src: ACTION_IMG, alt: "Angler reeling in a striped bass", span: "col-span-1 row-span-1" },
  { src: HARBOR_IMG, alt: "Essex Harbor at golden hour", span: "col-span-1 row-span-1" },
  { src: AERIAL_IMG, alt: "Aerial view of the boat on open water", span: "col-span-1 row-span-2" },
  { src: CAPTAIN_IMG, alt: "Captain on deck", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=800&q=80", alt: "Fishing rods at sunset", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1498623116890-37e912163d5d?w=800&q=80", alt: "Ocean waves at golden hour", span: "col-span-2 row-span-1" },
  { src: "https://images.unsplash.com/photo-1471958680802-1345a694ba6d?w=800&q=80", alt: "Rocky New England coastline", span: "col-span-1 row-span-1" },
];

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={ACTION_IMG} alt="Fishing action" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean/90 via-ocean/40 to-ocean/20" />
        </div>
        <div className="container relative z-10 pb-12">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-teal" />
              <span className="font-display text-teal uppercase tracking-[0.2em] text-sm font-medium">
                On the Water
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl md:text-6xl font-bold uppercase text-white tracking-tight"
            >
              Photo <span className="text-gold">Gallery</span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 bg-sand">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]"
          >
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className={`${photo.span} relative group cursor-pointer overflow-hidden rounded`}
                onClick={() => setSelected(index)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-ocean/0 group-hover:bg-ocean/30 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-ocean/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-display uppercase tracking-wide">
                    {photo.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              More photos coming soon! Follow us on social media for the latest catches and adventures.
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ocean/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={photos[selected].src}
              alt={photos[selected].alt}
              className="max-w-full max-h-[85vh] object-contain rounded shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
