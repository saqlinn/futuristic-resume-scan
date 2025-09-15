import { useState } from "react";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { UploadSection } from "@/components/UploadSection";
import { LocationSection } from "@/components/LocationSection";
import { AnalysisSection } from "@/components/AnalysisSection";
import { ResultsSection } from "@/components/ResultsSection";

type AppStage = 'logo' | 'upload' | 'location' | 'analysis' | 'results';

const Index = () => {
  const [currentStage, setCurrentStage] = useState<AppStage>('logo');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [location, setLocation] = useState<string>('');

  const handleLogoComplete = () => {
    setCurrentStage('upload');
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  const handleUploadNext = () => {
    setCurrentStage('location');
  };

  const handleLocationSubmit = (locationData: string) => {
    setLocation(locationData);
    setCurrentStage('analysis');
  };

  const handleAnalysisComplete = () => {
    setCurrentStage('results');
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {currentStage === 'logo' && (
        <AnimatedLogo onAnimationComplete={handleLogoComplete} />
      )}
      
      {currentStage === 'upload' && (
        <UploadSection 
          onFileUpload={handleFileUpload}
          onNext={handleUploadNext}
        />
      )}
      
      {currentStage === 'location' && (
        <LocationSection onLocationSubmit={handleLocationSubmit} />
      )}
      
      {currentStage === 'analysis' && (
        <AnalysisSection onAnalysisComplete={handleAnalysisComplete} />
      )}
      
      {currentStage === 'results' && (
        <ResultsSection 
          fileName={uploadedFile?.name}
          location={location}
        />
      )}
    </div>
  );
};

export default Index;
