/*
 * DESIGN: "Open Water" — Bold Coastal Modern
 * Single-page layout: Hero, Stats, Trips, About/Captain, Gallery, Testimonials, Booking Form, FAQ, CTA
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Anchor, Fish, Clock, Users, MapPin, Star, ChevronRight,
  Shield, Award, Heart, X, CheckCircle2, Phone, Mail, Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ── Gallery photos ── */
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

/* ── Trips data ── */
const trips = [
  {
    id: "half-day",
    title: "Half Day Charter",
    hours: "4",
    tagline: "The perfect introduction to Cape Ann fishing",
    description:
      "Our half-day charter is ideal for those looking for a focused fishing experience. We'll target striped bass and bluefish in the Essex River estuary and nearby Cape Ann waters.",
    includes: ["4 hours of guided fishing", "All rods, reels, and tackle", "Live and artificial bait", "Fish cleaning and filleting", "Bottled water and ice", "Up to 6 passengers"],
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
      "Our full-day charter takes you further offshore to explore the rich fishing grounds of Cape Ann, Stellwagen Bank, and beyond. This is our most popular trip for serious anglers.",
    includes: ["8 hours of guided fishing", "All rods, reels, and tackle", "Live and artificial bait", "Fish cleaning and filleting", "Bottled water, snacks, and ice", "Up to 6 passengers", "Multiple fishing locations"],
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
      "Our sunset trip combines light tackle fishing with a scenic cruise through the Essex River and harbor. The perfect way to end a summer day.",
    includes: ["3 hours on the water", "Light tackle fishing gear", "Scenic harbor cruise", "Bottled water", "Up to 6 passengers"],
    species: ["Striped Bass", "Bluefish"],
    departure: "5:00 PM (seasonal)",
    img: HARBOR_IMG,
  },
];

/* ── FAQ data ── */
const faqs = [
  { q: "Do I need to bring my own fishing equipment?", a: "No! We provide all rods, reels, tackle, and bait. Just bring yourself, sunscreen, and a sense of adventure." },
  { q: "What happens if the weather is bad?", a: "Safety is our top priority. If conditions are unsafe, we'll reschedule your trip at no additional cost." },
  { q: "Can I keep the fish I catch?", a: "Absolutely! We'll clean and fillet your catch at the dock so it's ready for the grill." },
  { q: "Is the trip suitable for children?", a: "Yes! We welcome families and anglers of all ages. Life jackets are provided for all passengers." },
  { q: "How do I pay?", a: "We accept cash, Venmo, and Zelle. A deposit may be required to secure your booking." },
  { q: "Where do we meet?", a: "We depart from Essex Marina in Essex, MA. Detailed directions will be provided when your booking is confirmed." },
];

export default function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", tripType: "", preferredDate: "", groupSize: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.tripType) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Booking request sent! We'll be in touch soon.");
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">

      {/* ═══════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Fishing charter boat cutting through ocean waves at sunrise" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ocean/90 via-ocean/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean/80 via-transparent to-ocean/30" />
        </div>
        <div className="container relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-teal" />
              <span className="font-display text-teal uppercase tracking-[0.2em] text-sm font-medium">Essex, Massachusetts</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase leading-[0.95] text-white mb-6 tracking-tight">
              Your Next<br /><span className="text-gold">Great Catch</span><br />Starts Here
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              Premium fishing charters on the waters of Cape Ann. Striped bass, bluefish, and unforgettable memories — all departing from historic Essex Harbor.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo("book")} className="px-8 py-4 bg-gold hover:bg-gold-bright text-ocean font-display font-bold uppercase tracking-wider rounded transition-all hover:shadow-lg hover:shadow-gold/30 text-lg">
                Book a Charter
              </button>
              <button onClick={() => scrollTo("trips")} className="px-8 py-4 border-2 border-white/30 hover:border-white text-white font-display font-medium uppercase tracking-wider rounded transition-all hover:bg-white/10 text-lg">
                View Trips
              </button>
            </motion.div>
          </motion.div>
        </div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50">
          <ChevronRight className="w-8 h-8 rotate-90" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-ocean py-8 md:py-10">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { number: "20+", label: "Years Experience", icon: Anchor },
              { number: "6", label: "Passengers Max", icon: Users },
              { number: "4-8", label: "Hour Trips", icon: Clock },
              { number: "500+", label: "Happy Anglers", icon: Fish },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="text-center">
                <stat.icon className="w-6 h-6 text-teal mx-auto mb-2" />
                <div className="font-number text-4xl md:text-5xl text-gold tracking-wide">{stat.number}</div>
                <div className="font-display text-white/60 uppercase text-xs tracking-widest mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TRIPS
      ═══════════════════════════════════════════════════════════════ */}
      <section id="trips" className="py-20 md:py-28 bg-sand scroll-mt-20">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-teal" />
              <span className="font-display text-teal uppercase tracking-[0.2em] text-sm font-medium">Our Charters</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold uppercase text-ocean tracking-tight mb-12">
              Choose Your Adventure
            </motion.h2>

            <div className="space-y-20">
              {trips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={stagger}
                  className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center"
                >
                  <motion.div variants={fadeUp} className={`relative ${index % 2 === 1 ? "md:order-2" : ""}`}>
                    {trip.popular && (
                      <div className="absolute top-4 left-4 z-10 bg-gold text-ocean font-display text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">Most Popular</div>
                    )}
                    <img src={trip.img} alt={trip.title} className="rounded shadow-xl w-full" />
                    <div className="absolute bottom-6 right-6 bg-ocean/90 backdrop-blur-sm rounded px-4 py-3">
                      <span className="font-number text-5xl text-gold">{trip.hours}</span>
                      <span className="font-display text-white/80 uppercase text-sm ml-1">Hours</span>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp} className={index % 2 === 1 ? "md:order-1" : ""}>
                    <h3 className="font-display text-3xl md:text-4xl font-bold uppercase text-ocean tracking-tight mb-2">{trip.title}</h3>
                    <p className="text-teal font-display uppercase tracking-wider text-sm mb-4">{trip.tagline}</p>
                    <p className="text-foreground/70 leading-relaxed mb-6">{trip.description}</p>

                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-foreground/60"><Clock className="w-4 h-4 text-teal" />{trip.hours} Hours</div>
                      <div className="flex items-center gap-2 text-sm text-foreground/60"><Users className="w-4 h-4 text-teal" />Up to 6 Guests</div>
                      <div className="flex items-center gap-2 text-sm text-foreground/60"><MapPin className="w-4 h-4 text-teal" />Departs {trip.departure}</div>
                    </div>

                    <div className="mb-6">
                      <p className="font-display text-xs uppercase tracking-widest text-ocean mb-2 font-bold">Target Species</p>
                      <div className="flex flex-wrap gap-2">
                        {trip.species.map((s) => (
                          <span key={s} className="flex items-center gap-1 px-3 py-1 bg-teal/10 text-teal text-sm rounded font-medium"><Fish className="w-3 h-3" /> {s}</span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <p className="font-display text-xs uppercase tracking-widest text-ocean mb-3 font-bold">What's Included</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {trip.includes.map((item) => (
                          <div key={item} className="flex items-center gap-2 text-sm text-foreground/70"><CheckCircle2 className="w-4 h-4 text-teal shrink-0" />{item}</div>
                        ))}
                      </div>
                    </div>

                    <button onClick={() => scrollTo("book")} className="inline-flex items-center gap-2 px-8 py-3 bg-gold hover:bg-gold-bright text-ocean font-display font-bold uppercase tracking-wider rounded transition-all hover:shadow-lg">
                      Book This Trip <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          ABOUT / CAPTAIN
      ═══════════════════════════════════════════════════════════════ */}
      <section id="about" className="relative py-20 md:py-28 bg-ocean overflow-hidden clip-diagonal-top scroll-mt-20">
        <div className="container relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} className="relative">
              <img src={CAPTAIN_IMG} alt="Captain of Island Girl Charters" className="rounded shadow-2xl w-full max-w-md mx-auto" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-teal/20 rounded -z-10" />
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gold/10 rounded -z-10" />
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-teal" />
                <span className="font-display text-teal uppercase tracking-[0.2em] text-sm font-medium">Meet the Captain</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-white tracking-tight mb-6">
                A Lifetime on<br /><span className="text-gold">the Water</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-4">
                With over 20 years of experience fishing the waters of Cape Ann and the North Shore, our captain has an intimate knowledge of the local waters, seasonal patterns, and the best spots to find fish.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                Growing up on the Essex River, fishing wasn't just a hobby — it was a way of life. That passion led to founding Island Girl Charters with one goal: to give every guest an unforgettable experience.
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                Licensed and insured, our captain holds a USCG Master Captain's license and is committed to safety, conservation, and making sure every trip is one to remember.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: "USCG Licensed" },
                  { icon: Award, label: "20+ Years Experience" },
                  { icon: Heart, label: "Catch & Release Friendly" },
                  { icon: Anchor, label: "Local Expert" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-sm text-white/70">
                    <item.icon className="w-5 h-5 text-teal shrink-0" />
                    {item.label}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          THE BOAT
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-teal" />
                <span className="font-display text-teal uppercase tracking-[0.2em] text-sm font-medium">The Vessel</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-ocean tracking-tight mb-6">
                The <span className="text-teal">Island Girl</span>
              </h2>
              <p className="text-foreground/70 text-lg leading-relaxed mb-6">
                Our vessel is a well-maintained center console fishing boat equipped with the latest electronics, safety equipment, and top-of-the-line fishing tackle. She's fast, stable, and built for the waters of Cape Ann.
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
                    <p className="font-display text-xs uppercase tracking-widest text-teal mb-1">{spec.label}</p>
                    <p className="text-foreground/80 font-medium">{spec.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <img src={HERO_IMG} alt="The Island Girl fishing charter boat" className="rounded shadow-2xl w-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TARGET SPECIES
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-sand">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-teal" />
                <span className="font-display text-teal uppercase tracking-[0.2em] text-sm font-medium">Target Species</span>
                <div className="h-px w-12 bg-teal" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-ocean tracking-tight">What We Chase</h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Striped Bass", season: "May – Oct", icon: "🐟" },
                { name: "Bluefish", season: "Jun – Sep", icon: "🐠" },
                { name: "Cod", season: "Year Round", icon: "🎣" },
                { name: "Haddock", season: "Year Round", icon: "🐡" },
              ].map((species) => (
                <motion.div key={species.name} variants={fadeUp} className="group bg-white rounded p-6 text-center hover:bg-ocean hover:text-white transition-all duration-300">
                  <div className="text-4xl mb-3">{species.icon}</div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide mb-1">{species.name}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-white/60 transition-colors">{species.season}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          GALLERY
      ═══════════════════════════════════════════════════════════════ */}
      <section id="gallery" className="py-20 md:py-28 bg-white scroll-mt-20">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-teal" />
                <span className="font-display text-teal uppercase tracking-[0.2em] text-sm font-medium">On the Water</span>
                <div className="h-px w-12 bg-teal" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-ocean tracking-tight">Photo Gallery</h2>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className={`${photo.span} relative group cursor-pointer overflow-hidden rounded`}
                onClick={() => setSelectedPhoto(index)}
              >
                <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-ocean/0 group-hover:bg-ocean/30 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-ocean/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-display uppercase tracking-wide">{photo.alt}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-sand">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-teal" />
                <span className="font-display text-teal uppercase tracking-[0.2em] text-sm font-medium">Testimonials</span>
                <div className="h-px w-12 bg-teal" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-ocean tracking-tight">What Our Guests Say</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { text: "Absolutely incredible day on the water. The captain knew exactly where the fish were. We caught our limit of stripers before noon!", name: "Mike R.", location: "Boston, MA" },
                { text: "Took my kids out for their first fishing trip and it couldn't have been better. Patient, knowledgeable, and we had a blast. Already booked our next trip.", name: "Sarah T.", location: "Newburyport, MA" },
                { text: "Best charter on the North Shore, hands down. Clean boat, top-notch equipment, and a captain who genuinely loves what he does.", name: "Dave K.", location: "Manchester, MA" },
              ].map((review) => (
                <motion.div key={review.name} variants={fadeUp} className="bg-white rounded p-8 shadow-sm">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-gold text-gold" />))}
                  </div>
                  <p className="text-foreground/80 leading-relaxed mb-6 italic">"{review.text}"</p>
                  <div>
                    <p className="font-display font-bold text-ocean uppercase tracking-wide">{review.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {review.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          BOOKING FORM
      ═══════════════════════════════════════════════════════════════ */}
      <section id="book" className="py-20 md:py-28 bg-ocean scroll-mt-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact Info Sidebar */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="md:col-span-1">
              <motion.div variants={fadeUp}>
                <h2 className="font-display text-2xl font-bold uppercase text-white tracking-tight mb-6">Contact Info</h2>
                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal/20 rounded flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-teal" /></div>
                    <div>
                      <p className="font-display text-sm uppercase tracking-wider text-white font-bold mb-1">Phone</p>
                      <a href="tel:+19785551234" className="text-white/60 hover:text-teal transition-colors">(978) 555-1234</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal/20 rounded flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-teal" /></div>
                    <div>
                      <p className="font-display text-sm uppercase tracking-wider text-white font-bold mb-1">Email</p>
                      <a href="mailto:info@islandgirlcharters.com" className="text-white/60 hover:text-teal transition-colors">info@islandgirlcharters.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal/20 rounded flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-teal" /></div>
                    <div>
                      <p className="font-display text-sm uppercase tracking-wider text-white font-bold mb-1">Location</p>
                      <p className="text-white/60">Essex Marina<br />Essex, MA 01929</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal/20 rounded flex items-center justify-center shrink-0"><Clock className="w-5 h-5 text-teal" /></div>
                    <div>
                      <p className="font-display text-sm uppercase tracking-wider text-white font-bold mb-1">Season</p>
                      <p className="text-white/60">May through October<br />7 days a week</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded p-6">
                  <h3 className="font-display text-lg font-bold uppercase text-white tracking-wide mb-3">Quick Response</h3>
                  <p className="text-white/50 text-sm leading-relaxed">We typically respond to booking inquiries within a few hours. For same-day availability, give us a call directly.</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Booking Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="md:col-span-2">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded p-12 shadow-sm text-center">
                  <CheckCircle2 className="w-16 h-16 text-teal mx-auto mb-6" />
                  <h2 className="font-display text-3xl font-bold uppercase text-ocean tracking-tight mb-4">Request Received!</h2>
                  <p className="text-foreground/70 text-lg leading-relaxed max-w-md mx-auto mb-8">
                    Thank you for your interest in Island Girl Charters. We'll review your request and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", tripType: "", preferredDate: "", groupSize: "", message: "" }); }}
                    className="font-display font-bold uppercase tracking-wider text-teal hover:text-teal-bright transition-colors"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <motion.form variants={fadeUp} onSubmit={handleSubmit} className="bg-white rounded p-8 md:p-10 shadow-sm">
                  <h2 className="font-display text-2xl font-bold uppercase text-ocean tracking-tight mb-2">Booking Request</h2>
                  <p className="text-muted-foreground mb-8">Fill out the form below and we'll get back to you to confirm your charter.</p>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-display text-xs uppercase tracking-widest text-ocean font-bold mb-2">Full Name <span className="text-red-500">*</span></label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 border border-border rounded bg-sand/50 focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal outline-none transition-all" placeholder="John Smith" />
                    </div>
                    <div>
                      <label className="block font-display text-xs uppercase tracking-widest text-ocean font-bold mb-2">Email <span className="text-red-500">*</span></label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 border border-border rounded bg-sand/50 focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal outline-none transition-all" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="block font-display text-xs uppercase tracking-widest text-ocean font-bold mb-2">Phone</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 border border-border rounded bg-sand/50 focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal outline-none transition-all" placeholder="(978) 555-1234" />
                    </div>
                    <div>
                      <label className="block font-display text-xs uppercase tracking-widest text-ocean font-bold mb-2">Trip Type <span className="text-red-500">*</span></label>
                      <select name="tripType" value={form.tripType} onChange={handleChange} required className="w-full px-4 py-3 border border-border rounded bg-sand/50 focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal outline-none transition-all">
                        <option value="">Select a trip...</option>
                        <option value="half-day">Half Day Charter (4 hrs)</option>
                        <option value="full-day">Full Day Charter (8 hrs)</option>
                        <option value="sunset">Sunset Cruise & Fish (3 hrs)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-display text-xs uppercase tracking-widest text-ocean font-bold mb-2">Preferred Date</label>
                      <input type="date" name="preferredDate" value={form.preferredDate} onChange={handleChange} className="w-full px-4 py-3 border border-border rounded bg-sand/50 focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block font-display text-xs uppercase tracking-widest text-ocean font-bold mb-2">Group Size</label>
                      <select name="groupSize" value={form.groupSize} onChange={handleChange} className="w-full px-4 py-3 border border-border rounded bg-sand/50 focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal outline-none transition-all">
                        <option value="">Select group size...</option>
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="3">3 People</option>
                        <option value="4">4 People</option>
                        <option value="5">5 People</option>
                        <option value="6">6 People</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block font-display text-xs uppercase tracking-widest text-ocean font-bold mb-2">Additional Details</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="w-full px-4 py-3 border border-border rounded bg-sand/50 focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal outline-none transition-all resize-none" placeholder="Any special requests, experience level, or questions..." />
                  </div>

                  <div className="mt-8">
                    <Button type="submit" className="w-full sm:w-auto px-10 py-6 bg-gold hover:bg-gold-bright text-ocean font-display font-bold uppercase tracking-wider text-lg rounded transition-all hover:shadow-lg hover:shadow-gold/20">
                      <Send className="w-5 h-5 mr-2" />Send Booking Request
                    </Button>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">We'll confirm availability and pricing within 24 hours. No payment required until your trip is confirmed.</p>
                </motion.form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-16 md:py-24 bg-white scroll-mt-20">
        <div className="container max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl font-bold uppercase text-ocean tracking-tight mb-10 text-center">
              Frequently Asked Questions
            </motion.h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <motion.div key={faq.q} variants={fadeUp} className="bg-sand rounded p-6">
                  <h3 className="font-display text-lg font-bold text-ocean mb-2">{faq.q}</h3>
                  <p className="text-foreground/70 leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          LIGHTBOX
      ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-ocean/95 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedPhoto(null)}>
            <button onClick={() => setSelectedPhoto(null)} className="absolute top-6 right-6 text-white/80 hover:text-white z-10"><X className="w-8 h-8" /></button>
            <motion.img initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} src={photos[selectedPhoto].src} alt={photos[selectedPhoto].alt} className="max-w-full max-h-[85vh] object-contain rounded shadow-2xl" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
