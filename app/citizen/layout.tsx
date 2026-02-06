import { DashboardLayout } from "@/components/layout";

export default function CitizenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout role="citizen">{children}</DashboardLayout>;
}
