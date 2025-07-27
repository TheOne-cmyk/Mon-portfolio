import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { BsTwitterX } from 'react-icons/bs';


const Hero: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: '#6366f1',
      transparent: true,
      opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create floating geometries
    const geometries = [];
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
      const material = new THREE.MeshBasicMaterial({ 
        color: '#8b5cf6', 
        wireframe: true,
        transparent: true,
        opacity: 0.6 
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
      );
      scene.add(cube);
      geometries.push(cube);
    }

    camera.position.z = 3;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate particles
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;
      
      // Animate geometries
      geometries.forEach((geo, index) => {
        geo.rotation.x += 0.01 + index * 0.002;
        geo.rotation.y += 0.01 + index * 0.002;
        geo.position.y += Math.sin(Date.now() * 0.001 + index) * 0.0005;
      });

      // Mouse movement effect
      camera.position.x += (mousePosition.x * 0.0005 - camera.position.x) * 0.05;
      camera.position.y += (-mousePosition.y * 0.0005 - camera.position.y) * 0.05;
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [mousePosition]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX - window.innerWidth / 2, y: e.clientY - window.innerHeight / 2 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Three.js Background */}
      <div ref={mountRef} className="absolute inset-0 z-0" />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-500/20 animate-gradient-x z-10" />
      
      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl">
        {/* Name with glitch effect */}
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold mb-6 relative"
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            Warren
          </span>
          <span className="block text-white/90 text-4xl md:text-6xl mt-2 font-light">
            Tsobgou
          </span>
        </motion.h1>

        {/* Subtitle with typewriter effect */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 font-light"
        >
          Developpeur Web créatif
        </motion.p>

        {/* Animated description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
        >
         Créer des expériences numériques immersives avec des technologies de
        pointe, des animations avancées et une attention aux détails au pixel près.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <button
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25"
            onClick={() => {
              const section = document.getElementById('projects');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span className="relative z-10">Voir mon travail</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          <button
            className="group px-8 py-4 border-2 border-white/20 rounded-full font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:border-purple-400"
            onClick={() => {
              window.open('/CV_Warren .pdf', '_blank');
            }}
          >
            Voir mon CV
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="flex justify-center space-x-6 mb-16"
        >
          {[
            { Icon: Github, href: 'https://github.com/TheOne-cmyk' },
            { Icon: Linkedin, href: 'https://linkedin.com/in/warren-tsobgou-21423936' },
            { Icon: Mail, href: 'mailto:tsobgouwarren@gmail.com' },
            { Icon: BsTwitterX, href: 'https://twitter.com/tsobgou29837' }
          ].map(({ Icon, href }, index) => (
            <a key={index} href={href} target="_blank" rel="noopener noreferrer" className="group">
              <div className="p-3 rounded-full border border-white/20 backdrop-blur-sm hover:bg-white/10 hover:border-purple-400 transition-all duration-300 hover:scale-110">
                <Icon className="w-6 h-6 text-white group-hover:text-purple-400 transition-colors duration-300" />
              </div>
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/60" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;