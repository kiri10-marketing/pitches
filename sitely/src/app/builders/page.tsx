import Landing from "@/components/Landing";
import { landing } from "@/content/copy";

export const metadata = { title: `${landing.builders.product}: ${landing.builders.hero.highlight}` };

export default function Page() {
  return <Landing audience="builders" />;
}
