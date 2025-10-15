# Workup Starter — Placement inside Agility Next.js Starter

**What we did**
- Moved all HTML prototypes to: `/public/templates/workup-starter/`
- Placed CSS/JS/Images/Fonts/Vendor assets under: `/public/assets/workup-starter/` (original subfolders preserved)

**How to reference assets in HTML/React**
- Use absolute public paths like: `/assets/workup-starter/<subfolder>/<file>`

**Recommended Next Steps**
1. Lift header/footer markup into `components/common/SiteHeader.tsx` and `components/common/SiteFooter.tsx`.
2. Convert page sections into React components inside `components/agility-components/`.
3. Bind components to Agility content definitions and render via `app/[...slug]/page.tsx`.