import { Metadata } from "next";
import { Dashboard } from "../../components/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "AstraForge Dashboard - Interact with AI agents, generate code, and monitor project status",
  robots: {
    index: false, // Don't index dashboard pages
    follow: false,
  },
};

export default function DashboardPage() {
  return <Dashboard />;
}
