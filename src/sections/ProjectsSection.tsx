import { motion, useTransform, MotionValue } from 'framer-motion';
import { projects } from '../data/portfolio';
import { PANEL_COUNT } from '../App';

interface ProjectsSectionProps {
  index: number;
  globalProgress: MotionValue<number>;
  isActive: boolean;
}

const ProjectsSection = ({ index, globalProgress }: ProjectsSectionProps) => {
  const sectionCenter = index / (PANEL_COUNT - 1);

  const headerY = useTransform(
    globalProgress,
    [sectionCenter - 0.3, sectionCenter, sectionCenter + 0.3],
    [50, 0, -30],
  );
  const cardsY = useTransform(
    globalProgress,
    [sectionCenter - 0.3, sectionCenter, sectionCenter + 0.3],
    [80, 0, -20],
  );
  const opacity = useTransform(
    globalProgress,
    [sectionCenter - 0.25, sectionCenter, sectionCenter + 0.25],
    [0, 1, 0.6],
  );

  return (
    <section className="panel projects-panel" aria-label="Projects">
      <motion.div className="projects-inner" style={{ opacity }}>
        <motion.div className="projects-header" style={{ y: headerY }}>
          <p className="section-eyebrow">Previous Work</p>
          <h2 className="section-title">Projects.</h2>
        </motion.div>

        <motion.div className="projects-grid" style={{ y: cardsY }}>
          {projects.map((project) => (
            <motion.article
              key={project.id}
              className="project-card"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="project-card__name">{project.title}</h3>
              <p className="project-card__desc">{project.description}</p>
              <ul className="project-card__features">
                {project.features.map((f) => (
                  <li key={f.label} className="project-card__feature-item">
                    <span>·</span>
                    <span>{f.label}</span>
                  </li>
                ))}
              </ul>
              <div className="project-card__footer">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link"
                >
                  Live Page ↗
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
