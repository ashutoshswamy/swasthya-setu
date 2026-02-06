"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MockDataBadge } from "@/components/ui/MockDataBanner";
import {
  Home,
  FileText,
  BedDouble,
  TrendingUp,
  Settings,
  LogOut,
  Building2,
  Users,
  AlertTriangle,
  Bell,
  ClipboardList,
  Package,
  Sparkles,
} from "lucide-react";

interface SidebarProps {
  role: "citizen" | "hospital" | "admin";
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: Record<string, NavItem[]> = {
  citizen: [
    { label: "Dashboard", href: "/citizen", icon: <Home size={20} /> },
    { label: "Report Incident", href: "/citizen/report", icon: <FileText size={20} /> },
    { label: "Bed Availability", href: "/citizen/beds", icon: <BedDouble size={20} /> },
    { label: "Disease Trends", href: "/citizen/trends", icon: <TrendingUp size={20} /> },
    { label: "AI Assistant", href: "/citizen/ai", icon: <Sparkles size={20} /> },
  ],
  hospital: [
    { label: "Dashboard", href: "/hospital", icon: <Home size={20} /> },
    { label: "Manage Beds", href: "/hospital/beds", icon: <BedDouble size={20} /> },
    { label: "Resources", href: "/hospital/resources", icon: <Package size={20} /> },
    { label: "View Reports", href: "/hospital/reports", icon: <ClipboardList size={20} /> },
    { label: "AI Assistant", href: "/hospital/ai", icon: <Sparkles size={20} /> },
  ],
  admin: [
    { label: "Dashboard", href: "/admin", icon: <Home size={20} /> },
    { label: "Hospitals", href: "/admin/hospitals", icon: <Building2 size={20} /> },
    { label: "Incidents", href: "/admin/incidents", icon: <AlertTriangle size={20} /> },
    { label: "Analytics", href: "/admin/trends", icon: <TrendingUp size={20} /> },
    { label: "Alerts", href: "/admin/alerts", icon: <Bell size={20} /> },
    { label: "AI Assistant", href: "/admin/ai", icon: <Sparkles size={20} /> },
  ],
};

const roleInfo = {
  citizen: {
    title: "Citizen Portal",
    color: "from-blue-600 to-blue-800",
    icon: <Users size={24} />,
  },
  hospital: {
    title: "Hospital Portal",
    color: "from-green-600 to-green-800",
    icon: <Building2 size={24} />,
  },
  admin: {
    title: "Admin Portal",
    color: "from-purple-600 to-purple-800",
    icon: <Settings size={24} />,
  },
};

const sidebarVariants = {
  hidden: { x: -64, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.3 }
  },
};

const navItemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const items = navItems[role];
  const info = roleInfo[role];

  return (
    <motion.aside 
      className="fixed left-0 top-0 h-screen w-64 bg-[var(--card)] border-r border-[var(--border)] flex flex-col z-50"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      {/* Logo Section */}
      <div className={cn("p-6 bg-gradient-to-r text-white", info.color)}>
        <Link href="/" className="flex items-center gap-3">
          <motion.div 
            className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {info.icon}
          </motion.div>
          <div>
            <h1 className="font-bold text-lg leading-tight">स्वास्थ्य सेतु</h1>
            <p className="text-xs opacity-80">{info.title}</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {items.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.li 
                key={item.href}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative overflow-hidden",
                    isActive
                      ? "bg-[var(--primary-100)] text-[var(--primary-700)]"
                      : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                  )}
                >
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {item.icon}
                  </motion.span>
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--primary-600)] rounded-r-full"
                      layoutId="activeNav"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--border)]">
        <motion.div 
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--muted)]"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
            S
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--foreground)] truncate">
              Solapur MC
            </p>
            <p className="text-xs text-[var(--muted-foreground)]">
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </p>
          </div>
          <Link
            href="/"
            className="p-2 rounded-lg hover:bg-[var(--card)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            title="Logout"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <LogOut size={18} />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.aside>
  );
}

interface HeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function Header({ title, subtitle, action }: HeaderProps) {
  return (
    <motion.header 
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div>
        <motion.h1 
          className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p 
            className="text-[var(--muted-foreground)] mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      {action && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {action}
        </motion.div>
      )}
    </motion.header>
  );
}

interface DashboardLayoutProps {
  role: "citizen" | "hospital" | "admin";
  children: React.ReactNode;
}

export function DashboardLayout({ role, children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Sidebar role={role} />
      <motion.main 
        className="ml-64 p-6 sm:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.main>
      <MockDataBadge />
    </div>
  );
}
