import { createContext, useContext, useEffect, useState } from 'react';

export const fontOptions = [
  {
    id: 'space-syne',
    label: 'Space Grotesk',
    sub: 'Syne',
    body: "'Space Grotesk', sans-serif",
    heading: "'Syne', sans-serif",
    preview: 'Aa',
  },
  {
    id: 'inter-playfair',
    label: 'Inter',
    sub: 'Playfair Display',
    body: "'Inter', sans-serif",
    heading: "'Playfair Display', serif",
    preview: 'Aa',
  },
  {
    id: 'dm-playfair',
    label: 'DM Sans',
    sub: 'Playfair Display',
    body: "'DM Sans', sans-serif",
    heading: "'Playfair Display', serif",
    preview: 'Aa',
  },
  {
    id: 'outfit-bebas',
    label: 'Outfit',
    sub: 'Bebas Neue',
    body: "'Outfit', sans-serif",
    heading: "'Bebas Neue', cursive",
    preview: 'Aa',
  },
  {
    id: 'nunito-raleway',
    label: 'Nunito',
    sub: 'Raleway',
    body: "'Nunito', sans-serif",
    heading: "'Raleway', sans-serif",
    preview: 'Aa',
  },
];

const FontContext = createContext();

export function FontProvider({ children }) {
  const [fontId, setFontId] = useState(
    () => localStorage.getItem('portfolio-font') || 'space-syne'
  );

  const activeFont = fontOptions.find((f) => f.id === fontId) || fontOptions[0];

  useEffect(() => {
    document.documentElement.style.setProperty('--font-body', activeFont.body);
    document.documentElement.style.setProperty('--font-heading', activeFont.heading);
    localStorage.setItem('portfolio-font', fontId);
  }, [fontId, activeFont]);

  return (
    <FontContext.Provider value={{ fontId, setFontId, activeFont, fontOptions }}>
      {children}
    </FontContext.Provider>
  );
}

export const useFont = () => useContext(FontContext);
