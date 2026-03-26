import { motion, useTransform, MotionValue } from 'framer-motion';
import { skills } from '../data/portfolio';
import { PANEL_COUNT } from '../App';

interface AboutSectionProps {
  index: number;
  globalProgress: MotionValue<number>;
  isActive: boolean;
}

const AboutSection = ({ index, globalProgress }: AboutSectionProps) => {
  const sectionCenter = index / (PANEL_COUNT - 1);

  const leftX = useTransform(
    globalProgress,
    [sectionCenter - 0.3, sectionCenter, sectionCenter + 0.3],
    [60, 0, -40],
  );
  const rightX = useTransform(
    globalProgress,
    [sectionCenter - 0.3, sectionCenter, sectionCenter + 0.3],
    [-60, 0, 40],
  );
  const opacity = useTransform(
    globalProgress,
    [sectionCenter - 0.25, sectionCenter, sectionCenter + 0.25],
    [0, 1, 0.6],
  );

  return (
    <section className="panel about-panel" aria-label="About">
      <motion.div className="about-inner" style={{ opacity }}>
        {/* Left column */}
        <motion.div className="about-left" style={{ x: leftX }}>
          <p className="section-eyebrow">About Me</p>
          <h2 className="section-title">
            Built for the
            <br />
            details.
          </h2>
          <p className="about-bio">
            Hi, I&rsquo;m Morad — a frontend developer from the UK.
            Aesthetics, application, and avant-garde thinking are the factors I
            consider most when designing projects. My tools of choice are
            primarily React, SCSS &amp; Node, with others implemented based on
            the project. If you have a project in mind, or a killer idea, send
            me a message.
          </p>
        </motion.div>

        {/* Right column */}
        <motion.div className="about-right" style={{ x: rightX }}>
          <p className="about-skills-label">Tech &amp; Tools</p>
          <div className="about-tags">
            {skills.map((skill) => (
              <motion.span
                key={skill}
                className="tag"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.15 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
