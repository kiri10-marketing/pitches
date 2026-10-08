import { Suspense } from "react";
import { Status } from "@/components/portal/Status";

export const metadata = { title: "Sitely portal" };

export default function Page() {
  return (
    <Suspense>
      <Status audience="builders" />
    </Suspense>
  );
}
