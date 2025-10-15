import React from "react";

type Bar = { fields: { label?: string; percent?: number } };

type Props = {
  module: {
    fields: {
      headingSmall?: string;
      heading?: string;
      text?: string;
      image?: { url?: string; label?: string };
      bars?: Bar[];
    };
  };
};

export default function WorkupProgress({ module }: Props) {
  const { headingSmall, heading, text, image, bars = [] } = module.fields || {};
  const list = bars.length ? bars : [
    { fields: { label: "Business Planning", percent: 90 } },
    { fields: { label: "Creativity", percent: 85 } },
    { fields: { label: "Financial Advices", percent: 80 } },
    { fields: { label: "Business Security", percent: 90 } },
  ];

  return (
    <section className="w3l-progress py-5" id="progress">
      <div className="container py-lg-5 py-md-4 py-2">
        <div className="row align-items-center">
          <div className="col-lg-6 about-2-secs-right mb-lg-0 mb-5">
            {image?.url && <img src={image.url} alt={image.label ?? ""} className="img-fluid radius-image" />}
          </div>
          <div className="col-lg-6 about-2-secs-left ps-xl-5">
            {headingSmall && <h5 className="small-title mb-2">{headingSmall}</h5>}
            {heading && <h3 className="title-style mb-sm-3 mb-2">{heading}</h3>}
            {text && <p>{text}</p>}
            <div className="w3l-progressblock mt-md-5 mt-4">
              {list.map((b, i) => (
                <div key={i} className={"progress-info " + (i === 0 ? "info1" : i === 1 ? "info2" : "info3") + (i === list.length - 1 ? " mb-0" : "")}>
                  <h6 className="progress-tittle">{b.fields.label} <span>{(b.fields.percent ?? 0) + "%"}</span></h6>
                  <div className="progress">
                    <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: (b.fields.percent ?? 0) + "%" }}
                      aria-valuenow={b.fields.percent ?? 0} aria-valuemin={0} aria-valuemax={100}>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}