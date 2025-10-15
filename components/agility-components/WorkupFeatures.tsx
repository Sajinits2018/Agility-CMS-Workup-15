import React from "react";

/**
 * Workup Features — pulls feature items from an Agility list if available.
 * Safe for Netlify deploys: try/catch imports and graceful fallbacks.
 *
 * Module optional fields:
 *  - referenceName?: string (e.g., "features")
 *  - take?: number (default 6)
 *  - items?: Feature[] (static fallback)
 */

type Feature = { fields: { iconClass?: string; title?: string; text?: string; href?: string } };

type Props = {
  module: {
    fields: {
      headingSmall?: string;
      heading?: string;
      items?: Feature[];
      referenceName?: string;
      take?: number;
    };
  };
};

async function fetchFeatures(referenceName: string, take: number) {
  try {
    const mod = await import("@/lib/cms/cached-client").catch(() => import("@/lib/cms/client"));
    const agility = (mod as any).agility ?? (mod as any).default ?? mod;
    const api = agility?.contentClient ?? agility;
    if (!api?.getContentList) return null;

    const res = await api.getContentList({ referenceName, take });
    const items = (res?.items ?? res) || [];
    return items.map((f: any) => ({
      fields: {
        iconClass: f?.fields?.iconClass ?? f?.fields?.icon ?? "fas fa-star",
        title: f?.fields?.title ?? "Feature",
        text: f?.fields?.text ?? f?.fields?.description ?? "",
        href: f?.fields?.href ?? "#features",
      },
    })) as Feature[];
  } catch {
    return null;
  }
}

export default async function WorkupFeatures({ module }: Props) {
  const { headingSmall, heading } = module.fields || {};
  const ref = module.fields?.referenceName?.trim();
  const take = Number(module.fields?.take ?? 6);

  let items: Feature[] = module.fields?.items ?? [];
  if ((!items || !items.length) && ref) {
    const fetched = await fetchFeatures(ref, take);
    if (fetched && fetched.length) items = fetched;
  }
  if (!items || !items.length) {
    items = [
      { fields: { iconClass: "fas fa-business-time", title: "Market Research", text: "Lorem ipsum dolor sit amet.", href: "#features" } },
      { fields: { iconClass: "fab fa-accusoft", title: "Startup Business", text: "Laudantium tempora rerum perspiciatis?", href: "#features" } },
      { fields: { iconClass: "fas fa-chart-line", title: "Business Growth", text: "Laudantium tempora rerum perspiciatis?", href: "#features" } },
      { fields: { iconClass: "fas fa-chart-pie", title: "Consultancy", text: "Laudantium tempora rerum perspiciatis?", href: "#features" } },
      { fields: { iconClass: "fas fa-piggy-bank", title: "Financial Advices", text: "Laudantium tempora rerum perspiciatis?", href: "#features" } },
      { fields: { iconClass: "fas fa-copy", title: "Tax Strategy", text: "Laudantium tempora rerum perspiciatis?", href: "#features" } },
    ];
  }

  return (
    <section className="w3l-grids-block py-5" id="features">
      <div className="container py-lg-5 py-md-4 py-2">
        <div className="title-main text-center mx-auto mb-md-5 mb-4" style={{ maxWidth: 600 }}>
          {headingSmall && <h5 className="small-title mb-2">{headingSmall}</h5>}
          {heading && <h3 className="title-style">{heading}</h3>}
        </div>

        <div className="row justify-content-center">
          {items.map((f, idx) => (
            <div key={idx} className={"col-lg-4 col-md-6 col-sm-10" + (idx >= 1 ? " mt-md-0 mt-4" : "")}>
              <div className="bottom-block">
                <a href={f.fields.href ?? "#features"} className="d-block">
                  <i className={f.fields.iconClass ?? "fas fa-star"}></i>
                  <h3 className="mt-3 mb-2">{f.fields.title ?? "Feature"}</h3>
                  {f.fields.text && <p>{f.fields.text}</p>}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}