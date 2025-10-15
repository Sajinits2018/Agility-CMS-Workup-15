
"use client";
import React, { useEffect, useRef } from "react";

type HeroSlide = {
  fields: {
    eyebrow?: string;
    title?: string;
    ctaText?: string;
    ctaHref?: string;
    bgImage?: { url?: string; label?: string };
  };
};

type Props = {
  module: { fields: { slides?: HeroSlide[] } };
};

export default function WorkupHeroSlider({ module }: Props) {
  const slides = module?.fields?.slides ?? [];
  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);
  const intervalRef = useRef<number | null>(null);
  const INTERVAL = 5000;

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const nodes = Array.from(el.querySelectorAll<HTMLElement>(".slide"));
    const setCurrent = (idx: number) => {
      nodes.forEach((n) => n.classList.remove("current"));
      nodes[idx]?.classList.add("current");
    };

    setCurrent(0);

    const next = () => {
      currentIndex.current = (currentIndex.current + 1) % nodes.length;
      setCurrent(currentIndex.current);
    };
    const prev = () => {
      currentIndex.current = (currentIndex.current - 1 + nodes.length) % nodes.length;
      setCurrent(currentIndex.current);
    };

    const nextBtn = el.querySelector<HTMLButtonElement>("#next");
    const prevBtn = el.querySelector<HTMLButtonElement>("#prev");
    nextBtn?.addEventListener("click", next);
    prevBtn?.addEventListener("click", prev);

    if (nodes.length > 1) {
      intervalRef.current = window.setInterval(next, INTERVAL);
    }

    return () => {
      nextBtn?.removeEventListener("click", next);
      prevBtn?.removeEventListener("click", prev);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  const displaySlides =
    slides.length > 0
      ? slides
      : [
          {
            fields: {
              eyebrow: "Start Your Company With Us",
              title: "Plan Business to Active Goal!",
              ctaText: "Learn More",
              ctaHref: "/about",
            },
          },
        ];

  return (
    <>
      <div className="slider" ref={wrapperRef}>
        {displaySlides.map((s, i) => (
          <div className={`slide${i === 0 ? " current" : ""}`} key={i}>
            <div
              className="bg-layer"
              style={
                s.fields.bgImage?.url
                  ? {
                      backgroundImage: `url(${s.fields.bgImage.url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : undefined
              }
            >
              <div className="content">
                {s.fields.eyebrow && <h6>{s.fields.eyebrow}</h6>}
                {s.fields.title && (
                  <h3 dangerouslySetInnerHTML={{ __html: s.fields.title }} />
                )}
                {s.fields.ctaText && (
                  <a href={s.fields.ctaHref ?? "/about"} className="btn btn-style mt-4">
                    {s.fields.ctaText}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button id="prev">
          <i className="fas fa-arrow-left" />
        </button>
        <button id="next">
          <i className="fas fa-arrow-right" />
        </button>
      </div>
    </>
  );
}
