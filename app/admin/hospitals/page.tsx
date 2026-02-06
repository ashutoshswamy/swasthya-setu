"use client";

import { useState } from "react";
import { Header } from "@/components/layout";
import { Card, Badge, Button, ProgressBar } from "@/components/ui";
import { hospitals } from "@/lib/mock-data";
import {
  Building2,
  Search,
  MapPin,
  Phone,
  BedDouble,
  Heart,
  Wind,
  Activity,
  Check,
  X,
  Eye,
  Filter,
} from "lucide-react";

export default function AdminHospitals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedHospital, setSelectedHospital] = useState<typeof hospitals[0] | null>(
    null
  );

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch = hospital.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || hospital.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalBeds = hospitals.reduce((acc, h) => acc + h.totalBeds, 0);
  const totalAvailable = hospitals.reduce((acc, h) => acc + h.availableBeds, 0);
  const avgOccupancy = Math.round(
    ((totalBeds - totalAvailable) / totalBeds) * 100
  );

  return (
    <div className="animate-fade-in">
      <Header
        title="Hospital Management"
        subtitle="View and manage all registered hospitals in Solapur"
        action={
          <Button>
            <Building2 className="w-5 h-5" />
            Add Hospital
          </Button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <Building2 className="w-8 h-8 opacity-80 mb-2" />
          <p className="text-3xl font-bold">{hospitals.length}</p>
          <p className="text-sm text-white/80">Total Hospitals</p>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
          <BedDouble className="w-8 h-8 opacity-80 mb-2" />
          <p className="text-3xl font-bold">{totalBeds}</p>
          <p className="text-sm text-white/80">Total Beds</p>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <Activity className="w-8 h-8 opacity-80 mb-2" />
          <p className="text-3xl font-bold">{totalAvailable}</p>
          <p className="text-sm text-white/80">Available Beds</p>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0">
          <Heart className="w-8 h-8 opacity-80 mb-2" />
          <p className="text-3xl font-bold">{avgOccupancy}%</p>
          <p className="text-sm text-white/80">Avg Occupancy</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
            <input
              type="text"
              placeholder="Search hospitals..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {["all", "Government", "Private"].map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  typeFilter === type
                    ? "bg-[var(--primary-600)] text-white"
                    : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--muted-foreground)]/20"
                }`}
              >
                {type === "all" ? "All Types" : type}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Hospital Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredHospitals.map((hospital) => {
          const occupancy = Math.round(
            ((hospital.totalBeds - hospital.availableBeds) / hospital.totalBeds) *
              100
          );

          return (
            <Card key={hospital.id} hover className="relative">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`p-3 rounded-xl ${
                    hospital.type === "Government"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-[var(--foreground)]">
                      {hospital.name}
                    </h3>
                    <Badge
                      variant={hospital.status === "Active" ? "success" : "danger"}
                    >
                      {hospital.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                    <MapPin className="w-4 h-4" />
                    {hospital.address}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                    <Phone className="w-4 h-4" />
                    {hospital.phone}
                  </div>
                </div>
                <Badge
                  variant={hospital.type === "Government" ? "info" : "default"}
                >
                  {hospital.type}
                </Badge>
              </div>

              {/* Resource Overview */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="text-center p-2 rounded-lg bg-[var(--muted)]">
                  <p className="text-lg font-bold text-blue-600">
                    {hospital.availableBeds}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">General</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-[var(--muted)]">
                  <p className="text-lg font-bold text-red-600">
                    {hospital.icuAvailable}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">ICU</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-[var(--muted)]">
                  <p className="text-lg font-bold text-purple-600">
                    {hospital.ventilatorsAvailable}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">Vent.</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-[var(--muted)]">
                  <p className="text-lg font-bold text-emerald-600">
                    {hospital.oxygenAvailable}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">O2</p>
                </div>
              </div>

              {/* Occupancy Bar */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[var(--muted-foreground)]">Occupancy</span>
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
                <ProgressBar
                  value={hospital.totalBeds - hospital.availableBeds}
                  max={hospital.totalBeds}
                  variant={
                    occupancy > 80
                      ? "danger"
                      : occupancy > 50
                      ? "warning"
                      : "success"
                  }
                  showLabel={false}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--border)]">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1"
                  onClick={() => setSelectedHospital(hospital)}
                >
                  <Eye className="w-4 h-4" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredHospitals.length === 0 && (
        <Card className="text-center py-12">
          <Building2 className="w-12 h-12 text-[var(--muted-foreground)] mx-auto mb-4" />
          <p className="text-[var(--muted-foreground)]">
            No hospitals found matching your criteria.
          </p>
        </Card>
      )}

      {/* Hospital Detail Modal */}
      {selectedHospital && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[var(--foreground)]">
                Hospital Details
              </h2>
              <button
                onClick={() => setSelectedHospital(null)}
                className="p-2 rounded-lg hover:bg-[var(--muted)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div
                  className={`p-4 rounded-xl ${
                    selectedHospital.type === "Government"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--foreground)]">
                    {selectedHospital.name}
                  </h3>
                  <p className="text-[var(--muted-foreground)]">
                    {selectedHospital.address}
                  </p>
                  <p className="text-[var(--muted-foreground)]">
                    {selectedHospital.phone}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[var(--muted)]">
                  <BedDouble className="w-6 h-6 text-blue-500 mb-2" />
                  <p className="text-2xl font-bold text-[var(--foreground)]">
                    {selectedHospital.availableBeds} / {selectedHospital.totalBeds}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    General Beds Available
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[var(--muted)]">
                  <Heart className="w-6 h-6 text-red-500 mb-2" />
                  <p className="text-2xl font-bold text-[var(--foreground)]">
                    {selectedHospital.icuAvailable} / {selectedHospital.icuBeds}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    ICU Beds Available
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[var(--muted)]">
                  <Wind className="w-6 h-6 text-purple-500 mb-2" />
                  <p className="text-2xl font-bold text-[var(--foreground)]">
                    {selectedHospital.ventilatorsAvailable} /{" "}
                    {selectedHospital.ventilators}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Ventilators Available
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[var(--muted)]">
                  <Activity className="w-6 h-6 text-emerald-500 mb-2" />
                  <p className="text-2xl font-bold text-[var(--foreground)]">
                    {selectedHospital.oxygenAvailable} / {selectedHospital.oxygenBeds}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Oxygen Beds Available
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="primary" className="flex-1">
                  Contact Hospital
                </Button>
                <Button variant="outline" className="flex-1">
                  Edit Details
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
