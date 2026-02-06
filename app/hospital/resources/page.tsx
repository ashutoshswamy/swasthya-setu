"use client";

import { useState } from "react";
import { Header } from "@/components/layout";
import { Card, Badge, Button, ProgressBar } from "@/components/ui";
import {
  Package,
  Stethoscope,
  Pill,
  Syringe,
  Wind,
  Activity,
  Users,
  Ambulance,
  AlertTriangle,
  Plus,
  Edit,
  Check,
} from "lucide-react";

interface Resource {
  id: string;
  name: string;
  icon: React.ReactNode;
  total: number;
  available: number;
  category: string;
  status: "Normal" | "Low" | "Critical";
}

const initialResources: Resource[] = [
  {
    id: "1",
    name: "Ventilators",
    icon: <Wind className="w-5 h-5" />,
    total: 30,
    available: 8,
    category: "Equipment",
    status: "Low",
  },
  {
    id: "2",
    name: "Oxygen Cylinders",
    icon: <Activity className="w-5 h-5" />,
    total: 100,
    available: 65,
    category: "Equipment",
    status: "Normal",
  },
  {
    id: "3",
    name: "Defibrillators",
    icon: <Activity className="w-5 h-5" />,
    total: 10,
    available: 8,
    category: "Equipment",
    status: "Normal",
  },
  {
    id: "4",
    name: "PPE Kits",
    icon: <Package className="w-5 h-5" />,
    total: 500,
    available: 120,
    category: "Supplies",
    status: "Low",
  },
  {
    id: "5",
    name: "Syringes",
    icon: <Syringe className="w-5 h-5" />,
    total: 5000,
    available: 3500,
    category: "Supplies",
    status: "Normal",
  },
  {
    id: "6",
    name: "Blood Units",
    icon: <Pill className="w-5 h-5" />,
    total: 200,
    available: 45,
    category: "Medical",
    status: "Low",
  },
];

const staffData = [
  { role: "Doctors", total: 45, onDuty: 18, icon: <Stethoscope className="w-5 h-5" /> },
  { role: "Nurses", total: 120, onDuty: 48, icon: <Users className="w-5 h-5" /> },
  { role: "Paramedics", total: 25, onDuty: 10, icon: <Activity className="w-5 h-5" /> },
  { role: "Support Staff", total: 60, onDuty: 25, icon: <Users className="w-5 h-5" /> },
];

const ambulances = [
  { id: "A1", type: "Advanced Life Support", status: "Available" },
  { id: "A2", type: "Advanced Life Support", status: "On Call" },
  { id: "A3", type: "Basic Life Support", status: "Available" },
  { id: "A4", type: "Basic Life Support", status: "Maintenance" },
  { id: "A5", type: "Patient Transport", status: "Available" },
];

export default function Resources() {
  const [resources] = useState<Resource[]>(initialResources);
  const [activeTab, setActiveTab] = useState<"equipment" | "staff" | "ambulance">(
    "equipment"
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critical":
        return "danger";
      case "Low":
        return "warning";
      default:
        return "success";
    }
  };

  const categories = ["Equipment", "Supplies", "Medical"];

  return (
    <div className="animate-fade-in">
      <Header
        title="Resource Management"
        subtitle="Manage hospital equipment, staff, and ambulances"
        action={
          <Button>
            <Plus className="w-5 h-5" />
            Add Resource
          </Button>
        }
      />

      {/* Tabs */}
      <div className="flex gap-2 mb-6 p-1 bg-[var(--muted)] rounded-xl w-fit">
        {[
          { id: "equipment", label: "Equipment & Supplies", icon: Package },
          { id: "staff", label: "Staff", icon: Users },
          { id: "ambulance", label: "Ambulances", icon: Ambulance },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-[var(--card)] text-[var(--foreground)] shadow-sm"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Equipment & Supplies Tab */}
      {activeTab === "equipment" && (
        <div className="space-y-6">
          {/* Alert for Low Resources */}
          {resources.filter((r) => r.status !== "Normal").length > 0 && (
            <Card className="bg-[var(--warning-50)] border-[var(--warning-200)]">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-[var(--warning-600)]" />
                <div>
                  <p className="font-semibold text-[var(--foreground)]">
                    Low Stock Alert
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {resources.filter((r) => r.status !== "Normal").length}{" "}
                    resources are running low and need restocking
                  </p>
                </div>
              </div>
            </Card>
          )}

          {categories.map((category) => (
            <Card key={category}>
              <h3 className="font-bold text-lg text-[var(--foreground)] mb-4">
                {category}
              </h3>
              <div className="space-y-4">
                {resources
                  .filter((r) => r.category === category)
                  .map((resource) => (
                    <div
                      key={resource.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-[var(--muted)]"
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          resource.status === "Normal"
                            ? "bg-[var(--secondary-100)] text-[var(--secondary-600)]"
                            : resource.status === "Low"
                            ? "bg-[var(--warning-100)] text-[var(--warning-600)]"
                            : "bg-[var(--danger-100)] text-[var(--danger-600)]"
                        }`}
                      >
                        {resource.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-[var(--foreground)]">
                            {resource.name}
                          </span>
                          <Badge variant={getStatusColor(resource.status)}>
                            {resource.status}
                          </Badge>
                        </div>
                        <ProgressBar
                          value={resource.available}
                          max={resource.total}
                          variant={
                            resource.status === "Normal"
                              ? "success"
                              : resource.status === "Low"
                              ? "warning"
                              : "danger"
                          }
                          size="sm"
                        />
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[var(--foreground)]">
                          {resource.available}
                        </p>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          of {resource.total}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Staff Tab */}
      {activeTab === "staff" && (
        <div className="grid md:grid-cols-2 gap-6">
          {staffData.map((staff) => (
            <Card key={staff.role}>
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-[var(--primary-100)] text-[var(--primary-600)]">
                  {staff.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-[var(--foreground)]">
                    {staff.role}
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {staff.onDuty} currently on duty
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-[var(--foreground)]">
                    {staff.total}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">Total</p>
                </div>
              </div>
              <div className="mt-4">
                <ProgressBar
                  value={staff.onDuty}
                  max={staff.total}
                  variant="primary"
                />
              </div>
            </Card>
          ))}

          <Card className="md:col-span-2 bg-gradient-to-br from-blue-500 to-blue-700 text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Staff Summary</h3>
                <p className="text-white/80">
                  Total Staff: {staffData.reduce((acc, s) => acc + s.total, 0)} |
                  On Duty: {staffData.reduce((acc, s) => acc + s.onDuty, 0)}
                </p>
              </div>
              <Button variant="outline" className="border-white text-white hover:bg-white/20">
                View Schedule
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Ambulance Tab */}
      {activeTab === "ambulance" && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-[var(--secondary-50)] border-[var(--secondary-200)]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[var(--secondary-100)]">
                  <Check className="w-5 h-5 text-[var(--secondary-600)]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--secondary-700)]">
                    {ambulances.filter((a) => a.status === "Available").length}
                  </p>
                  <p className="text-sm text-[var(--secondary-600)]">Available</p>
                </div>
              </div>
            </Card>
            <Card className="bg-[var(--warning-50)] border-[var(--warning-200)]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[var(--warning-100)]">
                  <Activity className="w-5 h-5 text-[var(--warning-600)]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--warning-700)]">
                    {ambulances.filter((a) => a.status === "On Call").length}
                  </p>
                  <p className="text-sm text-[var(--warning-600)]">On Call</p>
                </div>
              </div>
            </Card>
            <Card className="bg-[var(--muted)] border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[var(--card)]">
                  <Package className="w-5 h-5 text-[var(--muted-foreground)]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--foreground)]">
                    {ambulances.filter((a) => a.status === "Maintenance").length}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Maintenance
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Ambulance List */}
          <Card>
            <h3 className="font-bold text-lg text-[var(--foreground)] mb-4">
              All Ambulances
            </h3>
            <div className="space-y-3">
              {ambulances.map((ambulance) => (
                <div
                  key={ambulance.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-[var(--muted)]"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl ${
                        ambulance.status === "Available"
                          ? "bg-[var(--secondary-100)] text-[var(--secondary-600)]"
                          : ambulance.status === "On Call"
                          ? "bg-[var(--warning-100)] text-[var(--warning-600)]"
                          : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                      }`}
                    >
                      <Ambulance className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-[var(--foreground)]">
                        Ambulance {ambulance.id}
                      </p>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {ambulance.type}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      ambulance.status === "Available"
                        ? "success"
                        : ambulance.status === "On Call"
                        ? "warning"
                        : "default"
                    }
                  >
                    {ambulance.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
