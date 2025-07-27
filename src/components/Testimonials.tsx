import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote, Star, ChevronLeft, ChevronRight, LinkedinIcon } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
  project: string;
  linkedinUrl: string;
}

const Testimonials: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'TechFlow Solutions',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'Alexandre delivered an exceptional e-commerce platform that exceeded our expectations. The 3D product visualization feature increased our conversion rate by 40%. His attention to detail and technical expertise are unmatched.',
      rating: 5,
      project: 'E-commerce Platform',
      linkedinUrl: '#'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'CEO',
      company: 'DataViz Pro',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'The dashboard Alexandre created for our data visualization needs is absolutely phenomenal. Complex datasets are now presented in an intuitive, interactive 3D environment. Our clients love it!',
      rating: 5,
      project: 'NeuroFlow Dashboard',
      linkedinUrl: '#'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Creative Director',
      company: 'Brand Studio',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'Working with Alexandre was a game-changer for our agency website. The animations and interactions he implemented are award-worthy. We\'ve received countless compliments from clients and partners.',
      rating: 5,
      project: 'Creative Agency Website',
      linkedinUrl: '#'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Tech Lead',
      company: 'Innovation Labs',
      image: 'https://images.pexels.com/photos/3782235/pexels-photo-3782235.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'Alexandre brings senior-level expertise to every project. His code quality is exceptional, and his ability to solve complex technical challenges while maintaining perfect performance is impressive.',
      rating: 5,
      project: 'Real-time Analytics Platform',
      linkedinUrl: '#'
    },
    {
      id: 5,
      name: 'Lisa Park',
      role: 'UX Director',
      company: 'DesignCorp',
      image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'The collaboration with Alexandre was seamless. He perfectly translated our design vision into a functional, beautiful website with stunning animations. His technical skills are matched by his creative understanding.',
      rating: 5,
      project: 'Portfolio Website',
      linkedinUrl: '#'
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="min-h-screen py-20 bg-gradient-to-b from-slate-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Témoignages Clients
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ce que les leaders de l'industrie disent de notre collaboration
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Main Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 opacity-10">
              <Quote size={80} className="text-purple-400" />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-purple-600 hover:scale-110 transition-all duration-300 z-10"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-purple-600 hover:scale-110 transition-all duration-300 z-10"
            >
              <ChevronRight size={20} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                {/* Content */}
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  {/* Client Info */}
                  <div className="lg:col-span-1 text-center lg:text-left">
                    <div className="relative inline-block mb-6">
                      <img
                        src={currentTestimonial.image}
                        alt={currentTestimonial.name}
                        className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl object-cover border-4 border-purple-400/30"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <LinkedinIcon size={16} className="text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {currentTestimonial.name}
                    </h3>
                    <p className="text-purple-400 font-medium mb-1">
                      {currentTestimonial.role}
                    </p>
                    <p className="text-gray-400 mb-4">
                      {currentTestimonial.company}
                    </p>
                    
                    {/* Project Tag */}
                    <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-sm text-blue-300 mb-4">
                      {currentTestimonial.project}
                    </div>
                    
                    {/* Rating */}
                    <div className="flex justify-center lg:justify-start space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < currentTestimonial.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="lg:col-span-2">
                    <blockquote className="text-lg md:text-xl text-gray-300 leading-relaxed italic">
                      "{currentTestimonial.content}"
                    </blockquote>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-8'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`group cursor-pointer transition-all duration-300 ${
                index === currentIndex ? 'scale-105' : 'hover:scale-105'
              }`}
              onClick={() => goToSlide(index)}
            >
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400/30 transition-colors duration-300 h-full">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="text-white font-semibold text-sm">{testimonial.name}</h4>
                    <p className="text-gray-400 text-xs">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm line-clamp-3 mb-3">
                  "{testimonial.content.substring(0, 120)}..."
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={`${
                          i < testimonial.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-purple-400">{testimonial.company}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Prêt à Démarrer Votre Projet ?
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Rejoignez la liste croissante de clients satisfaits qui ont transformé leur présence digitale avec des solutions de pointe.
          </p>
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25">
            <span className="relative z-10">Travaillons Ensemble</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;