import "./global.css";

import { Toaster } from "@/components/ui/toaster.jsx";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner.jsx";
import { TooltipProvider } from "@/components/ui/tooltip.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Button } from "@/components/ui/button.jsx";

const queryClient = new QueryClient();

const Header = () => (
  <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur">
    <div className="container flex h-14 items-center justify-between">
      <a href="/" className="text-lg font-extrabold">
        <span className="text-primary">Mukul</span>
        <span className="text-muted-foreground">.dev</span>
      </a>
      <nav className="hidden gap-6 text-sm sm:flex">
        <a href="#about" className="text-muted-foreground hover:text-foreground">About</a>
        <a href="#skills" className="text-muted-foreground hover:text-foreground">Skills</a>
        <a href="#projects" className="text-muted-foreground hover:text-foreground">Projects</a>
        <a href="#contact" className="text-muted-foreground hover:text-foreground">Contact</a>
      </nav>
      <div className="hidden sm:block">
        <Button asChild size="sm"><a href="#contact">Contact me</a></Button>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="border-t border-border/40 py-8 text-sm text-muted-foreground">
    <div className="container flex items-center justify-between">
      <p>© {new Date().getFullYear()} Mukul. All rights reserved.</p>
      <a href="#top" className="hover:text-primary">Back to top</a>
    </div>
  </footer>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")).render(<App />);
