import Link from "next/link";
import { Header } from "@/components/layout";
import { Card, StatCard, Badge, ProgressBar } from "@/components/ui";
import { hospitals, incidents } from "@/lib/mock-data";
import {
  BedDouble,
  Package,
  ClipboardList,
  TrendingUp,
  ArrowRight,
  Users,
  AlertTriangle,
  Activity,
  Heart,
  Wind,
} from "lucide-react";

// Using first hospital as the logged-in hospital
const currentHospital = hospitals[0];
const hospitalIncidents = incidents.filter(
  (i) => i.assignedHospital === currentHospital.id
);

const quickActions = [
  {
    title: "Manage Beds",
    description: "Update bed availability and occupancy",
    icon: BedDouble,
    href: "/hospital/beds",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Resources",
    description: "Manage equipment and staff",
    icon: Package,
    href: "/hospital/resources",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "View Reports",
    description: "See incoming incident reports",
    icon: ClipboardList,
    href: "/hospital/reports",
    color: "from-purple-500 to-pink-500",
    badge: hospitalIncidents.length,
  },
];

export default function HospitalDashboard() {
  const occupancyRate = Math.round(
    ((currentHospital.totalBeds - currentHospital.availableBeds) /
      currentHospital.totalBeds) *
      100
  );

  return (
    <div className="animate-fade-in">
      <Header
        title={currentHospital.name}
        subtitle="Hospital Resource Management Dashboard"
      />

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Beds"
          value={currentHospital.totalBeds}
          icon={<BedDouble size={24} />}
          variant="primary"
        />
        <StatCard
          title="Available"
          value={currentHospital.availableBeds}
          subtitle={`${occupancyRate}% occupied`}
          icon={<Activity size={24} />}
          variant="success"
        />
        <StatCard
          title="ICU Available"
          value={currentHospital.icuAvailable}
          subtitle={`of ${currentHospital.icuBeds} total`}
          icon={<Heart size={24} />}
          variant="danger"
        />
        <StatCard
          title="Pending Reports"
          value={hospitalIncidents.filter((i) => i.status !== "Resolved").length}
          icon={<AlertTriangle size={24} />}
          variant="warning"
        />
      </div>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
          Quick Actions
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="group relative overflow-hidden rounded-2xl bg-[var(--card)] border border-[var(--border)] p-6 card-hover"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${action.color} text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    <action.icon className="w-6 h-6" />
                  </div>
                  {action.badge && (
                    <Badge variant="danger">{action.badge}</Badge>
                  )}
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-white mb-2 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] group-hover:text-white/80 mb-4 transition-colors">
                  {action.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-[var(--primary)] group-hover:text-white transition-colors">
                  Go to {action.title}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bed Capacity Overview */}
        <Card>
          <h3 className="text-lg font-bold text-[var(--foreground)] mb-6">
            Bed Capacity Overview
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BedDouble className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">General Beds</span>
                </div>
                <span className="text-sm text-[var(--muted-foreground)]">
                  {currentHospital.availableBeds} available
                </span>
              </div>
              <ProgressBar
                value={currentHospital.totalBeds - currentHospital.availableBeds}
                max={currentHospital.totalBeds}
                variant="primary"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="font-medium">ICU Beds</span>
                </div>
                <span className="text-sm text-[var(--muted-foreground)]">
                  {currentHospital.icuAvailable} available
                </span>
              </div>
              <ProgressBar
                value={currentHospital.icuBeds - currentHospital.icuAvailable}
                max={currentHospital.icuBeds}
                variant="danger"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Wind className="w-5 h-5 text-purple-500" />
                  <span className="font-medium">Ventilators</span>
                </div>
                <span className="text-sm text-[var(--muted-foreground)]">
                  {currentHospital.ventilatorsAvailable} available
                </span>
              </div>
              <ProgressBar
                value={
                  currentHospital.ventilators -
                  currentHospital.ventilatorsAvailable
                }
                max={currentHospital.ventilators}
                variant="warning"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium">Oxygen Beds</span>
                </div>
                <span className="text-sm text-[var(--muted-foreground)]">
                  {currentHospital.oxygenAvailable} available
                </span>
              </div>
              <ProgressBar
                value={currentHospital.oxygenBeds - currentHospital.oxygenAvailable}
                max={currentHospital.oxygenBeds}
                variant="success"
              />
            </div>
          </div>
        </Card>

        {/* Recent Incidents */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[var(--foreground)]">
              Assigned Incidents
            </h3>
            <Link
              href="/hospital/reports"
              className="text-sm text-[var(--primary)] hover:underline"
            >
              View all
            </Link>
          </div>
          {hospitalIncidents.length > 0 ? (
            <div className="space-y-4">
              {hospitalIncidents.slice(0, 3).map((incident) => (
                <div
                  key={incident.id}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[var(--muted)]"
                >
                  <div
                    className={`w-2 h-full min-h-[60px] rounded-full ${
                      incident.severity === "Critical"
                        ? "bg-[var(--danger-500)]"
                        : incident.severity === "High"
                        ? "bg-[var(--warning-500)]"
                        : "bg-[var(--primary-500)]"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-[var(--foreground)]">
                        {incident.reporterName}
                      </span>
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
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {incident.symptoms.join(", ")}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">
                      {incident.location} • {incident.dateReported}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-[var(--muted-foreground)]">
              No incidents assigned yet
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
