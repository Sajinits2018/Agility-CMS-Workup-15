// pages/index.js
import * as agility from "@agility/nextjs"
import { getModule } from "../lib/agility-page"

export async function getStaticProps({ preview = false }) {
  // fetch the Agility page for the root URL
  const agilityProps = await agility.getAgilityPage({
    slug: "/",
    preview,
  })

  return {
    props: { ...agilityProps },
    revalidate: 60,
  }
}

export default function Home({ page }) {
  if (!page) return <div>Page not found</div>

  const modules = page?.zones?.MainContentZone || []

  return (
    <>
      {modules.map((moduleItem, index) => {
        const ModuleComponent = getModule(moduleItem.moduleName)
        if (!ModuleComponent) {
          console.warn(`⚠ Missing module for: ${moduleItem.moduleName}`)
          return null
        }
        return <ModuleComponent key={index} {...moduleItem.item} />
      })}
    </>
  )
}
