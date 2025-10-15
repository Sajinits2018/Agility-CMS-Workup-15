import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroImage from '@/components/HeroImage'
import RichText from '@/components/RichText'
import { getAgilityClient } from '@/lib/agility'

export default function Post({ post, navPages }) {
  if (!post) return <div className="container"><p>Post not found.</p></div>
  return (
    <>
      <Head>
        <title>{post.fields?.title} | Blog</title>
        <meta name="description" content={post.fields?.excerpt || 'Post'} />
      </Head>
      <Header pages={navPages} />
      <main className="container">
        <h1 className="h1">{post.fields?.title}</h1>
        <HeroImage url={post.fields?.coverImage?.url} alt={post.fields?.title} />
        <p><small className="muted">{post.fields?.publishedDate || ''}</small></p>
        <RichText html={post.fields?.body} />
      </main>
      <Footer />
    </>
  )
}

export async function getStaticPaths() {
  const client = getAgilityClient()
  const locale = process.env.AGILITY_LOCALE || 'en-us'
  const { items } = await client.getContentList({ referenceName: 'posts', locale, take: 200 })
  const paths = (items || []).filter(p => p.fields?.slug).map(p => ({ params: { slug: p.fields.slug } }))
  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const client = getAgilityClient()
  const locale = process.env.AGILITY_LOCALE || 'en-us'
  const [pagesRes, postsRes] = await Promise.all([
    client.getContentList({ referenceName: 'pages', locale, take: 200 }),
    client.getContentList({ referenceName: 'posts', locale, take: 200 }),
  ])
  const post = (postsRes.items || []).find(p => p.fields?.slug === params.slug) || null
  const navPages = (pagesRes.items || []).filter(p => p.fields?.slug && p.fields.slug !== 'home')
  if (!post) return { notFound: true, revalidate: 10 }
  return { props: { post, navPages }, revalidate: 60 }
}
