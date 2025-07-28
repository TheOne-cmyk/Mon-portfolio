import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp, Code, Coffee, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Acceuil', href: '#home' },
    { name: 'A propos', href: '#about' },
    { name: 'Projets', href: '#projects' },
    { name: 'Compétences', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    'Developpement Web ',
    ' Solutions E-commerce',
    'Design Pattern',
    'Infographie'
  ];

  return (
    <footer className="relative bg-black border-t border-white/10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="space-y-6">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">WT</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Warren Tsobgou</h3>
                    <p className="text-purple-400 font-medium">Developpeur Web </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed max-w-md">
                Créer des expériences numériques exceptionnelles grâce à des technologies de pointe, 
                des animations avancées et une attention aux détails au pixel près.
               Transformer des idées en applications web immersives.
                </p>

                {/* Stats */}
                <div className="flex space-x-6 text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Code className="w-4 h-4 text-blue-400" />
                    <span>10+ Projets</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Coffee className="w-4 h-4 text-purple-400" />
                    <span>2+ Années</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span>80% Satisfaction</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Combined Quick Links and Services Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-2 grid md:grid-cols-2 gap-8"
            >
              {/* Quick Links */}
              <div>
                <h4 className="text-white font-semibold text-lg mb-6">Liens Rapides</h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center group"
                      >
                        <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-white font-semibold text-lg mb-6">Services</h4>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <li key={index}>
                      <span className="text-gray-400 text-sm hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2 text-gray-400 text-sm"
            >
              <span>© {currentYear} Warren Tsobgou. Codé avec Passion </span>
              <Heart className="w-4 h-4 text-gradient-to-r from-purple-600 to-cyan-500 animate-pulse" fill="currentColor" />
            </motion.div>

            {/* Back to Top */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              onClick={scrollToTop}
              className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:border-transparent transition-all duration-300 hover:scale-105"
            >
              <span className="text-sm text-blue-400 group-hover:text-white transition-colors duration-300">
                Aller en haut
              </span>
              <ArrowUp className="w-4 h-4 text-blue-400 group-hover:text-white group-hover:-translate-y-1 transition-all duration-300" />
            </motion.button>
          </div>

          {/* Fun Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-full border border-white/10">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
              </div>
              <span className="text-xs text-gray-500 font-mono">
                Toujours apprendre, toujours créer
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
        style={{
          width: '100%',
          transformOrigin: '0%',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />
    </footer>
  );
};

export default Footer;