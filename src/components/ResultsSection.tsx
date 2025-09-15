import { motion } from "framer-motion";
import { useState } from "react";
import { Briefcase, Target, TrendingUp, MapPin, ExternalLink, Star, Clock, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  requirements: string[];
  posted: string;
  matchScore: number;
}

interface ResultsSectionProps {
  fileName?: string;
  location?: string;
}

export const ResultsSection = ({ fileName, location }: ResultsSectionProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs'>('overview');

  // Mock data - in real app this would come from API
  const mockJobs: Job[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      location: location || 'San Francisco, CA',
      salary: '$120k - $160k',
      type: 'Full-time',
      description: 'Join our dynamic team building next-generation applications...',
      requirements: ['React', 'TypeScript', 'Node.js', 'AWS'],
      posted: '2 days ago',
      matchScore: 92
    },
    {
      id: '2',
      title: 'Frontend Developer',
      company: 'StartupXYZ',
      location: location || 'San Francisco, CA',
      salary: '$90k - $130k',
      type: 'Full-time',
      description: 'Looking for a creative developer to craft amazing user experiences...',
      requirements: ['React', 'CSS', 'JavaScript', 'Figma'],
      posted: '1 week ago',
      matchScore: 88
    },
    {
      id: '3',
      title: 'Full Stack Developer',
      company: 'InnovateLab',
      location: location || 'San Francisco, CA',
      salary: '$100k - $140k',
      type: 'Full-time',
      description: 'Build scalable web applications from front to back...',
      requirements: ['React', 'Python', 'PostgreSQL', 'Docker'],
      posted: '3 days ago',
      matchScore: 85
    }
  ];

  const skillsAnalysis = {
    matching: ['React', 'TypeScript', 'JavaScript', 'CSS', 'Git'],
    improving: ['AWS', 'Docker', 'PostgreSQL'],
    missing: ['Python', 'Kubernetes', 'GraphQL', 'Jest']
  };

  const jobCategories = [
    { name: 'Software Engineering', match: 95, jobs: 147 },
    { name: 'Frontend Development', match: 88, jobs: 89 },
    { name: 'Full Stack Development', match: 82, jobs: 76 },
    { name: 'UI/UX Development', match: 75, jobs: 43 }
  ];

  return (
    <motion.div
      className="min-h-screen p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-glow mb-4 text-primary">
            Analysis Complete
          </h2>
          <p className="text-xl text-muted-foreground">
            Here's what AI discovered about your profile
          </p>
          {fileName && (
            <p className="text-sm text-muted-foreground mt-2">
              Analyzed: {fileName}
            </p>
          )}
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="glass rounded-2xl p-2 flex space-x-2">
            <Button
              variant={activeTab === 'overview' ? 'neon' : 'ghost'}
              onClick={() => setActiveTab('overview')}
              className="px-8 py-3"
            >
              <Target className="mr-2 w-5 h-5" />
              Skills Analysis
            </Button>
            <Button
              variant={activeTab === 'jobs' ? 'neon' : 'ghost'}
              onClick={() => setActiveTab('jobs')}
              className="px-8 py-3"
            >
              <Briefcase className="mr-2 w-5 h-5" />
              Job Matches
            </Button>
          </div>
        </motion.div>

        {activeTab === 'overview' && (
          <motion.div
            className="space-y-8"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Job Categories */}
            <Card className="glass p-8">
              <h3 className="text-2xl font-bold mb-6 text-glow flex items-center">
                <Briefcase className="mr-3 text-primary" />
                Top Job Categories
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {jobCategories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    className="glass rounded-xl p-6 hover:glow-blue transition-all cursor-pointer"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-lg">{category.name}</h4>
                      <span className="text-accent font-bold">{category.match}%</span>
                    </div>
                    <div className="bg-muted rounded-full h-2 mb-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${category.match}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">{category.jobs} jobs available</p>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Skills Analysis */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Matching Skills */}
              <Card className="glass p-6">
                <h3 className="text-xl font-bold mb-4 text-accent flex items-center">
                  <TrendingUp className="mr-2" />
                  Strong Skills
                </h3>
                <div className="space-y-3">
                  {skillsAnalysis.matching.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 glass rounded-lg"
                    >
                      <span>{skill}</span>
                      <Star className="w-4 h-4 text-accent" />
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Skills to Improve */}
              <Card className="glass p-6">
                <h3 className="text-xl font-bold mb-4 text-primary flex items-center">
                  <Target className="mr-2" />
                  Skills to Enhance
                </h3>
                <div className="space-y-3">
                  {skillsAnalysis.improving.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className="flex items-center justify-between p-3 glass rounded-lg"
                    >
                      <span>{skill}</span>
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Missing Skills */}
              <Card className="glass p-6">
                <h3 className="text-xl font-bold mb-4 text-secondary flex items-center">
                  <Star className="mr-2" />
                  Recommended Skills
                </h3>
                <div className="space-y-3">
                  {skillsAnalysis.missing.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 1 }}
                      className="flex items-center justify-between p-3 glass rounded-lg opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <span>{skill}</span>
                      <div className="w-2 h-2 bg-secondary rounded-full" />
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {activeTab === 'jobs' && (
          <motion.div
            className="space-y-6"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-glow mb-2">
                <MapPin className="inline mr-2 text-accent" />
                Jobs in {location || 'San Francisco, CA'}
              </h3>
              <p className="text-muted-foreground">Found {mockJobs.length} matching positions</p>
            </div>

            <div className="grid gap-6">
              {mockJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <Card className="glass p-8 hover:glow-blue transition-all hover:scale-[1.02] cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-2xl font-bold text-glow mb-2">{job.title}</h4>
                        <p className="text-lg text-accent font-semibold">{job.company}</p>
                        <div className="flex items-center space-x-4 text-muted-foreground mt-2">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {job.salary}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {job.posted}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="glass rounded-xl p-3 mb-4">
                          <div className="text-2xl font-bold text-accent">{job.matchScore}%</div>
                          <div className="text-xs text-muted-foreground">Match</div>
                        </div>
                        <Button variant="neon" size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Apply
                        </Button>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{job.description}</p>

                    <div>
                      <h5 className="font-semibold mb-3 text-sm uppercase tracking-wide text-primary">
                        Required Skills
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req) => (
                          <span
                            key={req}
                            className={`px-3 py-1 rounded-full text-sm glass ${
                              skillsAnalysis.matching.includes(req) 
                                ? 'text-accent glow-green' 
                                : 'text-muted-foreground'
                            }`}
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};