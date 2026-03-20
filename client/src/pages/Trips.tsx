/*
 * DESIGN: "Open Water" — Bold Coastal Modern
 * Trips: Detailed charter options with oversized numbers, editorial layout.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Clock, Users, Fish, MapPin, ChevronRight, CheckCircle2 } from "lucide-react";

const ACTION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412394151/LvipCT3cV29uQwUZyYLG6Z/fishing-action-EuNQnpJnTvFkixN4EQ5X2x.webp";
const AERIAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412394151/LvipCT3cV29uQwUZyYLG6Z/ocean-aerial-L6p54BqUzxKYovpoZJeyVZ.webp";
const HARBOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412394151/LvipCT3cV29uQwUZyYLG6Z/essex-harbor-SNsCNuiLiTvJmvexmoWuFj.webp";
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412394151/LvipCT3cV29uQwUZyYLG6Z/hero-fishing-boat-Z4zYzWbntbjekYNyrGoyEb.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as const } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const trips = [
  {
    id: "half-day",
    title: "Half Day Charter",
    hours: "4",
    tagline: "The perfect introduction to Cape Ann fishing",
    description:
      "Our half-day charter is ideal for those looking for a focused fishing experience without committing to a full day. We'll target striped bass and bluefish in the Essex River estuary and nearby Cape Ann waters. Morning departures offer the best bite, but afternoon trips can be equally productive.",
    includes: [
      "4 hours of guided fishing",
      "All rods, reels, and tackle",
      "Live and artificial bait",
      "Fish cleaning and filleting",
      "Bottled water and ice",
      "Up to 6 passengers",
    ],
    species: ["Striped Bass", "Bluefish"],
    departure: "6:00 AM or 1:00 PM",
    img: ACTION_IMG,
  },
  {
    id: "full-day",
    title: "Full Day Charter",
    hours: "8",
    tagline: "The ultimate Cape Ann fishing adventure",
    description:
      "Our full-day charter takes you further offshore to explore the rich fishing grounds of Cape Ann, Stellwagen Bank, and beyond. With 8 hours on the water, we can chase multiple species and find the best bite of the day. This is our most popular trip for serious anglers looking for trophy fish.",
    includes: [
      "8 hours of guided fishing",
      "All rods, reels, and tackle",
      "Live and artificial bait",
      "Fish cleaning and filleting",
      "Bottled water, snacks, and ice",
      "Up to 6 passengers",
      "Multiple fishing locations",
    ],
    species: ["Striped Bass", "Bluefish", "Cod", "Haddock"],
    departure: "5:30 AM",
    popular: true,
    img: AERIAL_IMG,
  },
  {
    id: "sunset",
    title: "Sunset Cruise & Fish",
    hours: "3",
    tagline: "Relax, fish, and watch the sun set over Essex",
    description:
      "Our sunset trip combines light tackle fishing with a scenic cruise through the Essex River and harbor. It's the perfect way to end a summer day — cast a few lines, enjoy the golden hour light, and take in the stunning views of the North Shore coastline.",
    includes: [
      "3 hours on the water",
      "Light tackle fishing gear",
      "Scenic harbor cruise",
      "Bottled water",
      "Up to 6 passengers",
    ],
    species: ["Striped Bass", "Bluefish"],
    departure: "5:00 PM (seasonal)",
    img: HARBOR_IMG,
  },
];

export default function Trips() {
  return (
    <div className="min-h-screen">
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Fishing charter boat" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean/90 via-ocean/40 to-ocean/20" />
        </div>
        <div className="container relative z-10 pb-12">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-teal" />
              <span className="font-display text-teal uppercase tracking-[0.2em] text-sm font-medium">
                Our Charters
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl md:text-6xl font-bold uppercase text-white tracking-tight"
            >
              Fishing <span className="text-gold">Trips</span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Trip Cards */}
      <section className="py-20 md:py-28 bg-sand">
        <div className="container">
          <div className="space-y-20">
            {trips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={stagger}
                className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  index % 2 === 1 ? "md:direction-rtl" : ""
                }`}
              >
                {/* Image */}
                <motion.div
                  variants={fadeUp}
                  className={`relative ${index % 2 === 1 ? "md:order-2" : ""}`}
                >
                  {trip.popular && (
                    <div className="absolute top-4 left-4 z-10 bg-gold text-ocean font-display text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
                      Most Popular
                    </div>
                  )}
                  <img
                    src={trip.img}
                    alt={trip.title}
                    className="rounded shadow-xl w-full"
                  />
                  <div className="absolute bottom-6 right-6 bg-ocean/90 backdrop-blur-sm rounded px-4 py-3">
                    <span className="font-number text-5xl text-gold">{trip.hours}</span>
                    <span className="font-display text-white/80 uppercase text-sm ml-1">Hours</span>
                  </div>
                </motion.div>

                {/* Details */}
                <motion.div
                  variants={fadeUp}
                  className={index % 2 === 1 ? "md:order-1" : ""}
                >
                  <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-ocean tracking-tight mb-2">
                    {trip.title}
                  </h2>
                  <p className="text-teal font-display uppercase tracking-wider text-sm mb-4">
                    {trip.tagline}
                  </p>
                  <p className="text-foreground/70 leading-relaxed mb-6">
                    {trip.description}
                  </p>

                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-foreground/60">
                      <Clock className="w-4 h-4 text-teal" />
                      {trip.hours} Hours
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/60">
                      <Users className="w-4 h-4 text-teal" />
                      Up to 6 Guests
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/60">
                      <MapPin className="w-4 h-4 text-teal" />
                      Departs {trip.departure}
                    </div>
                  </div>

                  {/* Species */}
                  <div className="mb-6">
                    <p className="font-display text-xs uppercase tracking-widest text-ocean mb-2 font-bold">
                      Target Species
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {trip.species.map((s) => (
                        <span
                          key={s}
                          className="flex items-center gap-1 px-3 py-1 bg-teal/10 text-teal text-sm rounded font-medium"
                        >
                          <Fish className="w-3 h-3" /> {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Includes */}
                  <div className="mb-8">
                    <p className="font-display text-xs uppercase tracking-widest text-ocean mb-3 font-bold">
                      What's Included
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {trip.includes.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm text-foreground/70">
                          <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gold hover:bg-gold-bright text-ocean font-display font-bold uppercase tracking-wider rounded transition-all hover:shadow-lg"
                  >
                    Book This Trip <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Bring */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-ocean tracking-tight">
                What to Bring
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-4">
              {[
                "Sunscreen (reef-safe preferred)",
                "Sunglasses with strap",
                "Hat or visor",
                "Non-marking shoes or sandals",
                "Light jacket or rain gear",
                "Cooler for your catch",
                "Camera",
                "Snacks & drinks (no glass)",
                "Seasickness medication (if needed)",
                "A sense of adventure!",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-3 bg-sand rounded"
                >
                  <CheckCircle2 className="w-5 h-5 text-teal shrink-0" />
                  <span className="text-foreground/80">{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
