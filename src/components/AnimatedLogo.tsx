import { motion } from "framer-motion";
import { useEffect } from "react";
import { FileText, Briefcase, TrendingUp } from "lucide-react";

interface AnimatedLogoProps {
  onAnimationComplete?: () => void;
}

export const AnimatedLogo = ({ onAnimationComplete }: AnimatedLogoProps) => {
  useEffect(() => {
    const completeTimer = setTimeout(() => {
      onAnimationComplete?.();
    }, 3000);

    return () => {
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-background">
      {/* Clean professional background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background opacity-50" />
      
      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FileText className="w-12 h-12 text-primary opacity-20" />
        </motion.div>
        
        <motion.div
          className="absolute top-1/3 right-1/4"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Briefcase className="w-10 h-10 text-accent opacity-15" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/3 left-1/3"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <TrendingUp className="w-8 h-8 text-secondary opacity-25" />
        </motion.div>
      </div>

      {/* Main content */}
      <motion.div
        className="text-center z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Simple, clean logo */}
        <motion.div
          className="mb-8"
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-20 h-20 mx-auto mb-6 glass rounded-2xl flex items-center justify-center glow-subtle">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <FileText className="w-10 h-10 text-primary" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold mb-3 text-foreground"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Resume Analyzer
        </motion.h1>

        <motion.p
          className="text-lg text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          AI-powered resume analysis and job matching
        </motion.p>

        {/* Clean progress indicator */}
        <motion.div
          className="w-48 h-1 bg-muted rounded-full mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.5, duration: 1.2, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.p
          className="text-sm text-muted-foreground mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
};