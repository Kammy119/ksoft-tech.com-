import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle2, Loader2, ArrowRight, AlertTriangle } from 'lucide-react';
import { sendProjectInquiryEmail } from '../services/email';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: {
    name: string;
    price: string;
    description: string;
    features: string[];
  };
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  projectType: string;
  budget: string;
  timeline: string;
  purpose: string;
  targetAudience: string;
  features: string[];
  contentManagement: boolean;
  ecommerce: boolean;
  existingWebsite: string;
  additionalNotes: string;
}

export function PricingModal({ isOpen, onClose, tier }: PricingModalProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    phoneNumber: '',
    projectDescription: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const [firstName, ...lastNameParts] = formData.fullName.split(' ');
    const lastName = lastNameParts.join(' ');

    // Create project inquiry data
    const projectData: FormData = {
      firstName,
      lastName: lastName || 'Not provided',
      email: formData.email,
      phone: formData.phoneNumber,
      companyName: formData.companyName,
      projectType: tier.name === 'Enterprise' ? 'Enterprise Custom Project' : 'Website Development',
      budget: tier.name === 'Starter' ? '2000-5000' : tier.name === 'Professional' ? '5000-10000' : '20000+',
      timeline: '2-3',
      purpose: formData.projectDescription || `${tier.name} package website development`,
      targetAudience: 'To be discussed',
      features: tier.features,
      contentManagement: tier.features.some(f => f.toLowerCase().includes('cms')),
      ecommerce: tier.features.some(f => f.toLowerCase().includes('e-commerce')),
      existingWebsite: '',
      additionalNotes: `Selected package: ${tier.name}\nPrice: ${tier.price}`
    };

    try {
      if (tier.name === 'Enterprise') {
        // For Enterprise tier, redirect to ProjectStart page
        navigate('/project-start');
        onClose();
      } else {
        // For other tiers, send email and show success message
        await sendProjectInquiryEmail(projectData);
        setSuccess(true);
        setTimeout(() => {
          onClose();
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      setError('Failed to submit inquiry. Please try again or contact us directly.');
      console.error('Form submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

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
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Get Started with {tier.name}</h2>
              <p className="text-gray-400">{tier.description}</p>
            </div>

            {/* Price and Features */}
            <div className="mb-8">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-white">{tier.price}</div>
                {tier.name === 'Professional' && (
                  <div className="text-blue-400 text-sm mt-1">Most Popular Choice</div>
                )}
              </div>
              <div className="space-y-2">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            {tier.name !== 'Enterprise' ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-300 mb-1">
                    Project Description
                  </label>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about your project (optional)"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-900/50 border border-red-500 rounded-md text-red-200 flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {success && (
                  <div className="p-3 bg-green-900/50 border border-green-500 rounded-md text-green-200 flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Your inquiry has been submitted successfully! Redirecting...</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Inquiry
                      <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Redirecting...
                  </>
                ) : (
                  <>
                    Start Custom Project
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}