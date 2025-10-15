// pages/[slug].js
import { getAgilityPage } from "@agility/nextjs";
import { getModule } from "../lib/agility-page";

export async function getStaticProps({ params, preview = false }) {
  const agilityProps = await getAgilityPage({
    slug: params?.slug || "/",
    preview,
  });

  return {
    props: { ...agilityProps },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export default function AgilityPage({ page }) {
  if (!page) return <div>Page not found</div>;

  const modules = page?.zones?.MainContentZone || [];

  return (
    <>
      {modules.map((moduleItem, index) => {
        const ModuleComponent = getModule(moduleItem.moduleName);
        if (!ModuleComponent) {
          console.warn(`⚠️ Missing module for: ${moduleItem.moduleName}`);
          return null;
        }
        return <ModuleComponent key={index} {...moduleItem.item} />;
      })}
    </>
  );
}
