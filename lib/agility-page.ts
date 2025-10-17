// lib/agility-page.ts
import dynamic from "next/dynamic";

// Import only components that exist in /components/agility-components
const WorkupHeroSlider   = dynamic(() => import("../components/agility-components/WorkupHeroSlider"));
const WorkupFeatures     = dynamic(() => import("../components/agility-components/WorkupFeatures"));
const WorkupServicesGrid = dynamic(() => import("../components/agility-components/WorkupServicesGrid"));
const WorkupProgress     = dynamic(() => import("../components/agility-components/WorkupProgress"));
const WorkupPromoTrio    = dynamic(() => import("../components/agility-components/WorkupPromoTrio"));
// Leave these disabled until their helper imports are fixed
// const WorkupWhyChoose    = dynamic(() => import("../components/agility-components/WorkupWhyChoose"));
// const WorkupTestimonials = dynamic(() => import("../components/agility-components/WorkupTestimonials"));

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
