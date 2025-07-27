import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Clock, CheckCircle, AlertCircle, GithubIcon } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { BsTwitterX } from 'react-icons/bs';

interface FormData {
  name: string;
  email: string;
  company: string;
  project: string;
  budget: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const Contact: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    project: 'web-development',
    budget: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'tsobgouwarren@gmail.com',
      href: 'mailto:tsobgouwarren@gmail.com'
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: '+237 694 983 862',
      href: 'tel:+237694983862'
    },
    {
      icon: MapPin,
      label: 'Localisation',
      value: 'Douala, Cameroun',
      href: '#'
    }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/TheOne-cmyk', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/warren-tsobgou-21423936', label: 'LinkedIn' },
    { icon: BsTwitterX, href: 'https://twitter.com/tsobgou29837', label: 'Twitter' }
  ];

  const projectTypes = [
    { value: 'web-development', label: 'Développement Web' },
    { value: 'ecommerce', label: 'Plateforme E-commerce' },
    { value: 'dashboard', label: 'Tableau de Bord' },
    { value: 'mobile-app', label: 'Application Mobile' },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'e-mail est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Veuillez entrer un e-mail valide';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Remplacez ces valeurs par vos identifiants EmailJS
      const serviceId = 'service_7dck11k';
      const templateId = 'template_57a186p';
      const publicKey = 'IZ4Zf8tSgrjj9AHX7';

      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current!,
        publicKey
      );

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        project: 'web-development',
        budget: '',
        message: ''
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      setSubmitError('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen py-20 bg-gradient-to-b from-black to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
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
              Contactez-moi
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discutons de votre projet et créons quelque chose d'extraordinaire ensemble.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <Send className="w-6 h-6 mr-3 text-purple-400" />
                Envoyez-moi un message
              </h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-white mb-2">Message envoyé !</h4>
                  <p className="text-gray-400 mb-6">
                    Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium hover:scale-105 transition-transform duration-300"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 flex items-start"
                    >
                      <AlertCircle className="w-5 h-5 mr-2 mt-0.5" />
                      <span>{submitError}</span>
                    </motion.div>
                  )}

                  {/* Name & Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Nom complet *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                            errors.name 
                              ? 'border-red-500 focus:ring-red-500/30' 
                              : 'border-white/20 focus:border-purple-400 focus:ring-purple-400/30'
                          } text-white placeholder-gray-400`}
                          placeholder="Votre nom complet"
                        />
                        {errors.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-6 left-0 flex items-center text-red-400 text-sm"
                          >
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.name}
                          </motion.div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Adresse e-mail *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                            errors.email 
                              ? 'border-red-500 focus:ring-red-500/30' 
                              : 'border-white/20 focus:border-purple-400 focus:ring-purple-400/30'
                          } text-white placeholder-gray-400`}
                          placeholder="votre@email.com"
                        />
                        {errors.email && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-6 left-0 flex items-center text-red-400 text-sm"
                          >
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.email}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:border-purple-400 focus:ring-purple-400/30 transition-all duration-300 text-white placeholder-gray-400"
                      placeholder="Nom de votre entreprise (optionnel)"
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label htmlFor="project" className="block text-sm font-medium text-gray-300 mb-2">
                      Type de projet
                    </label>
                    <select
                      id="project"
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:border-purple-400 focus:ring-purple-400/30 transition-all duration-300 text-white"
                    >
                      {projectTypes.map((type) => (
                        <option key={type.value} value={type.value} className="bg-slate-800">
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                      Budget estimé (optionnel)
                    </label>
                    <input
                      type="text"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:border-purple-400 focus:ring-purple-400/30 transition-all duration-300 text-white placeholder-gray-400"
                      placeholder="Votre budget approximatif"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Détails du projet *
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                          errors.message 
                            ? 'border-red-500 focus:ring-red-500/30' 
                            : 'border-white/20 focus:border-purple-400 focus:ring-purple-400/30'
                        } text-white placeholder-gray-400`}
                        placeholder="Décrivez votre projet en détail..."
                      />
                      {errors.message && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -bottom-6 left-0 flex items-center text-red-400 text-sm"
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.message}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Envoyer le message
                          <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Mes coordonnées</h3>
              
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="group flex items-center space-x-4 p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 hover:border-purple-400/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{info.label}</p>
                    <p className="text-white font-semibold group-hover:text-purple-400 transition-colors duration-300">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h4 className="text-white font-semibold">Disponible pour de nouveaux projets</h4>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Je suis actuellement disponible pour discuter de nouveaux projets passionnants.
                Contactez-moi pour échanger sur vos idées et besoins.
              </p>
            </motion.div>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-5 h-5 text-purple-400" />
                <h4 className="text-white font-semibold">Délai de réponse</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Je m'engage à répondre à toutes les demandes dans un délai de <span className="text-purple-400 font-semibold">24 heures</span>.
                Pour les demandes urgentes, n'hésitez pas à m'appeler directement.
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
              className="pt-6"
            >
              <h4 className="text-white font-semibold mb-4">Réseaux sociaux</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:scale-110 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;