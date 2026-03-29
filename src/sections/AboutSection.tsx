import { useState } from "react";
import { motion, useTransform, MotionValue, Variants, useMotionValueEvent } from "framer-motion";
import { modelSkills, otherSkills } from "../data/portfolio";
import { PANEL_COUNT } from "../App";
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

// Locomotive Scroll characteristic ease — smooth, weighted deceleration
const LOCO_EASE = [0.25, 0.46, 0.45, 0.94] as const;

type ItemCustom = { y?: number; delay?: number; duration?: number };
type TagsCustom = { delayChildren?: number };

// Each element drives its own timing via the `custom` prop
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

// Tags container sets the base delay; individual pills handle their own offsets
const tagsContainerVariants: Variants = {
  hidden: {},
  visible: (c: TagsCustom = {}) => ({
    transition: { delayChildren: c.delayChildren ?? 0 },
  }),
};

// Containers just propagate the animate state — no shared stagger
const colVariants: Variants = {
  hidden: {},
  visible: {},
};

interface AboutSectionProps {
  index: number;
  globalProgress: MotionValue<number>;
  isActive: boolean;
}

const AboutSection = ({ index, globalProgress }: AboutSectionProps) => {
  const sectionCenter = index / (PANEL_COUNT - 1);
  const [activeModel, setActiveModel] = useState("react");
  const [isHere, setIsHere] = useState(false);

  useMotionValueEvent(globalProgress, "change", (latest) => {
    setIsHere(Math.abs(latest - sectionCenter) < 0.2);
  });

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

        {/* Left column — each element has its own delay + travel */}
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
              {[
                "A frontend developer from the UK.",
                "My mission is to create practical and aesthetic",
                "projects that help users achieve their goals",
                "and push beyond them.",
                "Nothing is too far fetched to achieve.",
                "If you have a project in mind, or a killer idea,",
                "send me a message.",
              ].map((line, i) => (
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

        {/* Right column — offset start, heavier elements travel further */}
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
