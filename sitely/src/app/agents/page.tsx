import Landing from "@/components/Landing";
import { landing } from "@/content/copy";

export const metadata = { title: `${landing.agents.product}: ${landing.agents.hero.highlight}` };

export default function Page() {
  return <Landing audience="agents" />;
}
