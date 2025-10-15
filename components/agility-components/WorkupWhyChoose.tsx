import React from "react";

/**
 * Workup Why Choose — pulls points from an Agility list if available.
 * Safe for Netlify deploys: all imports are try/catch with fallbacks.
 *
 * Module optional fields:
 *  - referenceName?: string (e.g., "whychoosepoints")
 *  - take?: number (default 4)
 *  - points?: WhyChoosePoint[] (static fallback)
 */

type WhyChoosePoint = { fields: { iconClass?: string; title?: string; text?: string } };
type Img = { url?: string; label?: string } | undefined;

type Props = {
  module: {
    fields: {
      headingSmall?: string;
      heading?: string;
      intro?: string;
      points?: WhyChoosePoint[];
      rightImage?: Img;
      badgeNumber?: string;
      badgeText?: string;
      referenceName?: string;
      take?: number;
    };
  };
};

async function fetchPoints(referenceName: string, take: number) {
  try {
    const mod = await import("@/lib/cms/cached-client").catch(() => import("@/lib/cms/client"));
    const agility = (mod as any).agility ?? (mod as any).default ?? mod;
    const api = agility?.contentClient ?? agility;
    if (!api?.getContentList) return null;

    const res = await api.getContentList({ referenceName, take });
    const items = (res?.items ?? res) || [];
    return items.map((p: any) => ({
      fields: {
        iconClass: p?.fields?.iconClass ?? p?.fields?.icon ?? "fas fa-check-circle",
        title: p?.fields?.title ?? "",
        text: p?.fields?.text ?? p?.fields?.description ?? "",
      },
    })) as WhyChoosePoint[];
  } catch {
    return null;
  }
}

export default async function WorkupWhyChoose({ module }: Props) {
  const {
    headingSmall,
    heading,
    intro,
    rightImage,
    badgeNumber,
    badgeText,
  } = module.fields || {};
  const ref = module.fields?.referenceName?.trim();
  const take = Number(module.fields?.take ?? 4);

  let points: WhyChoosePoint[] = module.fields?.points ?? [];
  if ((!points || !points.length) && ref) {
    const fetched = await fetchPoints(ref, take);
    if (fetched && fetched.length) points = fetched;
  }
  if (!points || !points.length) {
    points = [
      { fields: { iconClass: "fas fa-hand-holding-usd", title: "Finance Consultant", text: "Sed ut perspiciatis unde omnis iste natus error sit." } },
      { fields: { iconClass: "far fa-chart-bar", title: "Business Consultant", text: "Sed ut perspiciatis unde omnis iste natus error sit." } },
    ];
  }

  return (
    <section className="w3l-servicesblock py-5" id="whychoose">
      <div className="container py-lg-5 py-md-4 py-2">
        <div className="row align-items-center">
          <div className="col-lg-6">
            {headingSmall && <h5 className="small-title mb-2">{headingSmall}</h5>}
            {heading && <h3 className="title-style">{heading}</h3>}
            {intro && <p className="mt-3">{intro}</p>}

            <div className="row two-grids mt-5 pt-lg-4">
              {(points || []).map((p, i) => (
                <div key={i} className={"col-sm-6 grids_info d-flex" + (i % 2 === 1 ? " mt-sm-0 mt-4" : "")}>
                  <i className={p.fields.iconClass ?? "fas fa-check-circle"}></i>
                  <div className="detail ms-3">
                    <h4>{p.fields.title ?? "Point title"}</h4>
                    {p.fields.text && <p>{p.fields.text}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-5 offset-lg-1 text-end mt-lg-0 mt-5 position-relative">
            {rightImage?.url && (
              <img src={rightImage.url} alt={rightImage.label ?? ""} className="img-fluid radius-image" />
            )}
            {(badgeNumber || badgeText) && (
              <div className="imginfo__box">
                {badgeNumber && <h6 className="imginfo__title">{badgeNumber}</h6>}
                {badgeText && <p>{badgeText}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}