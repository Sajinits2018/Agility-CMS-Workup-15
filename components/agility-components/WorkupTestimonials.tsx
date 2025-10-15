import React from "react";

/**
 * Testimonials module that prefers pulling items from an Agility Content List.
 * Falls back to module.fields.items when a list isn't available.
 *
 * Supports two fetching strategies:
 *  1) A convenience helper at "@/lib/cms-content/getTestimonialsListing" (if your starter provides it)
 *  2) Generic Agility client via "@/lib/cms/cached-client" or "@/lib/cms/client" with a `referenceName`
 *
 * Fields supported on the module:
 *  - referenceName?: string (Agility list referenceName, e.g. "testimonials")
 *  - take?: number (how many items to fetch, default 5)
 *  - items?: Testimonial[] (static fallback)
 */

type Img = { url?: string; label?: string } | undefined;

type Testimonial = {
  fields: {
    photo?: Img;
    quote?: string;
    author?: string;
  };
};

type Props = {
  module: {
    fields: {
      referenceName?: string;
      take?: number;
      items?: Testimonial[];
    };
  };
};

async function fetchFromHelper(take: number) {
  try {
    const mod = await import("@/lib/cms-content/getTestimonialsListing");
    const getTestimonialsListing = (mod as any).getTestimonialsListing ?? (mod as any).default;
    if (typeof getTestimonialsListing !== "function") return null;
    const res = await getTestimonialsListing({ take });
    const items = (res?.items ?? res) || [];
    return items.map((t: any) => ({
      fields: {
        photo: t?.fields?.image || t?.fields?.photo || undefined,
        quote: t?.fields?.quote ?? t?.fields?.testimonial ?? "",
        author: t?.fields?.author ?? t?.fields?.name ?? "",
      },
    })) as Testimonial[];
  } catch {
    return null;
  }
}

async function fetchFromReference(referenceName: string, take: number) {
  // Try a cached client first, then a plain client, otherwise give up.
  try {
    const mod = await import("@/lib/cms/cached-client").catch(() => import("@/lib/cms/client"));
    const agility = (mod as any).agility ?? (mod as any).default ?? mod;
    const api = agility?.contentClient ?? agility;
    if (!api?.getContentList) return null;

    const res = await api.getContentList({ referenceName, take });
    const items = (res?.items ?? res) || [];
    return items.map((t: any) => ({
      fields: {
        photo: t?.fields?.image || t?.fields?.photo || undefined,
        quote: t?.fields?.quote ?? t?.fields?.testimonial ?? "",
        author: t?.fields?.author ?? t?.fields?.name ?? "",
      },
    })) as Testimonial[];
  } catch {
    return null;
  }
}

export default async function WorkupTestimonials({ module }: Props) {
  const ref = module.fields?.referenceName?.trim();
  const take = Number(module.fields?.take ?? 5);

  let fetched: Testimonial[] | null = null;

  // 1) helper
  fetched = await fetchFromHelper(take);
  // 2) referenceName via client
  if (!fetched || !fetched.length) {
    if (ref) {
      fetched = await fetchFromReference(ref, take);
    }
  }

  // 3) fallback to static module items, then demo data
  const items: Testimonial[] = (fetched && fetched.length ? fetched : (module.fields?.items ?? [])) as Testimonial[];
  const list: Testimonial[] = items.length ? items : [
    { fields: { author: "Mario Spe", quote: "Sample testimonial", photo: { url: "/assets/workup-starter/assets/images/testi1.jpg" } } },
    { fields: { author: "Petey Cru", quote: "Another happy client.", photo: { url: "/assets/workup-starter/assets/images/testi2.jpg" } } },
    { fields: { author: "Anna Sth", quote: "Great service and fast results.", photo: { url: "/assets/workup-starter/assets/images/testi3.jpg" } } },
  ];

  return (
    <section className="w3l-index4 py-5" id="testimonials">
      <div className="container py-md-5 py-4">
        <div className="content-slider text-center py-4">
          <div className="clients-slider">
            <div className="mask">
              <ul>
                {list.map((t, i) => (
                  <li key={i} className={"anim" + ((i % 5) + 1)}>
                    {t.fields.photo?.url && (
                      <img
                        src={t.fields.photo.url}
                        className="img-fluid rounded-circle"
                        alt={t.fields.photo.label ?? "client image"}
                      />
                    )}
                    {t.fields.quote && (
                      <blockquote className="quote">
                        <q>{t.fields.quote}</q>
                      </blockquote>
                    )}
                    {t.fields.author && <div className="source">- {t.fields.author}</div>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}