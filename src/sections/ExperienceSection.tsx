import { motion, useTransform, MotionValue } from 'framer-motion';
import { experiences } from '../data/portfolio';
import { PANEL_COUNT } from '../App';
import { useIsMobile } from '../hooks/useIsMobile';

interface ExperienceSectionProps {
  index: number;
  globalProgress: MotionValue<number>;
  isActive: boolean;
}

const ExperienceSection = ({ index, globalProgress, isActive }: ExperienceSectionProps) => {
  const sectionCenter = index / (PANEL_COUNT - 1);
  const isMobile = useIsMobile();

  // Always call — rules of hooks
  const headerX = useTransform(
    globalProgress,
    [sectionCenter - 0.3, sectionCenter, sectionCenter + 0.3],
    [80, 0, -40],
  );
  const timelineY = useTransform(
    globalProgress,
    [sectionCenter - 0.3, sectionCenter, sectionCenter + 0.3],
    [60, 0, -30],
  );
  const lineScaleY = useTransform(
    globalProgress,
    [sectionCenter - 0.25, sectionCenter],
    [0, 1],
  );
  const opacity = useTransform(
    globalProgress,
    [sectionCenter - 0.25, sectionCenter, sectionCenter + 0.25],
    [0, 1, 0.6],
  );

  if (isMobile) {
    const vis = isActive ? 'mob-visible' : '';
    return (
      <section className="panel experience-panel" aria-label="Experience">
        <div className="experience-inner">
          <div className={`experience-header mob-animate ${vis}`}>
            <p className="section-eyebrow">Career</p>
            <h2 className="section-title">Experience.</h2>
          </div>

          <div className={`timeline mob-animate ${vis}`} style={{ transitionDelay: '0.1s' }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: '0.6rem',
                width: '1px',
                height: '100%',
                background: 'rgba(255,255,255,0.08)',
              }}
            />

            {experiences.map((exp, i) => (
              <div
                key={exp.id}
                className={`timeline-item mob-animate ${vis}`}
                style={{ transitionDelay: `${0.15 + i * 0.1}s` }}
              >
                <p className="timeline-period">{exp.period}</p>
                <h3 className="timeline-role">{exp.role}</h3>
                <p className="timeline-company">{exp.company}</p>
                <p className="timeline-desc">{exp.description}</p>
                <div className="timeline-tags">
                  {exp.tech.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="panel experience-panel" aria-label="Experience">
      <motion.div className="experience-inner" style={{ opacity }}>
        <motion.div className="experience-header" style={{ x: headerX }}>
          <p className="section-eyebrow">Career</p>
          <h2 className="section-title">Experience.</h2>
        </motion.div>

        <motion.div className="timeline" style={{ y: timelineY }}>
          <motion.div
            style={{
              position: 'absolute',
              left: 0,
              top: '0.6rem',
              width: '1px',
              height: '100%',
              background: 'rgba(255,255,255,0.08)',
              scaleY: lineScaleY,
              transformOrigin: 'top',
            }}
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              className="timeline-item"
              initial={{ opacity: 0, x: -20 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: 'easeOut' }}
            >
              <p className="timeline-period">{exp.period}</p>
              <h3 className="timeline-role">{exp.role}</h3>
              <p className="timeline-company">{exp.company}</p>
              <p className="timeline-desc">{exp.description}</p>
              <div className="timeline-tags">
                {exp.tech.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;
