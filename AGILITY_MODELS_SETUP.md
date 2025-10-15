# Agility Models to Create (match names exactly)

## Module: Workup Hero Slider
- slides: Linked Content (List) → **Hero Slide**

### Content Model: Hero Slide
- eyebrow: Text
- title: Long Text
- ctaText: Text
- ctaHref: Text or URL
- bgImage: Image

## Module: Workup Services Grid
- headingSmall: Text
- heading: Long Text
- items: Linked Content (List) → **Service Item**

### Content Model: Service Item
- iconClass: Text (e.g. `fas fa-donate`)
- number: Text (e.g. `01`)
- title: Text
- description: Long Text
- linkHref: Text or URL

After creating models, add these modules to your page in Agility and publish.

## Module: Workup Why Choose
- headingSmall: Text
- heading: Long Text
- intro: Long Text
- points: Linked Content (List) → **Why Choose Point**
- rightImage: Image
- badgeNumber: Text
- badgeText: Text

### Content Model: Why Choose Point
- iconClass: Text (e.g. `fas fa-hand-holding-usd`)
- title: Text
- text: Long Text

## Module: Workup Features
- headingSmall: Text
- heading: Long Text
- items: Linked Content (List) → **Feature Item**

### Content Model: Feature Item
- iconClass: Text (e.g. `fas fa-chart-line`)
- title: Text
- text: Long Text
- href: Text/URL

## Module: Workup Promo Trio
- headingSmall: Text
- heading: Long Text
- cards: Linked Content (List) → **Promo Card**

### Content Model: Promo Card
- tag: Text
- title: Text
- href: Text/URL
- backgroundClass: Text (e.g. `top-pic1`, `top-pic2`, `top-pic3`)

## Module: Workup Progress
- headingSmall: Text
- heading: Long Text
- text: Long Text
- image: Image
- bars: Linked Content (List) → **Progress Bar**

### Content Model: Progress Bar
- label: Text
- percent: Number (0–100)

## Module: Workup Testimonials
- items: Linked Content (List) → **Testimonial**
### Content Model: Testimonial
- photo: Image
- quote: Long Text
- author: Text

## Module: Workup Blog Grid
- headingSmall: Text
- heading: Long Text
- items: Linked Content (List) → **Blog Item** (or wire to your Posts list later)

### Content Model: Blog Item
- href: Text/URL
- title: Text
- excerpt: Long Text
- image: Image
- authorName: Text
- authorPhoto: Image
- date: Text (formatted)


### Blog Grid (Live Posts)
By default, **Workup Blog Grid** now fetches the latest posts using your starter's `getPostListing` helper
from `@/lib/cms-content/getPostListing`. You can optionally set a `take` field (Number) on the module (not required)
to control how many posts are fetched (default: 3). If fetching isn't available, it falls back to the static `items` list.


### Testimonials (Live from List)
**Workup Testimonials** can now pull from an Agility **Content List**.
- Add optional fields on the module model:
  - `referenceName` (Text) → your list reference (e.g., `testimonials`)
  - `take` (Number) → how many items to fetch (default 5)
- If a helper `getTestimonialsListing` exists in your starter, it will be used automatically.
- If `referenceName` is provided, it will fetch via the Agility client.
- If neither is available, it uses the static `items` on the module.
Each testimonial item should have fields: `image/photo`, `quote/testimonial`, `author/name`.


### Why Choose / Features (Live from Lists)
Both **Workup Why Choose** and **Workup Features** now support pulling items from Agility Content Lists.

- Add optional fields on each module model:
  - `referenceName` (Text) → the list reference name to read from (e.g., `whychoosepoints`, `features`)
  - `take` (Number) → how many to load (defaults: Why Choose = 4, Features = 6)

If a list is not provided or unavailable, components fall back to the module's own `points/items` fields and finally to demo content. This ensures Netlify builds with **0 errors**.
