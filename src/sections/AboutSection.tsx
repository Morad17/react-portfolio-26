import { useState, useRef, useEffect } from "react";
import { motion, useTransform, MotionValue, Variants, useMotionValueEvent } from "framer-motion";
import { modelSkills, otherSkills } from "../data/portfolio";
import { PANEL_COUNT } from "../App";
import { useIsMobile } from "../hooks/useIsMobile";
import SkillModel from "../components/SkillModel";

const MODEL_MAP: Record<string, string> = {
  react: "/models/react_logo.glb",
  javascript: "/models/javascript_logo__3d_model.glb",
  typescript: "/models/typescript_logo__3d_model.glb",
  nodejs: "/models/node.js_logo__3d_model.glb",
  aws: "/models/aws_logo.glb",
  mysql: "/models/mySql.glb",
  github: "/models/github.glb",
};

const LOCO_EASE = [0.25, 0.46, 0.45, 0.94] as const;

type ItemCustom = { y?: number; delay?: number; duration?: number };
type TagsCustom = { delayChildren?: number };

const itemVariants: Variants = {
  hidden: (c: ItemCustom = {}) => ({ opacity: 0, y: c.y ?? 50 }),
  visible: (c: ItemCustom = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: c.duration ?? 0.75,
      delay: c.delay ?? 0,
      ease: LOCO_EASE,
    },
  }),
};

const tagsContainerVariants: Variants = {
  hidden: {},
  visible: (c: TagsCustom = {}) => ({
    transition: { delayChildren: c.delayChildren ?? 0 },
  }),
};

const colVariants: Variants = {
  hidden: {},
  visible: {},
};

interface AboutSectionProps {
  index: number;
  globalProgress: MotionValue<number>;
  isActive: boolean;
}

const AboutSection = ({ index, globalProgress, isActive }: AboutSectionProps) => {
  const sectionCenter = index / (PANEL_COUNT - 1);
  const isMobile = useIsMobile();
  const isMobileRef = useRef(isMobile);
  useEffect(() => { isMobileRef.current = isMobile; }, [isMobile]);

  const [activeModel, setActiveModel] = useState("react");
  const [isHere, setIsHere] = useState(false);

  useMotionValueEvent(globalProgress, "change", (latest) => {
    if (isMobileRef.current) return;
    setIsHere(Math.abs(latest - sectionCenter) < 0.2);
  });

  // Always call — rules of hooks
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

  const bioLines = [
    "A frontend developer from the UK.",
    "My mission is to create practical and aesthetic",
    "projects that help users achieve their goals",
    "and push beyond them.",
    "Nothing is too far fetched to achieve.",
    "If you have a project in mind, or a killer idea,",
    "send me a message.",
  ];

  if (isMobile) {
    const vis = isActive ? "mob-visible" : "";
    return (
      <section className="panel about-panel" aria-label="About">
        <div className="about-inner">
          <div className={`about-left mob-animate ${vis}`}>
            <p className="section-eyebrow">About Me</p>
            <h2 className="section-title">
              Built for the<br />details.
            </h2>
            <div className="about-bio">
              <p className="about-bio-start">Hi, I'm Morad</p>
              <p className="about-bio-text">
                {bioLines.map((line, i) => (
                  <span key={i} style={{ display: "block" }}>{line}</span>
                ))}
              </p>
            </div>
          </div>

          <div className={`about-right mob-animate ${vis}`} style={{ transitionDelay: "0.1s" }}>
            <p className="about-skills-label">Tech &amp; Tools</p>

            <div className="skill-model-viewer">
              <SkillModel url={MODEL_MAP[activeModel]} />
            </div>

            <div className="about-tags">
              {modelSkills.map((skill) => (
                <span
                  key={skill.model}
                  className={`tag tag--model${activeModel === skill.model ? " tag--active" : ""}`}
                  onTouchStart={() => setActiveModel(skill.model)}
                >
                  {skill.label}
                </span>
              ))}
            </div>

            <p className="about-skills-label about-skills-label--sub">Other</p>

            <div className="about-tags">
              {otherSkills.map((skill) => (
                <span key={skill} className="tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="panel about-panel" aria-label="About">
      <motion.div className="about-inner" style={{ opacity }}>

        <motion.div
          className="about-left"
          style={{ x: leftX }}
          variants={colVariants}
          initial="hidden"
          animate={isHere ? "visible" : "hidden"}
        >
          <motion.p
            className="section-eyebrow"
            variants={itemVariants}
            custom={{ y: 40, delay: 0, duration: 0.65 }}
          >
            About Me
          </motion.p>
          <motion.h2
            className="section-title"
            variants={itemVariants}
            custom={{ y: 65, delay: 0.14, duration: 0.9 }}
          >
            Built for the
            <br />
            details.
          </motion.h2>
          <div className="about-bio">
            <motion.p
              className="about-bio-start"
              variants={itemVariants}
              custom={{ y: 45, delay: 0.3, duration: 0.8 }}
            >
              Hi, I'm Morad
            </motion.p>
            <p className="about-bio-text">
              {bioLines.map((line, i) => (
                <motion.span
                  key={i}
                  variants={itemVariants}
                  custom={{ y: 20, delay: 0.48 + i * 0.1, duration: 0.7 }}
                  style={{ display: "block" }}
                >
                  {line}
                </motion.span>
              ))}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="about-right"
          style={{ x: rightX }}
          variants={colVariants}
          initial="hidden"
          animate={isHere ? "visible" : "hidden"}
        >
          <motion.p
            className="about-skills-label"
            variants={itemVariants}
            custom={{ y: 40, delay: 0.08, duration: 0.65 }}
          >
            Tech &amp; Tools
          </motion.p>

          <motion.div
            className="skill-model-viewer"
            variants={itemVariants}
            custom={{ y: 80, delay: 0.2, duration: 1.0 }}
          >
            <SkillModel url={MODEL_MAP[activeModel]} />
          </motion.div>

          <motion.div
            className="about-tags"
            variants={tagsContainerVariants}
            custom={{ delayChildren: 0.36 }}
          >
            {modelSkills.map((skill, i) => (
              <motion.span
                key={skill.model}
                variants={itemVariants}
                custom={{ y: 22 + i * 6, delay: i * 0.1, duration: 0.55 + i * 0.03 }}
                className={`tag tag--model${activeModel === skill.model ? " tag--active" : ""}`}
                onMouseEnter={() => setActiveModel(skill.model)}
                whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
              >
                {skill.label}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            className="about-skills-label about-skills-label--sub"
            variants={itemVariants}
            custom={{ y: 40, delay: 0.56, duration: 0.65 }}
          >
            Other
          </motion.p>

          <motion.div
            className="about-tags"
            variants={tagsContainerVariants}
            custom={{ delayChildren: 0.66 }}
          >
            {otherSkills.map((skill, i) => (
              <motion.span
                key={skill}
                variants={itemVariants}
                custom={{ y: 22 + i * 6, delay: i * 0.1, duration: 0.55 + i * 0.03 }}
                className="tag"
                whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default AboutSection;
