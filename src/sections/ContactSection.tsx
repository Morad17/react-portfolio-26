import { useState } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { PANEL_COUNT } from "../App";
import { useIsMobile } from "../hooks/useIsMobile";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type StatusType = "" | "success" | "error" | "sending";

interface ContactSectionProps {
  index: number;
  globalProgress: MotionValue<number>;
  isActive: boolean;
}

const ContactSection = ({
  index,
  globalProgress,
  isActive,
}: ContactSectionProps) => {
  const sectionCenter = index / (PANEL_COUNT - 1);
  const isMobile = useIsMobile();

  // Always call — rules of hooks
  const leftY = useTransform(
    globalProgress,
    [sectionCenter - 0.3, sectionCenter, sectionCenter + 0.3],
    [60, 0, -30],
  );
  const rightY = useTransform(
    globalProgress,
    [sectionCenter - 0.3, sectionCenter, sectionCenter + 0.3],
    [80, 0, -20],
  );
  const opacity = useTransform(
    globalProgress,
    [sectionCenter - 0.25, sectionCenter, sectionCenter + 0.25],
    [0, 1, 0.6],
  );

  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<StatusType>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    setStatus("Sending…");
    setStatusType("sending");
    emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY).then(
      () => {
        setStatus("Message sent!");
        setStatusType("success");
        reset();
        setTimeout(() => {
          setStatus("");
          setStatusType("");
        }, 4000);
      },
      () => {
        setStatus("Failed to send. Please try again.");
        setStatusType("error");
        setTimeout(() => {
          setStatus("");
          setStatusType("");
        }, 5000);
      },
    );
  };

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-group">
        <label className="form-label" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          className="form-input"
          type="text"
          placeholder="Your name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <span className="form-status form-status--error">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="form-input"
          type="email"
          placeholder="your@email.com"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
        />
        {errors.email && (
          <span className="form-status form-status--error">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          className="form-textarea"
          placeholder="Tell me about your project…"
          {...register("message", { required: "Message is required" })}
        />
        {errors.message && (
          <span className="form-status form-status--error">
            {errors.message.message}
          </span>
        )}
      </div>

      {isMobile ? (
        <button
          type="submit"
          className="btn btn--primary"
          style={{ marginTop: "0.5rem", width: "100%" }}
        >
          Send Message
        </button>
      ) : (
        <motion.button
          type="submit"
          className="btn btn--primary"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          style={{ marginTop: "0.5rem", width: "100%" }}
        >
          Send Message
        </motion.button>
      )}

      {status && (
        <p className={`form-status form-status--${statusType}`}>{status}</p>
      )}
    </form>
  );

  if (isMobile) {
    const vis = isActive ? "mob-visible" : "";
    return (
      <section className="panel contact-panel" aria-label="Contact">
        <div className="contact-inner">
          <div className={`contact-left mob-animate ${vis}`}>
            <p className="section-eyebrow">Get in Touch</p>
            <h2 className="section-title">Contact Me.</h2>
            <a href="mailto:contact@morad.ink" className="contact-email">
              contact@itsmorad.com
            </a>
            <p className="contact-tagline">Drop me a message.</p>
          </div>

          <div
            className={`contact-right mob-animate ${vis}`}
            style={{ transitionDelay: "0.1s" }}
          >
            {formContent}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="panel contact-panel" aria-label="Contact">
      <motion.div className="contact-inner" style={{ opacity }}>
        <motion.div className="contact-left" style={{ y: leftY }}>
          <p className="section-eyebrow">Get in Touch</p>
          <h2 className="section-title">Contact Me.</h2>
          <a href="mailto:contact@morad.ink" className="contact-email">
            contact@morad.ink
          </a>
          <p className="contact-tagline">Drop me a message.</p>
        </motion.div>

        <motion.div className="contact-right" style={{ y: rightY }}>
          {formContent}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
