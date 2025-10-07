'use client'

import { Job } from "@/lib/supabase";
import Link from "next/link";
import { motion, easeInOut } from "framer-motion";
import { useEffect, useState } from "react";

type HeroProps = {
  jobs: Job[];
  companies: number;
  remoteJobs: number;
};

const Hero = ({ jobs, companies, remoteJobs }: HeroProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if desktop
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    // Mouse move for parallax effect (desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 1024) {
        setMousePosition({
          x: (e.clientX - window.innerWidth / 2) / 50,
          y: (e.clientY - window.innerHeight / 2) / 50,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeInOut
      }
    }
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeInOut
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: easeInOut
      }
    }
  };

  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Animated gradient orbs - desktop only */}
        {isDesktop && (
          <>
            <motion.div
              className="absolute top-20 left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
              animate={{
                x: mousePosition.x * 2,
                y: mousePosition.y * 2,
                scale: [1, 1.2, 1],
              }}
              transition={{
                scale: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
              animate={{
                x: mousePosition.x * -1.5,
                y: mousePosition.y * -1.5,
                scale: [1, 1.3, 1],
              }}
              transition={{
                scale: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl"
              animate={{
                x: mousePosition.x * 1,
                y: mousePosition.y * 1,
                scale: [1, 1.1, 1],
              }}
              transition={{
                scale: {
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
          </>
        )}
      </div>

      {/* Floating elements - desktop only */}
      {isDesktop && (
        <>
          <motion.div
            className="absolute top-1/4 left-10 text-6xl opacity-10"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '0s' }}
          >
            💼
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-20 text-5xl opacity-10"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '1s' }}
          >
            🚀
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 left-1/4 text-4xl opacity-10"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '2s' }}
          >
            💻
          </motion.div>
          <motion.div
            className="absolute bottom-1/3 right-1/4 text-5xl opacity-10"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '1.5s' }}
          >
            ⚡
          </motion.div>
        </>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10 w-full">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200 text-blue-700 px-5 py-2.5 rounded-full text-sm font-semibold mb-8 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              {jobs.length} Active Full-Stack Positions
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            variants={itemVariants}
          >
            Discover Your Next
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Full-Stack
            </span>{" "}
            <span className="relative inline-block">
              Opportunity
              {isDesktop && (
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                >
                  <motion.path
                    d="M5 7C55 3, 105 3, 155 7C205 11, 255 11, 295 7"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="50%" stopColor="#9333EA" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              )}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Connect with top companies hiring full-stack developers. Remote,
            hybrid, and on-site positions from startups to enterprises.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-16"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="#jobs"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl shadow-blue-500/30 transition-all hover:shadow-blue-500/50 inline-flex items-center gap-2"
              >
                Browse All Jobs
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/submit-job"
                className="bg-white/80 backdrop-blur-sm hover:bg-white text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold shadow-xl border-2 border-gray-200 transition-all hover:border-gray-300 inline-flex items-center gap-2"
              >
                Post a Position
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            variants={containerVariants}
          >
            <motion.div
              className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
              variants={statVariants}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
            >
              <motion.p
                className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                {jobs.length}+
              </motion.p>
              <p className="text-sm font-semibold text-gray-600 mt-2">Active Jobs</p>
            </motion.div>

            <motion.div
              className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
              variants={statVariants}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
            >
              <motion.p
                className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                {companies}+
              </motion.p>
              <p className="text-sm font-semibold text-gray-600 mt-2">Companies</p>
            </motion.div>

            <motion.div
              className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
              variants={statVariants}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
            >
              <motion.p
                className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                {remoteJobs}+
              </motion.p>
              <p className="text-sm font-semibold text-gray-600 mt-2">Remote Jobs</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;