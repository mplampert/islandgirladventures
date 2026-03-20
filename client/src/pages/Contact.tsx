/*
 * DESIGN: "Open Water" — Bold Coastal Modern
 * Contact: Booking contact form with trip selection, date picker, and details.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AERIAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412394151/LvipCT3cV29uQwUZyYLG6Z/ocean-aerial-L6p54BqUzxKYovpoZJeyVZ.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as const } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    tripType: "",
    preferredDate: "",
    groupSize: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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

  return (
    <div className="min-h-screen">
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={AERIAL_IMG} alt="Aerial view of charter boat" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean/90 via-ocean/40 to-ocean/20" />
        </div>
        <div className="container relative z-10 pb-12">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-teal" />
              <span className="font-display text-teal uppercase tracking-[0.2em] text-sm font-medium">
                Get in Touch
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl md:text-6xl font-bold uppercase text-white tracking-tight"
            >
              Book Your <span className="text-gold">Charter</span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 bg-sand">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact Info Sidebar */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="md:col-span-1"
            >
              <motion.div variants={fadeUp}>
                <h2 className="font-display text-2xl font-bold uppercase text-ocean tracking-tight mb-6">
                  Contact Info
                </h2>

                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal/10 rounded flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-teal" />
                    </div>
                    <div>
                      <p className="font-display text-sm uppercase tracking-wider text-ocean font-bold mb-1">
                        Phone
                      </p>
                      <a href="tel:+19785551234" className="text-foreground/70 hover:text-teal transition-colors">
                        (978) 555-1234
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal/10 rounded flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-teal" />
                    </div>
                    <div>
                      <p className="font-display text-sm uppercase tracking-wider text-ocean font-bold mb-1">
                        Email
                      </p>
                      <a href="mailto:info@islandgirladventures.com" className="text-foreground/70 hover:text-teal transition-colors">
                        info@islandgirladventures.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal/10 rounded flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-teal" />
                    </div>
                    <div>
                      <p className="font-display text-sm uppercase tracking-wider text-ocean font-bold mb-1">
                        Location
                      </p>
                      <p className="text-foreground/70">
                        Essex Marina<br />
                        Essex, MA 01929
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal/10 rounded flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-teal" />
                    </div>
                    <div>
                      <p className="font-display text-sm uppercase tracking-wider text-ocean font-bold mb-1">
                        Season
                      </p>
                      <p className="text-foreground/70">
                        May through October<br />
                        7 days a week
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-ocean rounded p-6">
                  <h3 className="font-display text-lg font-bold uppercase text-white tracking-wide mb-3">
                    Quick Response
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    We typically respond to booking inquiries within a few hours. 
                    For same-day availability, give us a call directly.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="md:col-span-2"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded p-12 shadow-sm text-center"
                >
                  <CheckCircle2 className="w-16 h-16 text-teal mx-auto mb-6" />
                  <h2 className="font-display text-3xl font-bold uppercase text-ocean tracking-tight mb-4">
                    Request Received!
                  </h2>
                  <p className="text-foreground/70 text-lg leading-relaxed max-w-md mx-auto mb-8">
                    Thank you for your interest in Island Girl Adventures. We'll review your 
                    request and get back to you within 24 hours to confirm your trip.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", phone: "", tripType: "", preferredDate: "", groupSize: "", message: "" });
                    }}
                    className="font-display font-bold uppercase tracking-wider text-teal hover:text-teal-bright transition-colors"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  variants={fadeUp}
                  onSubmit={handleSubmit}
                  className="bg-white rounded p-8 md:p-10 shadow-sm"
                >
                  <h2 className="font-display text-2xl font-bold uppercase text-ocean tracking-tight mb-2">
                    Booking Request
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Fill out the form below and we'll get back to you to confirm your charter.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block font-display text-xs uppercase tracking-widest text-ocean font-bold mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded bg-sand/50 focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal outline-none transition-all"
                        placeholder="John Smith"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-display text-xs uppercase tracking-widest text-ocean font-bold mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded bg-sand/50 focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block font-display text-xs uppercase tracking-widest text-ocean font-bold mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded bg-sand/50 focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal outline-none transition-all"
                        placeholder="(978) 555-1234"
                      />
                    </div>

                    {/* Trip Type */}
                    <div>
                      <label className="block font-display text-xs uppercase tracking-widest text-ocean font-bold mb-2">
                        Trip Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="tripType"
                        value={form.tripType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded bg-sand/50 focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal outline-none transition-all"
                      >
                        <option value="">Select a trip...</option>
                        <option value="half-day">Half Day Charter (4 hrs)</option>
                        <option value="full-day">Full Day Charter (8 hrs)</option>
                        <option value="sunset">Sunset Cruise & Fish (3 hrs)</option>
                      </select>
                    </div>

                    {/* Preferred Date */}
                    <div>
                      <label className="block font-display text-xs uppercase tracking-widest text-ocean font-bold mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={form.preferredDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded bg-sand/50 focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal outline-none transition-all"
                      />
                    </div>

                    {/* Group Size */}
                    <div>
                      <label className="block font-display text-xs uppercase tracking-widest text-ocean font-bold mb-2">
                        Group Size
                      </label>
                      <select
                        name="groupSize"
                        value={form.groupSize}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded bg-sand/50 focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal outline-none transition-all"
                      >
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

                  {/* Message */}
                  <div className="mt-6">
                    <label className="block font-display text-xs uppercase tracking-widest text-ocean font-bold mb-2">
                      Additional Details
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-border rounded bg-sand/50 focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal outline-none transition-all resize-none"
                      placeholder="Any special requests, experience level, or questions..."
                    />
                  </div>

                  <div className="mt-8">
                    <Button
                      type="submit"
                      className="w-full sm:w-auto px-10 py-6 bg-gold hover:bg-gold-bright text-ocean font-display font-bold uppercase tracking-wider text-lg rounded transition-all hover:shadow-lg hover:shadow-gold/20"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Booking Request
                    </Button>
                  </div>

                  <p className="mt-4 text-sm text-muted-foreground">
                    We'll confirm availability and pricing within 24 hours. No payment required until your trip is confirmed.
                  </p>
                </motion.form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl md:text-4xl font-bold uppercase text-ocean tracking-tight mb-10 text-center"
            >
              Frequently Asked Questions
            </motion.h2>

            <div className="space-y-6">
              {[
                {
                  q: "Do I need to bring my own fishing equipment?",
                  a: "No! We provide all rods, reels, tackle, and bait. Just bring yourself, sunscreen, and a sense of adventure. If you prefer to bring your own gear, you're welcome to.",
                },
                {
                  q: "What happens if the weather is bad?",
                  a: "Safety is our top priority. If conditions are unsafe, we'll reschedule your trip at no additional cost. We monitor weather closely and will contact you the evening before if there are concerns.",
                },
                {
                  q: "Can I keep the fish I catch?",
                  a: "Absolutely! We'll clean and fillet your catch at the dock so it's ready for the grill. We also practice catch and release for undersized fish and encourage conservation.",
                },
                {
                  q: "Is the trip suitable for children?",
                  a: "Yes! We welcome families and anglers of all ages. Our captain is patient and experienced with young anglers. Life jackets are provided for all passengers.",
                },
                {
                  q: "How do I pay?",
                  a: "We accept cash, Venmo, and Zelle. A deposit may be required to secure your booking. Full payment is due on the day of your trip.",
                },
                {
                  q: "Where do we meet?",
                  a: "We depart from Essex Marina in Essex, MA. Detailed directions and meeting instructions will be provided when your booking is confirmed.",
                },
              ].map((faq) => (
                <motion.div
                  key={faq.q}
                  variants={fadeUp}
                  className="bg-sand rounded p-6"
                >
                  <h3 className="font-display text-lg font-bold text-ocean mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
