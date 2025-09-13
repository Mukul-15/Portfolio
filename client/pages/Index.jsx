import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils.js";
import { Button } from "@/components/ui/button.jsx";
import { Github, Linkedin, Mail, ArrowRight, PanelsTopLeft, Users2, MessageSquareCode, ChevronLeft, ChevronRight, Code2, Trophy } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal.js";

const logoSrc = (name) => {
  const map = {
    React: "/assets/logos/react.svg",
    "TypeScript": "/assets/logos/typescript.svg",
    Vite: "/assets/logos/vite.svg",
    HTML: "/assets/logos/html5.svg",
    CSS: "/assets/logos/css3.svg",
    JavaScript: "/assets/logos/javascript.svg",
    "Node.js": "/assets/logos/node.svg",
    Express: "/assets/logos/express.svg",
    "Express.js": "/assets/logos/express.svg",
    MySQL: "/assets/logos/mysql.svg",
  };
  return map[name] ?? "";
};

export default function Index() {
  const ENABLE_SCROLL_ANIMATIONS = true;
  useScrollReveal(ENABLE_SCROLL_ANIMATIONS);
  const [message, setMessage] = useState("");


  const timeoutFetch = (input, init = {}, ms = 1500) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), ms);
    return fetch(input, { ...init, signal: controller.signal }).finally(() => clearTimeout(id));
  };

  const isApiReachable = async () => {
    try {
      const pingUrl = `${window.location.origin}/api/ping`;
      const r = await timeoutFetch(pingUrl, { cache: "no-store" }, 1200);
      return r && r.ok;
    } catch (e) {
      // silent
      return false;
    }
  };

  const fetchDemo = async () => {
    try {
      const reachable = await isApiReachable();
      if (!reachable) {
        // skip network request in environments where the API isn't proxied (preview/dev host)
        // avoid noisey errors by silently falling back to a local message
        setMessage("");
        return;
      }

      const url = `${window.location.origin}/api/demo`;
      const res = await timeoutFetch(url, { cache: "no-store", credentials: "same-origin" }, 3000);
      if (!res || !res.ok) {
        // don't throw raw fetch errors to the console to avoid clutter from third-party wrappers
        setMessage("");
        return;
      }
      const data = await res.json();
      setMessage(data?.message ?? "");
    } catch (err) {
      // Non-fatal - keep UI clean in environments without a reachable API
      console.debug("fetchDemo skipped or failed:", err instanceof Error ? err.message : err);
      setMessage("");
    }
  };

  const [stack, setStack] = useState("fe");
  const projects = useMemo(
    () =>
      [
        { 
          title: "Zentalk", 
          tech: ["React", "Vite", "Node.js"], 
          desc: "Full-Stack Real-Time Chat Application with private messaging, friend requests, and real-time communication.",
          image: "/images/zentalk-screenshot.png",
          liveUrl: "https://chat-application-beta-sage.vercel.app/",
          sourceUrl: "https://github.com/Mukul-15/Chat-application"
        },
        { 
          title: "Bank Management System", 
          tech: ["Python"], 
          desc: "Secure Python-based bank management system with user authentication and transaction handling.",
          image: "/images/bank-management.png",
          liveUrl: null,
          sourceUrl: "https://github.com/Mukul-15/bank-management-project"
        },
      ],
    [],
  );

  const railRef = useRef(null);
  const scrollBy = (delta) => railRef.current?.scrollBy({ left: delta, behavior: "smooth" });

  return (
    <main className="relative">
      {/* Hero */}
      <section className="container pt-16 pb-20 lg:pt-28 lg:pb-28 scroll-mt-24" data-reveal>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm tracking-[0.2em] text-muted-foreground">PORTFOLIO</p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Hi, I am <span className="text-primary">Mukul</span>.
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              I craft fast, accessible web experiences with React and modern tooling. I care about thoughtful UX,
              clean code, and shipping reliable features that feel great to use.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild className="shadow-[0_0_0_3px_hsl(var(--primary)/0.2)] btn-glow">
                <a href="#projects">View Projects</a>
              </Button>
              <Button variant="outline" asChild className="btn-glow">
                <a href="#contact">Get in touch</a>
              </Button>

              <div className="ml-2 flex items-center gap-2 text-muted-foreground">
                <a aria-label="GitHub" href="https://github.com/Mukul-15" target="_blank" rel="noopener noreferrer" className="rounded-md border border-border/40 p-2 hover:border-primary hover:text-primary transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a aria-label="LinkedIn" href="https://www.linkedin.com/in/mukul-verma-982a40341?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="rounded-md border border-border/40 p-2 hover:border-primary hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a aria-label="Email" href="mailto:mukulclg1@gmail.com" className="rounded-md border border-border/40 p-2 hover:border-primary hover:text-primary transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
            {message && <p className="mt-4 text-xs text-muted-foreground">{message}</p>}
          </div>

          <div className="relative">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-xl border border-border/60 bg-card shadow-xl motion-safe:animate-float-slow transition-transform duration-500 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_25px_80px_-30px_hsl(var(--primary))]">
              <img src="/images/profile.png" alt="Profile" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="container py-12 lg:py-16 scroll-mt-24" data-reveal>
        <h2 className="text-2xl font-bold sm:text-3xl">About Me</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          I actively participate in the tech community: four hackathons so far—including Fluxus at IIT Indore—and I'm currently competing in the Smart India Hackathon. I've also completed two intensive 2‑day workshops: AI/ML at IIT Bombay and Web Development at IIT Indore. These experiences sharpen how I solve problems quickly, collaborate under pressure, and present results clearly.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <FeatureCard className="card-interactive" icon={<Trophy className="h-5 w-5" />} title="Hackathons & Seminars" desc="Hands‑on experience at IIT Indore (Fluxus) and the ongoing Smart India Hackathon; AI/ML at IIT Bombay and Web Dev at IIT Indore." />
          <FeatureCard className="card-interactive" icon={<PanelsTopLeft className="h-5 w-5" />} title="Modern Web" desc="Performance‑focused, accessible UIs with clean, scalable architecture." />
          <FeatureCard className="card-interactive" icon={<MessageSquareCode className="h-5 w-5" />} title="Clear Communication" desc="Concise updates and documentation that keep everyone aligned." />
        </div>
        <div className="mt-8 flex gap-4">
          <Button asChild>
            <a href="#contact">Work with me</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#projects">See projects</a>
          </Button>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="container py-12 lg:py-16 scroll-mt-24" data-reveal>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold sm:text-3xl">Skills</h2>
          <div className="inline-flex rounded-md border border-border/60 p-1">
            <button className={cn("rounded-md px-3 py-1 text-sm transition-colors", stack === "fe" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground")} onClick={() => setStack("fe")}>
              Frontend
            </button>
            <button className={cn("rounded-md px-3 py-1 text-sm transition-colors", stack === "be" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground")} onClick={() => setStack("be")}>
              Backend
            </button>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(
            stack === "fe"
              ? [
                  { label: "React", logo: logoSrc("React") },
                  { label: "HTML", logo: logoSrc("HTML") },
                  { label: "CSS", logo: logoSrc("CSS") },
                  { label: "JavaScript", logo: logoSrc("JavaScript") },
                ]
              : [
                  { label: "Node.js", logo: logoSrc("Node.js") },
                  { label: "Express.js", logo: logoSrc("Express.js") },
                  { label: "MySQL", logo: logoSrc("MySQL") },
                ]
          ).map((s) => (
            <div key={s.label} data-reveal className="flex items-center justify-between rounded-lg border border-border/60 bg-secondary/40 px-4 py-3 text-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-18px_hsl(var(--primary))]">
              <span className="flex items-center gap-2">
                {s.logo ? (
                  <img src={s.logo} alt="" className="h-4 w-4" />
                ) : (
                  <Code2 className="h-4 w-4 text-primary" />
                )}
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="container py-12 lg:py-16 scroll-mt-24" data-reveal>
        <h2 className="text-2xl font-bold sm:text-3xl">Projects</h2>
        <p className="mt-2 text-muted-foreground">A selection of recent work and experiments.</p>
        <div className="relative mt-6">
          <button aria-label="Previous" onClick={() => scrollBy(-360)} className="absolute -left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border/60 bg-background p-2 shadow hover:text-primary">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div ref={railRef} className="flex gap-4 overflow-x-auto scroll-smooth rounded-xl p-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {projects.map((p, i) => (
              <article key={i} data-reveal className="min-w-[280px] max-w-[320px] flex-1 rounded-xl border border-border/60 bg-card p-4 card-interactive">
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-3 font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {p.tech.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-secondary/40 px-2 py-1">
                      {logoSrc(t) && <img src={logoSrc(t)} alt="" className="h-3.5 w-3.5" />}
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-4 text-sm">
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">Live Demo <ArrowRight className="h-4 w-4" /></a>
                  )}
                  <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:underline">Source</a>
                </div>
              </article>
            ))}
          </div>
          <button aria-label="Next" onClick={() => scrollBy(360)} className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border/60 bg-background p-2 shadow hover:text-primary">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container pb-24 pt-12 lg:pb-32 lg:pt-16 scroll-mt-24" data-reveal>
        <h2 className="text-2xl font-bold sm:text-3xl">Contact</h2>
        <p className="mt-2 text-muted-foreground">Let's build something great together.</p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <a href="mailto:mukulclg1@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Mail className="h-4 w-4" />
            mukulclg1@gmail.com
          </a>
          <a href="tel:+918269869011" className="flex items-center gap-2 hover:text-primary transition-colors">
            <span className="h-4 w-4 flex items-center justify-center text-xs">📞</span>
            +91 8269869011
          </a>
          <a href="https://github.com/Mukul-15" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/mukul-verma-982a40341?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
        <form
          className="mt-6 grid gap-4 rounded-2xl border border-border/60 bg-card p-6 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const fd = new FormData(form);
            console.log(Object.fromEntries(fd.entries()));
            form.reset();
          }}
        >
          <div className="sm:col-span-1">
            <label className="mb-2 block text-sm text-muted-foreground" htmlFor="name">Your name</label>
            <input id="name" name="name" required className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none ring-offset-background focus:ring-2 focus:ring-ring" />
          </div>
          <div className="sm:col-span-1">
            <label className="mb-2 block text-sm text-muted-foreground" htmlFor="email">Your email</label>
            <input id="email" name="email" type="email" required className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none ring-offset-background focus:ring-2 focus:ring-ring" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm text-muted-foreground" htmlFor="phone">Your phone number (optional)</label>
            <input id="phone" name="phone" type="tel" className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none ring-offset-background focus:ring-2 focus:ring-ring" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm text-muted-foreground" htmlFor="message">Your message</label>
            <textarea id="message" name="message" rows={5} required className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none ring-offset-background focus:ring-2 focus:ring-ring" />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" className="w-full">Send Message ✦</Button>
          </div>
        </form>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, desc, className }) {
  return (
    <div data-reveal className={cn("group relative overflow-hidden rounded-xl border border-border/60 bg-card p-4", className)}>
      <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ boxShadow: "0 0 0 1px hsl(var(--primary)) inset, 0 0 120px -40px hsl(var(--primary))" }} />
      <div className="relative flex items-start gap-3">
        <div className="rounded-md border border-border/60 bg-secondary/50 p-2 text-primary">{icon}</div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>
    </div>
  );
}
