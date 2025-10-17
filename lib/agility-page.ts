// lib/agility-page.ts
import dynamic from "next/dynamic";

// Import only components that exist
const WorkupHeroSlider = dynamic(() => import("../components/agility-components/WorkupHeroSlider"));
const WorkupFeatures   = dynamic(() => import("../components/agility-components/WorkupFeatures"));
const WorkupServicesGrid = dynamic(() => import("../components/agility-components/WorkupServicesGrid"));
const WorkupProgress   = dynamic(() => import("../components/agility-components/WorkupProgress"));
const WorkupPromoTrio  = dynamic(() => import("../components/agility-components/WorkupPromoTrio"));
// const WorkupWhyChoose   = dynamic(() => import("../components/agility-components/WorkupWhyChoose")); // leave commented for now
// const WorkupTestimonials = dynamic(() => import("../components/agility-components/WorkupTestimonials")); // deleted

export const moduleRegister: Record<string, any> = {
  WorkupHeroSlider,
  WorkupFeatures,
  WorkupServicesGrid,
  WorkupProgress,
  WorkupPromoTrio,
  // WorkupWhyChoose,
  // WorkupTestimonials,
};

export function getModule(name: string) {
  return moduleRegister[name];
}
