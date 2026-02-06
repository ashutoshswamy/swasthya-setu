import Link from "next/link";
import { Header } from "@/components/layout";
import { Card, StatCard, Badge } from "@/components/ui";
import { hospitals, incidents, diseaseData, areaData } from "@/lib/mock-data";
import {
  Building2,
  BedDouble,
  AlertTriangle,
  TrendingUp,
  Users,
  Activity,
  ArrowRight,
  MapPin,
  Bell,
  Shield,
} from "lucide-react";

const totalBeds = hospitals.reduce((acc, h) => acc + h.totalBeds, 0);
const totalAvailable = hospitals.reduce((acc, h) => acc + h.availableBeds, 0);
const pendingIncidents = incidents.filter((i) => i.status === "Pending");
const criticalIncidents = incidents.filter((i) => i.severity === "Critical");
const highRiskAreas = areaData.filter((a) => a.risk === "High");

const quickLinks = [
  {
    title: "Manage Hospitals",
    description: "View and manage registered hospitals",
    icon: Building2,
    href: "/admin/hospitals",
    color: "from-blue-500 to-blue-700",
    count: hospitals.length,
  },
  {
    title: "Incident Reports",
    description: "Review reported health incidents",
    icon: AlertTriangle,
    href: "/admin/incidents",
    color: "from-red-500 to-orange-500",
    count: pendingIncidents.length,
    alert: pendingIncidents.length > 0,
  },
  {
    title: "Analytics",
    description: "City-wide health analytics",
    icon: TrendingUp,
    href: "/admin/trends",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Alerts",
    description: "Manage health alerts",
    icon: Bell,
    href: "/admin/alerts",
    color: "from-emerald-500 to-teal-500",
  },
];

export default function AdminDashboard() {
  return (
    <div className="animate-fade-in">
      <Header
        title="Admin Dashboard"
        subtitle="Solapur Municipal Corporation - Health Management System Overview"
      />

      {/* Critical Alerts */}
      {criticalIncidents.length > 0 && (
        <Card className="mb-6 bg-[var(--danger-50)] border-[var(--danger-200)]">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[var(--danger-100)]">
              <AlertTriangle className="w-6 h-6 text-[var(--danger-600)]" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[var(--danger-700)]">
                Critical Alert: {criticalIncidents.length} Critical Incidents
              </h3>
              <p className="text-sm text-[var(--danger-600)]">
                Immediate attention required for critical health incidents
              </p>
            </div>
            <Link href="/admin/incidents">
              <Badge variant="danger" className="cursor-pointer">
                View Now
              </Badge>
            </Link>
          </div>
        </Card>
      )}

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Hospitals"
          value={hospitals.length}
          icon={<Building2 size={24} />}
          variant="primary"
        />
        <StatCard
          title="Available Beds"
          value={totalAvailable}
          subtitle={`of ${totalBeds} total`}
          icon={<BedDouble size={24} />}
          variant="success"
        />
        <StatCard
          title="Pending Incidents"
          value={pendingIncidents.length}
          icon={<AlertTriangle size={24} />}
          variant="warning"
        />
        <StatCard
          title="High Risk Areas"
          value={highRiskAreas.length}
          icon={<MapPin size={24} />}
          variant="danger"
        />
      </div>

      {/* Quick Links */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
          Quick Actions
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="group relative overflow-hidden rounded-2xl bg-[var(--card)] border border-[var(--border)] p-6 card-hover"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${link.color} text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    <link.icon className="w-6 h-6" />
                  </div>
                  {link.count !== undefined && (
                    <Badge variant={link.alert ? "danger" : "default"}>
                      {link.count}
                    </Badge>
                  )}
                </div>
                <h3 className="font-bold text-[var(--foreground)] group-hover:text-white mb-1 transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] group-hover:text-white/80 transition-colors">
                  {link.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Disease Overview */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[var(--foreground)]">
              Disease Overview
            </h3>
            <Link
              href="/admin/trends"
              className="text-sm text-[var(--primary)] hover:underline"
            >
              View Details
            </Link>
          </div>
          <div className="space-y-3">
            {diseaseData.slice(0, 5).map((disease) => (
              <div
                key={disease.name}
                className="flex items-center justify-between p-3 rounded-xl bg-[var(--muted)]"
              >
                <div className="flex items-center gap-3">
                  <Activity
                    className={`w-5 h-5 ${
                      disease.trend === "up"
                        ? "text-[var(--danger-500)]"
                        : disease.trend === "down"
                        ? "text-[var(--secondary-500)]"
                        : "text-[var(--muted-foreground)]"
                    }`}
                  />
                  <span className="font-medium text-[var(--foreground)]">
                    {disease.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[var(--foreground)]">
                    {disease.cases}
                  </span>
                  <Badge
                    variant={
                      disease.trend === "up"
                        ? "danger"
                        : disease.trend === "down"
                        ? "success"
                        : "default"
                    }
                  >
                    {disease.trend === "up" ? "↑" : disease.trend === "down" ? "↓" : "→"}
                    {disease.percentChange}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* High Risk Areas */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[var(--foreground)]">
              Area Risk Status
            </h3>
            <Badge variant="danger">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {highRiskAreas.length} High Risk
            </Badge>
          </div>
          <div className="space-y-3">
            {areaData.map((area) => (
              <div
                key={area.name}
                className="flex items-center justify-between p-3 rounded-xl bg-[var(--muted)]"
              >
                <div className="flex items-center gap-3">
                  <MapPin
                    className={`w-5 h-5 ${
                      area.risk === "High"
                        ? "text-[var(--danger-500)]"
                        : area.risk === "Medium"
                        ? "text-[var(--warning-500)]"
                        : "text-[var(--secondary-500)]"
                    }`}
                  />
                  <span className="font-medium text-[var(--foreground)]">
                    {area.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[var(--muted-foreground)]">
                    {area.cases} cases
                  </span>
                  <Badge
                    variant={
                      area.risk === "High"
                        ? "danger"
                        : area.risk === "Medium"
                        ? "warning"
                        : "success"
                    }
                  >
                    {area.risk}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Incidents */}
      <Card className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[var(--foreground)]">
            Recent Incidents
          </h3>
          <Link
            href="/admin/incidents"
            className="flex items-center gap-1 text-sm text-[var(--primary)] hover:underline"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
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
                  Severity
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--muted-foreground)]">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--muted-foreground)]">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {incidents.slice(0, 5).map((incident) => (
                <tr
                  key={incident.id}
                  className="border-b border-[var(--border)] hover:bg-[var(--muted)]"
                >
                  <td className="py-3 px-4 font-medium text-[var(--foreground)]">
                    {incident.reporterName}
                  </td>
                  <td className="py-3 px-4 text-[var(--muted-foreground)]">
                    {incident.location}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        incident.severity === "Critical"
                          ? "danger"
                          : incident.severity === "High"
                          ? "warning"
                          : incident.severity === "Medium"
                          ? "info"
                          : "success"
                      }
                    >
                      {incident.severity}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        incident.status === "Resolved"
                          ? "success"
                          : incident.status === "Investigating"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {incident.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-[var(--muted-foreground)]">
                    {incident.dateReported}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
