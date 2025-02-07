import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Palette, Globe2, Rocket, Database, Shield, ArrowRight, Star, CheckCircle2, Users } from 'lucide-react';
import { ServiceModal } from './components/ServiceModal';
import { PricingModal } from './components/PricingModal';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

interface Testimonial {
  content: string;
  author: string;
  role: string;
  company: string;
}

function Services() {
  const navigate = useNavigate();
  const [modalService, setModalService] = useState<'web' | 'design' | 'marketing' | null>(null);
  const [selectedPricingTier, setSelectedPricingTier] = useState<PricingTier | null>(null);

  const services = [
    {
      icon: <Code2 className="h-12 w-12" />,
      name: "Custom Web Development",
      description: "Tailored web solutions built with cutting-edge technologies",
      features: [
        "Full-stack development",
        "Progressive Web Apps (PWA)",
        "API development & integration",
        "Performance optimization",
        "Responsive design"
      ],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80"
    },
    {
      icon: <Palette className="h-12 w-12" />,
      name: "UI/UX Design",
      description: "Beautiful, intuitive designs that convert visitors into customers",
      features: [
        "User research & analysis",
        "Wireframing & prototyping",
        "Visual design",
        "User testing",
        "Design systems"
      ],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80"
    },
    {
      icon: <Globe2 className="h-12 w-12" />,
      name: "Digital Marketing",
      description: "Comprehensive digital strategies to grow your online presence",
      features: [
        "SEO optimization",
        "Content strategy",
        "Social media management",
        "Analytics & reporting",
        "Conversion optimization"
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  const pricingTiers: PricingTier[] = [
    {
      name: "Starter",
      price: "$500",
      description: "Perfect for small businesses getting started",
      features: [
        "3-page responsive website",
        "Basic business template design",
        "Contact form integration",
        "Mobile responsive layout",
        "1 month of basic maintenance",
        "Google Business listing setup",
        "Basic SEO setup",
        "One round of content revisions",
        "Business hours support"
      ]
    },
    {
      name: "Professional",
      price: "$1200",
      description: "Ideal for growing businesses",
      features: [
        "5-7 page custom website",
        "Custom modern design",
        "Basic SEO optimization",
        "Social media integration",
        "Contact form with automations",
        "3 months of maintenance",
        "Google Analytics setup",
        "2 rounds of revisions",
        "Content Upload Service"
      ],
      recommended: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large-scale custom projects",
      features: [
        "8+ pages with custom design",
        "Advanced SEO package",
        "E-commerce integration",
        "Custom functionality",
        "Premium hosting setup",
        "Database Integration",
        "6 months maintenance",
        "24/7 Priority Support",
        "Unlimited revisions"
      ]
    }
  ];

  const testimonials: Testimonial[] = [
    {
      content: "WebCraft transformed our online presence. Their attention to detail and technical expertise exceeded our expectations.",
      author: "Sarah Johnson",
      role: "CEO",
      company: "TechStart Inc."
    },
    {
      content: "The team's ability to understand our needs and deliver a solution that perfectly matches our brand is remarkable.",
      author: "Michael Chen",
      role: "Marketing Director",
      company: "Global Solutions"
    }
  ];

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
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transforming ideas into powerful digital solutions. We combine creativity with technical expertise to deliver exceptional results.
            </p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="relative py-16 bg-[#0B1121]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-gray-900/80 p-8 rounded-xl ring-1 ring-gray-800/50 backdrop-blur-xl">
                  <div className="text-blue-500 mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-semibold text-white mb-4">{service.name}</h3>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-400">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                  <button 
                    onClick={() => setModalService(index === 0 ? 'web' : index === 1 ? 'design' : 'marketing')}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="relative py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Transparent Pricing</h2>
            <p className="text-xl text-gray-300">Choose the perfect plan for your business needs</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pricingTiers.map((tier, index) => (
              <div key={index} className={`relative group ${tier.recommended ? 'scale-105' : ''}`}>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-gray-900/80 p-8 rounded-xl ring-1 ring-gray-800/50 backdrop-blur-xl">
                  {tier.recommended && (
                    <div className="absolute top-0 right-6 transform -translate-y-1/2">
                      <div className="inline-flex items-center bg-blue-500 px-4 py-1 rounded-full">
                        <Star className="h-4 w-4 text-white mr-1" />
                        <span className="text-sm font-medium text-white">Recommended</span>
                      </div>
                    </div>
                  )}
                  <h3 className="text-2xl font-semibold text-white mb-2">{tier.name}</h3>
                  <div className="text-4xl font-bold text-white mb-4">{tier.price}</div>
                  <p className="text-gray-300 mb-6">{tier.description}</p>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-400">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => setSelectedPricingTier(tier)}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative py-16 bg-[#0B1121]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Client Testimonials</h2>
            <p className="text-xl text-gray-300">Don't just take our word for it</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-gray-900/80 p-8 rounded-xl ring-1 ring-gray-800/50 backdrop-blur-xl">
                  <Users className="h-12 w-12 text-blue-500 mb-6" />
                  <p className="text-gray-300 text-lg mb-6">{testimonial.content}</p>
                  <div>
                    <p className="text-white font-semibold">{testimonial.author}</p>
                    <p className="text-gray-400">{testimonial.role}</p>
                    <p className="text-blue-500">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-gray-900/80 p-12 rounded-xl ring-1 ring-gray-800/50 backdrop-blur-xl text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Digital Presence?</h2>
              <p className="text-xl text-gray-300 mb-8">Let's discuss how we can help you achieve your goals</p>
              <button 
                onClick={() => navigate('/contact')}
                className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Schedule a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedPricingTier && (
        <PricingModal
          isOpen={true}
          onClose={() => setSelectedPricingTier(null)}
          tier={selectedPricingTier}
        />
      )}

      <ServiceModal 
        isOpen={modalService !== null}
        onClose={() => setModalService(null)}
        serviceType={modalService || 'web'}
      />
    </div>
  );
}

export default Services;