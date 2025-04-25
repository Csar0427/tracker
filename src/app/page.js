import Navbar from "./navbar";
import Hero from "./section/Hero";
import Features from "./section/Features";
import Partnership from "./section/Partnership";
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Hero />
      <Features />
      <Partnership />
    </>
  );
}
