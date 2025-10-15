# Agility CMS Editable Pages + Blog (Next.js 13)

Manage **Pages** and **Blog Posts** directly in **Agility CMS** (titles, slugs, images, body), rendered by Next.js.

## 1) Install & Configure
```bash
npm install
cp .env.example .env.local
```
Set in `.env.local`:
```
AGILITY_GUID=YOUR_GUID
AGILITY_API_KEY=YOUR_CONTENT_FETCH_KEY
AGILITY_LOCALE=en-us
AGILITY_IS_PREVIEW=false
```

## 2) Agility Content Models

### Content List: Pages
- Reference Name: `pages`
- Fields:
  - `title` (Text)
  - `slug` (Text, unique)
  - `heroImage` (Image)
  - `body` (Rich Text or Long Text (HTML))

### Content List: Posts
- Reference Name: `posts`
- Fields:
  - `title` (Text)
  - `slug` (Text, unique)
  - `coverImage` (Image)
  - `excerpt` (Short Text)
  - `body` (Rich Text or Long Text (HTML))
  - `publishedDate` (Date/Time) — optional

### Add sample content
- Create a **Page** with slug `home` for the homepage.
- Create more Pages: `about`, `services`, etc.
- Create a few **Posts**.

## 3) Routes
- `/` → renders `home` Page
- `/[slug]` → any Page (e.g., `/about`)
- `/blog` → posts list
- `/blog/[slug]` → post detail

## 4) Local Dev
```bash
npm run dev
# http://localhost:3000
```

## 5) Deploy
Push to GitHub, deploy on Vercel/Netlify, add the same env vars.

> This starter uses `@agility/content-fetch` and a simple model. If you want the **full Agility Page Tree + Modules** workflow, I can provide an advanced starter that maps Agility Modules to React components.
