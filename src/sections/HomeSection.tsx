import { motion, useTransform, MotionValue } from 'framer-motion';
import { PANEL_COUNT } from '../App';

interface HomeSectionProps {
  index: number;
  globalProgress: MotionValue<number>;
  isActive: boolean;
  onNavigate: (index: number) => void;
}

const HomeSection = ({ index, globalProgress, onNavigate }: HomeSectionProps) => {
  const sectionCenter = index / (PANEL_COUNT - 1);

  // Subtle entrance: content slides up as section comes into focus
  const contentY = useTransform(
    globalProgress,
    [sectionCenter - 0.3, sectionCenter, sectionCenter + 0.3],
    [40, 0, -30],
  );
  const contentOpacity = useTransform(
    globalProgress,
    [sectionCenter - 0.25, sectionCenter, sectionCenter + 0.25],
    [0, 1, 0.6],
  );

  return (
    <section className="panel home-panel" aria-label="Home">
      <motion.div
        className="home-inner"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className="home-eyebrow"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          Frontend Developer — UK
        </motion.p>

        <motion.h1
          className="home-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
        >
          Where creativity
          <br />
          meets code.
        </motion.h1>

        <motion.p
          className="home-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        >
          Crafting thoughtful digital solutions — balancing aesthetics with
          function.
        </motion.p>

        <motion.div
          className="home-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
        >
          <button
            className="btn btn--primary"
            onClick={() => onNavigate(2)}
          >
            View Work →
          </button>
          <button
            className="btn btn--ghost"
            onClick={() => onNavigate(4)}
          >
            Start a Project →
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HomeSection;
