import React, { useState } from 'react';
import { X, Upload, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { sendContactEmail } from '../services/email';

interface CareersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CareersModal({ isOpen, onClose }: CareersModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const emailContent = `
Position: ${formData.position}
Experience: ${formData.experience} years
Cover Letter:
${formData.message}
      `;

      await sendContactEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `Job Application: ${formData.position}`,
        message: emailContent,
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError('Failed to submit application. Please try again or contact us directly.');
      console.error('Application submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const positions = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'UI/UX Designer',
    'Digital Marketing Specialist'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-gray-900 rounded-xl shadow-2xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-25" />
          
          <div className="relative p-8 overflow-hidden">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Join Our Team</h2>
              <p className="text-gray-400">
                We're always looking for talented individuals to join our growing team
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
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
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-300 mb-1">
                  Position *
                </label>
                <select
                  id="position"
                  name="position"
                  required
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a position</option>
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-1">
                  Years of Experience *
                </label>
                <select
                  id="experience"
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-7">5-7 years</option>
                  <option value="7+">7+ years</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Cover Letter *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about yourself and why you'd be a great fit..."
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
                  <span>Your application has been submitted successfully!</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5 mr-2" />
                    Submit Application
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}