// pages/index.js
"use client"
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaLinkedin, FaCode, FaArrowRight } from 'react-icons/fa';
import { TbBrain } from 'react-icons/tb';
import { BiCodeCurly } from 'react-icons/bi';
import { MdOutlineAnalytics } from 'react-icons/md';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>Manas Ranjan Jena | ML Engineer</title>
        <meta name="description" content="Machine Learning Engineer Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Cursor follower */}
      <motion.div 
        className="hidden md:block fixed w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-emerald-400 opacity-30 pointer-events-none z-50 mix-blend-multiply blur-md"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: 2,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 100,
          mass: 0.5
        }}
      />
      
      {/* Background gradient orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-20 left-1/3 w-80 h-80 bg-emerald-500 rounded-full opacity-10 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 -left-20 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <Header />
      <Hero />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

// Header Component
function Header() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-white/80 shadow-md backdrop-blur-sm' : 'py-5 bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        type: 'spring',
        stiffness: 100,
        damping: 20
      }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#" 
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-emerald-500"
          whileHover={{ scale: 1.05 }}
        >
          MRJ
        </motion.a>
        
        <nav className="hidden md:flex items-center space-x-10">
          {['Home', 'Projects', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-gray-800 font-medium"
              whileHover={{ color: '#7c3aed' }}
            >
              {item}
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-emerald-500"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </nav>
        
        <motion.div 
          className="block md:hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <button className="text-gray-800 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </motion.div>
      </div>
    </motion.header>
  );
}

// Hero Component
function Hero() {
  const [text, setText] = useState('');
  const fullText = "Manas Ranjan Jena";
  
  useEffect(() => {
    let index = 0;
    
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, []);
  
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <motion.p
            className="text-purple-600 font-medium mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hello, I'm
          </motion.p>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {text}
            <span className="inline-block w-1 h-8 ml-1 bg-purple-600 animate-pulse" />
          </motion.h1>
          
          <motion.div
            className="h-1.5 w-32 bg-gradient-to-r from-purple-600 to-emerald-500 rounded-full mb-8"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          <motion.h2
            className="text-xl md:text-2xl font-medium text-gray-700 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Machine Learning Engineer
          </motion.h2>
          
          <motion.p
            className="text-gray-600 text-lg leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            Aspiring Machine Learning Engineer with a strong foundation in deep learning, model deployment, 
            and MLOps. Experienced in building end-to-end ML systems, research paper implementations, and 
            multi-agent AI applications. Currently pursuing a BTech in Mathematics and Computing from PEC, Chandigarh.
          </motion.p>
          
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <motion.a
              href="#projects"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-full shadow-lg shadow-purple-500/20 font-medium flex items-center gap-2"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 25px rgba(124, 58, 237, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              View Projects
              <FaArrowRight />
            </motion.a>
            
            <motion.a
              href="#contact"
              className="px-8 py-3 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 rounded-full font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
          
          <motion.div
            className="flex items-center gap-5 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <motion.a
              href="https://github.com/ManasRanjanJena253"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-purple-600 transition-colors"
              whileHover={{ y: -5 }}
            >
              <FaGithub size={22} />
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/manasranjanjena253"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-purple-600 transition-colors"
              whileHover={{ y: -5 }}
            >
              <FaLinkedin size={22} />
            </motion.a>
          </motion.div>
        </div>
      </div>
      
      {/* Background decoration */}
      <motion.div 
        className="hidden lg:block absolute right-20 bottom-0 w-1/4 h-4/5"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="relative w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-4 border-purple-200 rounded-xl" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 border-4 border-emerald-200 rounded-full" />
          <div className="absolute top-1/2 right-0 w-24 h-24 bg-purple-100 rounded-lg" />
          <div className="absolute bottom-0 left-1/3 w-28 h-28 bg-emerald-100 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

// Project Component

// Project Component
function ProjectCard({ project, index }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
    delay: 100 // Small delay to prevent simultaneous triggers
  });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95 // Slight initial scale down
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring", // Using spring for smoother animation
        stiffness: 120, // Increased stiffness for responsiveness
        damping: 15, // Reduced damping for less bounce
        delay: index * 100, // Staggered entry
        duration: 0.5
      }
    }
  };
  
  const hoverVariants = {
    rest: { 
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    },
    hover: { 
      scale: 1.03,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };
  
  const iconMap = {
    "Flappy Bird DQN Agent": <TbBrain className="text-3xl" />,
    "Multi-Agent Code Refinement System": <FaCode className="text-3xl" />,
    "DCGAN for Handwritten Digit Generation": <BiCodeCurly className="text-3xl" />,
    "Financial Insight Dashboard": <MdOutlineAnalytics className="text-3xl" />
  };
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      whileHover="hover"
      initial="rest"
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <motion.div 
        className="h-2 bg-gradient-to-r from-purple-600 to-emerald-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      />
      <div className="p-6 md:p-8">
        <div className="mb-4 text-purple-600">
          {iconMap[project.title]}
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
        
        <div className="inline-block px-3 py-1 bg-purple-100 text-purple-600 text-xs font-medium rounded-full mb-4">
          {project.tech}
        </div>
        
        <p className="text-gray-600 mb-6">
          {project.description}
        </p>
        
        <motion.a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-purple-600 font-medium"
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>View on GitHub</span>
          <FaArrowRight className="ml-2" />
        </motion.a>
      </div>
    </motion.div>
  );
}

// Projects Component
function Projects() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const projectsData = [
    {
      title: "Flappy Bird DQN Agent",
      tech: "Gymnasium, PyTorch, Deep Q-Networks",
      description: "Developed a Deep Q-Network-based reinforcement learning agent to play Flappy Bird. Implemented experience replay, target networks, and soft target updates to tackle instability issues.",
      github: "https://github.com/ManasRanjanJena253/Reinforcement_Learning/tree/main/Depp_Q_Learning(Flappy_Bird)"
    },
    {
      title: "Multi-Agent Code Refinement System",
      tech: "LangChain, Python, LLMs",
      description: "Built a multi-agent code refinement architecture using LangChain, with agents performing specialized roles like bug fixing, performance enhancement, and documentation.",
      github: "https://github.com/ManasRanjanJena253/Multi_Agent_Code_Refinement"
    },
    {
      title: "DCGAN for Handwritten Digit Generation",
      tech: "PyTorch, GANs, MNIST Dataset",
      description: "Implemented Deep Convolutional GAN from scratch on the MNIST dataset. Used one-sided label smoothing and mini-batch discrimination to tackle mode collapse.",
      github: "https://github.com/ManasRanjanJena253/GANs"
    },
    {
      title: "Real-Time Stock Trading Agent",
      tech: "Reinforcement Learning, PyTorch, Gymnasium",
      description: "Building an RL-based trading agent using DQN for Indian intraday markets. Designedcustom Gym environment with support for order types, trading hours, and leverage (5x).Faced reward signal sparsity, which was handled using hybrid rewards incorporating.",
      github: "https://github.com/ManasRanjanJena253/Trading_Bot"
    }
  ];
  
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6 } 
            }
          }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-emerald-500">
            My Projects
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-emerald-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here are some of my recent projects in machine learning and artificial intelligence that demonstrate my skills and expertise.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
// Contact Component
function Contact() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6 } 
            }
          }}
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-emerald-500">
              Get In Touch
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-emerald-500 rounded-full mx-auto mb-8" />
            
            <p className="text-gray-600 text-center mb-10">
              I'm currently looking for new opportunities in Machine Learning and AI. 
              If you'd like to discuss potential collaboration or have any questions, feel free to reach out.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                href="https://github.com/ManasRanjanJena253"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub />
                <span>GitHub</span>
              </motion.a>
              
              <motion.a
                href="https://www.linkedin.com/in/manasranjanjena253"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </motion.a>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-700 font-medium">
                Email: <span className="text-purple-600">mranjanjena253@gmail.com</span>
              </p>
            </div>
          </div>
          
          {/* Background decorations */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-purple-100 rounded-full opacity-50" />
          <div className="absolute -left-12 -top-12 w-48 h-48 bg-emerald-100 rounded-full opacity-50" />
        </motion.div>
      </div>
    </section>
  );
}
//footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Manas Ranjan Jena. All rights reserved.
          </p>
          
          <div className="flex gap-8">
            <motion.a 
              href="#home" 
              className="text-gray-300 hover:text-white transition-colors"
              whileHover={{ y: -3 }}
            >
              Home
            </motion.a>
            <motion.a 
              href="#projects" 
              className="text-gray-300 hover:text-white transition-colors"
              whileHover={{ y: -3 }}
            >
              Projects
            </motion.a>
            <motion.a 
              href="#contact" 
              className="text-gray-300 hover:text-white transition-colors"
              whileHover={{ y: -3 }}
            >
              Contact
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}