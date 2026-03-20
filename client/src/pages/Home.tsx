/*
 * DESIGN: "Open Water" — Bold Coastal Modern
 * Home: Full-bleed hero, diagonal sections, oversized numbers, editorial layout.
 * Dark hero with white text. Magazine-style content sections.
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Anchor, Fish, Clock, Users, MapPin, Star, ChevronRight } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412394151/LvipCT3cV29uQwUZyYLG6Z/hero-fishing-boat-Z4zYzWbntbjekYNyrGoyEb.webp";
const ACTION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412394151/LvipCT3cV29uQwUZyYLG6Z/fishing-action-EuNQnpJnTvFkixN4EQ5X2x.webp";
const HARBOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412394151/LvipCT3cV29uQwUZyYLG6Z/essex-harbor-SNsCNuiLiTvJmvexmoWuFj.webp";
const AERIAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412394151/LvipCT3cV29uQwUZyYLG6Z/ocean-aerial-L6p54BqUzxKYovpoZJeyVZ.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Fishing charter boat cutting through ocean waves at sunrise"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ocean/90 via-ocean/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean/80 via-transparent to-ocean/30" />
        </div>

        {/* Content */}
        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-teal" />
              <span className="font-display text-teal uppercase tracking-[0.2em] text-sm font-medium">
                Essex, Massachusetts
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase leading-[0.95] text-white mb-6 tracking-tight"
            >
              Your Next
              <br />
              <span className="text-gold">Great Catch</span>
              <br />
              Starts Here
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
            >
              Premium fishing charters on the waters of Cape Ann. 
              Striped bass, bluefish, and unforgettable memories — 
              all departing from historic Essex Harbor.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gold hover:bg-gold-bright text-ocean font-display font-bold uppercase tracking-wider rounded transition-all hover:shadow-lg hover:shadow-gold/30 text-lg"
              >
                Book a Charter
              </Link>
              <Link
                href="/trips"
                className="px-8 py-4 border-2 border-white/30 hover:border-white text-white font-display font-medium uppercase tracking-wider rounded transition-all hover:bg-white/10 text-lg"
              >
                View Trips
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        >
          <ChevronRight className="w-8 h-8 rotate-90" />
        </motion.div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-ocean py-8 md:py-10">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {[
              { number: "20+", label: "Years Experience", icon: Anchor },
              { number: "6", label: "Passengers Max", icon: Users },
              { number: "4-8", label: "Hour Trips", icon: Clock },
              { number: "500+", label: "Happy Anglers", icon: Fish },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="text-center"
              >
                <stat.icon className="w-6 h-6 text-teal mx-auto mb-2" />
                <div className="font-number text-4xl md:text-5xl text-gold tracking-wide">
                  {stat.number}
                </div>
                <div className="font-display text-white/60 uppercase text-xs tracking-widest mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== TRIPS PREVIEW ===== */}
      <section className="py-20 md:py-28 bg-sand">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-teal" />
              <span className="font-display text-teal uppercase tracking-[0.2em] text-sm font-medium">
                Our Charters
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-bold uppercase text-ocean tracking-tight mb-12"
            >
              Choose Your Adventure
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  title: "Half Day",
                  hours: "4",
                  desc: "A focused morning or afternoon session targeting striped bass and bluefish in the Essex River and nearby waters.",
                  features: ["4 Hours", "Up to 6 Guests", "All Tackle Provided", "Bait Included"],
                  img: ACTION_IMG,
                },
                {
                  title: "Full Day",
                  hours: "8",
                  desc: "The ultimate fishing experience. Venture further offshore to chase trophy fish on the rich grounds of Cape Ann.",
                  features: ["8 Hours", "Up to 6 Guests", "All Tackle Provided", "Lunch Break"],
                  popular: true,
                  img: AERIAL_IMG,
                },
                {
                  title: "Sunset Cruise",
                  hours: "3",
                  desc: "A relaxed evening on the water. Enjoy the stunning Essex Harbor sunset while casting a few lines.",
                  features: ["3 Hours", "Up to 6 Guests", "Light Tackle", "Scenic Route"],
                  img: HARBOR_IMG,
                },
              ].map((trip) => (
                <motion.div
                  key={trip.title}
                  variants={fadeUp}
                  className={`group relative bg-white rounded overflow-hidden shadow-md hover:shadow-xl transition-shadow ${
                    trip.popular ? "ring-2 ring-gold" : ""
                  }`}
                >
                  {trip.popular && (
                    <div className="absolute top-4 right-4 z-10 bg-gold text-ocean font-display text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
                      Most Popular
                    </div>
                  )}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={trip.img}
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ocean/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="font-number text-5xl text-white tracking-wide">{trip.hours}</span>
                      <span className="font-display text-white/80 uppercase text-sm ml-1">HR</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-bold uppercase text-ocean mb-2">
                      {trip.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {trip.desc}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {trip.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-foreground/70">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 font-display font-bold uppercase text-sm tracking-wider text-teal hover:text-teal-bright transition-colors"
                    >
                      Book This Trip <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="text-center mt-10">
              <Link
                href="/trips"
                className="inline-flex items-center gap-2 font-display font-medium uppercase tracking-wider text-ocean hover:text-teal transition-colors"
              >
                View All Trip Details <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="relative py-20 md:py-28 bg-ocean overflow-hidden clip-diagonal-top">
        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Image */}
            <motion.div variants={fadeUp} className="relative">
              <img
                src={HARBOR_IMG}
                alt="Essex Harbor at sunset"
                className="rounded shadow-2xl w-full"
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold/20 rounded -z-10" />
            </motion.div>

            {/* Text */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-teal" />
                <span className="font-display text-teal uppercase tracking-[0.2em] text-sm font-medium">
                  Our Story
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-white tracking-tight mb-6">
                Born on the
                <br />
                <span className="text-gold">Essex River</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Island Girl Adventures was founded with a simple mission: to share the incredible 
                fishing waters of Cape Ann with anglers of all experience levels. Based out of 
                historic Essex Harbor, we know these waters like the back of our hand.
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                Whether you're a seasoned angler chasing trophy stripers or a family looking 
                for a fun day on the water, our experienced captain will put you on the fish 
                and make sure you have the time of your life.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-display font-bold uppercase tracking-wider text-gold hover:text-gold-bright transition-colors"
              >
                Meet the Captain <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== WHAT WE TARGET ===== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-teal" />
                <span className="font-display text-teal uppercase tracking-[0.2em] text-sm font-medium">
                  Target Species
                </span>
                <div className="h-px w-12 bg-teal" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-ocean tracking-tight">
                What We Chase
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Striped Bass", season: "May – Oct", icon: "🐟" },
                { name: "Bluefish", season: "Jun – Sep", icon: "🐠" },
                { name: "Cod", season: "Year Round", icon: "🎣" },
                { name: "Haddock", season: "Year Round", icon: "🐡" },
              ].map((species) => (
                <motion.div
                  key={species.name}
                  variants={fadeUp}
                  className="group bg-sand rounded p-6 text-center hover:bg-ocean hover:text-white transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{species.icon}</div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide mb-1">
                    {species.name}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-white/60 transition-colors">
                    {species.season}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 md:py-28 bg-sand">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-teal" />
                <span className="font-display text-teal uppercase tracking-[0.2em] text-sm font-medium">
                  Testimonials
                </span>
                <div className="h-px w-12 bg-teal" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-ocean tracking-tight">
                What Our Guests Say
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  text: "Absolutely incredible day on the water. The captain knew exactly where the fish were. We caught our limit of stripers before noon!",
                  name: "Mike R.",
                  location: "Boston, MA",
                },
                {
                  text: "Took my kids out for their first fishing trip and it couldn't have been better. Patient, knowledgeable, and we had a blast. Already booked our next trip.",
                  name: "Sarah T.",
                  location: "Newburyport, MA",
                },
                {
                  text: "Best charter on the North Shore, hands down. Clean boat, top-notch equipment, and a captain who genuinely loves what he does.",
                  name: "Dave K.",
                  location: "Manchester, MA",
                },
              ].map((review) => (
                <motion.div
                  key={review.name}
                  variants={fadeUp}
                  className="bg-white rounded p-8 shadow-sm"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-foreground/80 leading-relaxed mb-6 italic">
                    "{review.text}"
                  </p>
                  <div>
                    <p className="font-display font-bold text-ocean uppercase tracking-wide">
                      {review.name}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {review.location}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FULL-WIDTH PHOTO BREAK ===== */}
      <section className="relative h-[50vh] min-h-[400px]">
        <img
          src={AERIAL_IMG}
          alt="Aerial view of fishing charter boat"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ocean/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase text-white tracking-tight mb-4">
              Life is Better<br />
              <span className="text-gold">on the Water</span>
            </h2>
            <Link
              href="/contact"
              className="inline-block mt-4 px-10 py-4 bg-gold hover:bg-gold-bright text-ocean font-display font-bold uppercase tracking-wider rounded transition-all hover:shadow-lg text-lg"
            >
              Book Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
