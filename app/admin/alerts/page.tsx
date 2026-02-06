"use client";

import { useState } from "react";
import { Header } from "@/components/layout";
import { Card, Badge, Button, Input } from "@/components/ui";
import {
  Bell,
  Plus,
  Send,
  AlertTriangle,
  Info,
  CheckCircle,
  Trash2,
  Clock,
  Users,
  MapPin,
} from "lucide-react";

interface Alert {
  id: string;
  title: string;
  message: string;
  type: "warning" | "info" | "danger" | "success";
  targetAreas: string[];
  createdAt: string;
  status: "Active" | "Scheduled" | "Expired";
}

const initialAlerts: Alert[] = [
  {
    id: "1",
    title: "Dengue Alert",
    message:
      "Increased dengue cases reported in Laxmi Peth and Murarji Peth. Citizens are advised to use mosquito repellents and eliminate stagnant water.",
    type: "danger",
    targetAreas: ["Laxmi Peth", "Murarji Peth"],
    createdAt: "2026-02-06",
    status: "Active",
  },
  {
    id: "2",
    title: "Vaccination Drive",
    message:
      "Free COVID-19 booster vaccination available at Solapur Civil Hospital from Feb 7-14. Bring Aadhaar card for registration.",
    type: "info",
    targetAreas: ["All Areas"],
    createdAt: "2026-02-05",
    status: "Active",
  },
  {
    id: "3",
    title: "Water Advisory",
    message:
      "Due to pipeline maintenance, citizens in Hotgi Road area should boil water before drinking until Feb 8.",
    type: "warning",
    targetAreas: ["Hotgi Road"],
    createdAt: "2026-02-04",
    status: "Active",
  },
  {
    id: "4",
    title: "Health Camp",
    message:
      "Free health checkup camp at Siddheshwar Hospital on Feb 10. Eye, dental, and general checkup available.",
    type: "success",
    targetAreas: ["All Areas"],
    createdAt: "2026-02-03",
    status: "Scheduled",
  },
];

export default function AdminAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: "",
    message: "",
    type: "info" as Alert["type"],
    targetAreas: "",
  });

  const getTypeIcon = (type: Alert["type"]) => {
    switch (type) {
      case "danger":
        return <AlertTriangle className="w-5 h-5" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5" />;
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: Alert["type"]) => {
    switch (type) {
      case "danger":
        return "bg-[var(--danger-100)] text-[var(--danger-600)]";
      case "warning":
        return "bg-[var(--warning-100)] text-[var(--warning-600)]";
      case "success":
        return "bg-[var(--secondary-100)] text-[var(--secondary-600)]";
      default:
        return "bg-[var(--primary-100)] text-[var(--primary-600)]";
    }
  };

  const handleCreateAlert = () => {
    const alert: Alert = {
      id: Date.now().toString(),
      title: newAlert.title,
      message: newAlert.message,
      type: newAlert.type,
      targetAreas: newAlert.targetAreas.split(",").map((a) => a.trim()),
      createdAt: new Date().toISOString().split("T")[0],
      status: "Active",
    };
    setAlerts([alert, ...alerts]);
    setShowCreateModal(false);
    setNewAlert({ title: "", message: "", type: "info", targetAreas: "" });
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const activeAlerts = alerts.filter((a) => a.status === "Active");
  const scheduledAlerts = alerts.filter((a) => a.status === "Scheduled");

  return (
    <div className="animate-fade-in">
      <Header
        title="Alert Management"
        subtitle="Create and manage health alerts for Solapur citizens"
        action={
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-5 h-5" />
            Create Alert
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="bg-[var(--danger-50)] border-[var(--danger-200)]">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-[var(--danger-600)]" />
            <div>
              <p className="text-2xl font-bold text-[var(--danger-700)]">
                {activeAlerts.length}
              </p>
              <p className="text-sm text-[var(--danger-600)]">Active Alerts</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[var(--warning-50)] border-[var(--warning-200)]">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-[var(--warning-600)]" />
            <div>
              <p className="text-2xl font-bold text-[var(--warning-700)]">
                {scheduledAlerts.length}
              </p>
              <p className="text-sm text-[var(--warning-600)]">Scheduled</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[var(--primary-50)] border-[var(--primary-200)]">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-[var(--primary-600)]" />
            <div>
              <p className="text-2xl font-bold text-[var(--primary-700)]">
                10,000+
              </p>
              <p className="text-sm text-[var(--primary-600)]">Citizens Reached</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className="relative">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${getTypeColor(alert.type)}`}>
                {getTypeIcon(alert.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg text-[var(--foreground)]">
                    {alert.title}
                  </h3>
                  <Badge
                    variant={
                      alert.status === "Active"
                        ? "success"
                        : alert.status === "Scheduled"
                        ? "warning"
                        : "default"
                    }
                  >
                    {alert.status}
                  </Badge>
                  <Badge
                    variant={
                      alert.type === "danger"
                        ? "danger"
                        : alert.type === "warning"
                        ? "warning"
                        : alert.type === "success"
                        ? "success"
                        : "info"
                    }
                  >
                    {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                  </Badge>
                </div>
                <p className="text-[var(--muted-foreground)] mb-3">
                  {alert.message}
                </p>
                <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {alert.targetAreas.join(", ")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {alert.createdAt}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteAlert(alert.id)}
              >
                <Trash2 className="w-4 h-4 text-[var(--danger-500)]" />
              </Button>
            </div>
          </Card>
        ))}

        {alerts.length === 0 && (
          <Card className="text-center py-12">
            <Bell className="w-12 h-12 text-[var(--muted-foreground)] mx-auto mb-4" />
            <p className="text-[var(--muted-foreground)]">
              No alerts created yet. Click "Create Alert" to get started.
            </p>
          </Card>
        )}
      </div>

      {/* Create Alert Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">
              Create New Alert
            </h2>

            <div className="space-y-4">
              <Input
                label="Alert Title"
                placeholder="e.g., Dengue Alert"
                value={newAlert.title}
                onChange={(e) =>
                  setNewAlert({ ...newAlert, title: e.target.value })
                }
              />

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[var(--foreground)]">
                  Alert Type
                </label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)]"
                  value={newAlert.type}
                  onChange={(e) =>
                    setNewAlert({
                      ...newAlert,
                      type: e.target.value as Alert["type"],
                    })
                  }
                >
                  <option value="info">Information</option>
                  <option value="warning">Warning</option>
                  <option value="danger">Critical</option>
                  <option value="success">Success/Announcement</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[var(--foreground)]">
                  Message
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] resize-none"
                  rows={4}
                  placeholder="Enter the alert message..."
                  value={newAlert.message}
                  onChange={(e) =>
                    setNewAlert({ ...newAlert, message: e.target.value })
                  }
                />
              </div>

              <Input
                label="Target Areas (comma-separated)"
                placeholder="e.g., Laxmi Peth, Hotgi Road or All Areas"
                value={newAlert.targetAreas}
                onChange={(e) =>
                  setNewAlert({ ...newAlert, targetAreas: e.target.value })
                }
              />
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-[var(--border)]">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleCreateAlert}
                disabled={!newAlert.title || !newAlert.message}
              >
                <Send className="w-5 h-5" />
                Publish Alert
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
