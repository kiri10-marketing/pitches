import { Suspense } from "react";
import { SignIn } from "@/components/portal/SignIn";

export const metadata = { title: "Sitely portal" };

export default function Page() {
  return (
    <Suspense>
      <SignIn audience="builders" />
    </Suspense>
  );
}
