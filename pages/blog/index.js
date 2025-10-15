import Head from 'next/head'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getAgilityClient } from '@/lib/agility'

export default function Blog({ posts, navPages }) {
  return (
    <>
      <Head><title>Blog | Agility</title></Head>
      <Header pages={navPages} />
      <main className="container">
        <h1 className="h1">Blog</h1>
        <ul className="list">
          {posts.map(p => (
            <li key={p.contentID}>
              <Link href={`/blog/${p.fields?.slug}`}>{p.fields?.title}</Link>
              <br /><small className="muted">{p.fields?.excerpt || ''}</small>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const client = getAgilityClient()
  const locale = process.env.AGILITY_LOCALE || 'en-us'
  const [pagesRes, postsRes] = await Promise.all([
    client.getContentList({ referenceName: 'pages', locale, take: 200 }),
    client.getContentList({ referenceName: 'posts', locale, take: 100 })
  ])
  const navPages = (pagesRes.items || []).filter(p => p.fields?.slug && p.fields.slug !== 'home')
  const posts = postsRes.items || []
  return { props: { posts, navPages }, revalidate: 60 }
}
