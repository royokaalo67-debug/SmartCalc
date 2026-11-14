
import React, { useEffect } from "react";

export default function CalculatorPage({
  title,
  description,
  canonicalPath,
  children,
}) {
  useEffect(() => {
    document.title = `${title} | SmartCalc`;

    let meta = document.querySelector('meta[name="description"]');

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.content = description;

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = canonicalPath
      ? `https://smartcalc-55t.pages.dev${canonicalPath}`
      : window.location.origin + window.location.pathname;

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
