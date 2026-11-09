import React from "react";
import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <main>
      <section className="workspace">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SMARTCALC POLICIES</p>
            <h1>Terms and Conditions</h1>
            <p>Last updated: November 9, 2026</p>
          </div>
        </div>

        <div className="calculator-page">
          <h2>1. Acceptance of terms</h2>
          <p>
            By accessing or using SmartCalc, you agree to these
            Terms and Conditions. If you do not agree, please
            discontinue using the website.
          </p>

          <h2>2. Use of our calculators</h2>
          <p>
            SmartCalc provides free online calculators for
            informational and educational purposes. You are
            responsible for checking your inputs and verifying
            important results before making decisions.
          </p>

          <h2>3. No financial or professional advice</h2>
          <p>
            Our calculators do not provide financial, accounting,
            tax, legal, or professional advice. Results are
            estimates and should not replace advice from a
            qualified professional.
          </p>

          <h2>4. Accuracy of information</h2>
          <p>
            We aim to provide useful and accurate tools, but we
            do not guarantee that every calculation or result
            will be error-free or suitable for every situation.
          </p>

          <h2>5. Acceptable use</h2>
          <p>
            You agree not to misuse the website, attempt to
            disrupt its operation, introduce malicious software,
            or use the service for unlawful purposes.
          </p>

          <h2>6. Intellectual property</h2>
          <p>
            Website content, branding, design, and original
            materials belong to SmartCalc or their respective
            owners and may not be copied or redistributed
            without permission.
          </p>

          <h2>7. Limitation of liability</h2>
          <p>
            To the extent permitted by applicable law, SmartCalc
            is not liable for losses arising from reliance on
            calculator results or temporary website interruptions.
          </p>

          <h2>8. Changes to these terms</h2>
          <p>
            We may update these Terms and Conditions from time
            to time. Updated terms will be published on this page.
          </p>

          <h2>9. Contact</h2>
          <p>
            For questions about these terms, contact us through
            our website contact details.
          </p>

          <p>
            <Link to="/">← Back to SmartCalc home</Link>
          </p>
        </div>
      </section>
    </main>
  );
}