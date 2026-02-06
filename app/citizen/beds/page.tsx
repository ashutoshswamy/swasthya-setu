"use client";

import { useState } from "react";
import { Header } from "@/components/layout";
import { Card, Badge, Button, ProgressBar } from "@/components/ui";
import { hospitals } from "@/lib/mock-data";
import {
  BedDouble,
  Search,
  Filter,
  Phone,
  MapPin,
  Wind,
  Heart,
  Building2,
} from "lucide-react";

type HospitalType = "all" | "Government" | "Private";
type BedType = "all" | "general" | "icu" | "ventilator" | "oxygen";

export default function BedAvailability() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hospitalType, setHospitalType] = useState<HospitalType>("all");
  const [bedType, setBedType] = useState<BedType>("all");

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch = hospital.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      hospitalType === "all" || hospital.type === hospitalType;
    return matchesSearch && matchesType;
  });

  const totalBeds = hospitals.reduce((acc, h) => acc + h.totalBeds, 0);
  const totalAvailable = hospitals.reduce((acc, h) => acc + h.availableBeds, 0);
  const totalICU = hospitals.reduce((acc, h) => acc + h.icuAvailable, 0);
  const totalVentilators = hospitals.reduce(
    (acc, h) => acc + h.ventilatorsAvailable,
    0
  );

  return (
    <div className="animate-fade-in">
      <Header
        title="Hospital Bed Availability"
        subtitle="Real-time bed availability across Solapur hospitals"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <BedDouble className="w-6 h-6 sm:w-8 sm:h-8 opacity-80 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-lg sm:text-2xl font-bold">{totalAvailable}</p>
              <p className="text-xs sm:text-sm text-white/80 truncate">General Beds</p>
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 opacity-80 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-lg sm:text-2xl font-bold">{totalICU}</p>
              <p className="text-xs sm:text-sm text-white/80 truncate">ICU Beds</p>
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <Wind className="w-6 h-6 sm:w-8 sm:h-8 opacity-80 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-lg sm:text-2xl font-bold">{totalVentilators}</p>
              <p className="text-xs sm:text-sm text-white/80 truncate">Ventilators</p>
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <Building2 className="w-6 h-6 sm:w-8 sm:h-8 opacity-80 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-lg sm:text-2xl font-bold">{hospitals.length}</p>
              <p className="text-xs sm:text-sm text-white/80 truncate">Hospitals</p>
            </div>
          </div>
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
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] text-sm sm:text-base"
              value={hospitalType}
              onChange={(e) => setHospitalType(e.target.value as HospitalType)}
            >
              <option value="all">All Hospitals</option>
              <option value="Government">Government</option>
              <option value="Private">Private</option>
            </select>
            <select
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] text-sm sm:text-base"
              value={bedType}
              onChange={(e) => setBedType(e.target.value as BedType)}
            >
              <option value="all">All Bed Types</option>
              <option value="general">General</option>
              <option value="icu">ICU</option>
              <option value="ventilator">Ventilator</option>
              <option value="oxygen">Oxygen</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Hospital List */}
      <div className="space-y-4">
        {filteredHospitals.map((hospital) => (
          <Card key={hospital.id} hover className="animate-fade-in">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Hospital Info */}
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-2">
                  <div
                    className={`p-2 rounded-lg ${
                      hospital.type === "Government"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[var(--foreground)]">
                      {hospital.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                      <MapPin className="w-4 h-4" />
                      {hospital.address}
                    </div>
                  </div>
                  <Badge
                    variant={
                      hospital.type === "Government" ? "info" : "default"
                    }
                  >
                    {hospital.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <a
                    href={`tel:${hospital.phone}`}
                    className="flex items-center gap-1 text-[var(--primary)] hover:underline"
                  >
                    <Phone className="w-4 h-4" />
                    {hospital.phone}
                  </a>
                </div>
              </div>

              {/* Bed Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
                <div className="text-center p-3 rounded-xl bg-[var(--muted)]">
                  <p className="text-2xl font-bold text-blue-600">
                    {hospital.availableBeds}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    General
                  </p>
                  <ProgressBar
                    value={hospital.availableBeds}
                    max={hospital.totalBeds}
                    variant="primary"
                    showLabel={false}
                    size="sm"
                  />
                </div>
                <div className="text-center p-3 rounded-xl bg-[var(--muted)]">
                  <p className="text-2xl font-bold text-red-600">
                    {hospital.icuAvailable}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">ICU</p>
                  <ProgressBar
                    value={hospital.icuAvailable}
                    max={hospital.icuBeds}
                    variant="danger"
                    showLabel={false}
                    size="sm"
                  />
                </div>
                <div className="text-center p-3 rounded-xl bg-[var(--muted)]">
                  <p className="text-2xl font-bold text-purple-600">
                    {hospital.ventilatorsAvailable}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Ventilator
                  </p>
                  <ProgressBar
                    value={hospital.ventilatorsAvailable}
                    max={hospital.ventilators}
                    variant="warning"
                    showLabel={false}
                    size="sm"
                  />
                </div>
                <div className="text-center p-3 rounded-xl bg-[var(--muted)]">
                  <p className="text-2xl font-bold text-emerald-600">
                    {hospital.oxygenAvailable}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Oxygen
                  </p>
                  <ProgressBar
                    value={hospital.oxygenAvailable}
                    max={hospital.oxygenBeds}
                    variant="success"
                    showLabel={false}
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredHospitals.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-[var(--muted-foreground)]">
            No hospitals found matching your criteria.
          </p>
        </Card>
      )}
    </div>
  );
}
