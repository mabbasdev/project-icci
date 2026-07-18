import React, { useState, useEffect, useCallback } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plane,
  Stamp,
  BadgePercent,
  Landmark,
  Users,
  Newspaper,
  CalendarDays,
  Phone,
  Mail,
  MapPin,
  Globe2,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

/* ---------------------------------------------------------------------- */
/*  MOCK DATA — simulates the payload that would come from the ICCI CMS   */
/* ---------------------------------------------------------------------- */

const NAV_LINKS = [
  {
    label: "Membership",
    items: [
      { title: "Membership Classes", desc: "Ordinary, associate & affiliate categories" },
      { title: "Apply Online", desc: "Submit your application in minutes" },
      { title: "Fee Structure", desc: "Current dues and one-time charges" },
      { title: "Member Directory", desc: "Search 14,000+ registered businesses" },
    ],
  },
  {
    label: "Services",
    items: [
      { title: "Certificate of Origin", desc: "Attestation for cross-border shipments" },
      { title: "Visa Recommendation", desc: "Letters for business travel" },
      { title: "Trade Facilitation", desc: "Documentation & compliance desk" },
      { title: "Arbitration Centre", desc: "Dispute resolution for members" },
    ],
  },
  {
    label: "Archives",
    items: [
      { title: "Annual Reports", desc: "2018 – 2026 published records" },
      { title: "Press Releases", desc: "Statements & official notices" },
      { title: "Photo Gallery", desc: "Events and ceremonies" },
      { title: "Publications", desc: "Trade journals & bulletins" },
    ],
  },
  {
    label: "Management",
    items: [
      { title: "Executive Committee", desc: "Current office bearers" },
      { title: "Standing Committees", desc: "Sector-focused working groups" },
      { title: "Secretariat", desc: "Departments & staff directory" },
      { title: "Election 2026–2028", desc: "Process, schedule & results" },
    ],
  },
];

const HERO_SLIDES = [
  {
    id: 1,
    eyebrow: "Awareness Session · 8 December 2025",
    title: "Business & Human Rights Due Diligence",
    subtitle:
      "Jointly organized with the ILO and Employers' Federation of Pakistan for a resilient, sustainable business community.",
    cta: "Reserve a seat",
    image:
      "https://images.unsplash.com/photo-1560264280-88b68371db39?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 2,
    eyebrow: "Now Open · Election 2026–2028",
    title: "Shape the Chamber's Next Chapter",
    subtitle:
      "Nominations for the Executive Committee are open to all ordinary members in good standing.",
    cta: "View the schedule",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 3,
    eyebrow: "Trade Facilitation",
    title: "Documentation, Cleared Faster",
    subtitle:
      "Same-day Certificates of Origin and export attestations for members across all sectors.",
    cta: "Start a request",
    image:
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=2000&auto=format&fit=crop",
  },
];

const SERVICES = [
  {
    icon: Plane,
    title: "Visa Recommendation Letters",
    desc: "Official letters supporting members' business travel, processed within 48 hours of a complete application.",
    meta: "Avg. turnaround: 2 days",
  },
  {
    icon: Stamp,
    title: "Certificate of Origin",
    desc: "Authentication of export documents in line with international trade law, accepted at all major ports.",
    meta: "Same-day issuance",
  },
  {
    icon: BadgePercent,
    title: "Member Discounts",
    desc: "Preferential rates with airlines, hotels, and logistics partners exclusively for ICCI members.",
    meta: "40+ partner brands",
  },
  {
    icon: Landmark,
    title: "Facilitation Desk",
    desc: "One-window support for regulatory queries, permits, and inter-agency coordination.",
    meta: "Walk-in & online",
  },
];

const LEADERSHIP = [
  {
    name: "Sardar Tahir Mehmood",
    role: "President, ICCI",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Tahir Ayub",
    role: "Senior Vice President, ICCI",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Muhammad Irfan Chaudhry",
    role: "Vice President, ICCI",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=800&auto=format&fit=crop",
  },
];

const NEWS = [
  {
    category: "Notification",
    date: "12 Jul 2026",
    title: "Fee Structure Revised for FY 2026–27",
    excerpt:
      "Updated membership and renewal fees take effect from the new fiscal year across all categories.",
  },
  {
    category: "Press Release",
    date: "05 Jul 2026",
    title: "ICCI Signs MoU with EU Trade Delegation",
    excerpt:
      "A new framework to ease export documentation for SMEs trading with the European Union.",
  },
  {
    category: "Event",
    date: "28 Jun 2026",
    title: "Annual Trade Exhibition Dates Announced",
    excerpt:
      "This year's exhibition returns to the Convention Centre with an expanded exhibitor floor.",
  },
];

const FAQS = [
  {
    q: "How can I get ICCI membership?",
    a: "Apply online through the Membership Classes page, submit the required documents, and pay the applicable one-time and annual fee. Applications are typically reviewed within 5 working days.",
  },
  {
    q: "What is the fee structure for membership?",
    a: "Fees vary by category — Ordinary, Associate, and Affiliate — and are published annually on the Fee Structure page, along with renewal and re-admission charges.",
  },
  {
    q: "How do I request a Certificate of Origin?",
    a: "Submit your shipment documents through the Trade Facilitation desk, either in person or via the member portal. Same-day issuance is available for complete submissions.",
  },
  {
    q: "Can I get a visa recommendation letter?",
    a: "Yes — members in good standing can request a letter for business travel. Processing typically takes up to 48 hours from submission.",
  },
];

const STATS = [
  { value: "40+", label: "Years of Excellence" },
  { value: "14K", label: "Members" },
  { value: "60+", label: "National & International Partners" },
];

/* ---------------------------------------------------------------------- */
/*  COMPONENT                                                              */
/* ---------------------------------------------------------------------- */

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      <SiteHeader />
      <main>
        <HeroCarousel />
        <TradeTicker />
        <ServicesGrid />
        <LeadershipShowcase />
        <NewsSection />
        <FaqSection />
        <ClosingCta />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ---------------------------- Header ----------------------------------- */

function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${
        scrolled
          ? "border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
          : "border-transparent bg-white"
      }`}
    >
      {/* Utility bar */}
      <div className="hidden border-b border-slate-100 bg-slate-950 text-slate-300 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> info@icci.com.pk
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" /> +92-51-2261175
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="transition hover:text-emerald-400">
              Feedback &amp; Contact
            </a>
            <a href="#" className="transition hover:text-emerald-400">
              Careers
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950">
            <Landmark className="h-6 w-6 text-emerald-400" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight text-slate-900">
              Islamabad Chamber of
            </p>
            <p className="text-sm font-semibold tracking-tight text-slate-900">
              Commerce &amp; Industry
            </p>
          </div>
        </a>

        {/* Desktop mega menu */}
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            {NAV_LINKS.map((group) => (
              <NavigationMenuItem key={group.label}>
                <NavigationMenuTrigger className="text-sm font-medium text-slate-700 hover:text-emerald-700">
                  {group.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[420px] gap-1 p-4 md:grid-cols-2">
                    {group.items.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <a
                            href="#"
                            className="block rounded-md p-3 transition hover:bg-emerald-50"
                          >
                            <p className="text-sm font-semibold text-slate-900">
                              {item.title}
                            </p>
                            <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                              {item.desc}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            FAQs
          </Button>
          <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
            Get Services
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>

        {/* Mobile trigger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              aria-label="Open menu"
              className="rounded-md p-2 text-slate-700 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs p-0">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <span className="text-sm font-semibold tracking-tight">
                Menu
              </span>
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col divide-y divide-slate-100 px-2">
              {NAV_LINKS.map((group) => (
                <MobileNavGroup key={group.label} group={group} />
              ))}
            </nav>
            <div className="flex flex-col gap-3 px-5 py-6">
              <Button variant="outline" className="w-full border-slate-300">
                FAQs
              </Button>
              <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700">
                Get Services
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function MobileNavGroup({ group }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-1">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-3 py-3 text-left text-sm font-semibold text-slate-800"
      >
        {group.label}
        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <ul className="space-y-1 pb-2">
          {group.items.map((item) => (
            <li key={item.title}>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* --------------------------- Hero carousel ------------------------------ */

function HeroCarousel() {
  const [active, setActive] = useState(0);

  const next = useCallback(
    () => setActive((i) => (i + 1) % HERO_SLIDES.length),
    []
  );
  const prev = () =>
    setActive((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  useEffect(() => {
    const t = setInterval(next, 6500);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="relative h-[560px] w-full overflow-hidden sm:h-[620px] lg:h-[700px]">
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === active ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={i !== active}
        >
          <img
            src={slide.image}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/10 to-transparent" />

          <div className="relative mx-auto flex h-full max-w-7xl items-end px-6 pb-16 sm:pb-20 lg:pb-24">
            <div className="max-w-2xl">
              <Badge className="mb-4 border-emerald-400/30 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/15">
                {slide.eyebrow}
              </Badge>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {slide.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
                {slide.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button className="bg-emerald-500 text-slate-950 hover:bg-emerald-400">
                  {slide.cta}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="border-white/30 bg-white/5 text-white hover:bg-white/10"
                >
                  Learn more
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-3 sm:justify-between sm:px-6">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-8 bg-emerald-400" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next slide"
          className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

/* --------------------------- Trade ticker -------------------------------- */
/* Signature element: a chamber-of-commerce "trade board" strip that reads   */
/* like a ledger of institutional standing rather than a generic stat grid.  */

function TradeTicker() {
  return (
    <section className="border-b border-slate-200 bg-slate-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-center gap-4 px-6 py-8 text-center sm:justify-start sm:text-left"
          >
            <span className="font-mono text-3xl font-semibold tracking-tight text-emerald-400 sm:text-4xl">
              {stat.value}
            </span>
            <span className="max-w-[10rem] text-xs uppercase tracking-wide text-slate-400">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------- Services grid ------------------------------- */

function ServicesGrid() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Core Services
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            Everything your business needs from the Chamber
          </h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            From documentation to discounts, ICCI's secretariat handles the
            paperwork so your business can focus on growth.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <Card
              key={service.title}
              className="flex h-full flex-col justify-between border-slate-200 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <CardHeader className="pb-2">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50">
                  <service.icon className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="text-base font-semibold tracking-tight text-slate-900">
                  {service.title}
                </h3>
              </CardHeader>
              <CardContent className="flex h-full flex-col justify-between pt-0">
                <p className="text-sm leading-relaxed text-slate-600">
                  {service.desc}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-medium text-slate-500">
                    {service.meta}
                  </span>
                  <a
                    href="#"
                    className="flex items-center gap-1 text-sm font-semibold text-emerald-700 transition hover:gap-1.5"
                  >
                    Read more
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Leadership showcase --------------------------- */

function LeadershipShowcase() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              Leadership
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              Executive office bearers
            </h2>
          </div>
          <a
            href="#"
            className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-emerald-700"
          >
            Full Executive Committee
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {LEADERSHIP.map((person) => (
            <div
              key={person.name}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={person.image}
                  alt={person.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-base font-semibold leading-snug tracking-tight text-slate-900">
                  {person.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  {person.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ News grid -------------------------------- */

function NewsSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-emerald-600">
              <Newspaper className="h-4 w-4" />
              News &amp; Notifications
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              What's happening at the Chamber
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {NEWS.map((item) => (
            <article
              key={item.title}
              className="group flex flex-col rounded-xl border border-slate-200 p-6 transition hover:border-emerald-200 hover:bg-emerald-50/40"
            >
              <div className="mb-4 flex items-center gap-3 text-xs">
                <Badge
                  variant="secondary"
                  className="bg-slate-100 text-slate-600 hover:bg-slate-100"
                >
                  {item.category}
                </Badge>
                <span className="flex items-center gap-1 text-slate-400">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {item.date}
                </span>
              </div>
              <h3 className="text-base font-semibold leading-snug tracking-tight text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.excerpt}
              </p>
              <a
                href="#"
                className="mt-5 flex items-center gap-1 text-sm font-semibold text-emerald-700 transition group-hover:gap-1.5"
              >
                Read notification
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- FAQ ------------------------------------ */

function FaqSection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Support
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            Can't find what you're looking for? Reach the Facilitation Desk
            directly at +92-51-2261175.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((faq, idx) => (
            <AccordionItem
              key={faq.q}
              value={`faq-${idx}`}
              className="rounded-xl border border-slate-200 bg-white px-5 data-[state=open]:border-emerald-200"
            >
              <AccordionTrigger className="py-5 text-left text-sm font-semibold tracking-tight text-slate-900 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-slate-600">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ---------------------------- Closing CTA -------------------------------- */

function ClosingCta() {
  return (
    <section className="bg-slate-950 py-16 sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 sm:flex-row sm:items-center">
        <div className="max-w-xl">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-emerald-400">
            <Globe2 className="h-4 w-4" />
            Join the network
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Grow your business with 14,000 members strong
          </h2>
          <p className="mt-3 leading-relaxed text-slate-400">
            Access new markets, exclusive services, and a seat at the table
            on trade policy that affects your business.
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
          <Button className="bg-emerald-500 text-slate-950 hover:bg-emerald-400">
            Become a member
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10"
          >
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Footer ---------------------------------- */

function SiteFooter() {
  return (
    <footer className="bg-white py-12 text-sm text-slate-500">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <p className="text-sm font-semibold tracking-tight text-slate-900">
            Islamabad Chamber of Commerce &amp; Industry
          </p>
          <p className="mt-2 flex items-start gap-2 leading-relaxed">
            <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
            ICCI Building, Aiwan-e-Sanat-o-Tijarat Road, Islamabad, Pakistan
          </p>
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-6">
          <div>
            <p className="mb-3 font-semibold text-slate-800">Chamber</p>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-emerald-700">About Us</a></li>
              <li><a href="#" className="hover:text-emerald-700">Management</a></li>
              <li><a href="#" className="hover:text-emerald-700">Election 2026–2028</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-semibold text-slate-800">Resources</p>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-emerald-700">Membership</a></li>
              <li><a href="#" className="hover:text-emerald-700">Services</a></li>
              <li><a href="#" className="hover:text-emerald-700">Magazines</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-semibold text-slate-800">Contact</p>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-emerald-700">Feedback</a></li>
              <li><a href="#" className="hover:text-emerald-700">Careers</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-slate-100 px-6 pt-6 text-xs text-slate-400">
        © {new Date().getFullYear()} Islamabad Chamber of Commerce & Industry. All rights reserved.
      </div>
    </footer>
  );
}
