import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";

interface UploadSectionProps {
  onFileUpload?: (file: File) => void;
  onNext?: () => void;
}

export const UploadSection = ({ onFileUpload, onNext }: UploadSectionProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (file.type === "application/pdf" || file.name.endsWith('.docx')) {
      setIsUploading(true);
      
      // Simulate upload delay
      setTimeout(() => {
        setUploadedFile(file);
        setIsUploading(false);
        onFileUpload?.(file);
      }, 1500);
    } else {
      alert("Please upload only PDF or DOCX files.");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-2xl w-full">
        <motion.div
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-glow mb-4 text-primary">
            Upload Your Resume
          </h2>
          <p className="text-xl text-muted-foreground">
            Let AI analyze your professional profile
          </p>
        </motion.div>

        <motion.div
          className={`glass rounded-2xl p-12 transition-all duration-300 ${
            dragActive ? "glow-blue scale-105" : ""
          } ${uploadedFile ? "glow-green" : ""}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {isUploading ? (
            <div className="text-center py-8">
              <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-lg text-muted-foreground">Processing your resume...</p>
              <div className="mt-4 w-full bg-muted rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent animate-scan"></div>
              </div>
            </div>
          ) : uploadedFile ? (
            <motion.div
              className="text-center py-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-accent mb-2">File Uploaded Successfully!</h3>
              <p className="text-muted-foreground mb-6">{uploadedFile.name}</p>
              <Button variant="hero" size="xl" onClick={onNext}>
                Continue Analysis
              </Button>
            </motion.div>
          ) : (
            <div className="text-center">
              <motion.div
                className="mb-8"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Upload className="w-24 h-24 text-primary mx-auto mb-4" />
              </motion.div>
              
              <h3 className="text-3xl font-semibold mb-4 text-glow">
                Drag & Drop Your Resume
              </h3>
              <p className="text-muted-foreground mb-8 text-lg">
                or click below to browse files
              </p>
              
              <div className="space-y-4">
                <Button
                  variant="glass"
                  size="xl"
                  onClick={() => fileInputRef.current?.click()}
                  className="hover:glow-blue"
                >
                  <FileText className="mr-2" />
                  Choose File
                </Button>
                
                <p className="text-sm text-muted-foreground">
                  Supports PDF and DOCX files only
                </p>
              </div>

              {/* Floating file icons */}
              <div className="relative mt-8">
                <motion.div
                  className="absolute -top-4 -left-4"
                  animate={{ rotate: 360, y: [0, -20, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <FileText className="w-8 h-8 text-primary opacity-30" />
                </motion.div>
                <motion.div
                  className="absolute -top-4 -right-4"
                  animate={{ rotate: -360, y: [0, 20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  <FileText className="w-6 h-6 text-accent opacity-20" />
                </motion.div>
              </div>
            </div>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileInput}
            className="hidden"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};