
import React, { useEffect } from "react";

export default function CalculatorPage({
  title,
  description,
  canonicalPath,
  children,
}) {
  useEffect(() => {
    const pageTitle = `${title} | SmartCalc`;
    const pageUrl = canonicalPath
      ? `https://smartcalc-55t.pages.dev${canonicalPath}`
      : window.location.origin + window.location.pathname;

    document.title = pageTitle;

    const updateMeta = (selector, attribute, value, createTag) => {
      let element = document.querySelector(selector);

      if (!element) {
        element = document.createElement("meta");
        Object.entries(createTag).forEach(([key, val]) => {
          element.setAttribute(key, val);
        });
        document.head.appendChild(element);
      }

      element.setAttribute(attribute, value);
    };

    updateMeta(
      'meta[name="description"]',
      "content",
      description,
      { name: "description" }
    );

    updateMeta(
      'meta[property="og:type"]',
      "content",
      "website",
      { property: "og:type" }
    );

    updateMeta(
      'meta[property="og:title"]',
      "content",
      pageTitle,
      { property: "og:title" }
    );

    updateMeta(
      'meta[property="og:description"]',
      "content",
      description,
      { property: "og:description" }
    );

    updateMeta(
      'meta[property="og:url"]',
      "content",
      pageUrl,
      { property: "og:url" }
    );

    updateMeta(
      'meta[name="twitter:card"]',
      "content",
      "summary",
      { name: "twitter:card" }
    );

    updateMeta(
      'meta[name="twitter:title"]',
      "content",
      pageTitle,
      { name: "twitter:title" }
    );

    updateMeta(
      'meta[name="twitter:description"]',
      "content",
      description,
      { name: "twitter:description" }
    );

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = pageUrl;

    return () => {
      canonical.remove();
    };
  }, [title, description, canonicalPath]);

  return (
    <main className="page-transition">
      <section className="workspace calculator-page">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SMARTCALC TOOLS</p>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </div>

        {children}
      </section>
    </main>
  );
}
