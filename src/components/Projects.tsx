import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Play, X, Code, Zap, Layers, Filter } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  category: 'frontend' | 'fullstack';
}

const Projects: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

const projects = [
  {
    id: 1,
    title: 'BizTrack 237',
    subtitle: 'Gestion des PME Camerounaises',
    description: "Application web pour la gestion efficace des petites et moyennes entreprises locales.",
    longDescription: "BizTrack 237 centralise la gestion des ventes, des stocks, des clients et des paiements pour les PME camerounaises. Elle offre des tableaux de bord clairs, des états financiers automatisés et une interface intuitive pour les non-techniciens.",
    technologies: ['React', 'TypeScript', 'PHP', 'Tailwind CSS', 'HTML', 'CSS', 'PostgreeSQL'],
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
    category: 'fullstack'
  },
  {
    id: 2,
    title: 'DevSynch+',
    subtitle: 'Plateforme de Collaboration pour Développeurs',
    description: "Outil collaboratif inspiré de Git pour faciliter le travail d'équipe entre développeurs.",
    longDescription: "DevSynch+ permet aux développeurs de gérer le versionnage de projets, partager du code, suivre l'avancement des tâches et collaborer en temps réel. Elle simplifie la communication technique tout en conservant un historique clair des modifications.",
    technologies: ['React', 'TypeScript', 'Tailwind CSS',  'HTML', 'CSS'],
    image: 'https://images.pexels.com/photos/1181279/pexels-photo-1181279.jpeg?auto=compress&cs=tinysrgb&w=800',
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
    category: 'frontend'
  },
  {
    id: 3,
    title: 'DigiInscript',
    subtitle: 'Gestion Numérique des Inscriptions',
    description: "Plateforme d’inscription en ligne pour établissements et événements.",
    longDescription: "DigiInscript facilite la gestion des inscriptions, la génération de reçus, la vérification d'identité et la centralisation des données. Elle améliore l'organisation et réduit les files d'attente physiques.",
    technologies: ['JS','Tailwind CSS', 'PHP', 'HTML', 'CSS','MySQL'],
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
    demoUrl: '#',
    githubUrl: '#',
    featured: false,
    category: 'fullstack'
  },
  {
    id: 4,
    title: 'GesEquip',
    subtitle: 'Application de Suivi de Matériel et Équipements',
    description: "Outil pour gérer les emprunts, affectations et inventaires de matériel.",
    longDescription: "GesEquip permet aux entreprises ou établissements scolaires de suivre les équipements disponibles, gérer les demandes d'affectation, les retours, les pannes et les historiques d’utilisation.",
    technologies: [ 'Tailwind CSS', 'PHP', 'HTML', 'CSS','JS','MySQL'],
    image: 'https://images.pexels.com/photos/2566581/pexels-photo-2566581.jpeg?auto=compress&cs=tinysrgb&w=800',
    demoUrl: '#',
    githubUrl: '#',
    featured: false,
    category: 'fullstack'
  },
  {
    id: 5,
    title: 'Portfolio Personnel',
    subtitle: 'Mon Identité Numérique de Développeur',
    description: "Mon site personnel pour présenter mes compétences, projets et parcours.",
    longDescription: "Ce portfolio dynamique a été conçu pour mettre en avant mes projets, compétences techniques et mes ambitions dans le développement web. Il est responsive, rapide et intègre des animations modernes.",
    technologies: ['React', 'Tailwind CSS', 'TypeScript', 'HTML', 'CSS'],
    image: 'https://images.pexels.com/photos/5428830/pexels-photo-5428830.jpeg?auto=compress&cs=tinysrgb&w=800',
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
    category: 'frontend'
  },
  {
    id: 6,
    title: 'RentHub',
    subtitle: 'Gestion et Location de Logements',
    description: "Plateforme numérique pour la mise en location et la gestion de biens immobiliers.",
    longDescription: "RentHub connecte propriétaires et locataires, avec des outils pour publier, rechercher, réserver ou gérer un logement. Elle gère aussi les paiements, notifications et documents locatifs.",
    technologies: ['React', 'TypeScript',  'Tailwind CSS', 'HTML', 'CSS'],
    image: 'https://images.pexels.com/photos/3935336/pexels-photo-3935336.jpeg?auto=compress&cs=tinysrgb&w=800',
    demoUrl: '#',
    githubUrl: '#',
    featured: false,
    category: 'frontend'
  }
];


  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const categories = [
    { key: 'all', label: 'Tous les Projets', icon: Layers },
    { key: 'frontend', label: 'Frontend', icon: Code },
    { key: 'fullstack', label: 'Full Stack', icon: Filter }
  ];

  return (
    <section id="projects" className="min-h-screen py-20 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Projets Phares
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Présentation d'applications web de pointe avec des technologies avancées, 
            des expériences immersives et des performances exceptionnelles
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, index) => (
            <button
              key={category.key}
              onClick={() => setFilter(category.key)}
              className={`group relative px-6 py-3 rounded-full border transition-all duration-300 hover:scale-105 ${
                filter === category.key
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-500 text-white'
                  : 'border-white/20 text-gray-300 hover:border-purple-400 hover:text-white backdrop-blur-sm'
              }`}
            >
              <div className="flex items-center space-x-2">
                <category.icon size={18} className="transition-transform group-hover:scale-110" />
                <span className="font-medium">{category.label}</span>
              </div>
              {filter === category.key && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full border border-blue-500/30"
                />
              )}
            </button>
          ))}
        </motion.div>

       {/* Projects Grid */}
<AnimatePresence mode="wait">
  <motion.div
    key={filter}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
  >
    {filteredProjects.map((project, index) => (
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`group relative cursor-pointer ${
          project.featured ? 'md:col-span-2 lg:col-span-2' : ''
        }`}
        onClick={() => setSelectedProject(project)}
      >
        {/* Project Card */}
        <div className="relative h-80 lg:h-96 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm hover:border-purple-400/30 transition-all duration-500">
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 left-4 z-10">
              <div className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold text-black">
                EN VEDETTE
              </div>
            </div>
          )}

          {/* Image */}
          <div className="absolute inset-0">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="space-y-2 mb-4">
              <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-purple-400 font-medium">{project.subtitle}</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 4).map((tech, techIndex) => (
                <motion.span
                  key={techIndex}
                  className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-xs text-blue-300 border border-white/20"
                  whileHover={{ scale: 1.1 }}
                >
                  {tech}
                </motion.span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-xs text-gray-400 border border-white/20">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <motion.div 
                className="flex items-center justify-center w-10 h-10 bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full group-hover:bg-blue-600 transition-all duration-300"
                whileHover={{ scale: 1.15 }}
              >
                <Play size={16} className="text-blue-400 group-hover:text-white ml-0.5" />
              </motion.div>
              <motion.div 
                className="flex items-center justify-center w-10 h-10 bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-full group-hover:bg-purple-600 transition-all duration-300"
                whileHover={{ scale: 1.15 }}
              >
                <Github size={16} className="text-purple-400 group-hover:text-white" />
              </motion.div>
              <motion.div 
                className="flex items-center justify-center w-10 h-10 bg-cyan-600/20 backdrop-blur-sm border border-cyan-500/30 rounded-full group-hover:bg-cyan-600 transition-all duration-300"
                whileHover={{ scale: 1.15 }}
              >
                <ExternalLink size={16} className="text-cyan-400 group-hover:text-white" />
              </motion.div>
            </div>
          </div>

          {/* Hover Overlay - Mobile & Desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20 pointer-events-none"
          />
          
          {/* Pulse Effect - Mobile & Desktop */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl pointer-events-none"
          />
        </div>
      </motion.div>
    ))}
  </motion.div>
</AnimatePresence>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <button className="group relative px-8 py-4 border-2 border-white/20 rounded-full font-semibold text-white backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:border-transparent transition-all duration-300 hover:scale-105">
            <span className="relative z-10">Voir Tous les Projets</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/20 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors duration-300"
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="grid lg:grid-cols-2 h-full">
                {/* Image */}
                <div className="relative h-64 lg:h-auto">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/50" />
                </div>

                {/* Details */}
                <div className="p-8 overflow-y-auto">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                      <p className="text-purple-400 font-medium mb-4">{selectedProject.subtitle}</p>
                      <p className="text-gray-300 leading-relaxed">{selectedProject.longDescription}</p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Technologies Utilisées </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-sm text-blue-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-4">
                      <a
                        href={selectedProject.demoUrl}
                        className="group flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white hover:scale-105 transition-transform duration-300"
                      >
                        <Play size={18} />
                        <span>Démo</span>
                      </a>
                      <a
                        href={selectedProject.githubUrl}
                        className="group flex-1 flex items-center justify-center space-x-2 px-6 py-3 border-2 border-white/20 rounded-full font-semibold text-white hover:bg-white/10 transition-colors duration-300"
                      >
                        <Github size={18} />
                        <span>Code Source</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;