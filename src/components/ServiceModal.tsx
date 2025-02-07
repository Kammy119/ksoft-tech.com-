import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Code2, Palette, Globe2, CheckCircle2, ArrowRight, Layout, Users, Target, BarChart, PenTool, Smartphone, Loader2 } from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: 'web' | 'design' | 'marketing';
}

export function ServiceModal({ isOpen, onClose, serviceType }: ServiceModalProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleStartProject = () => {
    setIsLoading(true);
    // Shorter delay for quicker transition
    setTimeout(() => {
      navigate('/project-start');
      onClose();
    }, 300);
  };

  const serviceContent = {
    web: {
      icon: <Code2 className="h-8 w-8 text-blue-500" />,
      title: "Custom Web Development",
      benefits: [
        "Tailored solutions that perfectly match your business needs",
        "Optimized performance for maximum speed and efficiency",
        "Scalable architecture that grows with your business"
      ],
      technologies: [
        "React", "Node.js", "TypeScript", "Next.js",
        "PostgreSQL", "MongoDB", "AWS", "Docker"
      ],
      process: [
        {
          step: "1. Discovery",
          desc: "Understanding your goals and requirements"
        },
        {
          step: "2. Planning",
          desc: "Creating detailed technical specifications"
        },
        {
          step: "3. Development",
          desc: "Building with best practices"
        },
        {
          step: "4. Launch",
          desc: "Thorough testing and deployment"
        }
      ]
    },
    design: {
      icon: <Palette className="h-8 w-8 text-blue-500" />,
      title: "UI/UX Design",
      benefits: [
        "User-centered design that drives engagement",
        "Intuitive interfaces that enhance user experience",
        "Consistent design systems for scalability"
      ],
      technologies: [
        "Figma", "Adobe XD", "Sketch", "InVision",
        "Principle", "Framer", "Zeplin", "Abstract"
      ],
      process: [
        {
          step: "1. Research",
          desc: "User research and competitive analysis"
        },
        {
          step: "2. Wireframing",
          desc: "Creating structural blueprints"
        },
        {
          step: "3. Design",
          desc: "Visual design and prototyping"
        },
        {
          step: "4. Testing",
          desc: "User testing and iteration"
        }
      ]
    },
    marketing: {
      icon: <Globe2 className="h-8 w-8 text-blue-500" />,
      title: "Digital Marketing",
      benefits: [
        "Data-driven strategies for measurable results",
        "Comprehensive multi-channel approach",
        "Continuous optimization for maximum ROI"
      ],
      technologies: [
        "Google Analytics", "SEMrush", "HubSpot", "Mailchimp",
        "Ahrefs", "Facebook Ads", "Google Ads", "Hootsuite"
      ],
      process: [
        {
          step: "1. Analysis",
          desc: "Market and competitor research"
        },
        {
          step: "2. Strategy",
          desc: "Custom marketing plan development"
        },
        {
          step: "3. Execution",
          desc: "Campaign implementation"
        },
        {
          step: "4. Optimization",
          desc: "Performance tracking and improvement"
        }
      ]
    }
  };

  const content = serviceContent[serviceType];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/90 backdrop-blur-sm">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-lg text-white">Preparing your project...</p>
          </div>
        </div>
      )}

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-gray-900 rounded-xl shadow-2xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-25" />
          
          <div className="relative p-8 overflow-hidden">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                {content.icon}
              </div>
              <h2 className="text-2xl font-bold text-white">{content.title}</h2>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {/* Benefits */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-blue-400">Key Benefits</h3>
                <ul className="grid gap-2">
                  {content.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Tools & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {content.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Our Process</h3>
                <div className="grid grid-cols-2 gap-4">
                  {content.process.map((item, index) => (
                    <div key={index} className="p-3 bg-gray-800/50 rounded-lg">
                      <div className="font-semibold text-white">{item.step}</div>
                      <div className="text-sm text-gray-400">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <button 
                  onClick={handleStartProject}
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Starting Project...
                    </>
                  ) : (
                    <>
                      Start Your Project
                      <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}