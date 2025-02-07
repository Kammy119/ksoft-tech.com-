import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Users, Clock, DollarSign, PenTool as Tool, Link, CheckSquare, BarChart, AlertTriangle, FileSpreadsheet, Calendar, Briefcase, UserCheck, Building, Mail, Phone, Globe, X } from 'lucide-react';
import { sendProjectInquiryEmail } from './services/email';

export interface FormData {
  // Customer Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  
  // Project Details
  projectType: string;
  budget: string;
  timeline: string;
  
  // Website Requirements
  purpose: string;
  targetAudience: string;
  features: string[];
  designPreferences: string;
  contentManagement: boolean;
  ecommerce: boolean;
  
  // Additional Information
  existingWebsite: string;
  additionalNotes: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  companyName: '',
  projectType: '',
  budget: '',
  timeline: '',
  purpose: '',
  targetAudience: '',
  features: [],
  designPreferences: '',
  contentManagement: false,
  ecommerce: false,
  existingWebsite: '',
  additionalNotes: ''
};

function ProjectStart() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < 4) {
      nextStep();
      return;
    }
    
    if (!showConfirmation) {
      setShowConfirmation(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      await sendProjectInquiryEmail(formData);
      setSubmitSuccess(true);
      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setSubmitError('Failed to submit project inquiry. Please try again or contact us directly.');
      console.error('Failed to submit project inquiry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return Boolean(formData.firstName.trim()) && 
               Boolean(formData.lastName.trim()) && 
               Boolean(formData.email.trim());
      case 2:
        return Boolean(formData.projectType) && 
               Boolean(formData.budget) && 
               Boolean(formData.timeline);
      case 3:
        return Boolean(formData.purpose.trim()) && 
               Boolean(formData.targetAudience.trim());
      default:
        return true;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentStep < 4 && validateStep(currentStep)) {
        nextStep();
      }
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    if (showConfirmation) {
      setShowConfirmation(false);
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
  };

  const formatCurrency = (budget: string): string => {
    switch (budget) {
      case '500-2000': return '$500 - $2,000';
      case '2000-5000': return '$2,000 - $5,000';
      case '5000-10000': return '$5,000 - $10,000';
      case '10000-20000': return '$10,000 - $20,000';
      case '20000+': return '$20,000+';
      default: return 'Not specified';
    }
  };

  const formatTimeline = (timeline: string): string => {
    switch (timeline) {
      case '1-2': return '1-2 months';
      case '2-3': return '2-3 months';
      case '3-6': return '3-6 months';
      case '6+': return '6+ months';
      default: return 'Not specified';
    }
  };

  const renderConfirmation = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">Confirm Your Project Details</h3>
        <button
          type="button"
          onClick={() => setShowConfirmation(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="space-y-8">
        <div>
          <h4 className="text-lg font-semibold text-blue-400 mb-3">Personal Information</h4>
          <div className="grid grid-cols-2 gap-4 text-gray-300">
            <div>
              <span className="block text-sm text-gray-400">Name</span>
              <span>{formData.firstName} {formData.lastName}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-400">Email</span>
              <span>{formData.email}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-400">Phone</span>
              <span>{formData.phone || 'Not provided'}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-400">Company</span>
              <span>{formData.companyName || 'Not provided'}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-blue-400 mb-3">Project Details</h4>
          <div className="grid grid-cols-2 gap-4 text-gray-300">
            <div>
              <span className="block text-sm text-gray-400">Project Type</span>
              <span>{formData.projectType}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-400">Budget Range</span>
              <span>{formatCurrency(formData.budget)}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-400">Timeline</span>
              <span>{formatTimeline(formData.timeline)}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-blue-400 mb-3">Requirements</h4>
          <div className="space-y-4 text-gray-300">
            <div>
              <span className="block text-sm text-gray-400">Purpose</span>
              <p className="mt-1">{formData.purpose}</p>
            </div>
            <div>
              <span className="block text-sm text-gray-400">Target Audience</span>
              <p className="mt-1">{formData.targetAudience}</p>
            </div>
            <div>
              <span className="block text-sm text-gray-400">Features</span>
              <ul className="mt-1 list-disc list-inside">
                {formData.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-sm text-gray-400">CMS Required</span>
                <span>{formData.contentManagement ? 'Yes' : 'No'}</span>
              </div>
              <div>
                <span className="block text-sm text-gray-400">E-commerce Required</span>
                <span>{formData.ecommerce ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>

        {(formData.existingWebsite || formData.additionalNotes) && (
          <div>
            <h4 className="text-lg font-semibold text-blue-400 mb-3">Additional Information</h4>
            <div className="space-y-4 text-gray-300">
              {formData.existingWebsite && (
                <div>
                  <span className="block text-sm text-gray-400">Existing Website</span>
                  <a href={formData.existingWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    {formData.existingWebsite}
                  </a>
                </div>
              )}
              {formData.additionalNotes && (
                <div>
                  <span className="block text-sm text-gray-400">Additional Notes</span>
                  <p className="mt-1">{formData.additionalNotes}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 text-blue-200">
          <p>Please review all the information above carefully. Once you submit, we'll review your project requirements and get back to you within 24-48 hours.</p>
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    if (showConfirmation) {
      return renderConfirmation();
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <UserCheck className="h-6 w-6 text-blue-500 mr-3" />
              Customer Information
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Briefcase className="h-6 w-6 text-blue-500 mr-3" />
              Project Details
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Project Type *</label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a project type</option>
                <option value="business">Business Website</option>
                <option value="ecommerce">E-commerce</option>
                <option value="portfolio">Portfolio</option>
                <option value="blog">Blog</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Budget Range *</label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a budget range</option>
                <option value="500-2000">$500 - $2,000</option>
                <option value="2000-5000">$2,000 - $5,000</option>
                <option value="5000-10000">$5,000 - $10,000</option>
                <option value="10000-20000">$10,000 - $20,000</option>
                <option value="20000+">$20,000+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Timeline *</label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a timeline</option>
                <option value="1-2">1-2 months</option>
                <option value="2-3">2-3 months</option>
                <option value="3-6">3-6 months</option>
                <option value="6+">6+ months</option>
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Target className="h-6 w-6 text-blue-500 mr-3" />
              Website Requirements
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Website Purpose *</label>
              <textarea
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Describe the main purpose of your website"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Target Audience *</label>
              <textarea
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Describe your target audience"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Required Features</label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Contact Form',
                  'Blog Section',
                  'Newsletter Signup',
                  'Social Media Integration',
                  'Photo Gallery',
                  'Video Integration',
                  'Customer Reviews',
                  'Appointment Booking'
                ].map((feature) => (
                  <label key={feature} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      className="form-checkbox h-4 w-4 text-blue-500 bg-gray-800 border-gray-700 rounded"
                    />
                    <span className="text-gray-300">{feature}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="contentManagement"
                  checked={formData.contentManagement}
                  onChange={handleInputChange}
                  className="form-checkbox h-4 w-4 text-blue-500 bg-gray-800 border-gray-700 rounded"
                />
                <span className="text-gray-300">Content Management System</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="ecommerce"
                  checked={formData.ecommerce}
                  onChange={handleInputChange}
                  className="form-checkbox h-4 w-4 text-blue-500 bg-gray-800 border-gray-700 rounded"
                />
                <span className="text-gray-300">E-commerce Functionality</span>
              </label>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <FileSpreadsheet className="h-6 w-6 text-blue-500 mr-3" />
              Additional Information
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Existing Website (if any)</label>
              <input
                type="url"
                name="existingWebsite"
                value={formData.existingWebsite}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Additional Notes</label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Any additional information or specific requirements"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative py-24 sm:py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-gray-900 to-gray-900" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Project</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tell us about your project and we'll help bring your vision to life
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="relative py-16 bg-[#0B1121]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Progress Steps */}
            {!showConfirmation && (
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step <= currentStep ? 'bg-blue-500' : 'bg-gray-700'
                        } transition-colors duration-200`}
                      >
                        <span className="text-white text-sm">{step}</span>
                      </div>
                      <span className="text-sm text-gray-400 mt-2">
                        {step === 1 && 'Customer Info'}
                        {step === 2 && 'Project Details'}
                        {step === 3 && 'Requirements'}
                        {step === 4 && 'Additional Info'}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="relative mt-4">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-700 -translate-y-1/2" />
                  <div
                    className="absolute top-1/2 left-0 h-0.5 bg-blue-500 -translate-y-1/2 transition-all duration-200"
                    style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Form Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-gray-900/80 p-8 rounded-xl ring-1 ring-gray-800/50 backdrop-blur-xl">
                <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                  {renderStep()}
                  
                  {submitError && (
                    <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded-md text-red-200">
                      {submitError}
                    </div>
                  )}

                  {submitSuccess && (
                    <div className="mt-4 p-3 bg-green-900/50 border border-green-500 rounded-md text-green-200">
                      Your project inquiry has been submitted successfully! We'll be in touch soon.
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-8">
                    {(currentStep > 1 || showConfirmation) && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-colors"
                      >
                        {showConfirmation ? 'Edit Details' : 'Previous'}
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting || (currentStep < 4 && !validateStep(currentStep))}
                      className={`ml-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isSubmitting ? 'Submitting...' : 
                       showConfirmation ? 'Submit Project' :
                       currentStep === 4 ? 'Review & Submit' : 'Next'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectStart;