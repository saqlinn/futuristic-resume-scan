import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface LocationSectionProps {
  onLocationSubmit?: (location: string) => void;
}

export const LocationSection = ({ onLocationSubmit }: LocationSectionProps) => {
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onLocationSubmit?.(location);
    }, 1000);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-8"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-2xl w-full">
        <motion.div
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.div
            className="mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <MapPin className="w-20 h-20 text-accent mx-auto" />
          </motion.div>
          
          <h2 className="text-5xl font-bold text-glow mb-4 text-primary">
            Where Are You Looking?
          </h2>
          <p className="text-xl text-muted-foreground">
            Enter your preferred job location for targeted opportunities
          </p>
        </motion.div>

        <motion.div
          className="glass rounded-2xl p-12"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="City, State or Zip Code"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="text-lg h-14 pl-14 glass border-primary/30 focus:border-primary focus:glow-blue text-foreground placeholder:text-muted-foreground"
                disabled={isSubmitting}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary w-6 h-6" />
              
              {/* Animated border effect */}
              <motion.div
                className="absolute inset-0 rounded-lg border-2 border-primary opacity-0 pointer-events-none"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="text-center">
              <Button
                type="submit"
                variant="hero"
                size="xl"
                disabled={!location.trim() || isSubmitting}
                className="relative overflow-hidden"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <MapPin className="mr-2" />
                    Analyze Location
                  </>
                )}
                
                {/* Scanning effect */}
                {isSubmitting && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan"></div>
                )}
              </Button>
            </div>

            {/* Popular locations suggestions */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">Popular locations:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {["San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA"].map((city) => (
                  <motion.button
                    key={city}
                    type="button"
                    className="px-4 py-2 glass rounded-full text-sm hover:glow-blue transition-all"
                    onClick={() => setLocation(city)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {city}
                  </motion.button>
                ))}
              </div>
            </div>
          </form>
        </motion.div>

        {/* Floating location pins */}
        <div className="relative">
          <motion.div
            className="absolute -top-16 left-8"
            animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <MapPin className="w-8 h-8 text-primary opacity-20" />
          </motion.div>
          <motion.div
            className="absolute -top-20 right-12"
            animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <MapPin className="w-6 h-6 text-accent opacity-30" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};