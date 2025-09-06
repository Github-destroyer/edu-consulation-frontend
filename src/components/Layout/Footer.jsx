import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ChevronRight
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Universities', href: '/universities' },
    { name: 'Scholarships', href: '/scholarships' },
    { name: 'Courses', href: '/courses' },
    { name: 'About Us', href: '/about' },
  ];

  const services = [
    { name: 'University Selection', href: '#' },
    { name: 'Application Assistance', href: '#' },
    { name: 'Scholarship Guidance', href: '#' },
    { name: 'Visa Support', href: '#' },
  ];

  const countries = [
    { name: 'Study in USA', href: '/universities/usa' },
    { name: 'Study in UK', href: '/universities/uk' },
    { name: 'Study in Canada', href: '/universities/canada' },
    { name: 'Study in Australia', href: '/universities/australia' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-4 lg:mb-0">
              <h3 className="text-xl font-semibold text-white mb-2">
                Stay Updated with EduConsult
              </h3>
              <p className="text-gray-400">
                Get the latest updates on universities, scholarships, and study abroad opportunities.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:w-72"
              />
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">EduConsult</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Your trusted partner for international education. We help students achieve their dreams of studying abroad with personalized guidance and expert support.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span>123 Education Street, Learning City, LC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span>info@educonsult.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="flex items-center group hover:text-blue-400 transition-colors duration-200"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="flex items-center group hover:text-blue-400 transition-colors duration-200"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Study Destinations */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Study Destinations</h3>
            <ul className="space-y-2">
              {countries.map((country) => (
                <li key={country.name}>
                  <Link
                    to={country.href}
                    className="flex items-center group hover:text-blue-400 transition-colors duration-200"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                    {country.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 EduConsult. All rights reserved. | Privacy Policy | Terms of Service
            </div>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="bg-gray-800 hover:bg-blue-600 p-2 rounded-lg transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;