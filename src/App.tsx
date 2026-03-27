import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  animate,
} from 'framer-motion';

import './styles/index.scss';

import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import DotGrid from './components/DotGrid';
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import ExperienceSection from './sections/ExperienceSection';
import ContactSection from './sections/ContactSection';

export const PANEL_COUNT = 5;

function App() {
  const globalProgress = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Keep activeIndex in sync with scroll progress
  useMotionValueEvent(globalProgress, 'change', (latest) => {
    const idx = Math.min(
      PANEL_COUNT - 1,
      Math.max(0, Math.round(latest * (PANEL_COUNT - 1))),
    );
    setActiveIndex(idx);
  });

  // Map 0→1 progress to horizontal translation
  const x = useTransform(
    globalProgress,
    [0, 1],
    ['0vw', `-${(PANEL_COUNT - 1) * 100}vw`],
  );

  useEffect(() => {
    let isSnapping = false;

    const snapTo = (index: number) => {
      isSnapping = true;
      animate(globalProgress, index / (PANEL_COUNT - 1), {
        duration: 0.85,
        ease: [0.76, 0, 0.24, 1],
        onComplete: () => { isSnapping = false; },
      });
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isSnapping) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const current = Math.round(globalProgress.get() * (PANEL_COUNT - 1));
      const next = Math.max(0, Math.min(PANEL_COUNT - 1, current + direction));

      if (next !== current) snapTo(next);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [globalProgress]);

  const navigateTo = (index: number) => {
    animate(globalProgress, index / (PANEL_COUNT - 1), {
      duration: 0.85,
      ease: [0.76, 0, 0.24, 1],
    });
  };

  return (
    <>
      <CustomCursor />
      <DotGrid
        dotSize={2}
        gap={28}
        baseColor="#444444"
        activeColor="#ff7a00"
        proximity={90}
        speedTrigger={300}
        shockRadius={140}
        shockStrength={2}
        resistance={1400}
        returnDuration={1.2}
      />
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
