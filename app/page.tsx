import { About } from "../components/About";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { Projects } from "../components/Projects";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
