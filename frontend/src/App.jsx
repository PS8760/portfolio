import { ThemeProvider } from './context/ThemeContext';
import Cursor from './components/Cursor';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Story from './components/Story';
import FilmStrip from './components/FilmStrip';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NowCoding from './components/NowCoding';

export default function App() {
  return (
    <ThemeProvider>
      <Cursor />
      <NowCoding />
      <Header />
      <main>
        <Hero />
        <About />
        <Story />
        <FilmStrip />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
