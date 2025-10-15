import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroImage from '@/components/HeroImage'
import RichText from '@/components/RichText'
import { getAgilityClient } from '@/lib/agility'

export default function Page({ page, navPages }) {
  if (!page) return <div className="container"><p>Page not found.</p></div>
  return (
    <>
      <Head>
        <title>{page.fields?.title} | Agility</title>
        <meta name="description" content={page.fields?.excerpt || 'Page'} />
      </Head>
      <Header pages={navPages} />
      <main className="container">
        <h1 className="h1">{page.fields?.title}</h1>
        <HeroImage url={page.fields?.heroImage?.url} alt={page.fields?.title} />
        <RichText html={page.fields?.body} />
      </main>
      <Footer />
    </>
  )
}

export async function getStaticPaths() {
  const client = getAgilityClient()
  const locale = process.env.AGILITY_LOCALE || 'en-us'
  const { items } = await client.getContentList({ referenceName: 'pages', locale, take: 200 })
  const paths = (items || []).filter(p => p.fields?.slug && p.fields.slug !== 'home').map(p => ({ params: { slug: p.fields.slug } }))
  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const client = getAgilityClient()
  const locale = process.env.AGILITY_LOCALE || 'en-us'
  const { items } = await client.getContentList({ referenceName: 'pages', locale, take: 200 })
  const page = (items || []).find(p => p.fields?.slug === params.slug) || null
  const navPages = (items || []).filter(p => p.fields?.slug && p.fields.slug !== 'home')
  if (!page) return { notFound: true, revalidate: 10 }
  return { props: { page, navPages }, revalidate: 60 }
}
