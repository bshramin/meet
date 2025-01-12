import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import ProductOverview from "./components/ProductOverview";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductOverview />
    </>
  );
}
