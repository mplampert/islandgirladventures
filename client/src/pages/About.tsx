/*
 * DESIGN: "Open Water" — Bold Coastal Modern
 * About: Editorial layout with captain portrait, boat details, and story.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Anchor, Shield, Award, Heart, ChevronRight } from "lucide-react";

const CAPTAIN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412394151/LvipCT3cV29uQwUZyYLG6Z/captain-portrait-nDVhTBmg4XwctZrguHPe37.webp";
const HARBOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412394151/LvipCT3cV29uQwUZyYLG6Z/essex-harbor-SNsCNuiLiTvJmvexmoWuFj.webp";
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412394151/LvipCT3cV29uQwUZyYLG6Z/hero-fishing-boat-Z4zYzWbntbjekYNyrGoyEb.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as const } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HARBOR_IMG} alt="Essex Harbor" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean/90 via-ocean/40 to-ocean/20" />
        </div>
        <div className="container relative z-10 pb-12">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-teal" />
              <span className="font-display text-teal uppercase tracking-[0.2em] text-sm font-medium">
                Our Story
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl md:text-6xl font-bold uppercase text-white tracking-tight"
            >
              About <span className="text-gold">Island Girl</span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Captain Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            {/* Portrait */}
            <motion.div variants={fadeUp} className="relative">
              <img
                src={CAPTAIN_IMG}
                alt="Captain of Island Girl Adventures"
                className="rounded shadow-2xl w-full max-w-md mx-auto"
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-teal/20 rounded -z-10" />
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gold/10 rounded -z-10" />
            </motion.div>

            {/* Bio */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-teal" />
                <span className="font-display text-teal uppercase tracking-[0.2em] text-sm font-medium">
                  Meet the Captain
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-ocean tracking-tight mb-6">
                A Lifetime on<br />
                <span className="text-teal">the Water</span>
              </h2>
              <p className="text-foreground/70 text-lg leading-relaxed mb-4">
                With over 20 years of experience fishing the waters of Cape Ann and the North Shore, 
                our captain has an intimate knowledge of the local waters, seasonal patterns, and 
                the best spots to find fish.
              </p>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Growing up on the Essex River, fishing wasn't just a hobby — it was a way of life. 
                That passion led to a career on the water, and eventually to founding Island Girl 
                Charters with one goal: to give every guest an unforgettable experience.
              </p>
              <p className="text-foreground/70 leading-relaxed mb-8">
                Licensed and insured, our captain holds a USCG Master Captain's license and is 
                committed to safety, conservation, and making sure every trip is one to remember.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: "USCG Licensed" },
                  { icon: Award, label: "20+ Years Experience" },
                  { icon: Heart, label: "Catch & Release Friendly" },
                  { icon: Anchor, label: "Local Expert" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-sm text-foreground/70">
                    <item.icon className="w-5 h-5 text-teal shrink-0" />
                    {item.label}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Boat */}
      <section className="py-20 md:py-28 bg-ocean clip-diagonal-top">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-teal" />
                <span className="font-display text-teal uppercase tracking-[0.2em] text-sm font-medium">
                  The Vessel
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-white tracking-tight mb-6">
                The <span className="text-gold">Island Girl</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Our vessel is a well-maintained center console fishing boat equipped with 
                the latest electronics, safety equipment, and top-of-the-line fishing tackle. 
                She's fast, stable, and built for the waters of Cape Ann.
              </p>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8">
                {[
                  { label: "Type", value: "Center Console" },
                  { label: "Capacity", value: "Up to 6 Guests" },
                  { label: "Electronics", value: "GPS & Fish Finder" },
                  { label: "Safety", value: "Full Coast Guard Equipped" },
                  { label: "Tackle", value: "Premium Rods & Reels" },
                  { label: "Home Port", value: "Essex, MA" },
                ].map((spec) => (
                  <div key={spec.label}>
                    <p className="font-display text-xs uppercase tracking-widest text-teal mb-1">
                      {spec.label}
                    </p>
                    <p className="text-white/80 font-medium">{spec.value}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gold hover:bg-gold-bright text-ocean font-display font-bold uppercase tracking-wider rounded transition-all"
              >
                Book a Charter <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div variants={fadeUp}>
              <img
                src={HERO_IMG}
                alt="The Island Girl fishing charter boat"
                className="rounded shadow-2xl w-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-sand">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-14">
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-ocean tracking-tight">
                Why Island Girl?
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Local Knowledge",
                  desc: "We've fished these waters for decades. We know the tides, the currents, and where the fish are — season by season, day by day.",
                },
                {
                  title: "All Skill Levels",
                  desc: "Whether you're a first-timer or a seasoned pro, we tailor every trip to your experience level. Everyone catches fish on Island Girl.",
                },
                {
                  title: "Premium Equipment",
                  desc: "We provide all tackle, bait, and gear. Our equipment is top-of-the-line and meticulously maintained. Just show up and fish.",
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="bg-white rounded p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-display text-xl font-bold uppercase text-ocean mb-3 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
