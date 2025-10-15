// lib/agility-page.ts
import dynamic from "next/dynamic";

// Dynamically import your Workup components
const WorkupHeader = dynamic(() => import("../components/agility-components/WorkupHeader"));
const WorkupHero = dynamic(() => import("../components/agility-components/WorkupHero"));
const WorkupServicesGrid = dynamic(() => import("../components/agility-components/WorkupServicesGrid"));
const WorkupTestimonials = dynamic(() => import("../components/agility-components/WorkupTestimonials"));
const WorkupWhyChoose = dynamic(() => import("../components/agility-components/WorkupWhyChoose"));
const WorkupProgress = dynamic(() => import("../components/agility-components/WorkupProgress"));
const WorkupPromoTrio = dynamic(() => import("../components/agility-components/WorkupPromoTrio"));

// Export module mapping
export const moduleRegister: Record<string, any> = {
  WorkupHeader,
  WorkupHero,
  WorkupServicesGrid,
  WorkupTestimonials,
  WorkupWhyChoose,
  WorkupProgress,
  WorkupPromoTrio
};

export function getModule(name: string) {
  return moduleRegister[name];
}
