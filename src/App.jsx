import Hero3D from './components/Hero3D';
import AboutFloatingCards from './components/AboutFloatingCards';
import PortfolioSpace from './components/PortfolioSpace';
import ContactCTA from './components/ContactCTA';

function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white selection:bg-cyan-300/30 selection:text-white">
      <Hero3D />
      <AboutFloatingCards />
      <PortfolioSpace />
      <ContactCTA />
    </div>
  );
}

export default App;
