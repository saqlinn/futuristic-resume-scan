import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Brain, Zap, Target, TrendingUp } from "lucide-react";

interface AnalysisSectionProps {
  onAnalysisComplete?: () => void;
}

export const AnalysisSection = ({ onAnalysisComplete }: AnalysisSectionProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const analysisSteps = [
    { icon: Brain, text: "Parsing resume content...", color: "text-primary" },
    { icon: Zap, text: "Extracting skills and experience...", color: "text-accent" },
    { icon: Target, text: "Matching job categories...", color: "text-secondary" },
    { icon: TrendingUp, text: "Analyzing market trends...", color: "text-primary" },
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        return prev;
      });
    }, 80);

    const completeTimer = setTimeout(() => {
      onAnalysisComplete?.();
    }, 8000);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [onAnalysisComplete]);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-2xl w-full text-center">
        <motion.div
          className="mb-12"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          <h2 className="text-5xl font-bold text-glow mb-4 text-primary">
            Analyzing Your Resume
          </h2>
          <p className="text-xl text-muted-foreground">
            AI is processing your professional profile
          </p>
        </motion.div>

        {/* Central scanning animation */}
        <motion.div
          className="relative glass rounded-3xl p-16 mb-12 glow-blue"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {/* Rotating outer ring */}
          <motion.div
            className="absolute inset-8 border-4 border-primary/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Rotating inner ring */}
          <motion.div
            className="absolute inset-16 border-2 border-accent/50 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Central brain icon */}
          <motion.div
            className="relative z-10"
            animate={{ 
              scale: [1, 1.1, 1],
              textShadow: [
                "0 0 20px currentColor",
                "0 0 40px currentColor", 
                "0 0 20px currentColor"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Brain className="w-24 h-24 text-primary mx-auto mb-6" />
          </motion.div>

          {/* Scanning lines */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Analysis steps */}
        <div className="space-y-6 mb-12">
          {analysisSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= currentStep;
            const isCompleted = index < currentStep;

            return (
              <motion.div
                key={index}
                className={`flex items-center justify-center space-x-4 p-4 rounded-xl glass transition-all duration-500 ${
                  isActive ? "glow-blue" : ""
                }`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ 
                  opacity: isActive ? 1 : 0.3, 
                  x: 0,
                  scale: isActive ? 1.05 : 1
                }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <motion.div
                  animate={isActive ? { rotate: 360 } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Icon className={`w-8 h-8 ${step.color} ${isCompleted ? "text-accent" : ""}`} />
                </motion.div>
                <span className={`text-lg ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.text}
                </span>
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-4 h-4 bg-accent rounded-full glow-green"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Progress bar */}
        <motion.div
          className="glass rounded-full p-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="text-sm text-muted-foreground mb-2">
            Analysis Progress: {progress}%
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%]"
              initial={{ width: "0%" }}
              animate={{ 
                width: `${progress}%`,
                backgroundPosition: ["0% 0%", "200% 0%"]
              }}
              transition={{ 
                width: { duration: 0.1 },
                backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" }
              }}
            />
          </div>
        </motion.div>

        {/* Matrix-style particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-4 bg-accent opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-10px",
              }}
              animate={{
                y: ["0vh", "110vh"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};