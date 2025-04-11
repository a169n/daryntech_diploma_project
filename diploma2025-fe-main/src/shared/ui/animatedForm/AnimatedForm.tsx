import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedFormProps {
  children: ReactNode;
  keyProp: string;
}

const AnimatedForm = ({ children, keyProp }: AnimatedFormProps) => (
  <motion.div
    key={keyProp}
    initial={{
      opacity: 0,
      scale: 0.8,
      filter: "blur(20px)",
      y: 30,
    }}
    animate={{
      opacity: 1,
      scale: 1,
      filter: "blur(0)",
      y: 0,
      transition: {
        opacity: { duration: 0.2 },
        scale: { duration: 0.3, ease: "easeOut" },
        filter: { duration: 0.4, ease: "easeOut" },
        y: { duration: 0.3, ease: "easeOut" },
      },
    }}
    exit={{
      opacity: 0,
      scale: 0.8,
      filter: "blur(20px)",
      y: -30,
      transition: {
        opacity: { duration: 0.2 },
        scale: { duration: 0.3, ease: "easeIn" },
        filter: { duration: 0.4, ease: "easeIn" },
        y: { duration: 0.3, ease: "easeIn" },
      },
    }}
    style={{
      position: "relative",
      transformStyle: "preserve-3d",
    }}
  >
    {children}
  </motion.div>
);

export default AnimatedForm;
