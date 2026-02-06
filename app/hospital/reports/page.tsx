"use client";

import { useState } from "react";
import { Header } from "@/components/layout";
import { Card, Badge, Button } from "@/components/ui";
import { incidents } from "@/lib/mock-data";
import {
  ClipboardList,
  Phone,
  MapPin,
  Calendar,
  Check,
  Clock,
  Search,
  Filter,
  Eye,
  X,
} from "lucide-react";

export default function HospitalReports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedIncident, setSelectedIncident] = useState<typeof incidents[0] | null>(null);

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.reporterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || incident.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "danger";
      case "High":
        return "warning";
      case "Medium":
        return "info";
      default:
        return "success";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "success";
      case "Investigating":
        return "warning";
      default:
        return "danger";
    }
  };

  return (
    <div className="animate-fade-in">
      <Header
        title="Incident Reports"
        subtitle="View and manage reported health incidents"
      />

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
            <input
              type="text"
              placeholder="Search by name or location..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {["all", "Pending", "Investigating", "Resolved"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  statusFilter === status
                    ? "bg-[var(--primary-600)] text-white"
                    : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--muted-foreground)]/20"
                }`}
              >
                {status === "all" ? "All" : status}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="bg-[var(--danger-50)] border-[var(--danger-200)]">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-[var(--danger-600)]" />
            <div>
              <p className="text-2xl font-bold text-[var(--danger-700)]">
                {incidents.filter((i) => i.status === "Pending").length}
              </p>
              <p className="text-sm text-[var(--danger-600)]">Pending</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[var(--warning-50)] border-[var(--warning-200)]">
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-[var(--warning-600)]" />
            <div>
              <p className="text-2xl font-bold text-[var(--warning-700)]">
                {incidents.filter((i) => i.status === "Investigating").length}
              </p>
              <p className="text-sm text-[var(--warning-600)]">Investigating</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[var(--secondary-50)] border-[var(--secondary-200)]">
          <div className="flex items-center gap-3">
            <Check className="w-6 h-6 text-[var(--secondary-600)]" />
            <div>
              <p className="text-2xl font-bold text-[var(--secondary-700)]">
                {incidents.filter((i) => i.status === "Resolved").length}
              </p>
              <p className="text-sm text-[var(--secondary-600)]">Resolved</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Incidents List */}
      <div className="space-y-4">
        {filteredIncidents.map((incident) => (
          <Card
            key={incident.id}
            hover
            className="cursor-pointer"
            onClick={() => setSelectedIncident(incident)}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-2 min-h-[80px] rounded-full ${
                  incident.severity === "Critical"
                    ? "bg-[var(--danger-500)]"
                    : incident.severity === "High"
                    ? "bg-[var(--warning-500)]"
                    : incident.severity === "Medium"
                    ? "bg-[var(--primary-500)]"
                    : "bg-[var(--secondary-500)]"
                }`}
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-[var(--foreground)]">
                      {incident.reporterName}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {incident.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {incident.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getSeverityColor(incident.severity)}>
                      {incident.severity}
                    </Badge>
                    <Badge variant={getStatusColor(incident.status)}>
                      {incident.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {incident.symptoms.map((symptom) => (
                    <span
                      key={symptom}
                      className="px-2 py-1 bg-[var(--muted)] rounded-full text-xs text-[var(--muted-foreground)]"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                  <Calendar className="w-4 h-4" />
                  Reported: {incident.dateReported}
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredIncidents.length === 0 && (
          <Card className="text-center py-12">
            <ClipboardList className="w-12 h-12 text-[var(--muted-foreground)] mx-auto mb-4" />
            <p className="text-[var(--muted-foreground)]">
              No incidents found matching your criteria.
            </p>
          </Card>
        )}
      </div>

      {/* Detail Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[var(--foreground)]">
                Incident Details
              </h2>
              <button
                onClick={() => setSelectedIncident(null)}
                className="p-2 rounded-lg hover:bg-[var(--muted)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-[var(--muted-foreground)]">Reporter</p>
                <p className="font-bold text-[var(--foreground)]">
                  {selectedIncident.reporterName}
                </p>
              </div>
              <div>
                <p className="text-sm text-[var(--muted-foreground)]">Phone</p>
                <p className="font-bold text-[var(--foreground)]">
                  {selectedIncident.phone}
                </p>
              </div>
              <div>
                <p className="text-sm text-[var(--muted-foreground)]">Location</p>
                <p className="font-bold text-[var(--foreground)]">
                  {selectedIncident.location}
                </p>
              </div>
              <div>
                <p className="text-sm text-[var(--muted-foreground)]">Symptoms</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedIncident.symptoms.map((symptom) => (
                    <Badge key={symptom} variant="info">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">Severity</p>
                  <Badge variant={getSeverityColor(selectedIncident.severity)}>
                    {selectedIncident.severity}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">Status</p>
                  <Badge variant={getStatusColor(selectedIncident.status)}>
                    {selectedIncident.status}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Date Reported
                </p>
                <p className="font-bold text-[var(--foreground)]">
                  {selectedIncident.dateReported}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-[var(--border)]">
              <Button variant="secondary" className="flex-1">
                Mark as Resolved
              </Button>
              <Button variant="primary" className="flex-1">
                Contact Patient
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
