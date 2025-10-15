import Image from 'next/image'

export default function HeroImage({ url, alt }) {
  if (!url) return null
  return (
    <div className="hero">
      <Image src={url} alt={alt || ''} width={1200} height={630} style={{ width: '100%', height: 'auto' }} />
    </div>
  )
}
