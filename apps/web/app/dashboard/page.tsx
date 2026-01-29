import { Metadata } from "next";
import { Dashboard } from "../../components/dashboard";
import { AppProvider } from "../../lib/context/app-context";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "AstraForge Dashboard - Interact with AI agents, generate code, and monitor project status",
  robots: {
    index: false, // Don't index dashboard pages
    follow: false,
  },
};

export default function DashboardPage() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}
