import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import LocomotiveScroll from 'locomotive-scroll';
import type Lenis from 'lenis';

import './styles/index.scss';

import Navbar from './components/Navbar';
import DotGrid from './components/DotGrid';
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import ExperienceSection from './sections/ExperienceSection';
import ContactSection from './sections/ContactSection';

export const PANEL_COUNT = 5;

function App() {
  const locoRef = useRef<LocomotiveScroll | null>(null);
  const globalProgress = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track active section from scroll progress
  useMotionValueEvent(globalProgress, 'change', (latest) => {
    const idx = Math.min(
      PANEL_COUNT - 1,
      Math.max(0, Math.round(latest * (PANEL_COUNT - 1))),
    );
    setActiveIndex(idx);
  });

  // Horizontal track — map 0→1 progress to 0→-400vw translation
  const x = useTransform(
    globalProgress,
    [0, 1],
    ['0vw', `-${(PANEL_COUNT - 1) * 100}vw`],
  );

  useEffect(() => {
    const loco = new LocomotiveScroll({
      lenisOptions: {
        lerp: 0.08,
        smoothWheel: true,
      },
      scrollCallback: (lenisInstance: Lenis) => {
        globalProgress.set(lenisInstance.progress);
      },
    });

    locoRef.current = loco;

    return () => {
      loco.destroy();
      locoRef.current = null;
    };
  }, [globalProgress]);

  const navigateTo = (index: number) => {
    if (!locoRef.current?.lenisInstance) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const target = (index / (PANEL_COUNT - 1)) * maxScroll;
    locoRef.current.lenisInstance.scrollTo(target, { duration: 1.2 });
  };

  return (
    <>
      <DotGrid />
      <Navbar activeIndex={activeIndex} onNavigate={navigateTo} />
      <div className="scroll-wrapper">
        <div className="scroll-sticky">
          <motion.div className="scroll-track" style={{ x }}>
            <HomeSection
              index={0}
              globalProgress={globalProgress}
              isActive={activeIndex === 0}
              onNavigate={navigateTo}
            />
            <AboutSection
              index={1}
              globalProgress={globalProgress}
              isActive={activeIndex === 1}
            />
            <ProjectsSection
              index={2}
              globalProgress={globalProgress}
              isActive={activeIndex === 2}
            />
            <ExperienceSection
              index={3}
              globalProgress={globalProgress}
              isActive={activeIndex === 3}
            />
            <ContactSection
              index={4}
              globalProgress={globalProgress}
              isActive={activeIndex === 4}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default App;
