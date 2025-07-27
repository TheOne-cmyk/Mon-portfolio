import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Server, Zap, Award, Star, Cpu, Monitor, Wrench } from 'lucide-react';
import { FaReact, FaJs, FaDocker, FaFigma, FaPhp } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiMysql, SiPostgresql, SiC } from 'react-icons/si';
import 'devicon/devicon.min.css';

const Skills: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const skillCategories = [
    {
      title: 'Développement Frontend',
      icon: Code2,
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      skills: ['React', 'Tailwind CSS', 'TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3'],
      description: 'Création d\'interfaces utilisateur modernes et réactives'
    },
    {
      title: 'Animations & 3D',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      skills: ['Framer Motion', 'Canvas', 'CSS Animations'],
      description: 'Expériences immersives et animations performantes'
    },
    {
      title: 'Backend & Données',
      icon: Server,
      color: 'from-green-500 to-teal-500',
      bgGradient: 'from-green-500/10 to-teal-500/10',
      skills: ['Php', 'PostgreSQL', 'MySQL', 'REST API'],
      description: 'Architecture serveur robuste et gestion de données'
    },
    {
      title: 'Outils & DevOps',
      icon: Wrench,
      color: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/10 to-red-500/10',
      skills: ['Git', 'Docker', 'Cursor', 'Vite', 'Figma', 'VS Code'],
      description: 'Workflow optimisé et outils de développement'
    }
  ];

  const technologies = [
    { name: 'React', icon: <FaReact className="text-[#61DAFB]" />, level: 'Débutant', years: '1+' },
    { name: 'TypeScript', icon: <SiTypescript className="text-[#3178C6]" />, level: 'Débutant', years: '1+' },
    { name: 'PHP', icon: <FaPhp className="text-[#777BB4]" />, level: 'Débutant', years: '1+' },
    { name: 'MySQL', icon: <SiMysql className="text-[#4479A1]" />, level: 'Intermédiaire', years: '2+' },
    { name: 'Docker', icon: <FaDocker className="text-[#2496ED]" />, level: 'Débutant', years: '1+' },
    { name: 'Figma', icon: <FaFigma className="text-[#F24E1E]" />, level: 'Intermédiaire', years: '2+' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-[#06B6D4]" />, level: 'Débutant', years: '1+' },
    { name: 'JavaScript', icon: <FaJs className="text-[#F7DF1E]" />, level: 'Intermédiaire', years: '2+' },
    { name: 'C', icon: <SiC className="text-[#A8B9CC]" />, level: 'Intermédiaire', years: '2+' },
    { name: 'PostgreSQL', icon: <SiPostgresql className="text-[#336791]" />, level: 'Débutant', years: '1+' }
  ];

  const achievements = [
    { 
      icon: Award, 
      title: '10+ Projets', 
      subtitle: 'Réalisés avec succès',
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      icon: Star, 
      title: '80% Satisfaction', 
      subtitle: 'Clients satisfaits',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      icon: Cpu, 
      title: '2+ Années', 
      subtitle: 'D\'expérience',
      color: 'from-blue-500 to-indigo-500'
    },
    { 
      icon: Monitor, 
      title: '5+ Technologies', 
      subtitle: 'Maîtrisées',
      color: 'from-purple-500 to-violet-500'
    }
  ];

  // Animation automatique du carousel circulaire
  useEffect(() => {
    if (!inView) return;

    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % technologies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [inView, technologies.length]);

  // Animated skill radar chart effect
  useEffect(() => {
    if (!canvasRef.current || !inView) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    let animationFrame: number;
    let progress = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      progress += 0.02;
      if (progress > 1) progress = 1;

      // Draw concentric circles
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radius * i) / 5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(147, 51, 234, ${0.1 + i * 0.05})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw skill axes
      const skills = ['Frontend', '3D/Animation', 'Backend', 'Outils', 'Design', 'Performance'];
      const skillLevels = [0.95, 0.85, 0.85, 0.9, 0.8, 0.92];
      
      skills.forEach((skill, index) => {
        const angle = (index * Math.PI * 2) / skills.length - Math.PI / 2;
        const level = skillLevels[index] * progress;
        
        // Draw axis line
        const axisX = centerX + Math.cos(angle) * radius;
        const axisY = centerY + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(axisX, axisY);
        ctx.strokeStyle = 'rgba(147, 51, 234, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw skill point
        const pointX = centerX + Math.cos(angle) * radius * level;
        const pointY = centerY + Math.sin(angle) * radius * level;
        
        ctx.beginPath();
        ctx.arc(pointX, pointY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#8b5cf6';
        ctx.fill();
        
        // Draw skill label
        const labelX = centerX + Math.cos(angle) * (radius + 30);
        const labelY = centerY + Math.sin(angle) * (radius + 30);
        
        ctx.fillStyle = '#e5e7eb';
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(skill, labelX, labelY);
      });

      // Draw connecting lines
      ctx.beginPath();
      skills.forEach((skill, index) => {
        const angle = (index * Math.PI * 2) / skills.length - Math.PI / 2;
        const level = skillLevels[index] * progress;
        const pointX = centerX + Math.cos(angle) * radius * level;
        const pointY = centerY + Math.sin(angle) * radius * level;
        
        if (index === 0) {
          ctx.moveTo(pointX, pointY);
        } else {
          ctx.lineTo(pointX, pointY);
        }
      });
      ctx.closePath();
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = 'rgba(139, 92, 246, 0.1)';
      ctx.fill();

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [inView]);

  // Calcul des positions circulaires avec centrage amélioré
  const getCardPosition = (index: number) => {
    const totalItems = technologies.length;
    const angle = (index * (2 * Math.PI)) / totalItems - (activeIndex * (2 * Math.PI)) / totalItems;
    const radius = window.innerWidth < 768 ? 150 : 220; // Rayon augmenté
    
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.7, // Aplatissement réduit
      scale: index === activeIndex ? 1.2 : 0.9, // Échelle plus marquée
      zIndex: index === activeIndex ? 10 : 1,
      opacity: index === activeIndex ? 1 : 0.8, // Opacité réduite
      filter: index === activeIndex ? 'none' : 'brightness(0.8)'
    };
  };

  return (
    <section id="skills" className="min-h-screen py-20 bg-gradient-to-b from-black to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Expertise Technique
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Maîtrise des technologies modernes pour créer des expériences digitales exceptionnelles
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Skills Categories Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20 px-4">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + categoryIndex * 0.1 }}
              className={`group relative bg-gradient-to-br ${category.bgGradient} backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-purple-400/30 transition-all duration-500 hover:scale-[1.02] overflow-hidden`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 right-4">
                  <category.icon className="w-24 h-24 md:w-32 md:h-32 text-white" />
                </div>
              </div>

              {/* Header */}
              <div className="relative z-10 mb-6">
                <div className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{category.title}</h3>
                <p className="text-gray-400 text-sm">{category.description}</p>
              </div>

              {/* Skills Tags */}
              <div className="relative z-10 flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                    className={`px-2 py-1 text-xs md:text-sm bg-gradient-to-r ${category.color} bg-opacity-20 border border-white/20 rounded-full text-white font-medium hover:scale-105 transition-transform cursor-pointer`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
            </motion.div>
          ))}
        </div>
{/* Technologies Mastery - Version mobile améliorée */}
<motion.div 
  initial={{ opacity: 0 }}
  animate={inView ? { opacity: 1 } : {}}
  transition={{ duration: 0.8 }}
  className="relative py-10 md:py-16 overflow-x-hidden"
>
  <motion.h3
    initial={{ y: 50, opacity: 0 }}
    animate={inView ? { y: 0, opacity: 1 } : {}}
    transition={{ duration: 0.6 }}
    className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 px-4"
  >
    Technologies Maîtrisées
  </motion.h3>

  {/* Version mobile - Carrousel tactile amélioré */}
  <div className="md:hidden relative h-[420px] w-full overflow-hidden py-4">
    {/* Conteneur des cartes avec gestes tactiles */}
    <motion.div
      className="flex items-center h-full"
      animate={{
        x: -activeIndex * (window.innerWidth * 0.8) + (window.innerWidth * 0.1),
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      drag="x"
      dragConstraints={{
        left: -technologies.length * (window.innerWidth * 0.8) + window.innerWidth,
        right: 0
      }}
      onDragEnd={(e, { offset, velocity }) => {
        const dragOffset = offset.x;
        const dragVelocity = velocity.x;
        
        if (dragOffset < -50 || dragVelocity < -500) {
          setActiveIndex(prev => Math.min(prev + 1, technologies.length - 1));
        } else if (dragOffset > 50 || dragVelocity > 500) {
          setActiveIndex(prev => Math.max(prev - 1, 0));
        }
      }}
    >
      {technologies.map((tech, i) => (
        <motion.div
          key={i}
          className="flex-shrink-0 w-[70vw] h-[380px] mx-[5vw] bg-gray-900/80 backdrop-blur-lg border border-cyan-400/30 rounded-2xl p-6 flex flex-col items-center shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1 - Math.abs(i - activeIndex) * 0.4,
            y: 0,
            scale: i === activeIndex ? 1 : 0.9,
            transition: { delay: i * 0.1 }
          }}
          whileHover={{
            scale: i === activeIndex ? 1.05 : 0.95,
            boxShadow: i === activeIndex ? '0 20px 25px -5px rgba(104, 211, 246, 0.3)' : 'none',
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveIndex(i)}
          style={{
            zIndex: i === activeIndex ? 10 : 1,
            filter: i === activeIndex ? 'none' : 'brightness(0.7)'
          }}
        >
          {/* Animation de l'icône */}
          <motion.div 
            className="text-6xl mb-6 flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl"
            whileHover={{
              rotate: [0, 10, -10, 0],
              transition: { duration: 0.6 }
            }}
            animate={{
              y: i === activeIndex ? [0, -10, 0] : 0,
              transition: i === activeIndex ? { 
                repeat: Infinity, 
                repeatType: "loop",
                duration: 3 
              } : {}
            }}
          >
            {tech.icon}
          </motion.div>

          {/* Contenu de la carte */}
          <div className="text-center flex-1 flex flex-col space-y-4">
            <h4 className="text-2xl font-bold text-cyan-100 mb-2">
              {tech.name}
            </h4>
            
            <div className="mt-auto w-full space-y-4">
              <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                tech.level === 'Expert' 
                  ? 'bg-green-500/20 text-green-300'
                  : tech.level === 'Intermédiaire'
                  ? 'bg-cyan-500/20 text-cyan-300'
                  : 'bg-purple-500/20 text-purple-300'
              }`}>
                {tech.level}
              </div>
              
              {/* Barre de progression animée */}
              <div className="w-full bg-gray-800 rounded-full h-2.5 mb-3 overflow-hidden">
                <motion.div 
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${tech.years === '1+' ? '70%' : '90%'}`,
                    transition: { delay: 0.3 + i * 0.1 }
                  }}
                />
              </div>
              
              <p className="text-sm text-cyan-300/70">
                {tech.years} {tech.years === '1+' ? 'an' : 'ans'} d'expérience
              </p>
            </div>
          </div>

          {/* Effet de mise en avant pour la carte active */}
          {i === activeIndex && (
            <>
              <motion.div 
                className="absolute inset-0 rounded-2xl border-2 border-cyan-400/50 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
              />
              <motion.div 
                className="absolute -inset-1 bg-cyan-500/10 rounded-2xl blur-md pointer-events-none"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  transition: { repeat: Infinity, duration: 2 }
                }}
              />
            </>
          )}
        </motion.div>
      ))}
    </motion.div>

    {/* Indicateurs de position (points) */}
    <div className="flex justify-center mt-6 gap-2">
      {technologies.map((_, i) => (
        <motion.button
          key={i}
          onClick={() => setActiveIndex(i)}
          className={`w-3 h-3 rounded-full transition-all ${
            i === activeIndex 
              ? 'bg-gradient-to-r from-cyan-400 to-purple-500 scale-125' 
              : 'bg-gray-600 hover:bg-gray-500'
          }`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Aller à la technologie ${i+1}`}
        />
      ))}
    </div>
  </div>

  {/* Version desktop - circulaire */}
  <div className="hidden md:block relative h-[500px] w-full">
    <div className="relative w-full h-full flex items-center justify-center">
      {technologies.map((tech, i) => {
        const position = getCardPosition(i);
        
        return (
          <motion.div
            key={i}
            className="absolute w-52 h-64 bg-gray-900/80 backdrop-blur-lg border border-cyan-400/30 rounded-xl p-5 flex flex-col items-center shadow-lg"
            initial={{ 
              x: 0,
              y: 0,
              scale: 0.8,
              opacity: 0
            }}
            animate={{
              x: position.x,
              y: position.y,
              scale: position.scale,
              opacity: position.opacity,
              zIndex: position.zIndex,
              transition: { 
                type: 'spring', 
                stiffness: 80,
                damping: 15,
                delay: i * 0.1
              }
            }}
            whileHover={{ 
              scale: Math.min(position.scale * 1.15, 1.25),
              boxShadow: '0 25px 50px -12px rgba(104, 211, 246, 0.4)',
              transition: { duration: 0.2 }
            }}
            onClick={() => setActiveIndex(i)}
          >
            <motion.div 
              className="text-6xl mb-5 flex items-center justify-center w-20 h-20"
              whileHover={{
                rotate: [0, 10, -10, 0],
                transition: { duration: 0.6 }
              }}
            >
              {tech.icon}
            </motion.div>

            <div className="text-center flex-1 flex flex-col space-y-3">
              <h4 className="text-xl font-bold text-cyan-100 mb-2">
                {tech.name}
              </h4>
              
              <div className="mt-auto w-full space-y-3">
                <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  tech.level === 'Expert' 
                    ? 'bg-green-500/20 text-green-300'
                    : tech.level === 'Intermédiaire'
                    ? 'bg-cyan-500/20 text-cyan-300'
                    : 'bg-purple-500/20 text-purple-300'
                }`}>
                  {tech.level}
                </div>
                
                <div className="w-full bg-gray-800 rounded-full h-2 mb-2 overflow-hidden">
                  <motion.div 
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                    animate={{ 
                      width: `${tech.years === '1+' ? '70%' : '90%'}`,
                    }}
                  />
                </div>
                <p className="text-sm text-cyan-300/70">
                  {tech.years} {tech.years === '1+' ? 'an' : 'ans'} d'expérience
                </p>
              </div>
            </div>

            {i === activeIndex && (
              <>
                <motion.div 
                  className="absolute inset-0 rounded-xl border-2 border-cyan-400/50 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                />
                <div className="absolute -inset-1 bg-cyan-500/10 rounded-xl blur-md pointer-events-none" />
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  </div>

  {/* Contrôles de navigation */}
  <div className="flex justify-center mt-10 md:mt-12 gap-3">
    {technologies.map((_, i) => (
      <motion.button
        key={i}
        onClick={() => setActiveIndex(i)}
        className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all ${
          i === activeIndex 
            ? 'bg-gradient-to-r from-cyan-400 to-purple-500 scale-125' 
            : 'bg-gray-600 hover:bg-gray-500'
        }`}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      />
    ))}
  </div>
</motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16 md:mb-20 px-4"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8 md:mb-12">Réalisations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="group text-center"
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r ${achievement.color} rounded-2xl mx-auto mb-3 md:mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <achievement.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-white mb-1">{achievement.title}</h4>
                <p className="text-gray-400 text-xs md:text-sm">{achievement.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Radar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center px-4"
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 max-w-md mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">Aperçu des Compétences</h3>
            <div className="flex justify-center">
              <canvas
                ref={canvasRef}
                width={300}
                height={300}
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;