import React from "react";

type Card = { fields: { tag?: string; title?: string; href?: string; backgroundClass?: string } };

type Props = {
  module: {
    fields: {
      headingSmall?: string;
      heading?: string;
      cards?: Card[];
    };
  };
};

export default function WorkupPromoTrio({ module }: Props) {
  const { headingSmall, heading, cards = [] } = module.fields || {};
  const items = cards.length ? cards : [
    { fields: { tag: "Investment", title: "Strength solutions", href: "#blog", backgroundClass: "top-pic1" } },
    { fields: { tag: "Strategy", title: "Business analytics", href: "#blog", backgroundClass: "top-pic2" } },
    { fields: { tag: "Tax Consulting", title: "Stock investments", href: "#blog", backgroundClass: "top-pic3" } },
  ];

  return (
    <div className="w3l-homeblock3 py-5">
      <div className="container py-lg-5 py-md-4 py-2">
        <div className="title-main text-center mx-auto mb-md-5 mb-4" style={{ maxWidth: 700 }}>
          {headingSmall && <h5 className="small-title mb-2">{headingSmall}</h5>}
          {heading && <h3 className="title-style">{heading}</h3>}
        </div>
        <div className="row justify-content-center">
          {items.map((c, idx) => (
            <div key={idx} className={"col-lg-4 col-md-6" + (idx >= 1 ? " mt-md-0 mt-4" : "")}>
              <div className={c.fields.backgroundClass ?? "top-pic1"}>
                <div className="card-body blog-details">
                  {c.fields.tag && <span className="meta-value">{c.fields.tag}</span>}
                  <a href={c.fields.href ?? "#blog"} className="blog-desc">{c.fields.title ?? "Promo"}</a>
                  <a href={c.fields.href ?? "#blog"} className="btn btn-style-primary btn-style text-white mt-4">
                    Read More<i className="fas fa-arrow-right ms-1"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}