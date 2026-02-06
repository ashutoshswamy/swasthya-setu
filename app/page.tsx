"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Building2,
  Settings,
  ArrowRight,
  Activity,
  BedDouble,
  AlertTriangle,
} from "lucide-react";
import { 
  FadeIn, 
  FadeInUp, 
  StaggerContainer, 
  StaggerItem, 
  HoverCard 
} from "@/components/motion";
import { MockDataBanner } from "@/components/ui/MockDataBanner";

const roleCards = [
  {
    title: "Citizen Portal",
    description: "Report health incidents, check hospital bed availability, and view disease trends in your area.",
    icon: Users,
    href: "/citizen",
    gradient: "from-blue-500 to-blue-700",
    features: ["Report Incidents", "Check Bed Availability", "View Health Trends"],
  },
  {
    title: "Hospital Portal",
    description: "Manage hospital resources, update bed availability, and respond to health incidents.",
    icon: Building2,
    href: "/hospital",
    gradient: "from-emerald-500 to-emerald-700",
    features: ["Manage Beds", "Update Resources", "View Reports"],
  },
  {
    title: "Admin Portal",
    description: "Complete oversight of the health management system with analytics and reporting.",
    icon: Settings,
    href: "/admin",
    gradient: "from-purple-500 to-purple-700",
    features: ["System Overview", "Manage Hospitals", "Analytics Dashboard"],
  },
];

const stats = [
  { label: "Hospitals Connected", value: "45+", icon: Building2 },
  { label: "Beds Tracked", value: "2,500+", icon: BedDouble },
  { label: "Incidents Resolved", value: "1,200+", icon: AlertTriangle },
  { label: "Active Users", value: "10,000+", icon: Users },
];

export default function Home() {
  return (
    <>
      <MockDataBanner />
      <div className="min-h-screen bg-[var(--background)] pt-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 pattern-dots" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-emerald-900/90" />
        
        {/* Floating Elements */}
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-2xl"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            {/* Logo/Badge */}
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <Activity className="w-5 h-5 text-emerald-400" />
                <span className="text-white/90 text-sm font-medium">
                  Solapur Municipal Corporation
                </span>
              </div>
            </FadeIn>

            {/* Title */}
            <FadeInUp delay={0.1}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
                स्वास्थ्य सेतु
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-emerald-300 mb-6">
                Swasthya Setu
              </p>
            </FadeInUp>
            <FadeInUp delay={0.3}>
              <p className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto mb-12">
                A Centralized Health Management System for Solapur City
              </p>
            </FadeInUp>

            {/* Quick Stats */}
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              {stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <motion.div
                    className="glass-dark rounded-2xl p-4 text-center"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <stat.icon className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                    <p className="text-2xl sm:text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-white/60">{stat.label}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
              fill="var(--background)"
            />
          </svg>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FadeInUp>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
              Choose Your Portal
            </h2>
            <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Access the health management system based on your role
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {roleCards.map((card, index) => (
            <StaggerItem key={card.title}>
              <Link href={card.href} className="block group h-full">
                <HoverCard className="relative overflow-hidden rounded-3xl bg-[var(--card)] border border-[var(--border)] p-8 h-full transition-all duration-500">
                  {/* Gradient Background - positioned behind content */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Content - always above gradient */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${card.gradient} text-white mb-6 group-hover:bg-white/20 transition-all duration-500`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <card.icon className="w-8 h-8" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-[var(--foreground)] group-hover:text-white mb-3 transition-colors duration-500">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[var(--muted-foreground)] group-hover:text-white/90 mb-6 transition-colors duration-500">
                      {card.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {card.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] group-hover:text-white/80 transition-colors duration-500"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-[var(--primary)] group-hover:text-white font-semibold transition-colors duration-500">
                      Enter Portal
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </HoverCard>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[var(--border)]">
        <FadeIn>
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-[var(--muted-foreground)]">
              © 2026 Solapur Municipal Corporation. All rights reserved.
            </p>
            <p className="text-sm text-[var(--muted-foreground)] mt-2">
              स्वास्थ्य सेतु - Bridging Health Services for the People of Solapur
            </p>
            <p className="text-sm text-[var(--primary)] font-medium mt-3">
              Made with ❤️ by Team WellNourish from MIT WPU
            </p>
          </div>
        </FadeIn>
      </footer>
    </div>
    </>
  );
}
