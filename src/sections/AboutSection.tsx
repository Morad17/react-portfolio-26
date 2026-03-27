import { useState } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { modelSkills, otherSkills } from '../data/portfolio';
import { PANEL_COUNT } from '../App';
import SkillModel from '../components/SkillModel';

const MODEL_MAP: Record<string, string> = {
  react:      '/models/react_logo.glb',
  javascript: '/models/javascript_logo__3d_model.glb',
  typescript: '/models/typescript_logo__3d_model.glb',
  nodejs:     '/models/node.js_logo__3d_model.glb',
  aws:        '/models/aws_logo.glb',
  mysql:      '/models/mySql.glb',
  github:     '/models/github.glb',
};

interface AboutSectionProps {
  index: number;
  globalProgress: MotionValue<number>;
  isActive: boolean;
}

const AboutSection = ({ index, globalProgress }: AboutSectionProps) => {
  const sectionCenter = index / (PANEL_COUNT - 1);
  const [activeModel, setActiveModel] = useState('react');

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
            Hi, I'm Morad — a frontend developer from the UK. My mission
            is to create practical and aesthetic solutions that help users
            achieve their goals and push beyond them. If you have a project
            in mind, or a killer idea, send me a message.
          </p>
        </motion.div>

        {/* Right column */}
        <motion.div className="about-right" style={{ x: rightX }}>
          <p className="about-skills-label">Tech &amp; Tools</p>

          {/* 3D model viewer */}
          <div className="skill-model-viewer">
            <SkillModel url={MODEL_MAP[activeModel]} />
          </div>

          {/* Model skill pills */}
          <div className="about-tags">
            {modelSkills.map((skill) => (
              <motion.span
                key={skill.model}
                className={`tag tag--model${activeModel === skill.model ? ' tag--active' : ''}`}
                onMouseEnter={() => setActiveModel(skill.model)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.15 }}
              >
                {skill.label}
              </motion.span>
            ))}
          </div>

          {/* Other skills */}
          <p className="about-skills-label about-skills-label--sub">Other</p>
          <div className="about-tags">
            {otherSkills.map((skill) => (
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
