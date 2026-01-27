import { Dashboard } from "../components/dashboard";
import { HealthMonitor } from "../components/health-monitor";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex h-screen">
        <Dashboard />
      </div>
    </div>
  );
}
