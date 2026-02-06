"use client";

import { useState } from "react";
import { Header } from "@/components/layout";
import { Card, Button, Input, Badge } from "@/components/ui";
import { symptoms, solapurAreas } from "@/lib/mock-data";
import {
  Send,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Calendar,
  User,
  Phone,
  FileText,
} from "lucide-react";

export default function ReportIncident() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "",
    address: "",
    dateOfOnset: "",
    additionalNotes: "",
  });

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="animate-fade-in">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="inline-flex p-6 rounded-full bg-[var(--secondary-100)] mb-6">
            <CheckCircle className="w-16 h-16 text-[var(--secondary-600)]" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">
            Report Submitted Successfully!
          </h1>
          <p className="text-lg text-[var(--muted-foreground)] mb-8">
            Your health incident report has been received. Our team will review it
            and take appropriate action. You may receive a follow-up call.
          </p>
          <div className="p-6 rounded-2xl bg-[var(--muted)] mb-8">
            <p className="text-sm text-[var(--muted-foreground)] mb-2">
              Reference Number
            </p>
            <p className="text-2xl font-bold text-[var(--foreground)]">
              SMC-{Date.now().toString().slice(-8)}
            </p>
          </div>
          <Button onClick={() => setSubmitted(false)}>
            Submit Another Report
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <Header
        title="Report Health Incident"
        subtitle="Help us track and respond to health emergencies in your area"
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-[var(--primary)]" />
                  Personal Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[var(--primary)]" />
                  Location Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-[var(--foreground)]">
                      Area/Locality
                    </label>
                    <select
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)]"
                      value={formData.area}
                      onChange={(e) =>
                        setFormData({ ...formData, area: e.target.value })
                      }
                      required
                    >
                      <option value="">Select your area</option>
                      {solapurAreas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Input
                    label="Complete Address"
                    placeholder="House/Flat no., Street name"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Symptoms */}
              <div>
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[var(--warning)]" />
                  Symptoms
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] mb-4">
                  Select all symptoms that apply
                </p>
                <div className="flex flex-wrap gap-2">
                  {symptoms.map((symptom) => (
                    <button
                      key={symptom}
                      type="button"
                      onClick={() => toggleSymptom(symptom)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedSymptoms.includes(symptom)
                          ? "bg-[var(--primary-600)] text-white"
                          : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--muted-foreground)]/20"
                      }`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date of Onset */}
              <div>
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[var(--primary)]" />
                  Timeline
                </h3>
                <Input
                  label="When did symptoms start?"
                  type="date"
                  value={formData.dateOfOnset}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfOnset: e.target.value })
                  }
                  required
                />
              </div>

              {/* Additional Notes */}
              <div>
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[var(--primary)]" />
                  Additional Information
                </h3>
                <textarea
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] resize-none"
                  rows={4}
                  placeholder="Any additional details about your condition, recent travel, or contact with sick individuals..."
                  value={formData.additionalNotes}
                  onChange={(e) =>
                    setFormData({ ...formData, additionalNotes: e.target.value })
                  }
                />
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                <p className="text-sm text-[var(--muted-foreground)]">
                  Your information is secure and confidential
                </p>
                <Button type="submit" size="lg">
                  <Send className="w-5 h-5" />
                  Submit Report
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white border-0">
            <h3 className="font-bold text-lg mb-4">Why Report?</h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Helps track disease outbreaks early
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Enables faster response from health authorities
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Protects your community from epidemics
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Get personalized health guidance
              </li>
            </ul>
          </Card>

          <Card>
            <h3 className="font-semibold text-[var(--foreground)] mb-4">
              Need Immediate Help?
            </h3>
            <div className="space-y-3">
              <a
                href="tel:108"
                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--danger-50)] hover:bg-[var(--danger-100)] transition-colors"
              >
                <Phone className="w-5 h-5 text-[var(--danger-500)]" />
                <div>
                  <p className="font-bold text-[var(--danger-600)]">108</p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Emergency Ambulance
                  </p>
                </div>
              </a>
              <a
                href="tel:104"
                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--primary-50)] hover:bg-[var(--primary-100)] transition-colors"
              >
                <Phone className="w-5 h-5 text-[var(--primary-600)]" />
                <div>
                  <p className="font-bold text-[var(--primary-600)]">104</p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Health Helpline
                  </p>
                </div>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
