import React from "react";

/**
 * Blog Grid that prefers pulling the latest posts from Agility CMS.
 * Falls back to module.fields.items if fetching is not available.
 *
 * Expects an existing helper at: "@/lib/cms-content/getPostListing"
 * (present in the Agility starter). If not found at build time,
 * the try/catch preserves compile by using the static items instead.
 */

type Img = { url?: string; label?: string } | undefined;

type BlogItem = {
  fields: {
    href?: string;
    title?: string;
    excerpt?: string;
    image?: Img;
    authorName?: string;
    authorPhoto?: Img;
    date?: string;
  };
};

type Props = {
  module: {
    fields: {
      headingSmall?: string;
      heading?: string;
      items?: BlogItem[]; // static fallback
      take?: number; // optional: how many posts to fetch (default 3)
    };
  };
};

async function fetchPosts(take: number) {
  try {
    // Prefer the helper included in the Agility starter
    const mod = await import("@/lib/cms-content/getPostListing");
    const getPostListing = (mod as any).getPostListing ?? (mod as any).default;
    if (typeof getPostListing !== "function") return null;

    const res = await getPostListing({ take });
    // Try common shapes safely
    const items = (res?.items ?? res) || [];
    return items.map((p: any) => {
      const f = p?.fields ?? {};
      const author = f.author?.fields ?? f.author ?? {};
      // common guesses for image fields
      const img: Img = f.image || f.postImage || f.heroImage || undefined;
      const authorImg: Img = author.image || author.photo || undefined;
      const slug: string = f.slug || f.seo?.slug || p?.slug || "";
      const href = slug ? `/blog/${slug}` : (f.href || "#blog");

      // date might be ISO; keep original if stringy
      const date = typeof f.date === "string" ? f.date : (f.date?.toString?.() ?? "");

      return {
        fields: {
          href,
          title: f.title ?? "Post",
          excerpt: f.excerpt ?? f.summary ?? "",
          image: img,
          authorName: author.title ?? author.name ?? "",
          authorPhoto: authorImg,
          date,
        },
      } as BlogItem;
    });
  } catch (err) {
    // Helper not present or failed; fallback to static
    return null;
  }
}

export default async function WorkupBlogGrid({ module }: Props) {
  const { headingSmall, heading } = module.fields || {};
  const take = Number(module.fields?.take ?? 3);

  // Try to fetch live posts
  const fetched = await fetchPosts(take);
  const items = fetched && fetched.length ? fetched : (module.fields?.items ?? []);

  // Static demo fallback (if both fetch + module items are empty)
  const list: BlogItem[] = items.length ? items : [
    { fields: { href: "#blog", title: "How To Scale a Dropshipping Business", excerpt: "Sed do eiusmod tempor incididunt ut labore.", image: { url: "/assets/workup-starter/assets/images/blog1.jpg" }, authorName: "Eetey Cruis", authorPhoto: { url: "/assets/workup-starter/assets/images/testi2.jpg" }, date: "Nov 06, 2021" } },
    { fields: { href: "#blog", title: "Customer Onboarding Strategy", excerpt: "Sed do eiusmod tempor.", image: { url: "/assets/workup-starter/assets/images/blog3.jpg" }, authorName: "Molive Joe", authorPhoto: { url: "/assets/workup-starter/assets/images/testi1.jpg" }, date: "Nov 10, 2021" } },
    { fields: { href: "#blog", title: "How to plan a website redesign strategy", excerpt: "Sunt inc officia deserunt.", image: { url: "/assets/workup-starter/assets/images/blog2.jpg" }, authorName: "Turne Leo", authorPhoto: { url: "/assets/workup-starter/assets/images/testi3.jpg" }, date: "Nov 12, 2021" } },
  ];

  return (
    <div className="w3l-blog-block-5 py-5" id="blog">
      <div className="container py-md-5 py-4">
        <div className="title-main text-center mx-auto mb-md-5 mb-4" style={{ maxWidth: 700 }}>
          {headingSmall && <h5 className="small-title mb-2">{headingSmall}</h5>}
          {heading && <h3 className="title-style">{heading}</h3>}
        </div>
        <div className="row justify-content-center">
          {list.map((b, idx) => (
            <div key={idx} className={"col-lg-4 col-md-6" + (idx >= 1 ? " mt-md-0 mt-4" : "")}>
              <div className="blog-card-single">
                <div className="grids5-info">
                  {b.fields.image?.url && <a href={b.fields.href ?? "#blog"}><img src={b.fields.image.url} alt={b.fields.image.label ?? ""} /></a>}
                  <div className="blog-info">
                    <h4><a href={b.fields.href ?? "#blog"}>{b.fields.title ?? "Post"}</a></h4>
                    {b.fields.excerpt && <p>{b.fields.excerpt}</p>}
                    <div className="d-flex align-items-center justify-content-between mt-4">
                      <a className="d-flex align-items-center" href={b.fields.href ?? "#blog"}>
                        {b.fields.authorPhoto?.url && <img className="img-fluid" src={b.fields.authorPhoto.url} alt="admin" style={{ maxWidth: 40 }} />}
                        {b.fields.authorName && <span className="small ms-2">{b.fields.authorName}</span>}
                      </a>
                      {b.fields.date && <p className="date-text"><i className="far fa-calendar-alt me-1"></i>{b.fields.date}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}