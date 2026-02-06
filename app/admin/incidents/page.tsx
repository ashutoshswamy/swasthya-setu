"use client";

import { useState } from "react";
import { Header } from "@/components/layout";
import { Card, Badge, Button } from "@/components/ui";
import { incidents, hospitals } from "@/lib/mock-data";
import {
  AlertTriangle,
  Search,
  Phone,
  MapPin,
  Calendar,
  Check,
  Clock,
  Eye,
  X,
  Building2,
  Filter,
} from "lucide-react";

export default function AdminIncidents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [selectedIncident, setSelectedIncident] = useState<typeof incidents[0] | null>(null);

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.reporterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || incident.status === statusFilter;
    const matchesSeverity =
      severityFilter === "all" || incident.severity === severityFilter;
    return matchesSearch && matchesStatus && matchesSeverity;
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

  const getHospitalName = (id?: string) => {
    if (!id) return "Unassigned";
    const hospital = hospitals.find((h) => h.id === id);
    return hospital?.name || "Unknown";
  };

  return (
    <div className="animate-fade-in">
      <Header
        title="Incident Management"
        subtitle="View and manage all reported health incidents"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
        <Card className="bg-[var(--primary-50)] border-[var(--primary-200)]">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-[var(--primary-600)]" />
            <div>
              <p className="text-2xl font-bold text-[var(--primary-700)]">
                {incidents.filter((i) => i.severity === "Critical").length}
              </p>
              <p className="text-sm text-[var(--primary-600)]">Critical</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
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
          <div className="flex flex-wrap gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)]"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Investigating">Investigating</option>
              <option value="Resolved">Resolved</option>
            </select>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)]"
            >
              <option value="all">All Severity</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Incidents Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--muted-foreground)]">
                  Reporter
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--muted-foreground)]">
                  Location
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--muted-foreground)]">
                  Symptoms
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--muted-foreground)]">
                  Severity
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--muted-foreground)]">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--muted-foreground)]">
                  Assigned
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--muted-foreground)]">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--muted-foreground)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidents.map((incident) => (
                <tr
                  key={incident.id}
                  className="border-b border-[var(--border)] hover:bg-[var(--muted)]"
                >
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-[var(--foreground)]">
                        {incident.reporterName}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {incident.phone}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[var(--muted-foreground)]">
                    {incident.location}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {incident.symptoms.slice(0, 2).map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 bg-[var(--muted)] rounded text-xs"
                        >
                          {s}
                        </span>
                      ))}
                      {incident.symptoms.length > 2 && (
                        <span className="px-2 py-0.5 text-xs text-[var(--muted-foreground)]">
                          +{incident.symptoms.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={getSeverityColor(incident.severity)}>
                      {incident.severity}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={getStatusColor(incident.status)}>
                      {incident.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-[var(--muted-foreground)]">
                    {getHospitalName(incident.assignedHospital)}
                  </td>
                  <td className="py-3 px-4 text-[var(--muted-foreground)]">
                    {incident.dateReported}
                  </td>
                  <td className="py-3 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedIncident(incident)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredIncidents.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-[var(--muted-foreground)] mx-auto mb-4" />
            <p className="text-[var(--muted-foreground)]">
              No incidents found matching your criteria.
            </p>
          </div>
        )}
      </Card>

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
              <div className="grid grid-cols-2 gap-4">
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
              <div className="grid grid-cols-2 gap-4">
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
                  Assigned Hospital
                </p>
                <p className="font-bold text-[var(--foreground)]">
                  {getHospitalName(selectedIncident.assignedHospital)}
                </p>
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

            <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-[var(--border)]">
              <Button variant="outline">Assign Hospital</Button>
              <Button variant="secondary">Mark Resolved</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
