import Link from "next/link";
import { Header } from "@/components/layout";
import { Card, StatCard, Badge } from "@/components/ui";
import {
  FileText,
  BedDouble,
  TrendingUp,
  Phone,
  AlertTriangle,
  ArrowRight,
  Activity,
  MapPin,
  Shield,
} from "lucide-react";

const quickActions = [
  {
    title: "Report Incident",
    description: "Report a health emergency or disease symptoms",
    icon: FileText,
    href: "/citizen/report",
    color: "from-red-500 to-orange-500",
  },
  {
    title: "Check Bed Availability",
    description: "Find available hospital beds in real-time",
    icon: BedDouble,
    href: "/citizen/beds",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "View Disease Trends",
    description: "See current health trends and statistics",
    icon: TrendingUp,
    href: "/citizen/trends",
    color: "from-purple-500 to-pink-500",
  },
];

const recentAlerts = [
  {
    id: 1,
    title: "Dengue Alert",
    description: "Increased dengue cases in Laxmi Peth area. Take precautions.",
    severity: "high" as const,
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Vaccination Drive",
    description: "Free COVID-19 booster vaccination at Civil Hospital this week.",
    severity: "info" as const,
    time: "1 day ago",
  },
  {
    id: 3,
    title: "Water Advisory",
    description: "Boil water before drinking in Hotgi Road area due to pipeline work.",
    severity: "warning" as const,
    time: "2 days ago",
  },
];

const emergencyContacts = [
  { name: "Emergency Ambulance", number: "108" },
  { name: "Solapur Civil Hospital", number: "0217-2315000" },
  { name: "Health Helpline", number: "104" },
  { name: "COVID Helpline", number: "1075" },
];

export default function CitizenDashboard() {
  return (
    <div className="animate-fade-in">
      <Header
        title="Welcome, Citizen"
        subtitle="Access health services and stay informed about your community's health"
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Hospitals Active"
          value="45"
          icon={<Activity size={24} />}
          variant="primary"
        />
        <StatCard
          title="Beds Available"
          value="334"
          subtitle="Across all hospitals"
          icon={<BedDouble size={24} />}
          variant="success"
        />
        <StatCard
          title="Active Alerts"
          value="3"
          icon={<AlertTriangle size={24} />}
          variant="warning"
        />
        <StatCard
          title="Your Area"
          value="Low Risk"
          subtitle="Based on current data"
          icon={<Shield size={24} />}
          variant="success"
        />
      </div>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
          Quick Actions
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={action.title}
              href={action.href}
              className="group relative overflow-hidden rounded-2xl bg-[var(--card)] border border-[var(--border)] p-6 card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="relative z-10">
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${action.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <action.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-white mb-2 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] group-hover:text-white/80 mb-4 transition-colors">
                  {action.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-[var(--primary)] group-hover:text-white transition-colors">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[var(--foreground)]">
              Recent Health Alerts
            </h3>
            <Badge variant="danger">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {recentAlerts.length} Active
            </Badge>
          </div>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex gap-4 p-4 rounded-xl bg-[var(--muted)]"
              >
                <div
                  className={`flex-shrink-0 w-2 rounded-full ${
                    alert.severity === "high"
                      ? "bg-[var(--danger-500)]"
                      : alert.severity === "warning"
                      ? "bg-[var(--warning-500)]"
                      : "bg-[var(--primary-500)]"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-[var(--foreground)]">
                      {alert.title}
                    </h4>
                    <Badge
                      variant={
                        alert.severity === "high"
                          ? "danger"
                          : alert.severity === "warning"
                          ? "warning"
                          : "info"
                      }
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {alert.description}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-2">
                    {alert.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Emergency Contacts */}
        <Card className="bg-gradient-to-br from-red-500 to-orange-500 text-white border-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-white/20">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Emergency Contacts</h3>
              <p className="text-white/80 text-sm">
                24/7 Health Emergency Services
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {emergencyContacts.map((contact) => (
              <a
                key={contact.number}
                href={`tel:${contact.number}`}
                className="flex flex-col p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                <span className="text-white/80 text-sm">{contact.name}</span>
                <span className="text-2xl font-bold">{contact.number}</span>
              </a>
            ))}
          </div>
        </Card>
      </div>

      {/* Area Health Status */}
      <Card className="mt-6">
        <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">
          Your Area Health Status
        </h3>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--secondary-50)] border border-[var(--secondary-200)]">
          <div className="p-3 rounded-xl bg-[var(--secondary-100)]">
            <MapPin className="w-6 h-6 text-[var(--secondary-600)]" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-[var(--foreground)]">
              Solapur City - Overall Health Index: Good
            </p>
            <p className="text-sm text-[var(--muted-foreground)]">
              No major disease outbreaks detected. Stay vigilant and follow basic hygiene practices.
            </p>
          </div>
          <Badge variant="success">Low Risk</Badge>
        </div>
      </Card>
    </div>
  );
}
