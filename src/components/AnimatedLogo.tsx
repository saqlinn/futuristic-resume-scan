import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedLogoProps {
  onAnimationComplete?: () => void;
}

export const AnimatedLogo = ({ onAnimationComplete }: AnimatedLogoProps) => {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowParticles(true);
    }, 1000);

    const completeTimer = setTimeout(() => {
      onAnimationComplete?.();
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-background">
      {/* Floating particles */}
      {showParticles && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* Main logo animation */}
      <motion.div
        className="text-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-8xl font-bold text-glow mb-4"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        >
          <motion.span
            className="inline-block text-primary"
            animate={{
              textShadow: [
                "0 0 10px currentColor",
                "0 0 30px currentColor",
                "0 0 10px currentColor",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Resume
          </motion.span>
          <motion.span
            className="inline-block text-accent ml-2"
            animate={{
              textShadow: [
                "0 0 10px currentColor",
                "0 0 30px currentColor",
                "0 0 10px currentColor",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            AI
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-xl text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Next-Generation Resume Analysis
        </motion.p>

        {/* Loading bar */}
        <motion.div
          className="mt-8 w-64 h-1 bg-muted rounded-full mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 2.5, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};