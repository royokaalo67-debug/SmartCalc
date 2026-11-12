import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="page-transition">
      <section className="workspace">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ABOUT SMARTCALC</p>
            <h1>Simple calculations. Smarter decisions.</h1>
            <p>
              SmartCalc provides practical online calculators to help
              individuals, entrepreneurs, and businesses make informed
              financial and business decisions.
            </p>
          </div>
        </div>

        <div className="calculator-page">
          <h2>Our mission</h2>
          <p>
            Our mission is to make everyday calculations simple,
            accessible, and understandable for everyone.
          </p>

          <h2>What you can do with SmartCalc</h2>
          <p>
            Use our free tools to calculate profit, markup, discounts,
            break-even points, and VAT. Our calculators are designed
            to be straightforward and easy to use.
          </p>

          <h2>Who we serve</h2>
          <p>
            SmartCalc is designed for entrepreneurs, small business
            owners, students, professionals, and anyone who needs
            quick and reliable calculations.
          </p>

          <h2>Our commitment</h2>
          <p>
            We aim to provide useful tools and clear results. Always
            review important financial decisions and verify figures
            where necessary.
          </p>

          <p>
            <Link to="/">Back to SmartCalc home</Link>
          </p>
        </div>
      </section>
    </main>
  );
}