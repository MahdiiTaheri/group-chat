export const slideInProps = {
  initial: { opacity: 0, x: -200 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, y: -200 },
  transition: { duration: 0.5 },
};

export const statusProps = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, delay: 0.5 },
};

export const InputSlideInProps = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 },
};

export const springMotionProps = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: 0.3,
    ease: [0, 0.71, 0.2, 1.01],
    scale: {
      type: "spring",
      damping: 17,
      stiffness: 100,
      restDelta: 0.0001,
    },
  },
};
