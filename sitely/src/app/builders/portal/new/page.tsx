import { Suspense } from "react";
import { NewRequest } from "@/components/portal/NewRequest";

export const metadata = { title: "Sitely portal" };

export default function Page() {
  return (
    <Suspense>
      <NewRequest audience="builders" />
    </Suspense>
  );
}
