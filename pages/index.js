import Head from 'next/head'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroImage from '@/components/HeroImage'
import RichText from '@/components/RichText'
import { getAgilityClient } from '@/lib/agility'

export default function Home({ home, posts, navPages }) {
  return (
    <>
      <Head>
        <title>{home?.fields?.title || 'Home'} | Agility</title>
        <meta name="description" content="Agility CMS editable Pages & Blog template." />
      </Head>
      <Header pages={navPages} />
      <main className="container">
        <h1 className="h1">{home?.fields?.title || 'Welcome'}</h1>
        <HeroImage url={home?.fields?.heroImage?.url} alt={home?.fields?.title} />
        <RichText html={home?.fields?.body} />
        <section className="card">
          <h2 className="h2">Latest Posts</h2>
          <ul className="list">
            {posts.map(p => (
              <li key={p.contentID}>
                <Link href={`/blog/${p.fields?.slug}`}>{p.fields?.title}</Link>
                <br /><small className="muted">{p.fields?.excerpt || ''}</small>
              </li>
            ))}
          </ul>
          <p><Link href="/blog">View all posts →</Link></p>
        </section>
      </main>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const client = getAgilityClient()
  const locale = process.env.AGILITY_LOCALE || 'en-us'
  const [pages, postsList] = await Promise.all([
    client.getContentList({ referenceName: 'pages', locale, take: 100 }),
    client.getContentList({ referenceName: 'posts', locale, take: 10 })
  ])
  const home = (pages.items || []).find(p => p.fields?.slug === 'home') || pages.items?.[0] || null
  const posts = postsList.items || []
  const navPages = (pages.items || []).filter(p => p.fields?.slug && p.fields.slug !== 'home')
  return { props: { home, posts, navPages }, revalidate: 60 }
}
