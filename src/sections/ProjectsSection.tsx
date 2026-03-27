import { useState } from 'react';
import { motion, AnimatePresence, useTransform, MotionValue } from 'framer-motion';
import { projects } from '../data/portfolio';
import { PANEL_COUNT } from '../App';

import salesGif from '../assets/gif/horizon-sales.gif';
import appGif   from '../assets/gif/horizon-app.gif';

const GIF_MAP: Record<string, string> = {
  'horizon-sales': salesGif,
  'horizon-app':   appGif,
};

type Tab = 'website' | 'app';

interface ProjectsSectionProps {
  index: number;
  globalProgress: MotionValue<number>;
  isActive: boolean;
}

const ProjectsSection = ({ index, globalProgress }: ProjectsSectionProps) => {
  const sectionCenter = index / (PANEL_COUNT - 1);
  const [activeTab, setActiveTab] = useState<Tab>('website');

  const headerY = useTransform(
    globalProgress,
    [sectionCenter - 0.3, sectionCenter, sectionCenter + 0.3],
    [50, 0, -30],
  );
  const contentY = useTransform(
    globalProgress,
    [sectionCenter - 0.3, sectionCenter, sectionCenter + 0.3],
    [70, 0, -20],
  );
  const opacity = useTransform(
    globalProgress,
    [sectionCenter - 0.25, sectionCenter, sectionCenter + 0.25],
    [0, 1, 0.6],
  );

  const [sales, app] = projects;
  const active = activeTab === 'website' ? sales : app;

  return (
    <section className="panel projects-panel" aria-label="Projects">
      <motion.div className="projects-inner" style={{ opacity }}>

        {/* Header */}
        <motion.div className="projects-header" style={{ y: headerY }}>
          <p className="section-eyebrow">Previous Work</p>
          <h2 className="projects-company">Horizon Sales</h2>
          <p className="projects-desc">
            Latest projects include working with Horizon to develop their
            software needs — from building a website to an app and backend,
            incorporating their data collection, analysis and goal
            implementation needs.
          </p>
        </motion.div>

        {/* Tab toggles */}
        <motion.div className="project-tabs" style={{ y: contentY }}>
          <button
            className={`tab-btn${activeTab === 'website' ? ' tab-btn--active' : ''}`}
            onClick={() => setActiveTab('website')}
          >
            Website
          </button>
          <button
            className={`tab-btn${activeTab === 'app' ? ' tab-btn--active' : ''}`}
            onClick={() => setActiveTab('app')}
          >
            App
          </button>
        </motion.div>

        {/* Animated bento content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className={`project-bento project-bento--${activeTab}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {/* Gif tile */}
            <div className="bt bt--gif">
              <img src={GIF_MAP[active.id]} alt={`${active.title} preview`} />
            </div>

            {/* Features tile */}
            <div className="bt bt--feat">
              <ul className="project-features">
                {active.features.map((f) => (
                  <li key={f.label}>{f.label}</li>
                ))}
              </ul>
            </div>

            {/* Description tile */}
            <div className="bt bt--desc">
              <p>{active.description}</p>
            </div>

            {/* Skills tile */}
            <div className="bt bt--skills">
              {active.skills.map((s) => (
                <span key={s} className="skill-tag">{s}</span>
              ))}
            </div>

            {/* Live page tile — website only */}
            {activeTab === 'website' && (
              <div className="bt bt--live">
                <a href={sales.url} target="_blank" rel="noopener noreferrer">
                  Live Page ↗
                </a>
              </div>
            )}

            {/* Code tile */}
            <div className="bt bt--code">
              <a href={active.codeUrl ?? '#'} target="_blank" rel="noopener noreferrer">
                Code ↗
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

      </motion.div>
    </section>
  );
};

export default ProjectsSection;
