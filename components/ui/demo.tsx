import TiltCard from "@/components/ui/tilt-card";

const MODULES = [
  {
    num: "01",
    title: "The Offer Engineer",
    desc: "An offer people line up to pay for, then we build the ascension ladder to scale LTV above it.",
  },
  {
    num: "02",
    title: "The Inbound Engine",
    desc: "Lead magnets, landing pages, VSLs, full funnels, nurture sequences, and the Skool/Whop community that warms cold leads on autopilot.",
  },
  {
    num: "03",
    title: "The Bot Army",
    desc: "Manychat flows, automated DMs, and the army of little robots that run your front-end while you sleep.",
  },
  {
    num: "04",
    title: "The Detective Trackers",
    desc: "GA4, Meta Pixel, and the full tracking stack so you know exactly where every dollar is coming from.",
  },
  {
    num: "05",
    title: "The AI Machine ⭐",
    desc: "How to wire AI into every part of your business so the whole thing builds, runs, and scales itself.",
  },
  {
    num: "06",
    title: "The Closing Room",
    desc: "Your booking flow and call structure to convert without being weird about it.",
  },
];

export default function ModuleCardsDemo() {
  return (
    <section className="bg-[#08080a] px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
          What&apos;s Inside
        </p>
        <h2 className="mb-12 text-2xl font-bold text-white">
          Six modules. Every single thing you need to turn your content into a
          system that prints clients.
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {MODULES.map((mod) => (
            <TiltCard
              key={mod.num}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6"
            >
              <span className="mb-2 block text-xs font-bold tracking-wider text-[#FF6B2C]">
                {mod.num}
              </span>
              <h3 className="mb-2 text-base font-bold text-white">
                {mod.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">{mod.desc}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
