import React, { useState } from 'react';
import { Phone, Mail, Clock, Users, MessageSquare, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { sendContactEmail } from './services/email';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [submitMessage, setSubmitMessage] = useState('');

  // Validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate phone format (optional field)
  const isValidPhone = (phone: string) => {
    if (!phone) return true; // Optional field
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await sendContactEmail(formData);
      setSubmitStatus('success');
      setSubmitMessage('Thank you for your message! We will get back to you soon.');
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Sorry, something went wrong. Please try again or contact us directly at contact@ksoft-tech.com');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
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
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have a question or project in mind? We'd love to hear from you. Let's create something amazing together.
            </p>
          </div>
        </div>
      </div>

      <div className="relative py-16 bg-[#0B1121]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="relative">
              <div className="relative bg-gray-900/90 backdrop-blur-xl p-8 rounded-xl ring-1 ring-gray-800/50 overflow-hidden">
                {/* Background patterns */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
                  <div className="absolute -top-16 -left-16 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                  <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl" />
                </div>

                {/* Form content */}
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-gray-800 border ${
                          errors.name ? 'border-red-500' : 'border-gray-700'
                        } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        required
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-gray-800 border ${
                          errors.email ? 'border-red-500' : 'border-gray-700'
                        } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        required
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-gray-800 border ${
                          errors.phone ? 'border-red-500' : 'border-gray-700'
                        } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        required
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-gray-800 border ${
                          errors.subject ? 'border-red-500' : 'border-gray-700'
                        } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        required
                      />
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full px-4 py-2 bg-gray-800 border ${
                          errors.message ? 'border-red-500' : 'border-gray-700'
                        } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        required
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                      )}
                    </div>

                    {submitStatus && (
                      <div className={`p-4 rounded-md ${
                        submitStatus === 'success' ? 'bg-green-500/10' : 'bg-red-500/10'
                      }`}>
                        <div className="flex items-center">
                          {submitStatus === 'success' ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                          )}
                          <p className={`text-sm ${
                            submitStatus === 'success' ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {submitMessage}
                          </p>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <MessageSquare className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Business Hours */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-gray-900/80 p-8 rounded-xl ring-1 ring-gray-800/50 backdrop-blur-xl">
                  <div className="flex items-center mb-4">
                    <Clock className="h-6 w-6 text-blue-500 mr-3" />
                    <h3 className="text-xl font-semibold text-white">Business Hours</h3>
                  </div>
                  <div className="space-y-2 text-gray-300">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-gray-900/80 p-8 rounded-xl ring-1 ring-gray-800/50 backdrop-blur-xl">
                  <div className="flex items-center mb-4">
                    <Users className="h-6 w-6 text-blue-500 mr-3" />
                    <h3 className="text-xl font-semibold text-white">Contact Details</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="text-gray-300">
                      <p className="flex items-center mt-1">
                        <Mail className="h-4 w-4 text-blue-500 mr-2" />
                        contact@ksoft-tech.com
                      </p>
                      <p className="flex items-center mt-1">
                        <Phone className="h-4 w-4 text-blue-500 mr-2" />
                        470-244-3180
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alternative Contact Methods */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-gray-900/80 p-8 rounded-xl ring-1 ring-gray-800/50 backdrop-blur-xl">
                  <h3 className="text-xl font-semibold text-white mb-4">Can't reach us?</h3>
                  <p className="text-gray-300 mb-4">
                    If you're having trouble with the contact form, you can reach us directly through:
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Direct email to contact@ksoft-tech.com</li>
                    <li>• Call our support line at 470-244-3180</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;