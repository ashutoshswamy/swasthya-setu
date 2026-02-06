"use client";

import React from "react";
import { motion, Transition, TargetAndTransition } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  disabled,
  onClick,
  type,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white shadow-lg shadow-blue-500/25",
    secondary:
      "bg-[var(--secondary-600)] hover:bg-[var(--secondary-700)] text-white shadow-lg shadow-green-500/25",
    outline:
      "border-2 border-[var(--primary-600)] text-[var(--primary-600)] hover:bg-[var(--primary-50)]",
    ghost:
      "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]",
    danger:
      "bg-[var(--danger-500)] hover:bg-[var(--danger-600)] text-white shadow-lg shadow-red-500/25",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-7 py-3.5 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-500)] disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </motion.button>
  );
}

interface CardProps {
  variant?: "default" | "glass" | "gradient";
  hover?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({
  variant = "default",
  hover = false,
  className,
  children,
  onClick,
}: CardProps) {
  const variants = {
    default: "bg-[var(--card)] border border-[var(--border)]",
    glass: "glass",
    gradient: "gradient-primary text-white",
  };

  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
        transition={{ type: "spring", stiffness: 300 }}
        className={cn(
          "rounded-2xl p-6 cursor-pointer",
          variants[variant],
          className
        )}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl p-6",
        variants[variant],
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "danger" | "info";
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "default",
  className,
  children,
}: BadgeProps) {
  const variants = {
    default: "bg-[var(--muted)] text-[var(--muted-foreground)]",
    success: "bg-[var(--secondary-100)] text-[var(--secondary-700)]",
    warning: "bg-[var(--warning-100)] text-[var(--warning-600)]",
    danger: "bg-[var(--danger-100)] text-[var(--danger-600)]",
    info: "bg-[var(--primary-100)] text-[var(--primary-700)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  className,
  ...props
}: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-[var(--foreground)]">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] focus:border-transparent transition-all",
          error && "border-[var(--danger-500)]",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-[var(--danger-500)]">{error}</p>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  options,
  className,
  ...props
}: SelectProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-[var(--foreground)]">
          {label}
        </label>
      )}
      <select
        className={cn(
          "w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] focus:border-transparent transition-all appearance-none cursor-pointer",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  variant?: "default" | "primary" | "success" | "warning" | "danger";
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = "default",
}: StatCardProps) {
  const iconColors = {
    default: "bg-[var(--muted)] text-[var(--muted-foreground)]",
    primary: "bg-[var(--primary-100)] text-[var(--primary-600)]",
    success: "bg-[var(--secondary-100)] text-[var(--secondary-600)]",
    warning: "bg-[var(--warning-100)] text-[var(--warning-600)]",
    danger: "bg-[var(--danger-100)] text-[var(--danger-600)]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative overflow-hidden rounded-2xl p-6 bg-[var(--card)] border border-[var(--border)] cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-[var(--muted-foreground)]">
            {title}
          </p>
          <p className="text-3xl font-bold text-[var(--foreground)]">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-[var(--muted-foreground)]">{subtitle}</p>
          )}
          {trend && (
            <div
              className={cn(
                "inline-flex items-center gap-1 text-sm font-medium",
                trend.isPositive
                  ? "text-[var(--secondary-600)]"
                  : "text-[var(--danger-500)]"
              )}
            >
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              <span>{trend.value}%</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            "p-3 rounded-xl",
            iconColors[variant]
          )}
        >
          {icon}
        </div>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        {icon}
      </div>
    </motion.div>
  );
}

interface ProgressBarProps {
  value: number;
  max: number;
  variant?: "primary" | "success" | "warning" | "danger";
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ProgressBar({
  value,
  max,
  variant = "primary",
  showLabel = true,
  size = "md",
}: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100);
  
  const colors = {
    primary: "bg-[var(--primary-500)]",
    success: "bg-[var(--secondary-500)]",
    warning: "bg-[var(--warning-500)]",
    danger: "bg-[var(--danger-500)]",
  };

  const sizes = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className="space-y-1">
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="text-[var(--muted-foreground)]">{value} / {max}</span>
          <span className="font-medium text-[var(--foreground)]">{percentage}%</span>
        </div>
      )}
      <div className={cn("w-full bg-[var(--muted)] rounded-full overflow-hidden", sizes[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn("h-full rounded-full", colors[variant])}
        />
      </div>
    </div>
  );
}
