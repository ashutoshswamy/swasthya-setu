"use client";

import { useState } from "react";
import { Header } from "@/components/layout";
import { Card, Button, Badge } from "@/components/ui";
import { hospitals } from "@/lib/mock-data";
import {
  BedDouble,
  Plus,
  Minus,
  Save,
  Heart,
  Wind,
  Activity,
  RefreshCw,
} from "lucide-react";

// Using first hospital as the logged-in hospital
const currentHospital = hospitals[0];

interface BedCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  total: number;
  available: number;
  color: string;
}

export default function ManageBeds() {
  const [beds, setBeds] = useState<BedCategory[]>([
    {
      id: "general",
      name: "General Beds",
      icon: <BedDouble className="w-6 h-6" />,
      total: currentHospital.totalBeds,
      available: currentHospital.availableBeds,
      color: "blue",
    },
    {
      id: "icu",
      name: "ICU Beds",
      icon: <Heart className="w-6 h-6" />,
      total: currentHospital.icuBeds,
      available: currentHospital.icuAvailable,
      color: "red",
    },
    {
      id: "ventilator",
      name: "Ventilator Beds",
      icon: <Wind className="w-6 h-6" />,
      total: currentHospital.ventilators,
      available: currentHospital.ventilatorsAvailable,
      color: "purple",
    },
    {
      id: "oxygen",
      name: "Oxygen Beds",
      icon: <Activity className="w-6 h-6" />,
      total: currentHospital.oxygenBeds,
      available: currentHospital.oxygenAvailable,
      color: "emerald",
    },
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const updateAvailable = (id: string, change: number) => {
    setBeds((prev) =>
      prev.map((bed) => {
        if (bed.id === id) {
          const newAvailable = Math.max(
            0,
            Math.min(bed.total, bed.available + change)
          );
          return { ...bed, available: newAvailable };
        }
        return bed;
      })
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setIsSaving(false);
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; accent: string }> = {
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        accent: "bg-blue-500",
      },
      red: {
        bg: "bg-red-50",
        text: "text-red-600",
        accent: "bg-red-500",
      },
      purple: {
        bg: "bg-purple-50",
        text: "text-purple-600",
        accent: "bg-purple-500",
      },
      emerald: {
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        accent: "bg-emerald-500",
      },
    };
    return colors[color];
  };

  return (
    <div className="animate-fade-in">
      <Header
        title="Bed Management"
        subtitle="Update bed availability for your hospital"
        action={
          <div className="flex items-center gap-4">
            <p className="text-sm text-[var(--muted-foreground)]">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        }
      />

      {/* Bed Categories Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {beds.map((bed) => {
          const colors = getColorClasses(bed.color);
          const occupancyRate = Math.round(
            ((bed.total - bed.available) / bed.total) * 100
          );

          return (
            <Card key={bed.id} className="relative overflow-hidden">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${colors.bg} ${colors.text}`}>
                    {bed.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[var(--foreground)]">
                      {bed.name}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Total: {bed.total} beds
                    </p>
                  </div>
                </div>
                <Badge
                  variant={
                    occupancyRate > 80
                      ? "danger"
                      : occupancyRate > 50
                      ? "warning"
                      : "success"
                  }
                >
                  {occupancyRate}% occupied
                </Badge>
              </div>

              {/* Visual Representation */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-[var(--muted-foreground)]">
                    Occupied: {bed.total - bed.available}
                  </span>
                  <span className="font-medium text-[var(--foreground)]">
                    Available: {bed.available}
                  </span>
                </div>
                <div className="h-4 bg-[var(--muted)] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${colors.accent} transition-all duration-300`}
                    style={{
                      width: `${((bed.total - bed.available) / bed.total) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 p-4 bg-[var(--muted)] rounded-xl">
                <button
                  onClick={() => updateAvailable(bed.id, -1)}
                  className="p-3 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--danger-50)] hover:border-[var(--danger-200)] transition-colors"
                  disabled={bed.available === 0}
                >
                  <Minus className="w-5 h-5 text-[var(--danger-500)]" />
                </button>
                <div className="text-center">
                  <p className="text-4xl font-bold text-[var(--foreground)]">
                    {bed.available}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Available
                  </p>
                </div>
                <button
                  onClick={() => updateAvailable(bed.id, 1)}
                  className="p-3 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--secondary-50)] hover:border-[var(--secondary-200)] transition-colors"
                  disabled={bed.available === bed.total}
                >
                  <Plus className="w-5 h-5 text-[var(--secondary-500)]" />
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Update Actions */}
      <Card>
        <h3 className="font-bold text-lg text-[var(--foreground)] mb-4">
          Quick Actions
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => {
              setBeds((prev) =>
                prev.map((bed) => ({ ...bed, available: bed.total }))
              );
            }}
            className="p-4 rounded-xl border border-[var(--border)] hover:bg-[var(--secondary-50)] hover:border-[var(--secondary-200)] transition-colors text-center"
          >
            <Activity className="w-6 h-6 text-[var(--secondary-600)] mx-auto mb-2" />
            <p className="font-medium text-[var(--foreground)]">
              Mark All Available
            </p>
          </button>
          <button
            onClick={() => {
              setBeds((prev) =>
                prev.map((bed) => ({ ...bed, available: 0 }))
              );
            }}
            className="p-4 rounded-xl border border-[var(--border)] hover:bg-[var(--danger-50)] hover:border-[var(--danger-200)] transition-colors text-center"
          >
            <BedDouble className="w-6 h-6 text-[var(--danger-600)] mx-auto mb-2" />
            <p className="font-medium text-[var(--foreground)]">
              Mark All Occupied
            </p>
          </button>
          <button
            onClick={() => {
              setBeds((prev) =>
                prev.map((bed) => ({
                  ...bed,
                  available: Math.floor(bed.total * 0.5),
                }))
              );
            }}
            className="p-4 rounded-xl border border-[var(--border)] hover:bg-[var(--warning-50)] hover:border-[var(--warning-200)] transition-colors text-center"
          >
            <RefreshCw className="w-6 h-6 text-[var(--warning-600)] mx-auto mb-2" />
            <p className="font-medium text-[var(--foreground)]">Set 50% Capacity</p>
          </button>
          <button
            onClick={() => {
              setBeds([
                {
                  id: "general",
                  name: "General Beds",
                  icon: <BedDouble className="w-6 h-6" />,
                  total: currentHospital.totalBeds,
                  available: currentHospital.availableBeds,
                  color: "blue",
                },
                {
                  id: "icu",
                  name: "ICU Beds",
                  icon: <Heart className="w-6 h-6" />,
                  total: currentHospital.icuBeds,
                  available: currentHospital.icuAvailable,
                  color: "red",
                },
                {
                  id: "ventilator",
                  name: "Ventilator Beds",
                  icon: <Wind className="w-6 h-6" />,
                  total: currentHospital.ventilators,
                  available: currentHospital.ventilatorsAvailable,
                  color: "purple",
                },
                {
                  id: "oxygen",
                  name: "Oxygen Beds",
                  icon: <Activity className="w-6 h-6" />,
                  total: currentHospital.oxygenBeds,
                  available: currentHospital.oxygenAvailable,
                  color: "emerald",
                },
              ]);
            }}
            className="p-4 rounded-xl border border-[var(--border)] hover:bg-[var(--primary-50)] hover:border-[var(--primary-200)] transition-colors text-center"
          >
            <RefreshCw className="w-6 h-6 text-[var(--primary-600)] mx-auto mb-2" />
            <p className="font-medium text-[var(--foreground)]">Reset to Default</p>
          </button>
        </div>
      </Card>
    </div>
  );
}
