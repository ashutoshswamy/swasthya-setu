"use client";

import { Header } from "@/components/layout";
import { Card, Badge } from "@/components/ui";
import { diseaseData, areaData, weeklyTrendData, monthlyTrendData } from "@/lib/mock-data";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  MapPin,
  Activity,
  Shield,
  Info,
} from "lucide-react";

export default function DiseaseTrends() {
  const maxWeeklyCases = Math.max(...weeklyTrendData.map((d) => d.cases));
  const maxMonthlyCases = Math.max(...monthlyTrendData.map((d) => d.cases));

  return (
    <div className="animate-fade-in">
      <Header
        title="Disease Trends"
        subtitle="Current health trends and disease statistics in Solapur"
      />

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-red-500 to-orange-500 text-white border-0">
          <Activity className="w-8 h-8 opacity-80 mb-2" />
          <p className="text-3xl font-bold">519</p>
          <p className="text-sm text-white/80">Total Active Cases</p>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white border-0">
          <AlertTriangle className="w-8 h-8 opacity-80 mb-2" />
          <p className="text-3xl font-bold">3</p>
          <p className="text-sm text-white/80">High Risk Areas</p>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white border-0">
          <Shield className="w-8 h-8 opacity-80 mb-2" />
          <p className="text-3xl font-bold">85%</p>
          <p className="text-sm text-white/80">Recovery Rate</p>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white border-0">
          <TrendingDown className="w-8 h-8 opacity-80 mb-2" />
          <p className="text-3xl font-bold">-12%</p>
          <p className="text-sm text-white/80">Weekly Change</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Disease Breakdown */}
        <Card>
          <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">
            Disease-wise Cases
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
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-[var(--border)] rounded-full overflow-hidden">
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
                    <span className="text-sm font-bold text-[var(--foreground)] w-12 text-right">
                      {disease.cases}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Area-wise Distribution */}
        <Card>
          <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">
            Area-wise Distribution
          </h3>
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
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[var(--foreground)]">
                    {area.cases}
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
            Weekly Trend
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
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500"
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
            Monthly Trend
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
                    className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg transition-all hover:from-emerald-600 hover:to-emerald-500"
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

      {/* Prevention Tips */}
      <Card className="bg-gradient-to-br from-blue-50 to-emerald-50 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-blue-100">
            <Info className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-[var(--foreground)] mb-2">
              Prevention Tips
            </h3>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm text-[var(--muted-foreground)]">
              <li>• Use mosquito repellents and nets</li>
              <li>• Drink clean, boiled water</li>
              <li>• Maintain personal hygiene</li>
              <li>• Avoid crowded places if unwell</li>
              <li>• Keep surroundings clean and dry</li>
              <li>• Get vaccinated as recommended</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
