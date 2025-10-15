import Link from 'next/link'

export default function Header({ pages = [] }) {
  return (
    <nav className="nav">
      <Link href="/">Home</Link>
      <Link href="/blog">Blog</Link>
      {pages.map(p => (
        <Link key={p.contentID} href={`/${p.fields?.slug}`}>{p.fields?.title || 'Untitled'}</Link>
      ))}
    </nav>
  )
}
