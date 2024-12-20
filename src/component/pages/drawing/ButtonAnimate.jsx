import { motion } from 'framer-motion';

const growShrinkVariants = {
  grow: {
    opacity: 1,
  },
  shrink: {
    opacity: 0.7,
  },
};

export const ButtonAnimate = ({ text, onClick, className, isAnimated }) => {
  if (isAnimated) {
    return (
      <motion.button
        initial="grow"
        animate={['grow', 'shrink']}
        variants={growShrinkVariants}
        transition={{
          repeat: Infinity,
          repeatType: 'mirror',
          duration: 0.8,
          delay: 1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        onClick={onClick}
        className={className}
      >
        {text}
      </motion.button>
    );
  }
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
};
