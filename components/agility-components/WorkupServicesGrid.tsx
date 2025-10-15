
import React from "react";

type ServiceItem = {
  fields: {
    iconClass?: string;
    number?: string;
    title?: string;
    description?: string;
    linkHref?: string;
  };
};

type Props = {
  module: {
    fields: {
      headingSmall?: string;
      heading?: string;
      items?: ServiceItem[];
    };
  };
};

export default function WorkupServicesGrid({ module }: Props) {
  const { headingSmall, heading, items = [] } = module.fields || {};
  const list = items.length
    ? items
    : [
        {
          fields: {
            iconClass: "fas fa-donate",
            number: "01",
            title: "Financial planning",
            description:
              "Lorem ipsum dolor sit amet sed consectetur adipisicing elit.",
            linkHref: "/services",
          },
        },
      ];

  return (
    <section className="home-services py-5" id="services">
      <div className="container py-lg-5 py-md-4 py-2">
        <div
          className="title-main text-center mx-auto mb-md-5 mb-4"
          style={{ maxWidth: 700 }}
        >
          {headingSmall && <h5 className="small-title mb-2">{headingSmall}</h5>}
          {heading && <h3 className="title-style">{heading}</h3>}
        </div>

        <div className="row justify-content-center">
          {list.map((it, idx) => (
            <div
              key={idx}
              className={
                "col-lg-3 col-md-6" + (idx >= 1 ? " mt-lg-0 mt-4" : "")
              }
            >
              <div className="box-wrap">
                <div className="icon">
                  <i className={it.fields.iconClass ?? "fas fa-star"} />
                </div>
                {it.fields.number && (
                  <h4 className="number">{it.fields.number}</h4>
                )}
                <h4>
                  <a href={it.fields.linkHref ?? "#url"}>
                    {it.fields.title ?? "Service"}
                  </a>
                </h4>
                {it.fields.description && <p>{it.fields.description}</p>}
                <a href={it.fields.linkHref ?? "/services"} className="read">
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
