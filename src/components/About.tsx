import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Palette, Zap, Globe, Award, Coffee } from 'lucide-react';

const About: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const stats = [
    { number: '10+', label: 'Projets Réalisés', icon: Code },
    { number: '2+', label: 'Années d\'Expérience', icon: Award },
    { number: '80%', label: 'Satisfaction Client', icon: Zap },
    { number: '5/6', label: 'Passion pour le Code', icon: Coffee },
  ];

  const skills = [
    { name: 'Développement Frontend', level: 95, color: 'from-blue-500 to-cyan-500' },
    { name: 'React & Next.js', level: 90, color: 'from-purple-500 to-pink-500' },
    { name: 'Animations & GSAP', level: 88, color: 'from-yellow-500 to-orange-500' },
    { name: 'UI/UX Design', level: 82, color: 'from-indigo-500 to-purple-500' },

  ];

  return (
    <section id="about" className="min-h-screen py-20 bg-gradient-to-b from-slate-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              À Propos de Moi
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Profile Image & Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative group">
              {/* Animated border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy" />
              
              {/* Profile image placeholder */}
              <div className="relative w-full h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">WT</span>
                  </div>
                  <p className="text-gray-400"> Ma Photo</p>
                </div>
              </div>
            </div>

            {/* Floating icons */}
            <div className="absolute -top-4 -right-4 animate-bounce">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 animate-bounce delay-1000">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Palette className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              Développeur Passionné & Innovateur Créatif
            </h3>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              Avec  2 ans d'expérience en développement Web, je me spécialise dans la création 
              d'expériences digitales immersives qui repoussent les limites du possible sur le web. 
              Mon expertise s'étend des applications React modernes aux designs d'interfaces Figma
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              Je suis passionné par la combinaison de l'excellence technique avec le design créatif pour construire 
              des applications qui non seulement fonctionnent parfaitement mais captivent et inspirent les utilisateurs. 
              Chaque projet est une opportunité d'innover et de dépasser les attentes.
            </p>

            {/* Expertise Tags */}
            <div className="flex flex-wrap gap-3 mt-6">
              {['React', 'Tailwind CSS', 'Php', 'TypeScript', 'MySQL',  'PostgreSQL'].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium backdrop-blur-sm hover:scale-105 transition-transform cursor-pointer"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>


{/* Stats Section */}
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8, delay: 0.6 }}
  className="mb-20"
>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
    {stats.map((stat, index) => (
      <div 
        key={index} 
        className="text-center group p-4 md:p-0"
      >
        <div className="relative">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/30 backdrop-blur-sm mx-auto mb-3 md:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
        </div>
        <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">
          {stat.number}
        </div>
        <div className="text-sm md:text-base text-gray-400">
          {stat.label}
        </div>
      </div>
    ))}
  </div>
</motion.div>
      </div>
    </section>
  );
};

export default About;