import { DashboardLayout } from "@/components/layout";

export default function HospitalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout role="hospital">{children}</DashboardLayout>;
}
