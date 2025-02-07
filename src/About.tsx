import React from 'react';
import { Award, Users, Target, Heart, CheckCircle2, Calendar, MapPin, Phone, Mail, Globe, Github, Linkedin, Twitter } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface Achievement {
  year: string;
  title: string;
  description: string;
}

function About() {
  const teamMembers: TeamMember[] = [
    {
      name: "Kamron Johnson",
      role: "Founder",
      bio: "With over 3 years of experience in web development and digital strategy, Kamron leads our team with a vision for innovation and excellence.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Sarah Martinez",
      role: "Creative Director",
      bio: "Sarah brings 10 years of UI/UX design expertise, ensuring our projects not only look beautiful but deliver exceptional user experiences.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Michael Thompson",
      role: "Technical Lead",
      bio: "A full-stack developer with a passion for emerging technologies, Michael ensures our solutions are built on solid technical foundations.",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Emily Wong",
      role: "Project Manager",
      bio: "Emily's exceptional organizational skills and client-first approach ensure projects are delivered on time and exceed expectations.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80"
    }
  ];

  const achievements: Achievement[] = [
    {
      year: "2025",
      title: "Launch Excellence",
      description: "Building foundations for digital innovation with cutting-edge development practices and personalized client service"
    },
    {
      year: "2025 Q3",
      title: "Growth & Innovation",
      description: "Expanding our expertise in responsive design, e-commerce solutions, and custom web applications"
    },
    {
      year: "2025 Q4",
      title: "Client Success Focus",
      description: "Dedicated to achieving 100% client satisfaction through transparent communication and exceptional delivery"
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
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">WebCraft</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Crafting digital excellence since 2025. We're more than just a web development agency – we're your partner in digital transformation.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="relative py-16 bg-[#0B1121]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-gray-300 mb-4">
                Founded in 2025, WebCraft bridges the gap between technology and business success. We transform ideas into powerful digital experiences through expert web development, strategic design, and innovative solutions.
              </p>
              <p className="text-gray-300">
                We specialize in crafting custom digital solutions that elevate businesses to new heights. Our dedicated team brings together technical mastery and creative innovation to deliver websites that make an impact. Whether you're launching a new venture or revamping your digital presence, we're committed to turning your vision into a powerful online reality.
              </p>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration"
                  className="rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Values */}
      <div className="relative py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Mission & Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our mission is to empower businesses with innovative digital solutions that drive growth and create lasting impact.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="h-8 w-8" />,
                title: "Mission",
                description: "To deliver exceptional digital solutions that empower businesses to thrive in the modern age."
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Vision",
                description: "To be the leading force in digital transformation, setting new standards in web development excellence."
              },
              {
                icon: <Heart className="h-8 w-8" />,
                title: "Values",
                description: "Innovation, integrity, collaboration, and a commitment to client success. The future is here all you need is to reach for it."
              }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-gray-900/80 p-8 rounded-xl ring-1 ring-gray-800/50 backdrop-blur-xl">
                  <div className="text-blue-500 mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="relative py-16 bg-[#0B1121]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Talented individuals united by a passion for digital excellence
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-gray-900/80 p-6 rounded-xl ring-1 ring-gray-800/50 backdrop-blur-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-white text-center mb-2">{member.name}</h3>
                  <p className="text-blue-400 text-center mb-4">{member.role}</p>
                  <p className="text-gray-300 text-center">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="relative py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Our Commitments</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Milestones we aim to achieve through excellence
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-gray-900/80 p-8 rounded-xl ring-1 ring-gray-800/50 backdrop-blur-xl">
                  <div className="flex items-center mb-4">
                    <Award className="h-8 w-8 text-blue-500 mr-3" />
                    <span className="text-blue-400 font-semibold">{achievement.year}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{achievement.title}</h3>
                  <p className="text-gray-300">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="relative py-16 bg-[#0B1121]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Why Choose WebCraft</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              What sets us apart in the digital landscape
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Expert Team",
                description: "Industry veterans with deep expertise across all digital disciplines"
              },
              {
                title: "Proven Track Record",
                description: "Hundreds of successful projects and satisfied clients worldwide"
              },
              {
                title: "Innovation Focus",
                description: "Always at the forefront of digital trends and technologies"
              },
              {
                title: "Client-First Approach",
                description: "Your success is our success - we're invested in your growth"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;