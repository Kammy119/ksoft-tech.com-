import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Globe, Code2, Palette, ArrowRight, Github, Linkedin, Twitter, Monitor, Smartphone, Rocket, Server, Database, Globe2, Mail, Phone, MapPin, Shield, Zap, Loader2 } from 'lucide-react';
import Services from './Services';
import About from './About';
import Contact from './Contact';
import ProjectStart from './ProjectStart';
import { CareersModal } from './components/CareersModal';

const portfolioImages = [
  {
    url: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80",
    title: "E-commerce Platform"
  },
  {
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    title: "Business Analytics Dashboard"
  },
  {
    url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    title: "Portfolio Website"
  },
  {
    url: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    title: "Corporate Website"
  }
];

function Home() {
  const [text, setText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fullText = 'Crafting digital experiences that inspire';
  const navigate = useNavigate();
  
  useEffect(() => {
    let currentIndex = 0;
    setIsComplete(false);
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsComplete(true);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === portfolioImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="relative h-screen flex items-center bg-gray-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-gray-900 to-gray-900" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                We build
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  websites that work
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                From stunning designs to powerful functionality, we create websites that drive results and engage your audience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/services')}
                  className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Our Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center px-8 py-3 border border-blue-500/30 text-gray-300 font-medium rounded-md hover:border-blue-500 hover:text-blue-500 transition-colors"
                >
                  Get in Touch
                </button>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-gray-800 p-6 rounded-xl ring-1 ring-gray-800/50 backdrop-blur-xl">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                  alt="Website Development"
                  className="rounded-lg shadow-2xl mb-6 transform transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-900/50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white">10+</div>
                    <div className="text-sm text-gray-400">Projects</div>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white">98%</div>
                    <div className="text-sm text-gray-400">Satisfaction</div>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white">5★</div>
                    <div className="text-sm text-gray-400">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-[#0B1121] py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-[#0B1121] to-[#0B1121]" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold mb-20 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent text-center">
            Our Services
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-gray-900/80 p-8 rounded-xl ring-1 ring-gray-800/50 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-gray-100">Service Packages</h3>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Basic Website Package', available: '$500' },
                    { name: 'Professional', available: '$1200' },
                    { name: 'Custom Development', available: 'Custom Quote' },
                  ].map((coin) => (
                    <div key={coin.name} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <span className="text-blue-400">₿</span>
                        </div>
                        <div>
                          <p className="text-gray-200">{coin.name}</p>
                          <p className="text-sm text-gray-400">Available: Starting at {coin.available}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-gray-900/80 p-8 rounded-xl ring-1 ring-gray-800/50 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-gray-100">Portfolio Showcase</h3>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-blue-400">
                      {currentImageIndex + 1}/{portfolioImages.length}
                    </div>
                  </div>
                </div>
                <div className="relative h-64 overflow-hidden rounded-lg">
                  {portfolioImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent">
                        <div className="absolute bottom-4 left-4 right-4">
                          <h4 className="text-white font-semibold text-lg">{image.title}</h4>
                          <p className="text-gray-300 text-sm">View Project</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group lg:col-span-2 grid md:grid-cols-2 gap-8 mt-8">
              <div className="relative bg-gray-900/80 p-8 rounded-xl ring-1 ring-gray-800/50 backdrop-blur-xl">
                <Zap className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Rapid Development</h3>
                <p className="text-gray-400">
                 Fast, efficient website development with quick turnaround times and responsive design for all devices
                </p>
              </div>
              <div className="relative bg-gray-900/80 p-8 rounded-xl ring-1 ring-gray-800/50 backdrop-blur-xl">
                <Shield className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Secure Solutions</h3>
                <p className="text-gray-400">
                  Built-in security features, SSL certificates, and regular updates keeping your website safe and protected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-gray-900 py-24">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold mb-6 min-h-[4rem] group transform transition-all duration-300 hover:scale-105 leading-normal py-1">
            {text.split(' ').map((word, index) => (
              <span
                key={index}
                className={`inline-block mx-1 bg-gradient-to-r ${
                  word.toLowerCase() === 'digital' 
                    ? 'from-blue-400 to-blue-600 bg-clip-text text-transparent'
                    : 'from-blue-300 to-indigo-400 bg-clip-text text-transparent'
                } py-0.5`}
              >
                {word}
              </span>
            ))}
            <span 
              className={`inline-block w-1 h-12 bg-blue-500 ml-1 animate-pulse transition-opacity duration-300 ${
                isComplete ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </h2>
          <p className="text-xl bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
            We blend creativity with technology to build websites that stand out
          </p>
        </div>
      </div>

      <div className="bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative p-8 bg-gray-800 ring-1 ring-gray-800/50 rounded-lg backdrop-blur-xl">
                <Code2 className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Custom Development</h3>
                <p className="text-gray-400">Tailored solutions built with modern technologies for optimal performance</p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative p-8 bg-gray-800 ring-1 ring-gray-800/50 rounded-lg backdrop-blur-xl">
                <Palette className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">UI/UX Design</h3>
                <p className="text-gray-400">Beautiful, intuitive designs that engage and convert visitors</p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative p-8 bg-gray-800 ring-1 ring-gray-800/50 rounded-lg backdrop-blur-xl">
                <Rocket className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">SEO Optimization</h3>
                <p className="text-gray-400">Drive organic traffic with search engine optimized websites</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 mt-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative p-8 bg-gray-800 ring-1 ring-gray-800/50 rounded-lg backdrop-blur-xl">
                <Server className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Cloud Hosting</h3>
                <p className="text-gray-400">High-performance hosting with 99.9% uptime and global CDN support</p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative p-8 bg-gray-800 ring-1 ring-gray-800/50 rounded-lg backdrop-blur-xl">
                <Globe2 className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Domain Names</h3>
                <p className="text-gray-400">Secure your perfect domain with our registration and management services</p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative p-8 bg-gray-800 ring-1 ring-gray-800/50 rounded-lg backdrop-blur-xl">
                <Database className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Database Solutions</h3>
                <p className="text-gray-400">Scalable and secure database infrastructure for your applications</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showCareersModal, setShowCareersModal] = useState(false);

  const handleStartProject = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/project-start');
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-900/80 backdrop-blur-md fixed w-full z-50 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Globe className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold text-white">WebCraft</span>
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-300 hover:text-blue-500 transition-colors">Home</Link>
              <Link to="/services" className="text-gray-300 hover:text-blue-500 transition-colors">Services</Link>
              <Link to="/about" className="text-gray-300 hover:text-blue-500 transition-colors">About</Link>
              <Link to="/contact" className="text-gray-300 hover:text-blue-500 transition-colors">Contact</Link>
            </div>
            <div className="flex items-center">
              <button 
                onClick={handleStartProject}
                disabled={isLoading}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <span>Start Project</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/90 backdrop-blur-sm">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-lg text-white">Preparing your project...</p>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project-start" element={<ProjectStart />} />
      </Routes>

      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <Globe className="h-6 w-6 text-blue-500" />
                <span className="ml-2 text-xl font-bold text-white">WebCraft</span>
              </div>
              <p className="text-gray-400 mb-6">
                Crafting digital experiences that inspire and transform businesses.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/services" className="text-gray-400 hover:text-blue-500 transition-colors">Services</Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-blue-500 transition-colors">About Us</Link>
                </li>
                <li>
                  <button 
                    onClick={() => setShowCareersModal(true)}
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    Careers
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-400">
                  <Phone className="h-5 w-5 mr-3 text-blue-500" />
                  <span>470-244-3180</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <Mail className="h-5 w-5 mr-3 text-blue-500" />
                  <span>contact@ksoft-tech.com</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <MapPin className="h-5 w-5 mr-3 text-blue-500" />
                  <span>Canton, Georgia</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 WebCraft. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-sm">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-sm">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <CareersModal 
        isOpen={showCareersModal}
        onClose={() => setShowCareersModal(false)}
      />
    </div>
  );
}

export default App;