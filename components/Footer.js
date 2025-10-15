export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Agility CMS + Next.js Template.</p>
        <p className="small muted">Edit Pages & Posts directly in Agility CMS.</p>
      </div>
    </footer>
  )
}
