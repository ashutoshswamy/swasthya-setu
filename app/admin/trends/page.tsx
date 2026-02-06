"use client";

import { Header } from "@/components/layout";
import { Card, Badge } from "@/components/ui";
import { diseaseData, areaData, weeklyTrendData, monthlyTrendData, hospitals } from "@/lib/mock-data";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Activity,
  MapPin,
  Building2,
  Users,
  Shield,
  AlertTriangle,
} from "lucide-react";

export default function AdminTrends() {
  const maxWeeklyCases = Math.max(...weeklyTrendData.map((d) => d.cases));
  const maxMonthlyCases = Math.max(...monthlyTrendData.map((d) => d.cases));
  const totalCases = diseaseData.reduce((acc, d) => acc + d.cases, 0);
  const risingDiseases = diseaseData.filter((d) => d.trend === "up").length;

  return (
    <div className="animate-fade-in">
      <Header
        title="Health Analytics"
        subtitle="City-wide health trends and disease analytics for Solapur"
      />

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <Activity className="w-8 h-8 opacity-80 mb-2" />
          <p className="text-3xl font-bold">{totalCases}</p>
          <p className="text-sm text-white/80">Total Active Cases</p>
        </Card>
        <Card className="bg-gradient-to-br from-red-500 to-orange-500 text-white border-0">
          <TrendingUp className="w-8 h-8 opacity-80 mb-2" />
          <p className="text-3xl font-bold">{risingDiseases}</p>
          <p className="text-sm text-white/80">Rising Diseases</p>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white border-0">
          <Shield className="w-8 h-8 opacity-80 mb-2" />
          <p className="text-3xl font-bold">85%</p>
          <p className="text-sm text-white/80">Recovery Rate</p>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0">
          <MapPin className="w-8 h-8 opacity-80 mb-2" />
          <p className="text-3xl font-bold">{areaData.filter((a) => a.risk === "High").length}</p>
          <p className="text-sm text-white/80">High Risk Areas</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Disease Breakdown */}
        <Card>
          <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">
            Disease Statistics
          </h3>
          <div className="space-y-4">
            {diseaseData.map((disease) => (
              <div
                key={disease.name}
                className="flex items-center gap-4 p-3 rounded-xl bg-[var(--muted)]"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[var(--foreground)]">
                      {disease.name}
                    </span>
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
                        {disease.trend === "up" ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : disease.trend === "down" ? (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        ) : (
                          <Minus className="w-3 h-3 mr-1" />
                        )}
                        {disease.percentChange}%
                      </Badge>
                    </div>
                  </div>
                  <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        disease.trend === "up"
                          ? "bg-[var(--danger-500)]"
                          : disease.trend === "down"
                          ? "bg-[var(--secondary-500)]"
                          : "bg-[var(--primary-500)]"
                      }`}
                      style={{
                        width: `${(disease.cases / 200) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Area Risk Map */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[var(--foreground)]">
              Area Risk Assessment
            </h3>
            <Badge variant="danger">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {areaData.filter((a) => a.risk === "High").length} High Risk
            </Badge>
          </div>
          <div className="space-y-3">
            {areaData.map((area) => (
              <div
                key={area.name}
                className={`flex items-center justify-between p-3 rounded-xl ${
                  area.risk === "High"
                    ? "bg-[var(--danger-50)] border border-[var(--danger-200)]"
                    : area.risk === "Medium"
                    ? "bg-[var(--warning-50)] border border-[var(--warning-200)]"
                    : "bg-[var(--muted)]"
                }`}
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
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[var(--foreground)]">
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

      {/* Trend Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly Trend */}
        <Card>
          <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">
            Weekly Cases Trend
          </h3>
          <div className="flex items-end justify-between h-48 gap-2">
            {weeklyTrendData.map((day) => (
              <div
                key={day.day}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div className="w-full flex flex-col items-center justify-end h-40">
                  <span className="text-xs font-bold text-[var(--foreground)] mb-1">
                    {day.cases}
                  </span>
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:from-blue-700 hover:to-blue-500"
                    style={{
                      height: `${(day.cases / maxWeeklyCases) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-[var(--muted-foreground)]">
                  {day.day}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Monthly Trend */}
        <Card>
          <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">
            Monthly Cases Trend
          </h3>
          <div className="flex items-end justify-between h-48 gap-2">
            {monthlyTrendData.map((month) => (
              <div
                key={month.month}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div className="w-full flex flex-col items-center justify-end h-40">
                  <span className="text-xs font-bold text-[var(--foreground)] mb-1">
                    {month.cases}
                  </span>
                  <div
                    className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg transition-all hover:from-purple-700 hover:to-purple-500"
                    style={{
                      height: `${(month.cases / maxMonthlyCases) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-[var(--muted-foreground)]">
                  {month.month}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Hospital Capacity Overview */}
      <Card>
        <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">
          Hospital Capacity Overview
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {hospitals.map((hospital) => {
            const occupancy = Math.round(
              ((hospital.totalBeds - hospital.availableBeds) / hospital.totalBeds) *
                100
            );
            return (
              <div
                key={hospital.id}
                className="p-4 rounded-xl bg-[var(--muted)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-4 h-4 text-[var(--primary-500)]" />
                  <span className="text-sm font-medium text-[var(--foreground)] truncate">
                    {hospital.name.split(" ")[0]}
                  </span>
                </div>
                <div className="mb-2">
                  <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        occupancy > 80
                          ? "bg-[var(--danger-500)]"
                          : occupancy > 50
                          ? "bg-[var(--warning-500)]"
                          : "bg-[var(--secondary-500)]"
                      }`}
                      style={{ width: `${occupancy}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--muted-foreground)]">
                    {hospital.availableBeds} available
                  </span>
                  <span
                    className={`font-medium ${
                      occupancy > 80
                        ? "text-[var(--danger-600)]"
                        : occupancy > 50
                        ? "text-[var(--warning-600)]"
                        : "text-[var(--secondary-600)]"
                    }`}
                  >
                    {occupancy}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
