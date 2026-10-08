import { Suspense } from "react";
import { Dashboard } from "@/components/portal/Dashboard";

export const metadata = { title: "Sitely portal" };

export default function Page() {
  return (
    <Suspense>
      <Dashboard audience="agents" />
    </Suspense>
  );
}
