import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Cursor from './components/Cursor';
import GlobalBackground from './components/GlobalBackground';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import SectionReveal from './components/SectionReveal';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Story from './components/Story';
import FilmStrip from './components/FilmStrip';
import Skills3D from './components/Skills3D';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NowCoding from './components/NowCoding';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <ThemeProvider>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <GlobalBackground />
      <ScrollProgress />
      <Cursor />
      <NowCoding />
      <Header />
      <main style={{ position: 'relative' }}>
        <Hero />
        <SectionReveal><About /></SectionReveal>
        <SectionReveal delay={50}><Story /></SectionReveal>
        <SectionReveal delay={50}><FilmStrip /></SectionReveal>
        <SectionReveal delay={50}><Skills3D /></SectionReveal>
        <SectionReveal delay={50}><Projects /></SectionReveal>
        <SectionReveal delay={50}><Contact /></SectionReveal>
      </main>
      <Footer />
    </ThemeProvider>
  );
}
